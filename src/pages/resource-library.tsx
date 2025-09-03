import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, FileText, Download, Users, BookOpen, CreditCard, ClipboardList, Play, Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase, StorageFile } from '../lib/supabase'
import { BookmarkButton } from '../components/bookmark-button'
import { VideoModal } from '../components/video-modal'

// Use StorageFile from the generated types, but add an id alias for file_id
type ResourceFile = Omit<StorageFile, 'file_id'> & {
	id: string
}

const quickFilterCards = [
	{
		id: 'patient_handout',
		title: 'Patient Handouts',
		icon: Users,
		filter: { resource_type: 'patient_handout' },
		color: 'bg-gradient-to-br from-blue-200 to-blue-400 text-blue-600'
	},
	{
		id: 'clinical_guideline',
		title: 'Clinical Guidelines',
		icon: BookOpen,
		filter: { resource_type: 'clinical_guideline' },
		color: 'bg-gradient-to-br from-cyan-100 to-cyan-400 text-cyan-600'
	},
	{
		id: 'medical_billing',
		title: 'Medical Billing',
		icon: CreditCard,
		filter: { resource_type: 'medical_billing' },
		color: 'bg-gradient-to-br from-teal-100 to-teal-400 text-teal-600'
	},
	{
		id: 'documentation_form',
		title: 'Documentation Forms',
		icon: ClipboardList,
		filter: { resource_type: 'documentation_form' },
		color: 'bg-gradient-to-br from-green-100 to-green-400 text-green-600'
	},
	{
		id: 'videos',
		title: 'Videos',
		icon: Play,
		filter: { mime_type: 'video/mp4' },
		color: 'bg-gradient-to-br from-emerald-100 to-emerald-400 text-emerald-600'
	},
	{
		id: 'all',
		title: 'All Resources',
		icon: Grid3X3,
		filter: {},
		color: 'bg-gradient-to-br from-blue-600 via-cyan-400 to-teal-300 text-white'
	}
]

const filterGroups = [
	{
		title: 'Clinical Programs',
		field: 'program_name',
		options: [
			'MTM The Future Today',
			'TimeMyMeds',
			'Test and Treat',
			'HbA1c Testing',
			'Oral Contraceptives'
		]
	},
	{
		title: 'Medical Conditions',
		field: 'medical_condition',
		options: [
			'Beers List',
			'Hypertension',
			'Cholesterol',
			'Diabetes',
			'Heart Failure',
			'Gastrointestinal',
			'Genitourinary',
			'Hematological',
			'Infectious Disease',
			'Musculoskeletal',
			'Neurological',
			'Psychiatric',
			'Reproductive',
			'Respiratory',
			'Pain',
			'Other'
		]
	},
	{
		title: 'Content Format',
		field: 'mime_type',
		options: [
			{ label: 'Video', value: 'video/mp4' },
			{ label: 'Document', value: 'application/pdf' }
		]
	},
	{
		title: 'Form Category',
		field: 'form_category',
		options: [
			{ label: 'Patient Intake', value: 'intake' },
			{ label: 'Consent', value: 'consent' },
			{ label: 'Assessment', value: 'assessment' },
			{ label: 'Care Note', value: 'care_plan' },
			{ label: 'Referral', value: 'referral' },
			{ label: 'Billing', value: 'billing' },
			{ label: 'Prescriber Communication', value: 'prescriber_communication' },
			{ label: 'Outcomes TIP', value: 'outcomes_tips' },
			{ label: 'Medical Condition Flowsheet', value: 'medical_conditions_flowsheets' },
			{ label: 'Tracking', value: 'tracking' }
		]
	}
]

