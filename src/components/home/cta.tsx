/**
 * Call-to-action section encouraging users to get started with ClinicalRxQ
 * Final conversion section with multiple engagement options
 */
import { Button } from '../ui/button'
import { ArrowRight, Calendar, Phone, BookOpen } from 'lucide-react'
import { Link } from 'react-router'

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Pharmacy Practice?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join hundreds of community pharmacies already providing exceptional clinical services. 
            Start your journey today with our comprehensive training platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 rounded-2xl p-8 hover:bg-blue-100 transition-colors">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Free Trial</h3>
              <p className="text-gray-600 mb-6">
                Access our complete training library for 14 days. No credit card required.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/trial">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 hover:bg-green-100 transition-colors">
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Schedule Demo</h3>
              <p className="text-gray-600 mb-6">
                See our platform in action with a personalized demonstration.
              </p>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50" asChild>
                <Link to="/demo">
                  Book Demo
                  <Calendar className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 hover:bg-purple-100 transition-colors">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Talk to Expert</h3>
              <p className="text-gray-600 mb-6">
                Speak with our clinical consultants about your specific needs.
              </p>
              <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50" asChild>
                <Link to="/contact">
                  Contact Us
                  <Phone className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Limited Time: Implementation Support Included
              </h3>
              <p className="text-blue-100 mb-6">
                New subscribers get 3 months of dedicated implementation support at no additional cost. 
                Our experts will help you launch your first clinical service successfully.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Claim Limited Offer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
              
              <p className="text-sm text-blue-200 mt-4">
                * Offer valid for new subscribers only. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
