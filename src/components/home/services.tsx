/**
 * Services section showcasing ClinicalRxQ's core training offerings
 * Features the four main training programs with navigation links
 */
import { GraduationCap, FileText, Heart, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: "Pharmacist-Initiated Oral Contraceptive Program",
      description: "Enable pharmacists to independently prescribe and manage oral contraceptive therapy in compliance with state regulations.",
      features: ["Patient assessment protocols", "Documentation compliance", "State regulation guidance"],
      link: "/programs/oral-contraceptive"
    },
    {
      icon: FileText,
      title: "Medication Therapy Management (MTM) Certification",
      description: "Comprehensive training for personalized medication management, therapeutic optimization, and improved patient adherence.",
      features: ["Comprehensive medication reviews", "Billing and documentation", "Revenue generation"],
      link: "/programs/mtm"
    },
    {
      icon: Users,
      title: "Point-of-Care Testing and Immunization Program",
      description: "Prepare pharmacy teams to administer POCT and vaccination services effectively and safely.",
      features: ["CLIA compliance training", "Safety protocols", "Quality control procedures"],
      link: "/programs/point-of-care"
    },
    {
      icon: GraduationCap,
      title: "Chronic Disease State Management Program",
      description: "Enable pharmacists to actively manage chronic conditions through structured patient care protocols.",
      features: ["Disease-specific protocols", "Collaborative care agreements", "Patient monitoring systems"],
      link: "/programs/chronic-care"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized programs designed to transform your community pharmacy into a clinical hub
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link}>
                    <Button className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/training">
              <Button size="lg" variant="outline">
                View All Training Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}