export function ResourceLibraryPage() {
	const [searchParams] = useSearchParams()
	const [resources, setResources] = useState<ResourceFile[]>([])
	const [filteredResources, setFilteredResources] = useState<ResourceFile[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(15)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedQuickFilter, setSelectedQuickFilter] = useState('')
	const [checkboxFilters, setCheckboxFilters] = useState<{[key: string]: string[]}>({
		program_name: [],
		medical_condition: [],
		mime_type: [],
		form_category: []
	})
	const [loading, setLoading] = useState(true)
	const [videoModal, setVideoModal] = useState<{
		isOpen: boolean
		videoUrl: string | null
		videoTitle: string
	}>({
		isOpen: false,
		videoUrl: null,
		videoTitle: ''
	})

	useEffect(() => {
		fetchResources()
	}, [])

	useEffect(() => {
		// Set initial filter from URL parameter
		const filterParam = searchParams.get('filter')
		if (filterParam) {
			setSelectedQuickFilter(filterParam)
		}
	}, [searchParams])

	useEffect(() => {
		filterResources()
		setCurrentPage(1) // Reset to first page when filters change
	}, [resources, searchTerm, selectedQuickFilter, checkboxFilters])

	const fetchResources = async () => {
		try {
			const { data, error } = await supabase
				.from('storage_files_catalog')
				.select('*')
				.order('file_name', { ascending: true })

			if (error) throw error
			// Map file_id to id for compatibility with existing component logic
			const resourcesWithId = (data || []).map(item => ({
				...item,
				id: item.file_id
			}))
			setResources(resourcesWithId)
		} catch (error) {
			console.error('Error fetching resources:', error)
		} finally {
			setLoading(false)
		}
	}

const filterResources = () => {
    let filtered = resources

    // Apply search term filter
    if (searchTerm) {
        filtered = filtered.filter(resource =>
            (resource.file_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (resource.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(resource.tags) ? resource.tags : []).some(tag =>
                (tag || '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }

		// Apply quick filter
		if (selectedQuickFilter) {
			const quickFilter = quickFilterCards.find(card => card.id === selectedQuickFilter)
			if (quickFilter && Object.keys(quickFilter.filter).length > 0) {
				const filterKey = Object.keys(quickFilter.filter)[0] as keyof ResourceFile
				const filterValue = quickFilter.filter[filterKey as keyof typeof quickFilter.filter]
				filtered = filtered.filter(resource => resource[filterKey] === filterValue)
			}
		}

		// Apply checkbox filters
		Object.entries(checkboxFilters).forEach(([field, selectedValues]) => {
			if (selectedValues.length > 0) {
				filtered = filtered.filter(resource => {
					const resourceValue = resource[field as keyof ResourceFile]
					return selectedValues.includes(resourceValue as string)
				})
			}
		})

		setFilteredResources(filtered)
	}

	const handleQuickFilterClick = (filterId: string) => {
		setSelectedQuickFilter(filterId === selectedQuickFilter ? '' : filterId)
	}

	const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
		setCheckboxFilters(prev => ({
			...prev,
			[field]: checked
				? [...prev[field], value]
				: prev[field].filter(v => v !== value)
		}))
	}

	const clearAllFilters = () => {
		setSelectedQuickFilter('')
		setCheckboxFilters({
			program_name: [],
			medical_condition: [],
			mime_type: [],
			form_category: []
		})
		setSearchTerm('')
	}

	const handleVideoPlay = (resource: ResourceFile) => {
		setVideoModal({
			isOpen: true,
			videoUrl: resource.file_url,
			videoTitle: resource.file_name
		})
	}

	const handleVideoModalClose = () => {
		setVideoModal({
			isOpen: false,
			videoUrl: null,
			videoTitle: ''
		})
	}

	const totalItems = filteredResources.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentItems = filteredResources.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
	}

	const getVisiblePages = () => {
		const pages = []
		const maxVisiblePages = 5
		
		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1)
				pages.push('...')
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push('...')
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(totalPages)
			}
		}
		
		return pages
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Resource Library
					</h1>
					<p className="text-gray-600">
						Access protocols, guidelines, forms, and educational materials.
					</p>
				</div>

				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative max-w-2xl">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
						<Input
							placeholder="Search resources..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 h-12 text-lg"
						/>
					</div>
				</div>

				{/* Quick Filter Cards */}
				<div className="mb-8">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{quickFilterCards.map((card) => {
							const IconComponent = card.icon
							const isSelected = selectedQuickFilter === card.id
							return (
								<Card
									key={card.id}
									className={`cursor-pointer transition-all hover:shadow-lg ${
										isSelected ? 'ring-2 ring-teal-300 shadow-lg' : ''
									}`}
									onClick={() => handleQuickFilterClick(card.id)}
								>
									<CardContent className="p-6 text-center">
										<div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mx-auto mb-3`}>
											<IconComponent size={24} />
										</div>
										<h3 className="font-medium text-gray-900 text-sm leading-tight">
											{card.title}
										</h3>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>

				{/* Filters and Results Layout */}
				<div className="grid lg:grid-cols-4 gap-8">
					{/* Left Sidebar - Filters */}
					<div className="lg:col-span-1">
						<Card>
							<div className="p-4 border-b">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-gray-900">Filters</h3>
									<Button
										variant="ghost"
										size="sm"
										onClick={clearAllFilters}
										className="text-blue-600 hover:text-blue-700"
									>
										Clear All
									</Button>
								</div>
							</div>
							<div className="p-4 space-y-6">
								{filterGroups.map((group) => (
									<div key={group.title}>
										<h4 className="font-medium text-gray-900 mb-3">{group.title}</h4>
										<div className="space-y-2">
											{group.options.map((option) => {
												const optionValue = typeof option === 'string' ? option : option.value
												const optionLabel = typeof option === 'string' ? option : option.label
												const isChecked = checkboxFilters[group.field].includes(optionValue)
												
												return (
													<label key={optionValue} className="flex items-center gap-2 cursor-pointer">
														<input
															type="checkbox"
															checked={isChecked}
															onChange={(e) => handleCheckboxChange(group.field, optionValue, e.target.checked)}
															className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
														/>
														<span className="text-sm text-gray-700">{optionLabel}</span>
													</label>
												)
											})}
										</div>
									</div>
								))}
							</div>
						</Card>
					</div>

					{/* Right Content - Results */}
					<div className="lg:col-span-3" id="results-section">
						<div className="mb-4 flex items-center justify-between">
							<p className="text-gray-600">
								{totalItems} resource{totalItems !== 1 ? 's' : ''} found
								{totalPages > 1 && (
									<span className="text-gray-400">
										{' '}• Page {currentPage} of {totalPages}
									</span>
								)}
							</p>
						</div>

						{/* Resources Grid */}
						<div className="space-y-2">
							{currentItems.length > 0 ? currentItems.map((resource) => (
								<Card key={resource.id} className="hover:shadow-md transition-shadow group">
									<div className="p-3 flex items-center justify-between">
										<div className="flex items-center gap-3 flex-1 min-w-0">
											<div className="flex-shrink-0">
												{resource.mime_type === 'video/mp4' ? (
													<Play className="text-teal-400" size={20} />
												) : (
													<FileText className="text-blue-600" size={20} />
												)}
											</div>
											<div className="min-w-0 flex-1 truncate">
												<h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm truncate">
													{resource.file_name}
												</h3>
											</div>
										</div>
										<div className="flex items-center gap-2 ml-4">
											{resource.file_id && <BookmarkButton fileId={resource.file_id} size="sm" />}
											{resource.mime_type === 'video/mp4' ? (
												<Button 
													size="sm" 
													className="flex-shrink-0"
													onClick={() => handleVideoPlay(resource)}
												>
													<Play className="mr-2" size={16} />
													Play
												</Button>
											) : (
												<Button 
													size="sm" 
													className="flex-shrink-0"
													onClick={() => window.open(resource.file_url, '_blank')}
												>
													<Download className="mr-2" size={16} />
													Download
												</Button>
											)}
										</div>
									</div>
								</Card>
							)) : filteredResources.length === 0 ? (
								<div className="col-span-full text-center py-12">
									<FileText className="mx-auto text-gray-400 mb-4" size={48} />
									<p className="text-gray-500">
										No resources found matching your criteria.
									</p>
								</div>
							) : null}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-8 flex items-center justify-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									className="flex items-center gap-1"
								>
									<ChevronLeft size={16} />
									Previous
								</Button>

								<div className="flex gap-1">
									{getVisiblePages().map((page, index) => (
										<React.Fragment key={index}>
											{page === '...' ? (
												<span className="px-3 py-1 text-gray-500">...</span>
											) : (
												<Button
													variant={currentPage === page ? "default" : "outline"}
													size="sm"
													onClick={() => handlePageChange(page as number)}
													className="min-w-[2.5rem]"
												>
													{page}
												</Button>
											)}
										</React.Fragment>
									))}
								</div>

								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="flex items-center gap-1"
								>
									Next
									<ChevronRight size={16} />
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Video Modal */}
				<VideoModal
					isOpen={videoModal.isOpen}
					onClose={handleVideoModalClose}
					videoUrl={videoModal.videoUrl}
					videoTitle={videoModal.videoTitle}
				/>
			</div>
		</div>
	)
}
