import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, Bookmark } from '../lib/supabase'
import { useAuth } from './auth-context'
import { useProfile } from './profile-context'

interface BookmarkContextType {
	bookmarks: Bookmark[]
	bookmarkedFileIds: Set<string>
	isLoading: boolean
	error: string | null
	fetchBookmarks: () => Promise<void>
	toggleBookmark: (fileId: string) => Promise<void>
	isBookmarked: (fileId: string) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuth()
	const { activeProfile } = useProfile()
	const [bookmarksData, setBookmarksData] = useState<Bookmark[]>([])
	const [bookmarkedFileIds, setBookmarkedFileIds] = useState<Set<string>>(new Set())
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Fetch bookmarks when active profile changes
	useEffect(() => {
		if (activeProfile?.profile_id) {
			fetchBookmarks()
		} else {
			// Clear bookmarks when no active profile
			setBookmarksData([])
			setBookmarkedFileIds(new Set())
		}
	}, [activeProfile?.profile_id])

	const fetchBookmarks = async () => {
		if (!activeProfile?.profile_id) return

		try {
			setIsLoading(true)
			setError(null)

			const { data, error } = await supabase
				.from('bookmarks')
				.select(`
					id,
					profile_id,
					resource_id,
					created_at,
					storage_files_catalog!resource_id (
						file_name,
						file_url
					)
				`)
				.eq('profile_id', activeProfile.profile_id)
				.order('created_at', { ascending: false })

			if (error) throw error

			// Transform the joined data to match our Bookmark interface
			const bookmarks = (data || []).map(item => ({
				id: item.id,
				profile_id: item.profile_id,
				resource_id: item.resource_id,
				created_at: item.created_at,
				file_name: item.storage_files_catalog?.file_name || null,
				file_url: item.storage_files_catalog?.file_url || null
			}))

			setBookmarksData(bookmarks)
			setBookmarkedFileIds(new Set(bookmarks.map(b => b.resource_id)))
		} catch (err: any) {
			console.error('Error fetching bookmarks:', err)
			setError(err.message || 'Failed to fetch bookmarks')
		} finally {
			setIsLoading(false)
		}
	}

	const toggleBookmark = async (fileId: string) => {
		if (!activeProfile?.profile_id) {
			setError('No active profile selected')
			return
		}

		// Validate fileId before attempting database operations
		if (!fileId || fileId.trim() === '') {
			console.error('Invalid fileId provided to toggleBookmark:', fileId)
			setError('Invalid file ID - cannot bookmark this resource')
			return
		}

		try {
			setError(null)
			const isCurrentlyBookmarked = bookmarkedFileIds.has(fileId)

			if (isCurrentlyBookmarked) {
				// Remove bookmark
				const { error } = await supabase
					.from('bookmarks')
					.delete()
					.eq('profile_id', activeProfile.profile_id)
					.eq('resource_id', fileId)

				if (error) throw error

				// Update local state
				setBookmarksData(prev => prev.filter(b => b.resource_id !== fileId))
				setBookmarkedFileIds(prev => {
					const newSet = new Set(prev)
					newSet.delete(fileId)
					return newSet
				})
			} else {
				// Add bookmark
				const { data, error } = await supabase
					.from('bookmarks')
					.insert([{
						profile_id: activeProfile.profile_id,
						resource_id: fileId
					}])
					.select(`
						id,
						profile_id,
						resource_id,
						created_at,
						storage_files_catalog!resource_id (
							file_name,
							file_url
						)
					`)
					.single()

				if (error) throw error

				// Transform the joined data to match our Bookmark interface
				const newBookmark: Bookmark = {
					id: data.id,
					profile_id: data.profile_id,
					resource_id: data.resource_id,
					created_at: data.created_at,
					file_name: data.storage_files_catalog?.file_name || null,
					file_url: data.storage_files_catalog?.file_url || null
				}
				
				// Update local state
				setBookmarksData(prev => [newBookmark, ...prev])
				setBookmarkedFileIds(prev => new Set(prev).add(fileId))
			}
		} catch (err: any) {
			console.error('Error toggling bookmark:', err)
			setError(err.message || 'Failed to update bookmark')
		}
	}

	const isBookmarked = (fileId: string): boolean => {
		return bookmarkedFileIds.has(fileId)
	}

	const value = {
		bookmarks: bookmarksData,
		bookmarkedFileIds,
		isLoading,
		error,
		fetchBookmarks,
		toggleBookmark,
		isBookmarked
	}

	return (
		<BookmarkContext.Provider value={value}>
			{children}
		</BookmarkContext.Provider>
	)
}

export function useBookmark() {
	const context = useContext(BookmarkContext)
	if (context === undefined) {
		throw new Error('useBookmark must be used within a BookmarkProvider')
	}
	return context
}