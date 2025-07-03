import Layout from '../components/layout/layout';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

const featuredNews = {
  title: 'NEXUS Defense Unveils Next-Generation Radar System',
  description: 'Our latest radar technology provides unprecedented detection capabilities and resistance to electronic countermeasures, marking a significant advancement in defense surveillance technology.',
  date: 'May 28, 2025',
  readTime: '5 min read',
  category: 'Product Launch',
  image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/883eae7e-556e-426b-ac48-32c200c5fb17.jpg',
  href: '/news/next-gen-radar',
};

const newsList = [
  {
    id: 1,
    title: 'Strategic Partnership with European Defense Agency',
    description: 'New collaboration aims to enhance cybersecurity capabilities across NATO member countries, focusing on critical infrastructure protection.',
    date: 'April 15, 2025',
    readTime: '4 min read',
    category: 'Partnership',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/1683e93f-3d2d-4d2c-a53e-3a23937b71a2.jpg',
    href: '/news/european-partnership',
  },
  {
    id: 2,
    title: 'NEXUS Defense Recognized for Innovation Excellence',
    description: 'Our R&D team receives prestigious industry award for breakthroughs in autonomous defense systems that enhance operational capabilities.',
    date: 'March 10, 2025',
    readTime: '3 min read',
    category: 'Award',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/aa4a6ab3-287f-4115-8ce8-4adc46c0e2f1.jpg',
    href: '/news/innovation-award',
  },
  {
    id: 3,
    title: 'New Cybersecurity Solution Counters Emerging Threats',
    description: 'FORTRESS 2.0 platform released with enhanced AI capabilities to detect and neutralize advanced persistent threats targeting defense networks.',
    date: 'February 22, 2025',
    readTime: '6 min read',
    category: 'Product Update',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/68824008-7769-48e4-87a1-8f6780af8915.jpg',
    href: '/news/cybersecurity-solution',
  },
  {
    id: 4,
    title: 'NEXUS Defense Expands Global Operations',
    description: 'New regional headquarters established in Singapore to better serve defense clients across the Asia-Pacific region.',
    date: 'January 30, 2025',
    readTime: '4 min read',
    category: 'Company News',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/fc8c6ae6-5402-461c-b5b3-3a8ceef77e9d.jpg',
    href: '/news/asia-pacific-expansion',
  },
  {
    id: 5,
    title: 'Advanced Materials Research Breakthrough',
    description: 'Scientists at NEXUS Defense laboratories develop new nano-composite material with potential applications in next-generation armor systems.',
    date: 'January 15, 2025',
    readTime: '7 min read',
    category: 'Research',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/a0841e20-ddea-41e7-8d9a-fedc6607fe07.jpg',
    href: '/news/materials-breakthrough',
  },
  {
    id: 6,
    title: 'NEXUS Defense to Present at Global Security Conference',
    description: 'Our leadership team will showcase latest innovations at the upcoming International Defense Technology Symposium in London.',
    date: 'December 10, 2024',
    readTime: '3 min read',
    category: 'Event',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/9b7b0605-4f3f-4656-b06c-8cdd6d818d5a.jpg',
    href: '/news/security-conference',
  },
];

const categories = [
  'All News',
  'Product Launch',
  'Partnership',
  'Research',
  'Company News',
  'Award',
  'Event',
];

export default function News() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/e5108e11-be04-4ab4-ab37-9c1ec837babe.jpg"
            alt="Latest News"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              News & Updates
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Stay informed about the latest developments, innovations, and announcements from NEXUS Defense.
            </p>
          </div>
        </Container>
      </div>

      {/* News categories */}
      <section className="py-8 bg-black border-b border-blue-900/20">
        <Container>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "tech" : "techOutline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured article */}
      <section className="py-16 bg-black">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8">Featured News</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-gray-900 rounded-lg overflow-hidden border border-blue-900/30">
            <div className="lg:col-span-3 h-full">
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredNews.readTime}
                  </div>
                </div>
                
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 mb-4">
                  <Tag className="h-3 w-3 mr-1" />
                  {featuredNews.category}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-4">{featuredNews.title}</h3>
                <p className="text-gray-300">{featuredNews.description}</p>
              </div>
              
              <div className="mt-8">
                <Button variant="techOutline" asChild>
                  <Link to={featuredNews.href}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* News list */}
      <section className="py-16 bg-gray-950">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8">Latest News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((article) => (
              <article key={article.id} className="flex flex-col overflow-hidden rounded-lg border border-blue-900/20 bg-gray-900 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 mb-3">
                      <Tag className="h-3 w-3 mr-1" />
                      {article.category}
                    </span>
                    
                    <Link to={article.href} className="block">
                      <h3 className="text-xl font-semibold leading-6 text-white hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-400">{article.description}</p>
                    </Link>
                  </div>
                  <div className="mt-5">
                    <Link to={article.href} className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button variant="tech">
              Load More Articles
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Informed</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive the latest news and updates from NEXUS Defense directly in your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1"
              />
              <Button variant="tech">
                Subscribe
              </Button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
