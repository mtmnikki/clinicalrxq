/**
 * Resources page component for ClinicalRxQ
 * Provides access to training materials, templates, and documentation
 */
import { FileText, Download, Search, Filter, BookOpen, Video, FileSpreadsheet, Users } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Resources() {
  const resourceCategories = [
    {
      id: 'templates',
      title: 'Templates & Forms',
      icon: <FileText className="h-5 w-5" />,
      count: 45
    },
    {
      id: 'guides',
      title: 'Implementation Guides',
      icon: <BookOpen className="h-5 w-5" />,
      count: 28
    },
    {
      id: 'videos',
      title: 'Video Tutorials',
      icon: <Video className="h-5 w-5" />,
      count: 67
    },
    {
      id: 'tools',
      title: 'Calculation Tools',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      count: 15
    }
  ];

  const featuredResources = [
    {
      title: "MTM Documentation Template",
      description: "Comprehensive template for documenting medication therapy management sessions",
      type: "Template",
      category: "MTM",
      downloadCount: 2847,
      rating: 4.9,
      format: "PDF"
    },
    {
      title: "Point-of-Care Testing Implementation Guide",
      description: "Step-by-step guide to implementing POCT services in community pharmacy",
      type: "Guide",
      category: "POCT",
      downloadCount: 1923,
      rating: 4.8,
      format: "PDF"
    },
    {
      title: "Immunization Workflow Video Series",
      description: "Complete video series covering immunization service implementation",
      type: "Video",
      category: "Immunizations",
      downloadCount: 3456,
      rating: 4.9,
      format: "MP4"
    },
    {
      title: "Clinical Service ROI Calculator",
      description: "Excel tool to calculate return on investment for clinical pharmacy services",
      type: "Tool",
      category: "Business",
      downloadCount: 1654,
      rating: 4.7,
      format: "XLSX"
    },
    {
      title: "Patient Consultation Checklist",
      description: "Standardized checklist for conducting effective patient consultations",
      type: "Template",
      category: "Patient Care",
      downloadCount: 2134,
      rating: 4.8,
      format: "PDF"
    },
    {
      title: "Chronic Care Management Protocol",
      description: "Evidence-based protocols for managing chronic conditions",
      type: "Guide",
      category: "Chronic Care",
      downloadCount: 1789,
      rating: 4.6,
      format: "PDF"
    }
  ];

  const quickLinks = [
    {
      title: "Getting Started Checklist",
      description: "Essential steps for implementing clinical services",
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Billing & Coding Reference",
      description: "Complete guide to clinical service billing",
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    {
      title: "Patient Communication Scripts",
      description: "Proven scripts for patient interactions",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Regulatory Compliance Guide",
      description: "Stay compliant with state and federal regulations",
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Resource Library
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access our comprehensive collection of templates, guides, tools, and resources to successfully implement clinical pharmacy services.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                className="pl-10 pr-4 py-3 text-lg"
                placeholder="Search resources, templates, guides..."
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourceCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.count} resources available</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Resources
              </h2>
              <p className="text-lg text-gray-600">
                Most popular and recently updated resources from our library
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  {featuredResources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <Badge variant="outline">{resource.format}</Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>Category: {resource.category}</span>
                          <div className="flex items-center gap-4">
                            <span>★ {resource.rating}</span>
                            <span>{resource.downloadCount.toLocaleString()} downloads</span>
                          </div>
                        </div>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Quick Access
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mx-auto mb-3">
                      {link.icon}
                    </div>
                    <CardTitle className="text-base">{link.title}</CardTitle>
                    <CardDescription className="text-sm">{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Finding the Right Resources?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Our experts can help you identify the best resources for your specific needs and implementation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}