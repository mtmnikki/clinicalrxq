import React, { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { 
	ChevronDown, 
	ChevronRight, 
	Home, 
	BookOpen, 
	Library, 
	Settings, 
	LogOut,
	Menu,
	X
} from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Button } from './ui/button'
import { useAuth } from '../contexts/auth-context'
import { useProfile } from '../contexts/profile-context'
import { ProfileBookmarksPanel } from './profile-bookmarks-panel'
import { cn } from '../lib/utils'
import LogoImage from '../assets/images/logoimage.svg'

const clinicalPrograms = [
	{ name: 'TimeMyMeds', slug: 'timemymeds' },
	{ name: 'MTM The Future Today', slug: 'mtmthefuturetoday' },
	{ name: 'Test and Treat', slug: 'testandtreat' },
	{ name: 'HbA1c Testing', slug: 'hba1ctesting' },
	{ name: 'Oral Contraceptives', slug: 'oralcontraceptives' },
]

const resourceCategories = [
	{ name: 'Patient Handouts', filter: 'patient_handout' },
	{ name: 'Clinical Guidelines', filter: 'clinical_guideline' },
	{ name: 'Medical Billing', filter: 'medical_billing' },
	{ name: 'Documentation Forms', filter: 'documentation_form' },
	{ name: 'Videos', filter: 'videos' },
	{ name: 'All Resources', filter: '' },
]

export function MemberShell() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [clinicalProgramsOpen, setClinicalProgramsOpen] = useState(false)
	const [resourceLibraryOpen, setResourceLibraryOpen] = useState(false)
	const location = useLocation()
	const { signOut } = useAuth()
	const { activeProfile } = useProfile()

	const handleSignOut = async () => {
		try {
			await signOut()
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	const isActiveLink = (path: string) => {
		return location.pathname === path
	}

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			<div className="p-6 border-b border-gray-700">
				<div className="flex items-center gap-3">
					<div className="flex-shrink-0">
						<img src={LogoImage} alt="ClinicalRxQ Logo" className="h-8 w-8" />
					</div>
					<div className="flex flex-col">
						<h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
							ClinicalRxQ
						</h2>
						{activeProfile && (
							<p className="text-white text-sm">
								{activeProfile.first_name}
							</p>
						)}
					</div>
				</div>
			</div>
			
			<nav className="flex-1 p-4 space-y-2">
				<Link
					to="/dashboard"
					className={cn(
						'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
						isActiveLink('/dashboard')
							? 'bg-blue-900 text-blue-300'
							: 'text-gray-300 hover:bg-gray-800'
					)}
				>
					<Home size={20} />
					Dashboard
				</Link>

				<Collapsible open={clinicalProgramsOpen} onOpenChange={setClinicalProgramsOpen}>
					<CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
						<div className="flex items-center gap-3">
							<BookOpen size={20} />
							Clinical Programs
						</div>
						{clinicalProgramsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
					</CollapsibleTrigger>
					<CollapsibleContent className="ml-6 mt-2 space-y-1">
						{clinicalPrograms.map((program) => (
							<Link
								key={program.slug}
								to={`/programs/${program.slug}`}
								className={cn(
									'block px-3 py-2 text-sm rounded-lg transition-colors',
									isActiveLink(`/programs/${program.slug}`)
										? 'bg-blue-900 text-blue-300'
										: 'text-gray-400 hover:bg-gray-800'
								)}
							>
								{program.name}
							</Link>
						))}
					</CollapsibleContent>
				</Collapsible>

				<Collapsible open={resourceLibraryOpen} onOpenChange={setResourceLibraryOpen}>
					<CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
						<div className="flex items-center gap-3">
							<Library size={20} />
							Resource Library
						</div>
						{resourceLibraryOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
					</CollapsibleTrigger>
					<CollapsibleContent className="ml-6 mt-2 space-y-1">
						{resourceCategories.map((category) => (
							<Link
								key={category.filter}
								to={`/resources${category.filter ? `?filter=${category.filter}` : ''}`}
								className={cn(
									'block px-3 py-2 text-sm rounded-lg transition-colors',
									isActiveLink('/resources') && new URLSearchParams(location.search).get('filter') === category.filter
										? 'bg-blue-900 text-blue-300'
										: 'text-gray-400 hover:bg-gray-800'
								)}
							>
								{category.name}
							</Link>
						))}
					</CollapsibleContent>
				</Collapsible>

				<Link
					to="/account"
					className={cn(
						'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
						isActiveLink('/account')
							? 'bg-blue-900 text-blue-300'
							: 'text-gray-300 hover:bg-gray-800'
					)}
				>
					<Settings size={20} />
					Account Settings
				</Link>
			</nav>

			<div className="p-4 border-t border-gray-700">
				<Button
					variant="ghost"
					className="w-full justify-start gap-3 text-gray-300 hover:bg-gray-800"
					onClick={handleSignOut}
				>
					<LogOut size={20} />
					Sign Out
				</Button>
			</div>
		</div>
	)

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Desktop Sidebar */}
			<div className={cn(
				'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-64 lg:bg-gray-900 lg:border-r lg:border-gray-700 transition-transform duration-300',
				isSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
			)}>
				<SidebarContent />
			</div>

			{/* Bookmark Panel */}
			<ProfileBookmarksPanel />

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
					<div className="fixed inset-y-0 left-0 w-64 bg-gray-900">
						<div className="flex items-center justify-between p-4 border-b">
							<h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
								ClinicalRxQ
							</h2>
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-300 hover:bg-gray-800"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<X size={20} />
							</Button>
						</div>
						<div className="flex-1 overflow-y-auto">
							<SidebarContent />
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			<div className={cn(
				'flex-1 transition-all duration-300',
				isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
			)}>
				{/* Header */}
				<header className="bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden"
								onClick={() => setIsMobileMenuOpen(true)}
							>
								<Menu size={20} />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="hidden lg:flex"
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							>
								<Menu size={20} />
							</Button>
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
