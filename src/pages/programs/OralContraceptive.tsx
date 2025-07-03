/**
 * Pharmacist-Initiated Oral Contraceptive Program page
 * Detailed program information with member resources and file downloads
 */
import { FileText, Download, Clock, Users, CheckCircle, Lock, Video, BookOpen } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function OralContraceptive() {
  const programOverview = {
    title: "Pharmacist-Initiated Oral Contraceptive Program",
    duration: "12 hours",
    modules: 8,
    ceu: "1.2 CEU",
    enrolled: 342,
    rating: 4.9
  };

  const keyComponents = [
    "Patient assessment and eligibility screening",
    "Protocol-driven prescribing and monitoring", 
    "Counseling on oral contraceptive use and potential adverse events",
    "Documentation and compliance requirements"
  ];

  const benefits = [
    "Expands service offerings to attract new patients",
    "Enhances patient convenience and pharmacy accessibility", 
    "Strengthens pharmacist-patient relationships through direct care provision"
  ];

  const resources = [
    {
      category: "Assessment Tools",
      files: [
        { name: "Patient Eligibility Screening Checklist", type: "PDF", size: "2.4 MB", downloads: 1247 },
        { name: "Contraindication Assessment Form", type: "PDF", size: "1.8 MB", downloads: 1089 },
        { name: "Risk Factor Evaluation Tool", type: "PDF", size: "3.1 MB", downloads: 956 }
      ]
    },
    {
      category: "Clinical Protocols",
      files: [
        { name: "Prescribing Protocol Flowchart", type: "PDF", size: "4.2 MB", downloads: 1456 },
        { name: "Monitoring Guidelines", type: "PDF", size: "2.9 MB", downloads: 1203 },
        { name: "Emergency Contraception Protocol", type: "PDF", size: "1.6 MB", downloads: 834 }
      ]
    },
    {
      category: "Patient Education Materials",
      files: [
        { name: "OC Information Brochure", type: "PDF", size: "5.3 MB", downloads: 2156 },
        { name: "Side Effects Quick Reference", type: "PDF", size: "1.2 MB", downloads: 1789 },
        { name: "Missed Dose Instructions", type: "PDF", size: "0.8 MB", downloads: 1567 }
      ]
    },
    {
      category: "Documentation Templates",
      files: [
        { name: "Initial Consultation Form", type: "DOC", size: "0.5 MB", downloads: 1678 },
        { name: "Follow-up Assessment Template", type: "DOC", size: "0.4 MB", downloads: 1234 },
        { name: "Incident Report Form", type: "PDF", size: "0.9 MB", downloads: 456 }
      ]
    }
  ];

  const modules = [
    { title: "Legal and Regulatory Framework", duration: "90 min", completed: false },
    { title: "Patient Assessment Fundamentals", duration: "120 min", completed: false },
    { title: "Contraceptive Options and Selection", duration: "105 min", completed: false },
    { title: "Prescribing Protocols", duration: "135 min", completed: false },
    { title: "Patient Counseling Techniques", duration: "90 min", completed: false },
    { title: "Monitoring and Follow-up", duration: "75 min", completed: false },
    { title: "Documentation Requirements", duration: "60 min", completed: false },
    { title: "Case Studies and Practice", duration: "105 min", completed: false }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Clinical Program</Badge>
              <Badge variant="outline">State Compliance Required</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {programOverview.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive training to enable pharmacists to independently prescribe and manage oral contraceptive therapy in compliance with state regulations.
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
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mx-auto mb-3">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Evidence-Based Protocols</h3>
                        <p className="text-sm text-gray-600">Standardized, clinically-proven protocols for safe prescribing</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-3">
                          <Users className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Patient-Centered Care</h3>
                        <p className="text-sm text-gray-600">Focus on individualized patient assessment and counseling</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
                        <p className="text-sm text-gray-600">Comprehensive coverage of state-specific requirements</p>
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
                      Complete all 8 modules to earn your certification
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
                          <h4 className="font-semibold">Live Q&A Sessions</h4>
                          <p className="text-sm text-gray-600">Monthly sessions with clinical experts</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Peer Community</h4>
                          <p className="text-sm text-gray-600">Connect with other pharmacists in the program</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Implementation Support</h4>
                          <p className="text-sm text-gray-600">Guidance on setting up services in your pharmacy</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Program FAQ
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Video Library
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Discussion Forum
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Quick Reference Cards
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