import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible'
import { Button } from '../components/ui/button'
import { Download, FileText, BookOpen, ChevronDown, ChevronRight } from 'lucide-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BookmarkButton } from '../components/bookmark-button'
import { supabase, Program, StorageFile, TrainingResourcesView } from '../lib/supabase'
import { cn } from '../lib/utils'

// Use generated types with id alias for compatibility
type ProgramData = Program
type TrainingResource = TrainingResourcesView & {
	id: string
	title: string
	description: string
	tags: string[] | null
	created_at: string
}

const tabs = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'training', label: 'Training' },
	{ id: 'protocols', label: 'Protocols' },
	{ id: 'forms', label: 'Forms' },
	{ id: 'additional-resources', label: 'Additional Resources' },
]

export function ClinicalProgramPage() {
	const { slug } = useParams<{ slug: string }>()
	const [program, setProgram] = useState<ProgramData | null>(null)
	const [trainingResources, setTrainingResources] = useState<TrainingResource[]>([])
	const [currentVideo, setCurrentVideo] = useState<TrainingResource | null>(null)
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const [protocols, setProtocols] = useState<StorageFile[]>([])
	const [forms, setForms] = useState<StorageFile[]>([])
	const [additionalResources, setAdditionalResources] = useState<StorageFile[]>([])
	const [loading, setLoading] = useState(true)
	const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())
	const [openSubcategories, setOpenSubcategories] = useState<Set<string>>(new Set())

	useEffect(() => {
		if (slug) {
			fetchProgramData()
		}
	}, [slug])

	useEffect(() => {
		if (currentVideo && videoRef.current) {
			videoRef.current.load()
		}
	}, [currentVideo])

	const fetchProgramData = async () => {
		try {
			setLoading(true)

			// Fetch program info
			const { data: programData, error: programError } = await supabase
				.from('programs')
				.select('*')
				.eq('slug', slug)

			if (programError) throw programError

			// Check if program exists
			if (!programData || programData.length === 0) {
				setProgram(null)
				setLoading(false)
				return
			}

			const program = programData[0]
			setProgram(program)

			// Fetch training resources from training_resources_view
			const { data: trainingData, error: trainingError } = await supabase
				.from('training_resources_view')
				.select('*')
				.eq('program_name', program.name)
				.order('sort_order', { ascending: true })

			if (trainingError) throw trainingError
			// Map training data to include compatibility fields
			const mappedTrainingData = (trainingData || []).map(item => ({
				...item,
				id: item.file_id || '',
				title: item.training_module_name || item.file_name || '',
				description: '', // Not available in view
				tags: null, // Not available in view
				created_at: new Date().toISOString() // Default timestamp
			})).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
			setTrainingResources(mappedTrainingData)
			
			// Set the first video as the current video
			if (mappedTrainingData.length > 0) {
				setCurrentVideo(mappedTrainingData[0])
			}

			// Fetch protocols from storage_files_catalog
			const { data: protocolsData, error: protocolsError } = await supabase
				.from('storage_files_catalog')
				.select('*')
				.eq('program_name', program.name)
				.eq('resource_type', 'protocol_manual')
				.order('file_name', { ascending: true })

			if (protocolsError) throw protocolsError
			setProtocols((protocolsData || []).sort((a, b) => a.file_name.localeCompare(b.file_name)))

			// Fetch forms from storage_files_catalog
			const { data: formsData, error: formsError } = await supabase
				.from('storage_files_catalog')
				.select('*')
				.eq('program_name', program.name)
				.eq('resource_type', 'documentation_form')
				.order('file_name', { ascending: true })

			if (formsError) throw formsError
			setForms((formsData || []).sort((a, b) => a.file_name.localeCompare(b.file_name)))

			// Fetch additional resources from storage_files_catalog
			const { data: additionalData, error: additionalError } = await supabase
				.from('storage_files_catalog')
				.select('*')
				.eq('program_name', program.name)
				.eq('resource_type', 'additional_resource')
				.order('file_name', { ascending: true })

			if (additionalError) throw additionalError
			setAdditionalResources((additionalData || []).sort((a, b) => a.file_name.localeCompare(b.file_name)))

		} catch (error) {
			console.error('Error fetching program data:', error)
		} finally {
			setLoading(false)
		}
	}

	const toggleCategory = (category: string) => {
		const newOpenCategories = new Set(openCategories)
		if (newOpenCategories.has(category)) {
			newOpenCategories.delete(category)
		} else {
			newOpenCategories.add(category)
		}
		setOpenCategories(newOpenCategories)
	}

	const toggleSubcategory = (subcategory: string) => {
		const newOpenSubcategories = new Set(openSubcategories)
		if (newOpenSubcategories.has(subcategory)) {
			newOpenSubcategories.delete(subcategory)
		} else {
			newOpenSubcategories.add(subcategory)
		}
		setOpenSubcategories(newOpenSubcategories)
	}

	const handleVideoSelect = (video: TrainingResource) => {
		setCurrentVideo(video)
	}

	const handlePrevious = () => {
		if (!currentVideo || trainingResources.length === 0) return
		
		const currentIndex = trainingResources.findIndex(video => video.id === currentVideo.id)
		if (currentIndex > 0) {
			const prevVideo = trainingResources[currentIndex - 1]
			setCurrentVideo(prevVideo)
		}
	}

	const handleNext = () => {
		if (!currentVideo || trainingResources.length === 0) return
		
		const currentIndex = trainingResources.findIndex(video => video.id === currentVideo.id)
		if (currentIndex !== -1 && currentIndex < trainingResources.length - 1) {
			const nextVideo = trainingResources[currentIndex + 1]
			setCurrentVideo(nextVideo)
		}
	}

	const handleVideoEnd = () => {
		// Auto-advance to next video when current video ends
		if (!currentVideo || trainingResources.length === 0) return
		
		const currentIndex = trainingResources.findIndex(video => video.id === currentVideo.id)
		if (currentIndex !== -1 && currentIndex < trainingResources.length - 1) {
			handleNext()
		}
	}

	const getCurrentVideoIndex = () => {
		if (!currentVideo || trainingResources.length === 0) return -1
		return trainingResources.findIndex(video => video.id === currentVideo.id)
	}


	const formatCategoryName = (category: string) => {
		return category
			.replace(/_/g, ' ')
			.replace(/\b\w/g, l => l.toUpperCase())
	}
	const groupFormsByCategory = (forms: StorageFile[]) => {
		const grouped: { [category: string]: { [subcategory: string]: StorageFile[] } } = {}
		
		forms.forEach(form => {
			const category = form.form_category || 'Uncategorized'
			const subcategory = form.form_subcategory || 'General'
			
			if (!grouped[category]) {
				grouped[category] = {}
			}
			if (!grouped[category][subcategory]) {
				grouped[category][subcategory] = []
			}
			grouped[category][subcategory].push(form)
		})
		
		// Sort forms within each subcategory
		Object.keys(grouped).forEach(category => {
			Object.keys(grouped[category]).forEach(subcategory => {
				grouped[category][subcategory].sort((a, b) => a.file_name.localeCompare(b.file_name))
			})
		})
		
		return grouped
	}

	const renderFormsWithAccordion = (forms: StorageFile[]) => {
		const groupedForms = groupFormsByCategory(forms)
		const sortedCategories = Object.keys(groupedForms).sort()
		
		return (
			<div className="space-y-4">
				{sortedCategories.map(category => {
					const subcategories = groupedForms[category]
					const sortedSubcategories = Object.keys(subcategories).sort()
					const categoryKey = `category-${category}`
					const isCategoryOpen = openCategories.has(categoryKey)
					
					return (
						<Card key={category} className="border-l-4 border-l-blue-500">
							<Collapsible open={isCategoryOpen} onOpenChange={() => toggleCategory(categoryKey)}>
								<CollapsibleTrigger className="w-full">
									<CardHeader className="py-3 hover:bg-gray-50 transition-colors">
										<div className="flex items-center justify-between">
											<CardTitle className="text-lg font-semibold text-left">
												{formatCategoryName(category)}
											</CardTitle>
											{isCategoryOpen ? 
												<ChevronDown className="h-5 w-5 text-gray-500" /> : 
												<ChevronRight className="h-5 w-5 text-gray-500" />
											}
										</div>
									</CardHeader>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<CardContent className="pt-0">
										<div className="space-y-3">
											{sortedSubcategories.map(subcategory => {
												const subcategoryForms = subcategories[subcategory]
												const subcategoryKey = `subcategory-${category}-${subcategory}`
												const isSubcategoryOpen = openSubcategories.has(subcategoryKey)
												
												// If there's only one subcategory and it's "General", don't show subcategory accordion
												if (sortedSubcategories.length === 1 && subcategory === 'General') {
													return (
														<div key={subcategory} className="space-y-2">
															{subcategoryForms.map(form => (
																<div key={form.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
																	<div className="flex items-center gap-3">
																		<FileText className="text-blue-600 flex-shrink-0" size={20} />
																		<span className="font-medium text-gray-900 text-sm">
																			{form.file_name}
																		</span>
																	</div>
																	<div className="flex items-center gap-2">
																		<BookmarkButton fileId={form.file_id} size="sm" />
																		<Button size="sm" className="flex-shrink-0">
																			<Download className="mr-2" size={16} />
																			Download
																		</Button>
																	</div>
																</div>
															))}
														</div>
													)
												}
												
												return (
													<Card key={subcategory} className="border-l-2 border-l-cyan-400 ml-4">
														<Collapsible open={isSubcategoryOpen} onOpenChange={() => toggleSubcategory(subcategoryKey)}>
															<CollapsibleTrigger className="w-full">
																<CardHeader className="py-3 hover:bg-gray-50 transition-colors">
																	<div className="flex items-center justify-between">
																		<CardTitle className="text-base font-medium text-left">
																			{subcategory}
																		</CardTitle>
																		{isSubcategoryOpen ? 
																			<ChevronDown className="h-4 w-4 text-gray-500" /> : 
																			<ChevronRight className="h-4 w-4 text-gray-500" />
																		}
																	</div>
																</CardHeader>
															</CollapsibleTrigger>
															<CollapsibleContent>
																<CardContent className="pt-0">
																	<div className="space-y-2">
																		{subcategoryForms.map(form => (
																			<div key={form.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
																				<div className="flex items-center gap-3">
																					<FileText className="text-blue-600 flex-shrink-0" size={20} />
																					<span className="font-medium text-gray-900 text-sm">
																						{form.file_name}
																					</span>
																				</div>
																				<div className="flex items-center gap-2">
																					<BookmarkButton fileId={form.file_id} size="sm" />
																					<Button size="sm" className="flex-shrink-0">
																						<Download className="mr-2" size={16} />
																						Download
																					</Button>
																				</div>
																			</div>
																		))}
																	</div>
																</CardContent>
															</CollapsibleContent>
														</Collapsible>
													</Card>
												)
											})}
										</div>
									</CardContent>
								</CollapsibleContent>
							</Collapsible>
						</Card>
					)
				})}
			</div>
		)
	}

	const renderResourceCard = (resource: StorageFile | TrainingResource, isRowLayout = false) => (
		<Card key={resource.id} className="hover:shadow-lg transition-shadow group">
			{isRowLayout ? (
				<div className="p-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<FileText className="text-blue-600 flex-shrink-0" size={20} />
						<h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
							{'title' in resource ? resource.title : resource.file_name}
						</h3>
					</div>
					<div className="flex items-center gap-2">
						<BookmarkButton fileId={'file_id' in resource ? resource.file_id || resource.id : resource.id} size="sm" />
						<Button 
							size="sm" 
							onClick={() => window.open(resource.file_url, '_blank')}
							className="flex-shrink-0"
						>
							<Download className="mr-2" size={16} />
							Download
						</Button>
					</div>
				</div>
			) : (
				<>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="text-blue-600 flex-shrink-0" size={20} />
								<h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
									{'title' in resource ? resource.title : resource.file_name}
								</h3>
							</div>
							<BookmarkButton fileId={'file_id' in resource ? resource.file_id || resource.id : resource.id} />
						</div>
					</CardHeader>
					<CardContent>
						<Button 
							className="w-full" 
							size="sm"
							onClick={() => window.open(resource.file_url, '_blank')}
						>
							<Download className="mr-2" size={16} />
							Download
						</Button>
					</CardContent>
				</>
			)}
		</Card>
	)

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	if (!program) {
		return (
			<div className="p-6">
				<div className="max-w-7xl mx-auto text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
					<p className="text-gray-600">The requested clinical program could not be found.</p>
				</div>
			</div>
		)
	}

	return (
		<div>
			{/* Hero Section */}
			<section className={`bg-gradient-to-br ${program.hero_gradient || 'from-blue-600 via-cyan-400 to-teal-300'} py-16`}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="backdrop-blur-sm bg-white/20 rounded-2xl p-12 border border-white/30 text-left">
						<h1 className="text-4xl font-bold text-white mb-4">
							{program.name}
						</h1>
						<p className="text-xl text-white max-w-3xl text-left">
							{program.description}
						</p>
					</div>
				</div>
			</section>

			{/* Content Tabs */}
			<section className="py-12">
				<div className="max-w-7xl mx-auto px-6">
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="grid w-full grid-cols-5 mb-8">
							{tabs.map((tab) => (
								<TabsTrigger key={tab.id} value={tab.id}>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>

						{tabs.map((tab) => (
							<TabsContent key={tab.id} value={tab.id}>
								{tab.id === 'overview' && (
									<Card>
										<CardHeader>
											<CardTitle>Program Overview</CardTitle>
											<CardDescription>
												About {program.name}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="prose max-w-none">
												<p className="text-gray-600 text-lg">
													{program.description}
												</p>
											</div>
										</CardContent>
									</Card>
								)}

								{tab.id === 'training' && (
									<div>
										{trainingResources.length > 0 ? (
											<div className="grid lg:grid-cols-5 gap-8">
												{/* Video Player Section */}
												<div className="lg:col-span-4">
													<Card>
														<CardHeader>
															<CardTitle className="text-xl">
																{currentVideo?.training_module_name || currentVideo?.title || 'Select a video'}
															</CardTitle>
														</CardHeader>
														<CardContent>
															{currentVideo ? (
																<div className="aspect-video bg-black rounded-lg overflow-hidden">
																	<video
																		ref={videoRef}
																		key={currentVideo.id}
																		className="w-full h-full"
																		controls
																		preload="metadata"
																		onEnded={handleVideoEnd}
																	>
																		<source src={currentVideo.file_url} type="video/mp4" />
																		<source src={currentVideo.file_url} type="video/webm" />
																		<source src={currentVideo.file_url} type="video/ogg" />
																		Your browser does not support the video tag.
																	</video>
																</div>
															) : (
																<div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
																	<div className="text-center">
																		<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
																		<p className="text-gray-500">Select a video from the playlist to start watching</p>
																	</div>
																</div>
															)}
															{currentVideo?.description && (
																<div className="mt-6">
																	<h4 className="font-semibold text-gray-900 mb-2">Description</h4>
																	<p className="text-gray-600">{currentVideo.description}</p>
																</div>
															)}
															
															{/* Navigation Buttons */}
															<div className="mt-6 flex items-center justify-center gap-4">
																{(() => {
																	const currentIndex = getCurrentVideoIndex()
																	const isFirstVideo = currentIndex === 0
																	const isLastVideo = currentIndex === trainingResources.length - 1
																	
																	return (
																		<>
																			<Button
																				variant="outline"
																				onClick={handlePrevious}
																				disabled={isFirstVideo || trainingResources.length === 0}
																				className="flex items-center gap-2"
																			>
																				<ArrowLeft size={16} />
																				Previous
																			</Button>
																			<span className="text-sm text-gray-500">
																				{currentIndex + 1} of {trainingResources.length}
																			</span>
																			<Button
																				variant="outline"
																				onClick={handleNext}
																				disabled={isLastVideo || trainingResources.length === 0}
																				className="flex items-center gap-2"
																			>
																				Next
																				<ArrowRight size={16} />
																			</Button>
																		</>
																	)
																})()}
															</div>
														</CardContent>
													</Card>
												</div>

												{/* Playlist Section */}
												<div className="lg:col-span-1">
													<Card className="h-fit">
														<CardHeader>
															<CardTitle className="flex items-center gap-2">
																<BookOpen size={20} />
																Training Playlist
															</CardTitle>
															<CardDescription>
																{trainingResources.length} video{trainingResources.length !== 1 ? 's' : ''}
															</CardDescription>
														</CardHeader>
														<CardContent className="p-0">
															<div>
																{trainingResources.map((resource, index) => (
																	<div
																		key={resource.id}
																		className={cn(
																			'flex items-start gap-3 p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0',
																			currentVideo?.id === resource.id
																				? 'bg-blue-50 border-l-4 border-l-blue-600'
																				: 'hover:bg-gray-50'
																		)}
																		onClick={() => handleVideoSelect(resource)}
																	>
																		<div className="flex-1 min-w-0">
																			<h4 className={cn(
																				'text-sm font-medium leading-snug',
																				currentVideo?.id === resource.id
																					? 'text-blue-900'
																					: 'text-gray-900'
																			)}>
																				{resource.training_module_name || resource.title}
																			</h4>
																			{resource.length && (
																				<p className={cn(
																					'text-xs mt-1 leading-tight',
																					currentVideo?.id === resource.id
																						? 'text-blue-600'
																						: 'text-gray-500'
																				)}>
																					{resource.length}
																				</p>
																			)}
																		</div>
																		{currentVideo?.id === resource.id && (
																			<div className="flex-shrink-0">
																				<div className="w-2 h-2 bg-blue-600 rounded-full"></div>
																			</div>
																		)}
																	</div>
																))}
															</div>
														</CardContent>
													</Card>
												</div>
											</div>
										) : (
											<Card>
												<CardContent className="text-center py-12">
													<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
													<p className="text-gray-500">
														Training resources for this program will be available soon.
													</p>
												</CardContent>
											</Card>
										)}
									</div>
								)}

								{tab.id === 'protocols' && (
									<div>
										{protocols.length > 0 ? (
											<div className="space-y-4">
												{protocols.map((resource) => 
													renderResourceCard(resource, true)
												)}
											</div>
										) : (
											<Card>
												<CardContent className="text-center py-12">
													<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
													<p className="text-gray-500">
														Protocol manuals for this program will be available soon.
													</p>
												</CardContent>
											</Card>
										)}
									</div>
								)}

								{tab.id === 'forms' && (
									<div>
										{forms.length > 0 ? (
											// Check if this is MTM The Future Today or Test and Treat for accordion layout
											program.slug === 'mtmthefuturetoday' || program.slug === 'testandtreat' ? (
												renderFormsWithAccordion(forms)
											) : (
												<div className="space-y-4">
													{forms.map((resource) => 
														renderResourceCard(resource, true)
													)}
												</div>
											)
										) : (
											<Card>
												<CardContent className="text-center py-12">
													<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
													<p className="text-gray-500">
														Documentation forms for this program will be available soon.
													</p>
												</CardContent>
											</Card>
										)}
									</div>
								)}
								{tab.id === 'additional-resources' && (
									<div>
										{additionalResources.length > 0 ? (
											<div className="space-y-4">
												{additionalResources.map((resource) => 
													renderResourceCard(resource, true)
												)}
											</div>
										) : (
											<Card>
												<CardContent className="text-center py-12">
													<BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
													<p className="text-gray-500">
														Additional resources for this program will be available soon.
													</p>
												</CardContent>
											</Card>
										)}
									</div>
								)}
							</TabsContent>
						))}
					</Tabs>
				</div>
			</section>
		</div>
	)
}