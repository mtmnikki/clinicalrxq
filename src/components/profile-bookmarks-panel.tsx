import React, { useState, useMemo } from 'react'
import { Bookmark, BookmarkCheck, Download, Search, Trash2, X, FileText, Play } from 'lucide-react'
import { useBookmark } from '../contexts/bookmark-context'
import { useProfile } from '../contexts/profile-context'
import { useBookmarksPanel } from '../contexts/bookmarks-panel-context'

interface BookmarkRowProps {
	bookmark: {
		id: string
		resource_id: string
		file_name: string | null
		file_url: string | null
		created_at: string
	}
	onRemove: (fileId: string) => void
}

function BookmarkRow({ bookmark, onRemove }: BookmarkRowProps) {
	const isVideo = bookmark.file_name?.toLowerCase().includes('.mp4') || 
					bookmark.file_name?.toLowerCase().includes('.webm') ||
					bookmark.file_name?.toLowerCase().includes('.mov')

	const handleDownload = () => {
		if (bookmark.file_url) {
			window.open(bookmark.file_url, '_blank')
		}
	}

	return (
		<li className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:shadow-sm transition-shadow">
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2 mb-1">
					<div className="flex items-center gap-1">
						{isVideo ? (
							<Play className="text-purple-600" size={14} />
						) : (
							<FileText className="text-blue-600" size={14} />
						)}
					</div>
				</div>
				<div className="font-medium text-gray-900 text-sm truncate">
					{bookmark.file_name || 'Untitled Resource'}
				</div>
				<div className="text-xs text-gray-500">
					Saved {new Date(bookmark.created_at).toLocaleDateString()}
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={handleDownload}
					className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
					title={isVideo ? 'Play video' : 'Download file'}
				>
					{isVideo ? <Play size={14} /> : <Download size={14} />}
				</button>
				<button
					type="button"
					onClick={() => onRemove(bookmark.resource_id)}
					className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
					title="Remove bookmark"
				>
					<Trash2 size={14} />
				</button>
			</div>
		</li>
	)
}

export function ProfileBookmarksPanel() {
	const { bookmarks, isLoading, toggleBookmark } = useBookmark()
	const { activeProfile, isLoading: profileLoading } = useProfile()
	const { isOpen, openPanel, closePanel } = useBookmarksPanel()
	const [searchTerm, setSearchTerm] = useState('')

	const filteredBookmarks = useMemo(() => {
		if (!searchTerm) return bookmarks
		
		const query = searchTerm.toLowerCase()
		return bookmarks.filter(bookmark => 
			bookmark.file_name?.toLowerCase().includes(query)
		)
	}, [bookmarks, searchTerm])

	const handleRemove = async (fileId: string) => {
		await toggleBookmark(fileId)
	}

	const handleClose = () => {
		closePanel()
		setSearchTerm('')
	}

	// Show loading state while profile is loading
	if (profileLoading) {
		return (
			<button
				type="button"
				className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-400 text-white shadow-lg cursor-not-allowed"
				disabled
			>
				<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
			</button>
		)
	}

	// Don't render anything if no active profile
	if (!activeProfile) {
		return null
	}

	return (
		<>
			{/* Floating Action Button */}
			<button
				type="button"
				onClick={openPanel}
				className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
				title="View bookmarked resources"
			>
				<Bookmark size={20} />
				{bookmarks.length > 0 && (
					<span className="absolute -right-1 -top-1 min-w-[20px] h-5 rounded-full bg-red-500 px-1 text-center text-xs font-semibold leading-5 text-white">
						{bookmarks.length}
					</span>
				)}
			</button>

			{/* Drawer */}
			{isOpen && (
				<>
					<div 
						className="fixed inset-0 z-50 bg-black/40" 
						onClick={handleClose}
					/>
					<div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl border-l border-gray-200">
						{/* Header */}
						<div className="flex items-center justify-between border-b border-gray-200 p-4">
							<div className="flex items-center gap-2">
								<BookmarkCheck className="text-blue-600" size={20} />
								<h2 className="font-semibold text-gray-900">Bookmarked Resources</h2>
								<span className="text-sm text-gray-500">({bookmarks.length})</span>
							</div>
							<button
								type="button"
								onClick={handleClose}
								className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
							>
								<X size={16} />
							</button>
						</div>

						{/* Content */}
						<div className="flex h-[calc(100%-140px)] flex-col overflow-hidden">
							{!activeProfile ? (
								<div className="flex flex-1 items-center justify-center p-6 text-center">
									<div>
										<BookmarkCheck className="mx-auto text-gray-400 mb-3" size={32} />
										<div className="mb-2 text-sm font-medium text-gray-900">
											No profile selected
										</div>
										<p className="text-xs text-gray-600 max-w-xs mx-auto">
											Please select an active profile to view bookmarked resources.
										</p>
									</div>
								</div>
							) : isLoading ? (
								<div className="flex flex-1 items-center justify-center p-6">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
								</div>
							) : bookmarks.length === 0 ? (
								<div className="flex flex-1 items-center justify-center p-6 text-center">
									<div>
										<BookmarkCheck className="mx-auto text-gray-400 mb-3" size={32} />
										<div className="mb-2 text-sm font-medium text-gray-900">
											No bookmarks added
										</div>
										<p className="text-xs text-gray-600 max-w-xs mx-auto">
											Bookmark resources from programs or the resource library to see them here.
										</p>
									</div>
								</div>
							) : (
								<>
									{/* Search */}
									<div className="border-b border-gray-200 p-4">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
											<input
												type="text"
												placeholder="Search bookmarked files..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
											/>
										</div>
									</div>
									
									{filteredBookmarks.length === 0 ? (
										<div className="flex flex-1 items-center justify-center p-6 text-center">
											<div>
												<BookmarkCheck className="mx-auto text-gray-400 mb-3" size={32} />
												<div className="mb-2 text-sm font-medium text-gray-900">
													No results found
												</div>
												<p className="text-xs text-gray-600 max-w-xs mx-auto">
													Try a different search term.
												</p>
											</div>
										</div>
									) : (
										<ul className="flex-1 overflow-y-auto space-y-2 p-4">
											{filteredBookmarks.map((bookmark) => (
												<BookmarkRow 
													key={bookmark.id} 
													bookmark={bookmark} 
													onRemove={handleRemove} 
												/>
											))}
										</ul>
									)}
								</>
							)}
						</div>
						
						{/* Footer */}
						<div className="border-t border-gray-200 p-4">
							<button
								onClick={handleClose}
								className="w-full h-9 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Close Panel
							</button>
						</div>
					</div>
				</>
			)}
		</>
	)
}