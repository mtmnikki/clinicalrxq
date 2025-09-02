import React from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmark } from '../contexts/bookmark-context'
import { cn } from '../lib/utils'

interface BookmarkButtonProps {
	fileId: string
	className?: string
	size?: 'sm' | 'md' | 'lg'
}

export function BookmarkButton({ fileId, className, size = 'md' }: BookmarkButtonProps) {
	const { isBookmarked, toggleBookmark, isLoading } = useBookmark()
	const bookmarked = isBookmarked(fileId)

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		await toggleBookmark(fileId)
	}

	const sizeClasses = {
		sm: 'w-6 h-6 p-1',
		md: 'w-8 h-8 p-1.5',
		lg: 'w-10 h-10 p-2'
	}

	const iconSizes = {
		sm: 16,
		md: 18,
		lg: 20
	}

	return (
		<button
			onClick={handleClick}
			disabled={isLoading || !fileId || fileId.trim() === ''}
			className={cn(
				'rounded-lg transition-all duration-200 flex items-center justify-center',
				bookmarked
					? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
					: 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
				(isLoading || !fileId || fileId.trim() === '') && 'opacity-50 cursor-not-allowed',
				sizeClasses[size],
				className
			)}
			title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
		>
			{bookmarked ? (
				<BookmarkCheck size={iconSizes[size]} />
			) : (
				<Bookmark size={iconSizes[size]} />
			)}
		</button>
	)
}