/**
 * Contact page with ClinicalRxQ support information and philosophy
 */
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Users,
  BookOpen,
  Video,
  Award,
  Headphones,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';
import SafeText from '../components/common/SafeText';

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "1-800-CLINICAL",
      secondary: "(1-800-254-6422)",
      description: "Monday-Friday, 8:00 AM - 6:00 PM EST",
      color: "from-blue-600 via-cyan-500 to-teal-300"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@clinicalrxq.com",
      secondary: "Response within 24 hours",
      description: "Technical support and program questions",
      color: "from-blue-600 via-cyan-500 to-teal-300"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: "Available in Member Portal",
      secondary: "Real-time assistance",
      description: "Instant help during business hours",
      color: "from-blue-600 via-cyan-500 to-teal-300"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Serving Community Pharmacies Nationwide",
      secondary: "Virtual training delivery",
      description: "Supporting pharmacists across all 50 states",
      color: "from-blue-600 via-cyan-500 to-teal-300"
    }
  ];

  const supportTypes = [
    {
      icon: Users,
      title: "Implementation Support",
      description: "Help getting started with your clinical programs",
      features: ["Setup assistance", "Workflow integration", "Team training"]
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Access to comprehensive training materials",
      features: ["Video tutorials", "Step-by-step guides", "Resource library"]
    },
    {
      icon: Video,
      title: "Weekly Office Hours",
      description: "Live Q&A sessions with clinical experts",
      features: ["Expert guidance", "Peer networking", "Case discussions"]
    },
    {
      icon: Award,
      title: "Billing Support",
      description: "Assistance with medical billing and reimbursement",
      features: ["Coding guidance", "Claim troubleshooting", "Revenue optimization"]
    }
  ];

  const faqs = [
    {
      question: "How do I access my training materials after enrollment?",
      answer: "Once enrolled, you'll receive login credentials to your member dashboard where all training materials, videos, protocols, and resources are available 24/7. The platform is mobile-friendly and accessible from any device."
    },
    {
      question: "What support is available during program implementation?",
      answer: "We provide comprehensive implementation support including weekly office hours, peer networking opportunities, dedicated billing support, and access to our team of clinical experts. Our goal is your success, not just completion."
    },
    {
      question: "Can I get help with medical billing and reimbursement?",
      answer: "Absolutely! Our programs include detailed billing protocols with specific CPT, HCPCS, and ICD-10 codes. We also offer dedicated billing support to help you maximize revenue from your clinical services."
    },
    {
      question: "How does the team-based approach work in practice?",
      answer: "Our protocols clearly define roles for both pharmacists and technicians. Technicians handle operational tasks (scheduling, paperwork, billing) while pharmacists focus on clinical care. This approach dramatically increases efficiency and profitability."
    },
    {
      question: "What makes ClinicalRxQ different from other training programs?",
      answer: "We provide complete 'business-in-a-box' solutions, not just education. You get step-by-step protocols, all necessary forms, billing codes, and ongoing support. We teach implementation, not just theory."
    }
  ];

  /**
   * Handle contact form submission (placeholder)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-300"></div>
        <div className="absolute inset-0 bg-[url('https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/cd53336d-d6e2-4c6b-bf62-bba9d1f359ba.png')] bg-center bg-cover opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-6">
            <Badge className="bg-white/20 text-white border-white/30">
              We're Here to Support Your Success
            </Badge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the support you need to transform your pharmacy practice. Our team of clinical experts 
            and implementation specialists are here to ensure your success.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Get in{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our support team for questions, technical assistance, 
              or partnership opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl mx-auto mb-4`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    <SafeText value={info.title} />
                  </h3>
                  <p className="text-gray-900 font-medium mb-1">
                    <SafeText value={info.details} />
                  </p>
                  <p className="text-sm text-cyan-400 font-medium mb-2">
                    <SafeText value={info.secondary} />
                  </p>
                  <p className="text-xs text-gray-600">
                    <SafeText value={info.description} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 bg-clip-text text-transparent">
                Support
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial implementation to ongoing optimization, we're with you every step of the way
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportTypes.map((support, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-300 rounded-lg mb-4">
                    <support.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">
                    <SafeText value={support.title} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    <SafeText value={support.description} />
                  </p>
                  <ul className="space-y-2">
                    {support.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>
                          <SafeText value={feature} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-cyan-400" />
                  <CardTitle>Send us a message</CardTitle>
                </div>
                <p className="text-gray-600">
                  Get personalized support for your pharmacy transformation journey
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="john@pharmacy.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Pharmacy Name</label>
                    <Input placeholder="Community Care Pharmacy" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">How can we help you?</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Program Information</option>
                      <option>Implementation Support</option>
                      <option>Billing Questions</option>
                      <option>Technical Support</option>
                      <option>Partnership Opportunities</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your current challenges and how we can help transform your practice..." 
                      rows={5}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 hover:from-blue-700 hover:via-cyan-600 hover:to-teal-400"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Support Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Headphones className="h-5 w-5 text-cyan-400" />
                    <CardTitle>Our Commitment to You</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Dedicated Support Team</p>
                        <p className="text-sm text-gray-600">Clinical experts and implementation specialists</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">24-Hour Response Time</p>
                        <p className="text-sm text-gray-600">Quick answers to your questions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Ongoing Training</p>
                        <p className="text-sm text-gray-600">Continuous education and updates</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Success Guarantee</p>
                        <p className="text-sm text-gray-600">We're invested in your transformation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <CardTitle>Support Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Phone Support</span>
                      <span className="text-sm text-gray-600">Mon-Fri, 8AM-6PM EST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Email Support</span>
                      <span className="text-sm text-gray-600">24/7 (24hr response)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Live Chat</span>
                      <span className="text-sm text-gray-600">Business hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Weekly Office Hours</span>
                      <span className="text-sm text-gray-600">Thursdays, 2PM EST</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our programs and support services
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    <SafeText value={faq.question} />
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    <SafeText value={faq.answer} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't let questions hold you back from transforming your practice. 
            Our team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:18002546422">
              <Button 
                size="lg" 
                className="bg-white text-cyan-400 hover:bg-gray-100 shadow-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: 1-800-CLINICAL
              </Button>
            </a>
            <Link to="/programs">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-400"
              >
                Browse Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
