import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { supabase, Profile } from '../lib/supabase'
import { useAuth } from './auth-context'

interface ProfileState {
	activeProfile: Profile | null
	profiles: Profile[]
	isLoading: boolean
	error: string | null
}

interface ProfileContextType extends ProfileState {
	createProfile: (profileData: Partial<Profile>) => Promise<{
		profile: Profile | null
		error: any
	}>
	updateProfile: (profileId: string, profileData: Partial<Profile>) => Promise<{
		error: any
	}>
	deleteProfile: (profileId: string) => Promise<{
		error: any
	}>
	selectProfile: (profileId: string) => void
	fetchProfiles: () => Promise<void>
	clearProfiles: () => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

interface ProfileProviderProps {
	children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
	const { user } = useAuth()
	const [state, setState] = useState<ProfileState>({
		activeProfile: null,
		profiles: [],
		isLoading: false,
		error: null
	})

	// Clear profiles when user logs out
	useEffect(() => {
		if (!user) {
			clearProfiles()
		}
	}, [user])

	// Fetch profiles when user logs in
	useEffect(() => {
		if (user) {
			fetchProfiles()
		}
	}, [user?.id])

	// Load active profile from localStorage
	useEffect(() => {
		if (state.profiles.length > 0 && !state.activeProfile) {
			const storedProfileId = localStorage.getItem('activeProfileId')
			
			if (storedProfileId) {
				const foundProfile = state.profiles.find(p => p.profile_id === storedProfileId)
				if (foundProfile) {
					setState(prev => ({ ...prev, activeProfile: foundProfile }))
				} else {
					// If stored profile not found, select first available profile
					selectProfile(state.profiles[0].profile_id)
				}
			} else if (state.profiles.length > 0) {
				// If no stored profile, select first available
				selectProfile(state.profiles[0].profile_id)
			}
		}
	}, [state.profiles])

	const fetchProfiles = async () => {
		if (!user) return
		
		try {
			setState(prev => ({ ...prev, isLoading: true, error: null }))

			const { data, error } = await supabase
				.from('member_profiles')
				.select('*')
				.eq('account_id', user.id)
				.order('created_at', { ascending: true })

			if (error) {
				throw error
			}

			setState(prev => ({ 
				...prev, 
				profiles: data as Profile[],
				isLoading: false 
			}))
		} catch (err: any) {
			console.error('Error fetching profiles:', err)
			setState(prev => ({ 
				...prev, 
				error: err.message || 'Failed to load profiles',
				isLoading: false 
			}))
		}
	}

	const createProfile = async (profileData: Partial<Profile>) => {
		if (!user) {
			return { profile: null, error: 'User not authenticated' }
		}

		try {
			setState(prev => ({ ...prev, isLoading: true, error: null }))

			// Make sure account_id is set and updated_at is current
			const newProfileData = {
				...profileData,
				account_id: user.id,
				updated_at: new Date().toISOString()
			}

			const { data, error } = await supabase
				.from('member_profiles')
				.insert([newProfileData])
				.select()
				.single()

			if (error) {
				throw error
			}

			const newProfile = data as Profile
			
			// Update state with new profile
			setState(prev => ({
				...prev,
				profiles: [...prev.profiles, newProfile],
				activeProfile: newProfile,
				isLoading: false
			}))

			// Store the active profile ID in localStorage
			localStorage.setItem('activeProfileId', newProfile.profile_id)

			return { profile: newProfile, error: null }
		} catch (err: any) {
			console.error('Error creating profile:', err)
			setState(prev => ({ 
				...prev, 
				error: err.message || 'Failed to create profile',
				isLoading: false 
			}))
			return { profile: null, error: err.message || 'Unknown error' }
		}
	}

	const updateProfile = async (profileId: string, profileData: Partial<Profile>) => {
		try {
			setState(prev => ({ ...prev, isLoading: true, error: null }))

			// Add updated_at timestamp
			const updateData = {
				...profileData,
				updated_at: new Date().toISOString()
			}

			const { error } = await supabase
				.from('member_profiles')
				.update(updateData)
				.eq('profile_id', profileId)

			if (error) {
				throw error
			}

			// Update the profiles in state
			setState(prev => ({
				...prev,
				profiles: prev.profiles.map(p => 
					p.profile_id === profileId ? { ...p, ...updateData } : p
				),
				activeProfile: prev.activeProfile?.profile_id === profileId 
					? { ...prev.activeProfile, ...updateData } 
					: prev.activeProfile,
				isLoading: false
			}))

			return { error: null }
		} catch (err: any) {
			console.error('Error updating profile:', err)
			setState(prev => ({ 
				...prev, 
				error: err.message || 'Failed to update profile',
				isLoading: false 
			}))
			return { error: err.message || 'Unknown error' }
		}
	}

	const deleteProfile = async (profileId: string) => {
		try {
			setState(prev => ({ ...prev, isLoading: true, error: null }))

			const { error } = await supabase
				.from('member_profiles')
				.delete()
				.eq('profile_id', profileId)

			if (error) {
				throw error
			}

			// Update state by removing the deleted profile
			setState(prev => {
				const updatedProfiles = prev.profiles.filter(p => p.profile_id !== profileId)
				let newActiveProfile = prev.activeProfile

				// If the deleted profile was the active profile, select a new one
				if (prev.activeProfile?.profile_id === profileId) {
					newActiveProfile = updatedProfiles.length > 0 ? updatedProfiles[0] : null
					if (newActiveProfile) {
						localStorage.setItem('activeProfileId', newActiveProfile.profile_id)
					} else {
						localStorage.removeItem('activeProfileId')
					}
				}

				return {
					...prev,
					profiles: updatedProfiles,
					activeProfile: newActiveProfile,
					isLoading: false
				}
			})

			return { error: null }
		} catch (err: any) {
			console.error('Error deleting profile:', err)
			setState(prev => ({ 
				...prev, 
				error: err.message || 'Failed to delete profile',
				isLoading: false 
			}))
			return { error: err.message || 'Unknown error' }
		}
	}

	const selectProfile = (profileId: string) => {
		const selectedProfile = state.profiles.find(p => p.profile_id === profileId)
		if (selectedProfile) {
			setState(prev => ({ ...prev, activeProfile: selectedProfile }))
			localStorage.setItem('activeProfileId', profileId)
		}
	}

	const clearProfiles = () => {
		setState({
			activeProfile: null,
			profiles: [],
			isLoading: false,
			error: null
		})
		localStorage.removeItem('activeProfileId')
	}

	const value = {
		...state,
		createProfile,
		updateProfile,
		deleteProfile,
		selectProfile,
		fetchProfiles,
		clearProfiles
	}

	return (
		<ProfileContext.Provider value={value}>
			{children}
		</ProfileContext.Provider>
	)
}

export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext)
	if (context === undefined) {
		throw new Error('useProfile must be used within a ProfileProvider')
	}
	return context
}