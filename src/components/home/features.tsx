/**
 * Features section highlighting key benefits of ClinicalRxQ platform
 * Shows the value proposition for community pharmacies
 */
import { CheckCircle, Clock, Users, TrendingUp, Shield, Award } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Proven Implementation',
      description: 'Step-by-step guidance based on successful real-world implementations across hundreds of pharmacies.'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Self-paced online modules that fit into your busy schedule, accessible 24/7 from any device.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Access to experienced clinical pharmacists and consultants for personalized guidance.'
    },
    {
      icon: TrendingUp,
      title: 'Measurable Results',
      description: 'Track your progress and measure the impact of clinical services on your pharmacy operations.'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Ensure your clinical services meet all regulatory requirements and quality standards.'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Earn recognized certifications that demonstrate your expertise in clinical pharmacy services.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Community Pharmacies Choose ClinicalRxQ
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our comprehensive platform provides everything you need to successfully transform your pharmacy practice and deliver exceptional patient care.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <img 
                src="https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/2d7050b7-2a57-4d18-be40-01fb5b201e87.jpg" 
                alt="Pharmacist providing patient care"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Patient Care Metrics</h3>
                  <span className="text-sm text-green-600 font-medium">+23% This Month</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MTM Consultations</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Immunizations</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-3/5"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Point-of-Care Tests</span>
                    <span className="font-medium">56</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-2/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
