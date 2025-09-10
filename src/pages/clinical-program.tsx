// ...existing imports and code...

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

// ...rest of the file unchanged...
