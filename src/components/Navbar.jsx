import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });

  useEffect(() => {
    // Initial animations
    gsap.fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(linksRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.4 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scroll down -> hide
      } else {
        setShowNavbar(true);  // Scroll up -> show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Testimonial added! Thank you.");
    setIsModalOpen(false);
    setFormData({ name: '', role: '', message: '' });
  };

  const navLinks = ["Home", "About", "Portfolio", "Service", "Contact"];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-transparent transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <a 
          href="#" 
          ref={logoRef} 
          className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight group shrink-0"
        >
          <span className="text-white transition-colors duration-300 group-hover:text-gray-200">abd</span>
          <span className="text-[#facc15] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">.web</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              ref={(el) => (linksRef.current[index] = el)}
              className="relative text-sm uppercase tracking-widest font-semibold text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              {link}
              <span className="absolute left-0 -bottom-1.5 w-0 h-[2px] bg-[#facc15] rounded-full transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-white text-black text-sm uppercase tracking-widest font-bold rounded-full hover:bg-[#facc15] transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]"
          >
            Feedback
          </button>
        </div>

        {/* Mobile Hamburger & Feedback */}
        <div className="md:hidden flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-1.5 bg-white text-black text-[10px] sm:text-xs uppercase font-bold rounded-full tracking-wider"
          >
            Feedback
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-1.5 p-1 sm:p-2 z-50 relative shrink-0"
          >
            <span className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-zinc-950/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={`mobile-${link}`}
            href={`#${link.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-black text-gray-400 hover:text-[#facc15] transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Feedback / Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">Add Testimonial</h2>
            
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-5">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#facc15] transition-all" 
              />
              <input 
                type="text" 
                placeholder="Profile Name / Role (e.g. CEO)" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                required 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#facc15] transition-all" 
              />
              <textarea 
                placeholder="Your Message..." 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                required 
                rows="4" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#facc15] transition-all resize-none" 
              />
              <button 
                type="submit" 
                className="w-full bg-[#facc15] text-black font-bold uppercase tracking-widest py-4 rounded-xl mt-2 hover:bg-white transition-colors"
              >
                Submit Feedback
              </button>
            </form>
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
