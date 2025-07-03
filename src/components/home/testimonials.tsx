/**
 * Testimonials section showcasing success stories from pharmacy customers
 * Features customer feedback and case studies
 */
import { Card, CardContent } from '../ui/card'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'PharmD, Community Pharmacy Owner',
      location: 'Austin, TX',
      content: 'ClinicalRxQ transformed our practice completely. Within 6 months, we implemented MTM services and increased our revenue by 40% while providing better patient care.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/1402ebe0-4e82-4054-be64-469c4908eaa3.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Clinical Pharmacist',
      location: 'Portland, OR',
      content: 'The training modules are incredibly practical and easy to follow. I was able to start offering point-of-care testing services within weeks of completing the program.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/91253b62-2a32-40c2-8dbe-95832d60c8fe.jpg'
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Pharmacy Manager',
      location: 'Miami, FL',
      content: 'The support team is exceptional. They guided us through every step of implementation and helped us navigate regulatory requirements seamlessly.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/82bb51a8-41e2-4ce0-b773-185a3776aeb6.jpg'
    }
  ]

  const caseStudy = {
    pharmacy: 'Highland Community Pharmacy',
    location: 'Denver, CO',
    results: [
      { metric: 'Revenue Increase', value: '+45%', period: '12 months' },
      { metric: 'Patient Satisfaction', value: '98%', period: 'Current' },
      { metric: 'Clinical Services', value: '8', period: 'Active programs' }
    ]
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from pharmacy professionals who have successfully transformed their practice with ClinicalRxQ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Case Study</h3>
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{caseStudy.pharmacy}</h4>
              <p className="text-gray-600 mb-6">{caseStudy.location}</p>
              
              <p className="text-gray-700 mb-8">
                Highland Community Pharmacy partnered with ClinicalRxQ to implement comprehensive clinical services. 
                Through our structured training program and ongoing support, they transformed from a traditional 
                dispensing pharmacy to a full-service clinical care provider.
              </p>
              
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Read Full Case Study
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{result.value}</div>
                  <div className="font-semibold text-gray-700 mb-1">{result.metric}</div>
                  <div className="text-sm text-gray-600">{result.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
