/**
 * Point-of-Care Testing and Immunization Program page
 * Training for POCT and vaccination services with member resources
 */
import { FileText, Download, Clock, Users, CheckCircle, Lock, Video, BookOpen, Shield, Activity } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PointOfCare() {
  const programOverview = {
    title: "Point-of-Care Testing and Immunization Program",
    duration: "14 hours",
    modules: 10,
    ceu: "1.4 CEU",
    enrolled: 956,
    rating: 4.9
  };

  const keyComponents = [
    "Administration techniques and safety protocols for vaccinations and POCT",
    "Protocols for interpreting and responding to test results",
    "Patient education and counseling strategies",
    "Regulatory compliance and documentation practices"
  ];

  const benefits = [
    "Positions pharmacies as accessible healthcare destinations",
    "Enhances patient care through immediate diagnostics and preventive services",
    "Increases pharmacy revenue and patient traffic"
  ];

  const resources = [
    {
      category: "Testing Protocols",
      files: [
        { name: "A1C Testing Protocol", type: "PDF", size: "2.8 MB", downloads: 1567 },
        { name: "Cholesterol Screening Guidelines", type: "PDF", size: "3.1 MB", downloads: 1432 },
        { name: "Strep Test Administration Guide", type: "PDF", size: "2.2 MB", downloads: 1298 },
        { name: "COVID-19 Testing Protocols", type: "PDF", size: "3.5 MB", downloads: 2156 }
      ]
    },
    {
      category: "Immunization Resources",
      files: [
        { name: "Vaccine Administration Checklist", type: "PDF", size: "1.9 MB", downloads: 2234 },
        { name: "Immunization Schedule Reference", type: "PDF", size: "2.7 MB", downloads: 1987 },
        { name: "Adverse Event Reporting Forms", type: "ZIP", size: "4.2 MB", downloads: 1765 },
        { name: "Vaccine Storage & Handling Guide", type: "PDF", size: "3.8 MB", downloads: 1654 }
      ]
    },
    {
      category: "Quality Control",
      files: [
        { name: "QC Procedure Manual", type: "PDF", size: "5.4 MB", downloads: 1543 },
        { name: "Equipment Maintenance Log", type: "DOC", size: "0.6 MB", downloads: 1432 },
        { name: "Proficiency Testing Guide", type: "PDF", size: "2.9 MB", downloads: 1321 },
        { name: "CLIA Compliance Checklist", type: "PDF", size: "2.1 MB", downloads: 1654 }
      ]
    },
    {
      category: "Patient Communication",
      files: [
        { name: "Test Result Explanation Scripts", type: "DOC", size: "1.2 MB", downloads: 1876 },
        { name: "Vaccination Information Sheets", type: "ZIP", size: "8.7 MB", downloads: 2345 },
        { name: "Pre-Vaccination Screening Forms", type: "PDF", size: "1.8 MB", downloads: 2123 },
        { name: "Patient Education Brochures", type: "ZIP", size: "12.5 MB", downloads: 1987 }
      ]
    }
  ];

  const modules = [
    { title: "Introduction to Point-of-Care Testing", duration: "85 min", completed: false },
    { title: "Regulatory Framework and CLIA Requirements", duration: "95 min", completed: false },
    { title: "Equipment Setup and Maintenance", duration: "75 min", completed: false },
    { title: "Quality Control and Assurance", duration: "90 min", completed: false },
    { title: "Specific Test Protocols (A1C, Lipids, Strep)", duration: "105 min", completed: false },
    { title: "Immunization Fundamentals", duration: "120 min", completed: false },
    { title: "Vaccine Storage and Handling", duration: "80 min", completed: false },
    { title: "Administration Techniques and Safety", duration: "95 min", completed: false },
    { title: "Patient Screening and Contraindications", duration: "70 min", completed: false },
    { title: "Documentation and Reporting", duration: "65 min", completed: false }
  ];

  const testingServices = [
    { name: "A1C Testing", icon: Activity, description: "Diabetes monitoring and screening" },
    { name: "Cholesterol Screening", icon: Activity, description: "Cardiovascular risk assessment" },
    { name: "Strep Testing", icon: Activity, description: "Rapid strep throat diagnosis" },
    { name: "COVID-19 Testing", icon: Shield, description: "Antigen and molecular testing" },
    { name: "Influenza Testing", icon: Activity, description: "Rapid flu diagnosis" },
    { name: "Blood Pressure Monitoring", icon: Activity, description: "Cardiovascular health screening" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Clinical Services</Badge>
              <Badge variant="outline">CLIA Certified</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {programOverview.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive training to prepare pharmacy teams for administering and managing point-of-care testing and vaccination services effectively and safely.
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

      {/* Services Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Services You'll Learn to Implement
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {testingServices.map((service, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-3">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
              ))}
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
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-3">
                          <Activity className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Hands-On Training</h3>
                        <p className="text-sm text-gray-600">Practical experience with actual testing equipment</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3">
                          <Shield className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Safety First</h3>
                        <p className="text-sm text-gray-600">Comprehensive safety protocols and infection control</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-3">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">CLIA Compliance</h3>
                        <p className="text-sm text-gray-600">Complete regulatory compliance training</p>
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
                      Complete all 10 modules to master POCT and immunization services
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
                          <h4 className="font-semibold">Technical Training Sessions</h4>
                          <p className="text-sm text-gray-600">Live demonstrations with equipment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Safety Protocol Updates</h4>
                          <p className="text-sm text-gray-600">Latest CDC and regulatory guidance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Peer Learning Network</h4>
                          <p className="text-sm text-gray-600">Connect with other POCT providers</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Implementation Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="h-4 w-4 mr-2" />
                        Equipment Vendor Contacts
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        CLIA Application Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Safety Audit Checklist
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Marketing Templates
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