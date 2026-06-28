import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../assets/hero/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll Parallax for Hero Image
    gsap.to(imageRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      }
    });

    // Scroll Parallax for Text Content (fades and moves up)
    gsap.to(textRef.current, {
      y: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative w-full h-screen flex items-center justify-center"
    >
      <div className="relative z-[15] w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 h-full pt-20 pb-6 lg:pt-24 lg:pb-12">
        
        {/* LEFT CONTENT */}
        <div ref={textRef} className="w-full lg:w-[55%] flex flex-col items-start justify-center text-black z-20 h-full will-change-transform">
          
          <div className="mb-4">
            <span 
              className="inline-block text-[#facc15] text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
            >
              Full Stack Web Developer
            </span>
          </div>

          <div className="flex flex-col mb-6 w-full">
            <div className="leading-[0.85] pb-1">
              <h1 
                className="text-[12vw] lg:text-[6rem] xl:text-[7.5rem] font-black uppercase tracking-tighter text-black"
              >
                Hello, I'm
              </h1>
            </div>
            <div className="leading-[0.85] pb-1">
              <h1 
                className="text-[12vw] lg:text-[6rem] xl:text-[7.5rem] font-black uppercase tracking-tighter text-black"
              >
                Abdullah 
              </h1>
            </div>
            <div className="leading-[0.85] pb-1 overflow-hidden h-[10.2vw] lg:h-[5.1rem] xl:h-[6.375rem] relative">
              <style>{`
                @keyframes text-roll {
                  0%, 20% { transform: translateY(0%); }
                  25%, 45% { transform: translateY(-20%); }
                  50%, 70% { transform: translateY(-40%); }
                  75%, 95% { transform: translateY(-60%); }
                  100% { transform: translateY(-80%); }
                }
                .animate-text-roll {
                  animation: text-roll 8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
              `}</style>
              <div className="animate-text-roll flex flex-col">
                {['Developer', 'Freelancer', 'Designer', 'Creator', 'Developer'].map((text, idx) => (
                  <h1 
                    key={idx} 
                    className="text-[12vw] lg:text-[6rem] xl:text-[7.5rem] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_black] m-0 p-0 pb-1 leading-[0.85]"
                  >
                    {text}
                  </h1>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 max-w-lg">
            <p 
              className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium"
            >
              Passionate Web Developer crafting modern, interactive and premium digital experiences with creative UI animations and futuristic design aesthetics.
            </p>
          </div>

          {/* BOTTOM CONTACT ROW (Icons Only) */}
          <div className="flex flex-wrap items-center gap-4 -mt-1">
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/94768354767" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
            >
              <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/abd_0816?igsh=eHhqYWVoMDl5ZXhp" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-fuchsia-500 hover:border-transparent hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] group"
            >
              <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/abdulla-mohammad-3b5307388/" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center transition-all duration-300 hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] group"
            >
              <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/Legendaryabu/" 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center transition-all duration-300 hover:bg-black hover:border-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] group"
            >
              <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
            
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div ref={imageRef} className="w-full lg:w-[45%] flex justify-center items-center h-full z-10 pt-4 lg:pt-0 will-change-transform">
          <img 
            id="hero-image"
            src={heroImg} 
            alt="Leeshark Developer" 
            className="w-full max-w-[280px] lg:max-w-xl max-h-[40vh] lg:max-h-[85vh] object-contain drop-shadow-xl pointer-events-none"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
