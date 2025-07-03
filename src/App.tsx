/**
 * Main App component for ClinicalRxQ website
 * Handles routing for all pages and sections
 */
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Training from './pages/Training'
import Resources from './pages/Resources'
import SuccessStories from './pages/SuccessStories'

// Individual Program Pages
import OralContraceptive from './pages/programs/OralContraceptive'
import MTM from './pages/programs/MTM'
import PointOfCare from './pages/programs/PointOfCare'
import ChronicCare from './pages/programs/ChronicCare'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training" element={<Training />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        
        {/* Individual Training Programs */}
        <Route path="/programs/oral-contraceptive" element={<OralContraceptive />} />
        <Route path="/programs/mtm" element={<MTM />} />
        <Route path="/programs/point-of-care" element={<PointOfCare />} />
        <Route path="/programs/chronic-care" element={<ChronicCare />} />
      </Routes>
    </HashRouter>
  )
}