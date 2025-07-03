import Layout from '../../components/layout/layout';
import { Container } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import { ArrowRight, Shield, Lock, Eye, Server, Database, Globe } from 'lucide-react';

const products = [
  {
    name: 'FORTRESS Cybersecurity Platform',
    description: 'Comprehensive digital defense solution protecting critical infrastructure and defense networks from advanced persistent threats and cyberattacks.',
    features: [
      'AI-powered threat detection',
      'Zero-day vulnerability protection',
      'Real-time network monitoring',
      'Automated incident response',
      'Quantum-resistant encryption'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/f990d7cb-1b69-434a-a338-9a0655bfb89b.jpg'
  },
  {
    name: 'GUARDIAN Network Defense System',
    description: 'Advanced network security solution designed to protect military and defense communication networks from intrusion and disruption.',
    features: [
      'Deep packet inspection',
      'Anomaly detection algorithms',
      'Secure VPN integration',
      'Distributed firewall architecture',
      'Software-defined network security'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/3e742dde-99d9-4d44-8313-d41b9f5956f3.jpg'
  },
  {
    name: 'SENTINEL Endpoint Protection',
    description: 'Robust endpoint security solution safeguarding military devices and workstations from malware, ransomware, and other cyber threats.',
    features: [
      'Behavioral analysis engine',
      'Hardware-based security',
      'Offline protection capabilities',
      'Secure boot verification',
      'Automated patch management'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/24465685-cea3-42a2-80dc-2f7f17a50785.jpg'
  },
  {
    name: 'CIPHER Secure Communications',
    description: 'Military-grade encrypted communication platform ensuring secure transmission of sensitive information across all operational domains.',
    features: [
      'Post-quantum cryptography',
      'Multi-layer encryption protocols',
      'Tamper-evident communications',
      'Secure voice and video',
      'Anti-jamming capabilities'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/2d5c7ef7-c2a7-4bdf-9dca-2aeb1b2d3908.jpg'
  }
];

export default function Cybersecurity() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/f990d7cb-1b69-434a-a338-9a0655bfb89b.jpg"
            alt="Cybersecurity"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Cybersecurity Solutions
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Comprehensive digital protection for critical defense infrastructure and sensitive information networks.
            </p>
          </div>
        </Container>
      </div>

      {/* Products section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white text-center">Our Cybersecurity Products</h2>
            <p className="mt-6 text-gray-300 text-center">
              NEXUS Defense offers advanced cybersecurity solutions designed to protect critical defense infrastructure and sensitive information from evolving digital threats.
            </p>
          </div>
          
          <div className="mt-16 space-y-24">
            {products.map((product, index) => (
              <div 
                key={product.name} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
                  <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gray-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-lg text-gray-300">
                    {product.description}
                  </p>
                  
                  <h4 className="mt-8 text-xl font-semibold text-white">Key Features</h4>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        </span>
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button variant="techOutline" asChild>
                      <Link to="/contact">
                        Request Information
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Threat protection section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Comprehensive Threat Protection</h2>
            <p className="mt-6 text-gray-300">
              Our layered defense approach provides protection against the full spectrum of cyber threats facing defense organizations.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Advanced Persistent Threats</h3>
              <p className="text-gray-300">
                Protection against sophisticated, targeted attacks from nation-state actors and organized threat groups through continuous monitoring and AI-powered behavioral analysis.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Lock className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Zero-Day Vulnerabilities</h3>
              <p className="text-gray-300">
                Proactive defense against unknown vulnerabilities through behavioral anomaly detection, virtualized sandboxing, and automated patch management systems.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Eye className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Insider Threats</h3>
              <p className="text-gray-300">
                Multi-layered detection of malicious insider activity through user behavior analytics, privilege access management, and data loss prevention technologies.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Server className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Infrastructure Protection</h3>
              <p className="text-gray-300">
                Hardened security for critical infrastructure through network segmentation, secure configuration management, and real-time threat intelligence integration.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Database className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
              <p className="text-gray-300">
                Comprehensive protection of sensitive data through military-grade encryption, secure access controls, and automated compliance monitoring.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30 flex flex-col items-center text-center">
              <Globe className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Supply Chain Security</h3>
              <p className="text-gray-300">
                End-to-end verification of hardware and software integrity through secure supply chain monitoring, code signing, and component validation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Security Operations Center */}
      <section className="py-16 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Integrated Security Operations</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  NEXUS Defense provides comprehensive security operations services that complement our 
                  cybersecurity products. Our team of security experts works around the clock to monitor, 
                  detect, and respond to threats targeting your critical systems and data.
                </p>
                <p>
                  Our Security Operations Centers (SOCs) leverage advanced technologies and proven 
                  methodologies to provide continuous protection. Through a combination of automated 
                  monitoring and human expertise, we deliver rapid incident response capabilities 
                  that minimize the impact of security events.
                </p>
                <p>
                  All security operations are conducted in accordance with the highest standards of 
                  security clearance and compliance requirements. Our teams are trained in the specific 
                  threats facing defense organizations and work seamlessly with your internal security 
                  personnel to provide comprehensive protection.
                </p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <img 
                src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/ea70e59f-4d37-4c68-8fc1-411b6178af75.jpg" 
                alt="Security Operations Center" 
                className="w-full h-auto object-cover rounded-lg"
              />
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
                    Strengthen Your Cyber Defenses
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Contact our cybersecurity experts to discuss how NEXUS Defense can help protect your critical systems and sensitive information.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-y-6 lg:justify-center">
                  <Button variant="tech" size="lg" asChild>
                    <Link to="/contact">Request Security Assessment</Link>
                  </Button>
                  <Button variant="techOutline" size="lg" asChild>
                    <Link to="/products">Explore Other Solutions</Link>
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
