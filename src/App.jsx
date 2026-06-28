import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Portfolio from './components/Portfolio'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

import AOS from 'aos'
import 'aos/dist/aos.css'

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-[#facc15]/30 overflow-x-hidden">
      <Navbar />
     
      {/* Fixed Portfolio Background for Parallax Overlap */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto">
        <Portfolio />
      </div>
      
      {/* Main Content that scrolls OVER the portfolio */}
      <div className="relative w-full overflow-hidden bg-white mt-[100vh] z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border-t border-white/20">
        <Hero />
        <Welcome />
      </div>
      
      <Projects />
     
      <Services />
      
      {/* Contact overlap Parallax */}
      <Contact />
      
      <div className="relative z-30">
        <Footer />
      </div>
      
    </main>
  )
}

export default App
