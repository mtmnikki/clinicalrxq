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
																	<Button 
																		size="sm" 
																		className="flex-shrink-0"
																		onClick={() => window.open(form.file_url, '_blank')}
																	>
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
																				<Button 
																					size="sm" 
																					className="flex-shrink-0"
																					onClick={() => window.open(form.file_url, '_blank')}
																				>
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
