import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useProfile } from '../contexts/profile-context'
import { Profile, Database } from '../lib/supabase'

interface ProfileModalProps {
	isOpen: boolean
	onClose: () => void
	profile?: Profile | null
	mode: 'create' | 'edit'
}

const profileRoles = [
	'Pharmacist',
	'Pharmacist-PIC',
	'Pharmacy Technician',
	'Intern',
	'Pharmacy'
] as const satisfies readonly Database['public']['Enums']['profile_role'][]

export function ProfileModal({ isOpen, onClose, profile, mode }: ProfileModalProps) {
	const { createProfile, updateProfile, isLoading } = useProfile()
	
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		phone_number: '',
		profile_email: '',
		profile_role: '' as Profile['profile_role'],
		license_number: '',
		nabp_eprofile_id: ''
	})

	const [error, setError] = useState('')

	// Pre-populate form when editing
	useEffect(() => {
		if (profile && mode === 'edit') {
			setFormData({
				first_name: profile.first_name || '',
				last_name: profile.last_name || '',
				phone_number: profile.phone_number || '',
				profile_email: profile.profile_email || '',
				profile_role: profile.profile_role || '',
				license_number: profile.license_number || '',
				nabp_eprofile_id: profile.nabp_eprofile_id || ''
			})
		} else {
			// Reset form for create mode
			setFormData({
				first_name: '',
				last_name: '',
				phone_number: '',
				profile_email: '',
				profile_role: '',
				license_number: '',
				nabp_eprofile_id: ''
			})
		}
		setError('')
	}, [profile, mode, isOpen])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		// Basic validation
		if (!formData.first_name.trim() || !formData.last_name.trim()) {
			setError('First name and last name are required')
			return
		}

		const profileData = {
			first_name: formData.first_name.trim(),
			last_name: formData.last_name.trim(),
			phone_number: formData.phone_number.trim() || null,
			profile_email: formData.profile_email.trim() || null,
			profile_role: formData.profile_role || null,
			license_number: formData.license_number.trim() || null,
			nabp_eprofile_id: formData.nabp_eprofile_id.trim() || null
		}

		try {
			let result
			if (mode === 'create') {
				result = await createProfile(profileData)
			} else {
				result = await updateProfile(profile!.profile_id, profileData)
			}

			if (result.error) {
				setError(result.error)
			} else {
				onClose()
			}
		} catch {
			setError('An unexpected error occurred')
		}
	}

	const handleChange = (field: keyof typeof formData, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Add New Profile' : 'Edit Profile'}
					</DialogTitle>
					<DialogDescription>
						{mode === 'create' 
							? 'Create a new staff profile for your pharmacy.'
							: 'Update the profile information.'
						}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
							{error}
						</div>
					)}

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
								First Name *
							</label>
							<Input
								id="first_name"
								value={formData.first_name}
								onChange={(e) => handleChange('first_name', e.target.value)}
								required
								disabled={isLoading}
							/>
						</div>
						<div>
							<label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
								Last Name *
							</label>
							<Input
								id="last_name"
								value={formData.last_name}
								onChange={(e) => handleChange('last_name', e.target.value)}
								required
								disabled={isLoading}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="profile_email" className="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<Input
							id="profile_email"
							type="email"
							value={formData.profile_email}
							onChange={(e) => handleChange('profile_email', e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<div>
						<label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
							Phone Number
						</label>
						<Input
							id="phone_number"
							type="tel"
							value={formData.phone_number}
							onChange={(e) => handleChange('phone_number', e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<div>
						<label htmlFor="profile_role" className="block text-sm font-medium text-gray-700 mb-2">
							Role
						</label>
						<Select
							value={formData.profile_role || ''}
							onValueChange={(value) => handleChange('profile_role', value)}
							disabled={isLoading}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								{profileRoles.map((role) => (
									<SelectItem key={role} value={role}>
										{role}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<label htmlFor="license_number" className="block text-sm font-medium text-gray-700 mb-2">
							License Number
						</label>
						<Input
							id="license_number"
							value={formData.license_number}
							onChange={(e) => handleChange('license_number', e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<div>
						<label htmlFor="nabp_eprofile_id" className="block text-sm font-medium text-gray-700 mb-2">
							NABP eProfile ID
						</label>
						<Input
							id="nabp_eprofile_id"
							value={formData.nabp_eprofile_id}
							onChange={(e) => handleChange('nabp_eprofile_id', e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'Saving...' : (mode === 'create' ? 'Create Profile' : 'Update Profile')}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}