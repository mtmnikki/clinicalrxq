import Layout from '../components/layout/layout';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Lightbulb, Cpu, Microscope, Zap, BarChart3, Shield } from 'lucide-react';

export default function Innovation() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/93a36b26-f4b9-4276-9828-2a5aedf1b8ff.jpg"
            alt="Technology Innovation"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Innovation & Research
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Pioneering the future of defense technology through cutting-edge research and development.
            </p>
          </div>
        </Container>
      </div>

      {/* Innovation Philosophy */}
      <section className="py-16 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Our Innovation Philosophy</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  At NEXUS Defense, innovation is at the core of everything we do. We believe that technological 
                  advancement is the key to maintaining strategic advantage in an increasingly complex and 
                  challenging security environment.
                </p>
                <p>
                  Our approach to innovation combines deep scientific research with practical application development. 
                  We invest heavily in fundamental research to discover new possibilities, while maintaining a 
                  clear focus on creating solutions that address real-world defense and security challenges.
                </p>
                <p>
                  Through collaboration with academic institutions, government research agencies, and industry 
                  partners, we cultivate a rich ecosystem that accelerates innovation and brings diverse 
                  perspectives to complex problems. This collaborative approach enables us to push the boundaries 
                  of what's possible in defense technology.
                </p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <img 
                src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/599e6ae0-b811-4e86-bdba-66f4dc17088d.jpg" 
                alt="NEXUS Defense research facility" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Key Research Areas</h2>
            <p className="mt-6 text-gray-300">
              Our research and development efforts focus on several strategic technology domains that will shape the future of defense.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <Cpu className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Artificial Intelligence & Machine Learning</h3>
              <p className="text-gray-300 mb-6">
                Developing advanced AI systems for threat analysis, autonomous operations, and decision support in complex environments.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Adversarial machine learning
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Computer vision for target recognition
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Natural language processing for intelligence
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <Zap className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Directed Energy Technologies</h3>
              <p className="text-gray-300 mb-6">
                Researching high-energy laser and microwave systems for precision engagement and counter-drone applications.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Compact high-power laser systems
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Beam control and atmospheric compensation
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Non-kinetic electronic warfare
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <Microscope className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Advanced Materials</h3>
              <p className="text-gray-300 mb-6">
                Creating next-generation materials for armor, aerospace, and electronics applications with unprecedented properties.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Metamaterials for stealth applications
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Nanocomposites for lightweight armor
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Self-healing structural materials
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <Lightbulb className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Quantum Technologies</h3>
              <p className="text-gray-300 mb-6">
                Exploring quantum computing, sensing, and communication for revolutionary capabilities in encryption and detection.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Post-quantum cryptography
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Quantum radar and sensing systems
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Secure quantum communications
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <BarChart3 className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Data Analytics & Fusion</h3>
              <p className="text-gray-300 mb-6">
                Developing systems to process and analyze massive data sets from multiple sources for enhanced situational awareness.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Multi-source intelligence fusion
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Predictive analytics for threat assessment
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Real-time battlefield analytics
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col">
              <Shield className="h-8 w-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Autonomous Systems</h3>
              <p className="text-gray-300 mb-6">
                Creating intelligent autonomous platforms for reconnaissance, logistics, and tactical operations in complex environments.
              </p>
              <ul className="space-y-2 text-gray-300 mt-auto">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Swarm intelligence and coordination
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Human-machine teaming frameworks
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Ethical AI for autonomous decisions
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Innovation Facilities */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">State-of-the-Art Facilities</h2>
            <p className="mt-6 text-gray-300">
              Our global network of research centers provides the infrastructure and capabilities needed to push the boundaries of defense technology.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Advanced Materials Laboratory',
                location: 'Arlington, VA',
                description: 'Specializing in the development and testing of next-generation materials for defense applications.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/d4c7768e-a810-4676-8c36-b7633efdef66.jpg'
              },
              {
                name: 'Cybersecurity Research Center',
                location: 'Tel Aviv, Israel',
                description: 'Focused on developing cutting-edge digital defense technologies and threat intelligence capabilities.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/bba139dc-68ea-4e64-93ce-09db920ab16b.jpg'
              },
              {
                name: 'Quantum Computing Facility',
                location: 'Tokyo, Japan',
                description: 'Dedicated to exploring quantum technologies for encryption, sensing, and computational applications.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/52fb3c03-ab82-4aae-8c92-821ec2f47d84.jpg'
              },
              {
                name: 'Autonomous Systems Test Range',
                location: 'Nevada, USA',
                description: 'A large-scale testing environment for unmanned aerial, ground, and underwater systems.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/4f8874c7-e14a-47e3-8820-4b1a4858ffb3.jpg'
              },
              {
                name: 'Directed Energy Research Center',
                location: 'Colorado Springs, CO',
                description: 'Developing and testing high-energy laser and microwave systems for defensive applications.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/4d2f7a31-5ba3-4422-ac23-c81374bd96de.jpg'
              },
              {
                name: 'AI & Machine Learning Institute',
                location: 'Cambridge, UK',
                description: 'Advancing artificial intelligence technologies for defense and security applications.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/8e6d0709-f00c-40f6-bebd-a77f72242fdd.jpg'
              }
            ].map((facility, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{facility.name}</h3>
                  <p className="text-blue-400 mb-2">{facility.location}</p>
                  <p className="text-gray-400">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Patents and Publications */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <img 
                src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/c94de80a-a05e-4e29-b300-36006496531b.jpg" 
                alt="Research and innovation" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white">Intellectual Property & Publications</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  NEXUS Defense maintains a robust portfolio of patents and intellectual property that 
                  protects our innovations and enables us to continue investing in cutting-edge research.
                  Our scientists and engineers are recognized leaders in their fields, regularly publishing 
                  in top academic journals and presenting at prestigious conferences.
                </p>
                <p>
                  Through our technical publications program, we share non-classified research findings 
                  with the broader scientific community, contributing to the advancement of defense technology 
                  worldwide. This commitment to knowledge sharing, balanced with appropriate security measures, 
                  strengthens our position as a thought leader in defense innovation.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-blue-900/30">
                    <p className="text-3xl font-bold text-blue-500">500+</p>
                    <p className="text-gray-300">Active Patents</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-blue-900/30">
                    <p className="text-3xl font-bold text-blue-500">200+</p>
                    <p className="text-gray-300">Research Publications</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-blue-900/30">
                    <p className="text-3xl font-bold text-blue-500">$350M</p>
                    <p className="text-gray-300">Annual R&D Investment</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-blue-900/30">
                    <p className="text-3xl font-bold text-blue-500">15+</p>
                    <p className="text-gray-300">Research Partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
        <Container>
          <div className="relative isolate overflow-hidden rounded-2xl bg-gray-900 border border-blue-900/30">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Partner with NEXUS Defense
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Explore collaboration opportunities with our research teams and access cutting-edge defense technologies.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-y-6 lg:justify-center">
                  <Button variant="tech" size="lg" asChild>
                    <Link to="/contact">Discuss Partnership Opportunities</Link>
                  </Button>
                  <Button variant="techOutline" size="lg" asChild>
                    <Link to="/products">Explore Our Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.2" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#1e40af" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
