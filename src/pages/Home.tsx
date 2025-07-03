/**
 * Home page component for ClinicalRxQ website
 * Showcases the company's mission and services for community pharmacy training
 */
import Layout from '../components/layout/layout'
import Hero from '../components/home/hero'
import Services from '../components/home/services'
import Features from '../components/home/features'
import Stats from '../components/home/stats'
import Testimonials from '../components/home/testimonials'
import CTA from '../components/home/cta'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </Layout>
  )
}
