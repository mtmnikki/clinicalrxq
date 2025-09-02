import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { BookOpen, Library, Clock, ArrowRight, TrendingUp, FileText, Play, BookmarkCheck } from 'lucide-react'
import { supabase, Program } from '../lib/supabase'
import { useAuth } from '../contexts/auth-context'
import { useBookmark } from '../contexts/bookmark-context'
import { useProfile } from '../contexts/profile-context'
import { useBookmarksPanel } from '../contexts/bookmarks-panel-context'

type ClinicalProgram = Program

export function DashboardPage() {
	const [programs, setPrograms] = useState<ClinicalProgram[]>([])
	const [recentResources, setRecentResources] = useState([])
	const { user } = useAuth()
	const { bookmarks } = useBookmark()
	const { activeProfile } = useProfile()
	const { openPanel } = useBookmarksPanel()

	useEffect(() => {
		fetchPrograms()
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

				{/* Recent Bookmarks */}
				{bookmarks.length > 0 && (
					<div className="mb-8">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-gray-900">Recent Bookmarks</h2>
							<Button variant="outline" size="sm" onClick={openPanel}>
								View All Bookmarks
							</Button>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{bookmarks.slice(0, 6).map((bookmark) => {
								const isVideo = bookmark.file_name?.toLowerCase().includes('.mp4') || 
												bookmark.file_name?.toLowerCase().includes('.webm') ||
												bookmark.file_name?.toLowerCase().includes('.mov')

								return (
									<Card 
										key={bookmark.id} 
										className="hover:shadow-lg transition-shadow group cursor-pointer"
										onClick={() => bookmark.file_url && window.open(bookmark.file_url, '_blank')}
									>
										<CardContent className="p-4">
											<div className="flex items-center gap-3 mb-2">
												{isVideo ? (
													<Play className="text-teal-400 flex-shrink-0" size={18} />
												) : (
													<FileText className="text-blue-600 flex-shrink-0" size={18} />
												)}
												<h3 className="font-medium text-gray-900 text-sm truncate group-hover:text-cyan-600 transition-colors">
													{bookmark.file_name || 'Untitled Resource'}
												</h3>
											</div>
											<div className="flex items-center justify-between">
												<p className="text-xs text-gray-500">
													Saved {new Date(bookmark.created_at).toLocaleDateString()}
												</p>
												<div className="flex items-center gap-1">
													<BookmarkCheck className="text-blue-600" size={14} />
												</div>
											</div>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</div>
				)}

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
								<Button className="bg-white text-blue-600 hover:bg-gradient-to-br from-teal-500 via-cyan-400 to-blue-300 text-white">
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
		</div>
	)
}