import React, { createContext, useContext, useState } from 'react'

interface BookmarksPanelContextType {
	isOpen: boolean
	openPanel: () => void
	closePanel: () => void
	togglePanel: () => void
}

const BookmarksPanelContext = createContext<BookmarksPanelContextType | undefined>(undefined)

export function BookmarksPanelProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)

	const openPanel = () => setIsOpen(true)
	const closePanel = () => setIsOpen(false)
	const togglePanel = () => setIsOpen(prev => !prev)

	const value = {
		isOpen,
		openPanel,
		closePanel,
		togglePanel
	}

	return (
		<BookmarksPanelContext.Provider value={value}>
			{children}
		</BookmarksPanelContext.Provider>
	)
}

export function useBookmarksPanel() {
	const context = useContext(BookmarksPanelContext)
	if (context === undefined) {
		throw new Error('useBookmarksPanel must be used within a BookmarksPanelProvider')
	}
	return context
}