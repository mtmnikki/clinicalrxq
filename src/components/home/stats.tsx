/**
 * Statistics section showcasing ClinicalRxQ's impact and reach
 * Displays key metrics and achievements
 */
import { Building2, Users, BookOpen, Award } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: Building2,
      number: '500+',
      label: 'Pharmacies Trained',
      description: 'Community pharmacies successfully implementing clinical services'
    },
    {
      icon: Users,
      number: '2,000+',
      label: 'Pharmacists Certified',
      description: 'Healthcare professionals equipped with clinical expertise'
    },
    {
      icon: BookOpen,
      number: '50+',
      label: 'Training Modules',
      description: 'Comprehensive courses covering all aspects of clinical services'
    },
    {
      icon: Award,
      number: '95%',
      label: 'Success Rate',
      description: 'Pharmacies reporting improved patient outcomes and revenue'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transforming Community Pharmacy Practice
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of pharmacies already providing exceptional clinical services to their communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
              </div>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Pharmacy?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join the growing community of pharmacies providing comprehensive clinical services and improving patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
