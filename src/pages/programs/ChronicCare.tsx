/**
 * Chronic Disease State Management Program page
 * Training for managing chronic conditions with member resources
 */
import { FileText, Download, Clock, Users, CheckCircle, Lock, Video, BookOpen, Heart, TrendingUp } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ChronicCare() {
  const programOverview = {
    title: "Chronic Disease State Management Program",
    duration: "18 hours",
    modules: 15,
    ceu: "1.8 CEU",
    enrolled: 743,
    rating: 4.7
  };

  const keyComponents = [
    "Disease-specific education and management protocols",
    "Patient monitoring and follow-up procedures",
    "Collaborative practice agreements and interprofessional coordination",
    "Documentation and reporting requirements"
  ];

  const benefits = [
    "Improves patient health outcomes and adherence",
    "Strengthens pharmacy's role in healthcare delivery",
    "Drives patient loyalty through comprehensive care services"
  ];

  const diseases = [
    { name: "Diabetes", icon: TrendingUp, patients: "34.2M", description: "Type 1 & 2 diabetes management" },
    { name: "Hypertension", icon: Heart, patients: "116M", description: "Blood pressure monitoring & control" },
    { name: "Dyslipidemia", icon: TrendingUp, patients: "93M", description: "Cholesterol management" },
    { name: "COPD", icon: Heart, patients: "16M", description: "Chronic respiratory management" },
    { name: "Heart Disease", icon: Heart, patients: "6.2M", description: "Cardiovascular care" },
    { name: "Asthma", icon: Heart, patients: "25M", description: "Respiratory condition management" }
  ];

  const resources = [
    {
      category: "Disease Management Protocols",
      files: [
        { name: "Diabetes Management Algorithm", type: "PDF", size: "4.2 MB", downloads: 1876 },
        { name: "Hypertension Monitoring Protocol", type: "PDF", size: "3.1 MB", downloads: 1654 },
        { name: "Dyslipidemia Treatment Guidelines", type: "PDF", size: "3.8 MB", downloads: 1432 },
        { name: "COPD Action Plan Template", type: "PDF", size: "2.9 MB", downloads: 1298 }
      ]
    },
    {
      category: "Patient Assessment Tools",
      files: [
        { name: "Comprehensive Health Assessment", type: "PDF", size: "2.7 MB", downloads: 2156 },
        { name: "Medication Adherence Evaluation", type: "PDF", size: "1.9 MB", downloads: 1987 },
        { name: "Quality of Life Questionnaires", type: "ZIP", size: "5.4 MB", downloads: 1765 },
        { name: "Risk Stratification Tools", type: "PDF", size: "3.2 MB", downloads: 1543 }
      ]
    },
    {
      category: "Monitoring & Follow-up",
      files: [
        { name: "Patient Monitoring Schedule", type: "DOC", size: "0.8 MB", downloads: 1876 },
        { name: "Lab Value Tracking Sheets", type: "XLS", size: "1.2 MB", downloads: 1654 },
        { name: "Care Plan Templates", type: "ZIP", size: "6.7 MB", downloads: 1432 },
        { name: "Progress Note Templates", type: "DOC", size: "0.9 MB", downloads: 1298 }
      ]
    },
    {
      category: "Collaborative Care",
      files: [
        { name: "Collaborative Practice Agreement Templates", type: "ZIP", size: "3.4 MB", downloads: 2234 },
        { name: "Provider Communication Forms", type: "PDF", size: "1.6 MB", downloads: 1987 },
        { name: "Referral Guidelines", type: "PDF", size: "2.8 MB", downloads: 1765 },
        { name: "Interprofessional Care Plans", type: "ZIP", size: "4.9 MB", downloads: 1543 }
      ]
    }
  ];

  const modules = [
    { title: "Introduction to Chronic Disease Management", duration: "60 min", completed: false },
    { title: "Population Health and Epidemiology", duration: "75 min", completed: false },
    { title: "Diabetes: Pathophysiology and Management", duration: "90 min", completed: false },
    { title: "Hypertension: Assessment and Control", duration: "85 min", completed: false },
    { title: "Dyslipidemia: Diagnosis and Treatment", duration: "80 min", completed: false },
    { title: "COPD and Asthma Management", duration: "95 min", completed: false },
    { title: "Cardiovascular Disease Prevention", duration: "85 min", completed: false },
    { title: "Patient Assessment and Risk Stratification", duration: "105 min", completed: false },
    { title: "Medication Optimization Strategies", duration: "90 min", completed: false },
    { title: "Lifestyle Counseling and Behavior Change", duration: "75 min", completed: false },
    { title: "Monitoring and Follow-up Protocols", duration: "70 min", completed: false },
    { title: "Collaborative Practice Models", duration: "80 min", completed: false },
    { title: "Documentation and Billing", duration: "65 min", completed: false },
    { title: "Quality Improvement and Outcomes", duration: "55 min", completed: false },
    { title: "Advanced Case Studies", duration: "120 min", completed: false }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Advanced Program</Badge>
              <Badge variant="outline">Collaborative Care</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {programOverview.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive training designed to enable pharmacists to actively manage chronic conditions such as diabetes, hypertension, and dyslipidemia through structured patient care protocols.
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

      {/* Disease Impact Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Chronic Conditions You'll Learn to Manage
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map((disease, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                        <disease.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{disease.name}</h3>
                        <p className="text-sm text-gray-600">{disease.patients} affected in US</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{disease.description}</p>
                  </CardContent>
                </Card>
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
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mx-auto mb-3">
                          <Heart className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Evidence-Based Care</h3>
                        <p className="text-sm text-gray-600">Latest clinical guidelines and best practices</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mx-auto mb-3">
                          <Users className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Collaborative Approach</h3>
                        <p className="text-sm text-gray-600">Working with physicians and care teams</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-3">
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Outcome Focused</h3>
                        <p className="text-sm text-gray-600">Measurable improvements in patient health</p>
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
                      Complete all 15 modules to master chronic disease management
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
                      <CardTitle>Clinical Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Video className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Expert Case Reviews</h4>
                          <p className="text-sm text-gray-600">Monthly case discussions with specialists</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-red-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Clinical Guidelines Updates</h4>
                          <p className="text-sm text-gray-600">Latest treatment recommendations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Provider Network</h4>
                          <p className="text-sm text-gray-600">Connect with healthcare partners</p>
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
                        Care Protocol Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Outcome Tracking Tools
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Provider Agreement Forms
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Patient Education Materials
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