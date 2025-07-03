/**
 * Success Stories page component for ClinicalRxQ
 * Showcases customer success stories and case studies
 */
import { MapPin, TrendingUp, Users, DollarSign, Quote, Star, ArrowRight } from 'lucide-react'
import Layout from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SuccessStories() {
  const successStories = [
    {
      pharmacyName: "MedCare Pharmacy",
      location: "Austin, TX",
      pharmacist: "Dr. Sarah Johnson, PharmD",
      image: "https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/ab1c4cf0-78b6-4647-a60e-f51020d87e21.jpg",
      services: ["MTM", "Point-of-Care Testing", "Immunizations"],
      results: {
        revenueIncrease: "35%",
        patientsSaved: 450,
        servicesLaunched: 3,
        timeToImplement: "2 months"
      },
      testimonial: "ClinicalRxQ's training program transformed our practice. We went from a traditional dispensing pharmacy to a comprehensive clinical care provider. The ROI was evident within the first quarter.",
      challenges: "Limited clinical experience, staff training concerns, workflow integration",
      solution: "Comprehensive MTM and POCT training, ongoing mentorship support",
      outcomes: [
        "Successfully implemented MTM services with 95% patient satisfaction",
        "Added point-of-care testing generating $2,000+ monthly revenue",
        "Improved patient outcomes with chronic disease management"
      ]
    },
    {
      pharmacyName: "Community Health Pharmacy",
      location: "Portland, OR",
      pharmacist: "Dr. Michael Chen, PharmD",
      image: "https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/3b0c733a-7bf1-48ff-9aca-33c9da49b2cf.jpg",
      services: ["Chronic Care Management", "Immunizations", "Health Screenings"],
      results: {
        revenueIncrease: "28%",
        patientsSaved: 320,
        servicesLaunched: 4,
        timeToImplement: "3 months"
      },
      testimonial: "The structured approach and real-world examples made implementation seamless. Our patients now see us as healthcare providers, not just dispensers.",
      challenges: "Patient engagement, service marketing, clinical documentation",
      solution: "Patient communication training, marketing templates, documentation systems",
      outcomes: [
        "Established chronic care management program serving 200+ patients",
        "Achieved 40% increase in immunization services",
        "Became recognized diabetes education center"
      ]
    },
    {
      pharmacyName: "Valley Pharmacy Solutions",
      location: "Phoenix, AZ",
      pharmacist: "Dr. Lisa Rodriguez, PharmD",
      image: "https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/48a65043-1bfe-49ae-9d7a-b81bff7f16fc.jpg",
      services: ["MTM", "Medication Synchronization", "Adherence Programs"],
      results: {
        revenueIncrease: "42%",
        patientsSaved: 680,
        servicesLaunched: 5,
        timeToImplement: "6 weeks"
      },
      testimonial: "The comprehensive training and ongoing support gave us the confidence to expand beyond traditional pharmacy services. Our patient relationships have never been stronger.",
      challenges: "Time management, staff efficiency, service profitability",
      solution: "Workflow optimization training, efficiency tools, billing guidance",
      outcomes: [
        "Implemented medication synchronization for 300+ patients",
        "Reduced medication adherence issues by 60%",
        "Created sustainable recurring revenue streams"
      ]
    }
  ];

  const impactMetrics = [
    {
      metric: "1,200+",
      label: "Pharmacies Trained",
      icon: <Users className="h-6 w-6" />
    },
    {
      metric: "$2.8M+",
      label: "Additional Revenue Generated",
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      metric: "85,000+",
      label: "Patients Better Served",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      metric: "96%",
      label: "Client Satisfaction Rate",
      icon: <Star className="h-6 w-6" />
    }
  ];

  const testimonials = [
    {
      quote: "ClinicalRxQ didn't just teach us about clinical services - they showed us how to make them profitable and sustainable.",
      author: "Dr. Jennifer Park, PharmD",
      pharmacy: "Wellness Pharmacy Network",
      location: "Seattle, WA"
    },
    {
      quote: "The implementation support was outstanding. We had someone to call whenever we faced challenges during our transition.",
      author: "Dr. Robert Kim, PharmD",
      pharmacy: "Neighborhood Care Pharmacy",
      location: "Denver, CO"
    },
    {
      quote: "Our patients appreciate the expanded services, and our bottom line reflects the positive impact of clinical pharmacy integration.",
      author: "Dr. Amanda Torres, PharmD",
      pharmacy: "Family Health Pharmacy",
      location: "Miami, FL"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              See how community pharmacies across the country have transformed their practices and improved patient outcomes with ClinicalRxQ.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactMetrics.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-2">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.metric}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Pharmacy Transformation Stories
            </h2>
            
            <div className="space-y-12">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Story Content */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{story.pharmacyName}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{story.location}</span>
                          </div>
                          <p className="text-gray-600">{story.pharmacist}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {story.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <Quote className="h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-lg text-gray-700 italic">"{story.testimonial}"</p>
                      </div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{story.results.revenueIncrease}</div>
                          <div className="text-sm text-gray-600">Revenue Increase</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{story.results.patientsSaved}</div>
                          <div className="text-sm text-gray-600">Patients Served</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{story.results.servicesLaunched}</div>
                          <div className="text-sm text-gray-600">Services Launched</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{story.results.timeToImplement}</div>
                          <div className="text-sm text-gray-600">Implementation Time</div>
                        </div>
                      </div>

                      <Button className="w-full">
                        Read Full Case Study
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>

                    {/* Story Image */}
                    <div className="lg:order-first">
                      <img 
                        src={story.image}
                        alt={story.pharmacyName}
                        className="w-full h-full object-cover min-h-[400px]"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Pharmacists Are Saying
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.pharmacy}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of pharmacies that have successfully transformed their practices with ClinicalRxQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Your Transformation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}