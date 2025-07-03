/**
 * Training page showcasing ClinicalRxQ's comprehensive course catalog
 * Features detailed program information and enrollment options
 */
import { GraduationCap, Clock, Users, Star, BookOpen, ArrowRight } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router'

export default function Training() {
  const programs = [
    {
      id: 'oral-contraceptive',
      title: 'Pharmacist-Initiated Oral Contraceptive Program',
      description: 'Enable pharmacists to independently prescribe and manage oral contraceptive therapy in compliance with state regulations.',
      duration: '12 hours',
      modules: 8,
      price: '$299',
      rating: 4.9,
      students: 342,
      features: ['Patient assessment protocols', 'State compliance training', 'Documentation systems'],
      level: 'Intermediate',
      color: 'bg-pink-100 text-pink-600',
      link: '/programs/oral-contraceptive'
    },
    {
      id: 'mtm',
      title: 'Medication Therapy Management (MTM) Certification',
      description: 'Comprehensive training for personalized medication management, therapeutic optimization, and improved patient adherence.',
      duration: '16 hours',
      modules: 12,
      price: '$399',
      rating: 4.8,
      students: 1247,
      features: ['Revenue generation', 'Billing procedures', 'Clinical protocols'],
      level: 'Advanced',
      color: 'bg-blue-100 text-blue-600',
      link: '/programs/mtm'
    },
    {
      id: 'point-of-care',
      title: 'Point-of-Care Testing and Immunization Program',
      description: 'Prepare pharmacy teams to administer POCT and vaccination services effectively and safely.',
      duration: '14 hours',
      modules: 10,
      price: '$349',
      rating: 4.9,
      students: 956,
      features: ['CLIA compliance', 'Safety protocols', 'Quality control'],
      level: 'Intermediate',
      color: 'bg-green-100 text-green-600',
      link: '/programs/point-of-care'
    },
    {
      id: 'chronic-care',
      title: 'Chronic Disease State Management Program',
      description: 'Enable pharmacists to actively manage chronic conditions through structured patient care protocols.',
      duration: '18 hours',
      modules: 15,
      price: '$449',
      rating: 4.7,
      students: 743,
      features: ['Disease protocols', 'Collaborative care', 'Patient monitoring'],
      level: 'Advanced',
      color: 'bg-purple-100 text-purple-600',
      link: '/programs/chronic-care'
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Self-Paced Learning',
      description: 'Learn at your own pace with 24/7 access to course materials'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from practicing pharmacists with real-world clinical experience'
    },
    {
      icon: GraduationCap,
      title: 'Certification Included',
      description: 'Receive official certification upon successful completion'
    },
    {
      icon: Clock,
      title: 'Ongoing Support',
      description: 'Access to updates, refresher materials, and expert guidance'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Training Programs
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your community pharmacy with evidence-based clinical training designed for immediate implementation
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>3,000+ Pharmacists Trained</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>4.8 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Continuing Education Credits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Training Path
              </h2>
              <p className="text-lg text-gray-600">
                Specialized programs designed to expand your clinical services and improve patient outcomes
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program) => (
                <Card key={program.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className={program.color}>
                        {program.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{program.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{program.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{program.students} enrolled</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">{program.price}</span>
                      <span className="text-sm text-gray-600">One-time payment</span>
                    </div>

                    <Link to={program.link}>
                      <Button className="w-full group">
                        View Program Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ClinicalRxQ Training?
              </h2>
              <p className="text-lg text-gray-600">
                Our training programs are designed by pharmacists, for pharmacists
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Pharmacy?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of pharmacists who have successfully implemented clinical services with ClinicalRxQ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}