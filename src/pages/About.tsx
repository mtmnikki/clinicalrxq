import Layout from '../components/layout/layout';
import { Container } from '../components/ui/container';
import { Shield, Target, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/5a96595e-74cd-4e8a-8ebc-08198d779969.jpg"
            alt="Advanced laboratory"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About NEXUS Defense
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              A global leader in defense technology, committed to creating a safer world through innovation and excellence.
            </p>
          </div>
        </Container>
      </div>

      {/* Company overview section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  Founded in 1995, NEXUS Defense has grown from a small research team to a global defense technology powerhouse. 
                  For over 30 years, we've been at the forefront of developing cutting-edge defense systems that protect nations, 
                  secure critical infrastructure, and safeguard military personnel.
                </p>
                <p>
                  Our headquarters in Arlington, Virginia, serves as the center of our global operations, with additional research 
                  facilities and offices across North America, Europe, and Asia. This global presence allows us to collaborate with 
                  partners worldwide and address security challenges on a truly international scale.
                </p>
                <p>
                  Today, NEXUS Defense is trusted by governments and defense agencies in over 45 countries. Our solutions range from 
                  advanced combat systems to cybersecurity platforms, all designed with a singular focus: creating a safer world through 
                  technological excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/dcb8a37a-24ab-48db-ae9b-764dc9cb35af.jpg" 
                  alt="NEXUS Defense headquarters" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">Mission & Vision</h2>
            <p className="mt-6 text-gray-300">
              Our guiding principles shape everything we do at NEXUS Defense.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To develop and deliver superior defense technologies that ensure national security, 
                protect critical infrastructure, and safeguard human lives. We are committed to innovation, 
                excellence, and creating solutions that address the evolving challenges of the modern world.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To be the global leader in defense technology, recognized for our innovative solutions, 
                technical excellence, and unwavering commitment to making the world safer. We envision a 
                future where advanced technology serves as the foundation for global security and stability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
            <p className="mt-6 text-gray-300">
              The principles that guide our decision-making and shape our company culture.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/20 flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Integrity</h3>
              <p className="text-gray-400">
                We uphold the highest ethical standards in all our operations and relationships.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/20 flex flex-col items-center text-center">
              <Target className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-400">
                We pursue excellence in everything we do, from research to product development to customer service.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/20 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Collaboration</h3>
              <p className="text-gray-400">
                We believe in the power of teamwork and partnerships to solve complex challenges.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/20 flex flex-col items-center text-center">
              <Heart className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Responsibility</h3>
              <p className="text-gray-400">
                We take responsibility for the impact of our technologies and strive to create a safer world.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership team section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">Leadership Team</h2>
            <p className="mt-6 text-gray-300">
              Meet the experienced professionals guiding NEXUS Defense into the future.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Robert Vaughn',
                role: 'Chief Executive Officer',
                bio: 'Former military intelligence officer with 25+ years of experience in defense technology leadership.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/43dcc969-3fa2-4a92-9320-65e307787ee6.jpg'
              },
              {
                name: 'Dr. Elena Sokolov',
                role: 'Chief Technology Officer',
                bio: 'Renowned scientist with expertise in advanced materials and quantum computing applications for defense.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/9040c1f8-5ebf-44a2-a883-8d041a2d2146.jpg'
              },
              {
                name: 'General James Morrison (Ret.)',
                role: 'Strategic Defense Advisor',
                bio: 'Decorated military leader with extensive experience in global security operations and strategy.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/f487412b-b614-4981-b3ad-a921165b4825.jpg'
              },
              {
                name: 'Dr. Amara Wilson',
                role: 'VP of Research & Development',
                bio: 'Leading innovation in AI-powered defense systems and autonomous security technologies.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/0c7a7da3-5381-4e8d-8497-43634a3d6c6c.jpg'
              },
              {
                name: 'Marcus Chen',
                role: 'Chief Information Security Officer',
                bio: 'Cybersecurity expert specializing in protecting critical defense infrastructure from advanced threats.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/636d5da0-05fa-4a92-8ba5-b51538ed19a0.jpg'
              },
              {
                name: 'Sarah Johnson',
                role: 'VP of Global Operations',
                bio: 'International business leader with expertise in scaling defense technology deployments worldwide.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/f1a0be28-e422-4bde-82c5-a2c7969c85af.jpg'
              }
            ].map((person, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-blue-900/20 overflow-hidden group">
                <div className="aspect-w-3 aspect-h-2">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{person.name}</h3>
                  <p className="text-blue-400 mb-4">{person.role}</p>
                  <p className="text-gray-400">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}
