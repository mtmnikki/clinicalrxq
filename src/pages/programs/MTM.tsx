/**
 * Medication Therapy Management (MTM) Certification page
 * Comprehensive MTM training program with member resources
 */
import { FileText, Download, Clock, Users, CheckCircle, Lock, Video, BookOpen, DollarSign } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MTM() {
  const programOverview = {
    title: "Medication Therapy Management (MTM) Certification",
    duration: "16 hours",
    modules: 12,
    ceu: "1.6 CEU",
    enrolled: 1247,
    rating: 4.8
  };

  const keyComponents = [
    "Comprehensive medication reviews",
    "Identification and resolution of medication-related problems",
    "Patient education and adherence strategies",
    "Effective documentation and billing practices"
  ];

  const benefits = [
    "Improves patient clinical outcomes and reduces healthcare costs",
    "Generates additional revenue streams through billable MTM services",
    "Strengthens pharmacy reputation as a trusted healthcare provider"
  ];

  const resources = [
    {
      category: "Assessment Tools",
      files: [
        { name: "Comprehensive Medication Review Template", type: "PDF", size: "3.2 MB", downloads: 2456 },
        { name: "Drug-Related Problem Identification Tool", type: "PDF", size: "2.1 MB", downloads: 2189 },
        { name: "Adherence Assessment Questionnaire", type: "PDF", size: "1.8 MB", downloads: 1967 }
      ]
    },
    {
      category: "Clinical Protocols",
      files: [
        { name: "MTM Service Delivery Protocol", type: "PDF", size: "4.8 MB", downloads: 2678 },
        { name: "Problem Intervention Algorithms", type: "PDF", size: "3.5 MB", downloads: 2234 },
        { name: "Follow-up Scheduling Guidelines", type: "PDF", size: "2.2 MB", downloads: 1845 }
      ]
    },
    {
      category: "Billing & Documentation",
      files: [
        { name: "MTM Billing Quick Reference", type: "PDF", size: "2.7 MB", downloads: 3156 },
        { name: "Documentation Templates Package", type: "ZIP", size: "8.4 MB", downloads: 2789 },
        { name: "Insurance Coverage Guide", type: "PDF", size: "3.1 MB", downloads: 2567 }
      ]
    },
    {
      category: "Patient Education",
      files: [
        { name: "Medication Action Plan Template", type: "DOC", size: "0.8 MB", downloads: 2345 },
        { name: "Patient Education Brochures", type: "ZIP", size: "12.3 MB", downloads: 1998 },
        { name: "Adherence Improvement Strategies", type: "PDF", size: "1.9 MB", downloads: 1876 }
      ]
    }
  ];

  const modules = [
    { title: "Introduction to MTM Services", duration: "75 min", completed: false },
    { title: "Regulatory Framework and Requirements", duration: "90 min", completed: false },
    { title: "Comprehensive Medication Review Process", duration: "135 min", completed: false },
    { title: "Drug-Related Problem Identification", duration: "120 min", completed: false },
    { title: "Patient Assessment Techniques", duration: "105 min", completed: false },
    { title: "Intervention Strategies", duration: "90 min", completed: false },
    { title: "Patient Communication and Counseling", duration: "75 min", completed: false },
    { title: "Documentation Best Practices", duration: "60 min", completed: false },
    { title: "Billing and Reimbursement", duration: "90 min", completed: false },
    { title: "Quality Improvement and Outcomes", duration: "45 min", completed: false },
    { title: "Technology Integration", duration: "60 min", completed: false },
    { title: "Case Studies and Practical Application", duration: "115 min", completed: false }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Certification Program</Badge>
              <Badge variant="outline">Revenue Generating</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {programOverview.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive training to equip pharmacy teams with expertise in delivering personalized medication management, optimizing therapeutic outcomes, and improving patient adherence and safety.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{programOverview.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{programOverview.modules} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{programOverview.enrolled} enrolled</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button size="lg">Start Training</Button>
              <Button size="lg" variant="outline">Download Overview</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Highlight */}
      <section className="py-8 bg-green-50 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="font-semibold">Revenue Opportunity</span>
            </div>
            <p className="text-green-600">
              MTM services can generate <strong>$50-150 per consultation</strong> with proper implementation and billing
            </p>
          </div>
        </div>
      </section>

      {/* Program Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {keyComponents.map((component, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{component}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits to Your Pharmacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Program Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Comprehensive Reviews</h3>
                        <p className="text-sm text-gray-600">Systematic approach to medication optimization</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mx-auto mb-3">
                          <DollarSign className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Billing Expertise</h3>
                        <p className="text-sm text-gray-600">Master reimbursement and documentation requirements</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-3">
                          <Users className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Patient Outcomes</h3>
                        <p className="text-sm text-gray-600">Proven strategies for improving medication adherence</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Modules</CardTitle>
                    <CardDescription>
                      Complete all 12 modules to earn your MTM certification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{module.title}</h3>
                              <p className="text-sm text-gray-600">{module.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-gray-400" />
                            <Button variant="outline" size="sm">Start Module</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="grid gap-6">
                  {resources.map((category, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{file.name}</h4>
                                  <p className="text-sm text-gray-600">{file.type} • {file.size} • {file.downloads} downloads</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expert Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Video className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Weekly Office Hours</h4>
                          <p className="text-sm text-gray-600">Live support with MTM specialists</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Peer Network</h4>
                          <p className="text-sm text-gray-600">Connect with certified MTM pharmacists</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Billing Support</h4>
                          <p className="text-sm text-gray-600">Guidance on maximizing reimbursement</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Implementation Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Setup Checklist
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Demo Videos
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="h-4 w-4 mr-2" />
                        ROI Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Marketing Materials
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  )
}