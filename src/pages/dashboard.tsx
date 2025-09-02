import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { BookOpen, Library, Clock, ArrowRight, TrendingUp, FileText, Play, BookmarkCheck, Bell } from 'lucide-react'
import { supabase, Program, Announcement } from '../lib/supabase'
import { useAuth } from '../contexts/auth-context'
import { useBookmark } from '../contexts/bookmark-context'
import { useProfile } from '../contexts/profile-context'
import { useBookmarksPanel } from '../contexts/bookmarks-panel-context'
import { marked } from 'marked'

type ClinicalProgram = Program

export function DashboardPage() {
	const [programs, setPrograms] = useState<ClinicalProgram[]>([])
	const [announcements, setAnnouncements] = useState<Announcement[]>([])
	const [recentResources, setRecentResources] = useState([])
	const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
	const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)
	const { user } = useAuth()
	const { bookmarks } = useBookmark()
	const { activeProfile } = useProfile()
	const { openPanel } = useBookmarksPanel()

	useEffect(() => {
		fetchPrograms()
		fetchAnnouncements()
		fetchRecentResources()
	}, [])

	const fetchPrograms = async () => {
		try {
			const { data, error } = await supabase
				.from('programs')
				.select('*')
				.order('name')

			if (error) throw error
			setPrograms(data || [])
		} catch (error) {
			console.error('Error fetching programs:', error)
		}
	}

	const fetchAnnouncements = async () => {
		try {
			const { data, error } = await supabase
				.from('announcements')
				.select('*')
				.order('created_at', { ascending: false })
				.limit(3)

			if (error) throw error
			setAnnouncements(data || [])
		} catch (error) {
			console.error('Error fetching announcements:', error)
		}
	}

	const fetchRecentResources = async () => {
		try {
			const { data, error } = await supabase
				.from('storage_files_catalog')
				.select('*')
				.order('created_at', { ascending: false })
				.limit(3)

			if (error) throw error
			setRecentResources(data || [])
		} catch (error) {
			console.error('Error fetching recent resources:', error)
		}
	}

		const getPreviewText = (markdownContent: string, lineLimit: number = 3) => {
		// Convert markdown to plain text for preview
		const plainText = markdownContent
			.replace(/[#*_~`]/g, '') // Remove markdown formatting characters
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to just text
			.replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
			.replace(/\n+/g, '\n') // Normalize line breaks
			.trim()
		
		const lines = plainText.split('\n').filter(line => line.trim() !== '')
		return lines.slice(0, lineLimit).join('\n')
	}

	const handleViewAnnouncement = (announcement: Announcement) => {
		setSelectedAnnouncement(announcement)
		setIsAnnouncementModalOpen(true)
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric'
		})
	}

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome back, {activeProfile?.first_name || 'there'}!
					</h1>
					<p className="text-gray-600">
						Continue your clinical training and access your resources.
					</p>
				</div>

				{/* Split Layout: Bookmarks and Announcements */}
				<div className="grid lg:grid-cols-2 gap-8 mb-8">
					{/* Recent Bookmarks - Left Column */}
					<div>
						{bookmarks.length > 0 && (
							<>
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-bold text-gray-900">Recent Bookmarks</h2>
									<Button variant="outline" size="sm" onClick={openPanel}>
										View All Bookmarks
									</Button>
								</div>

								<div className="space-y-4">
									{bookmarks.slice(0, 6).map((bookmark) => {
										const isVideo = bookmark.file_name?.toLowerCase().includes('.mp4') || 
														bookmark.file_name?.toLowerCase().includes('.webm') ||
														bookmark.file_name?.toLowerCase().includes('.mov')

										const handleCardClick = () => {
											if (bookmark.file_url) {
												window.open(bookmark.file_url, '_blank')
											}
										}

										return (
											<Card key={bookmark.id} className="hover:shadow-lg transition-shadow group cursor-pointer" onClick={handleCardClick}>
												<CardContent className="p-3">
													<div className="flex items-center justify-between gap-3">
														{isVideo ? (
															<Play className="text-purple-600 flex-shrink-0" size={18} />
														) : (
															<FileText className="text-blue-600 flex-shrink-0" size={18} />
														)}
														<h3 className="font-medium text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
															{bookmark.file_name || 'Untitled Resource'}
														</h3>
														<BookmarkCheck className="text-blue-600 flex-shrink-0" size={14} />
													</div>
												</CardContent>
											</Card>
										)
									})}
								</div>
							</>
						)}

						{bookmarks.length === 0 && (
							<>
								<h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookmarks</h2>
								<Card className="text-center py-12">
									<CardContent>
										<BookmarkCheck className="mx-auto text-gray-400 mb-4" size={48} />
										<p className="text-gray-500 mb-2">No bookmarked resources yet</p>
										<p className="text-sm text-gray-400">
											Bookmark resources from programs or the resource library to see them here.
										</p>
									</CardContent>
								</Card>
							</>
						)}
					</div>

					{/* Announcements - Right Column */}
					<div>
						{announcements.length > 0 && (
							<>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-2">
										<Bell className="text-blue-600" size={24} />
										<h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
									</div>
								</div>

								<div className="space-y-6">
									{announcements.map((announcement) => (
										<Card key={announcement.id} className="hover:shadow-lg transition-shadow">
											<CardHeader className="pb-3">
												<h2 className="text-xl font-bold text-gray-900 mb-2">
													{announcement.title}
												</h2>
												<p className="text-sm text-gray-500">
													{formatDate(announcement.created_at)}
												</p>
											</CardHeader>
											<CardContent className="pt-0">
												<div className="text-gray-600 text-sm mb-4 leading-relaxed whitespace-pre-line">
													{getPreviewText(announcement.body, 3)}
												</div>
												<button
													onClick={() => handleViewAnnouncement(announcement)}
													className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
												>
													View Announcement
												</button>
											</CardContent>
										</Card>
									))}
								</div>
							</>
						)}

						{announcements.length === 0 && (
							<>
								<div className="flex items-center gap-2 mb-6">
									<Bell className="text-blue-600" size={24} />
									<h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
								</div>
								<Card className="text-center py-12">
									<CardContent>
										<Bell className="mx-auto text-gray-400 mb-4" size={48} />
										<p className="text-gray-500 mb-2">No announcements available</p>
										<p className="text-sm text-gray-400">
											Check back later for important updates and news.
										</p>
									</CardContent>
								</Card>
							</>
						)}
					</div>
				</div>

				{/* Clinical Programs */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-gray-900">Clinical Programs</h2>
						<Button variant="outline" size="sm">
							View All
						</Button>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{programs.length > 0 ? programs.map((program) => (
							<Card key={program.id} className="hover:shadow-lg transition-shadow group">
								<CardHeader>
									<CardTitle className="group-hover:text-cyan-600 transition-colors">
										{program.name}
									</CardTitle>
									<CardDescription>
										{program.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link to={`/programs/${program.slug}`}>
										<Button className="w-full group">
											View Program
											<ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
										</Button>
									</Link>
								</CardContent>
							</Card>
						)) : (
							<div className="col-span-full text-center py-12">
								<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
								<p className="text-gray-500">No programs available yet.</p>
							</div>
						)}
					</div>
				</div>

				{/* Quick Access */}
				<div className="grid md:grid-cols-2 gap-8 mb-8">
					<Card className="bg-gradient-to-br from-blue-600 via-cyan-400 to-teal-300 text-white">
						<CardHeader>
							<CardTitle className="text-white">Resource Library</CardTitle>
							<CardDescription className="text-white/90">
								Access protocols, guidelines, and patient resources
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link to="/resources">
								<Button className="bg-white text-blue-600 hover:bg-cyan-300">
									Browse Resources
									<ArrowRight className="ml-2" size={16} />
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Account Settings</CardTitle>
							<CardDescription>
								Manage your profile and preferences
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link to="/account">
								<Button variant="outline" className="w-full">
									Manage Account
									<ArrowRight className="ml-2" size={16} />
								</Button>
							</Link>
						</CardContent>
					</Card>
			</div>

			</div>
		
			{/* Announcement Modal */}
			<Dialog open={isAnnouncementModalOpen} onOpenChange={setIsAnnouncementModalOpen}>
				<DialogContent className="backdrop-blur-lg bg-white/50 border border-white/80max-w-3xl max-h-[80vh] overflow-y-auto">
					{selectedAnnouncement && (
						<>
							<DialogHeader className="border-b border-gray-200 pb-4 mb-6">
								<div className="flex items-center gap-2 mb-2">
									<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-300 flex items-center justify-center">
										<Bell className="text-white" size={16} />
									</div>
									<span className="text-sm text-gray-500">
										{formatDate(selectedAnnouncement.created_at)}
									</span>
								</div>
								<DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
									{selectedAnnouncement.title}
								</DialogTitle>
							</DialogHeader>
							<div 
								className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
								dangerouslySetInnerHTML={{ 
									__html: marked(selectedAnnouncement.body) 
								}}
							/>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}