import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Briar Martin',
        handle: '@neilstellar',
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Avery Johnson',
        handle: '@averywrites',
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Jordan Lee',
        handle: '@jordantalks',
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Avery Johnson',
        handle: '@averywrites',
    },
];

const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white border border-gray-100">
        <div className="flex gap-2">
            <img className="size-11 rounded-full object-cover" src={card.image} alt="User Image" />
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <p className="font-medium text-sm">{card.name}</p>
                    <svg className="mt-0.5 fill-blue-500" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                    </svg>
                </div>
                <span className="text-xs text-slate-500">{card.handle}</span>
            </div>
        </div>
        <p className="text-sm py-4 text-gray-800">Radiant made undercutting all of our competitors an absolute breeze.</p>
    </div>
);

const Welcome = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const heroImgNode = document.querySelector("#hero-image");
      
      if (heroImgNode) {
        // Timeline for the scroll transition
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Starts when Welcome section enters from bottom
            end: "top top",      // Ends when the first screen of Welcome is fully in view!
            scrub: 1,
          }
        });

        // Animate the image to perfectly align at the top-center of Screen 1, regardless of device layout!
        tl.to(heroImgNode, {
          y: () => {
            const rect = heroImgNode.getBoundingClientRect();
            const originalTopY = rect.top + window.scrollY;
            
            const welcomeRect = sectionRef.current.getBoundingClientRect();
            const welcomeTopY = welcomeRect.top + window.scrollY;
            
            // Target the top of the image to be slightly higher (above the Welcome screen top)
            const targetTopY = welcomeTopY - (window.innerHeight * 0.08); 
            return targetTopY - originalTopY;
          },
          scale: () => window.innerWidth < 1024 ? 2.8 : 3.8, // Maximum screen size
          transformOrigin: "top center", // Anchor the scale to the top so the head stays visible!
          x: () => {
            const rect = heroImgNode.getBoundingClientRect();
            const originalCenterX = rect.left + window.scrollX + rect.width / 2;
            const targetCenterX = window.innerWidth / 2; // Exact center of screen
            return targetCenterX - originalCenterX;
          },
          ease: "power2.inOut"
        }, 0);

        // Parallax and fade the massive WELCOME text
        tl.fromTo(".welcome-huge-text", {
          y: -100,
          scale: 0.9,
          opacity: 0,
        }, {
          y: 0,
          scale: 1,
          opacity: 0.15, // Keep it subtle like a watermark
          ease: "power2.out"
        }, 0);
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="relative w-full h-[200vh] bg-transparent text-black flex flex-col items-center justify-start overflow-hidden pointer-events-none"
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(240,240,240,1)_100%)]"></div>
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
      </div>

      {/* ---------------- SCREEN 1: WELCOME TEXT ---------------- */}
      <div className="w-full h-screen text-center z-10 flex flex-col items-center justify-center relative">
        <h2 className="welcome-huge-text text-[28vw] sm:text-[20vw] md:text-[14vw] font-black uppercase tracking-tighter text-black leading-none whitespace-nowrap px-4">
          WELCOME
        </h2>
        <p className="welcome-huge-text mt-2 text-zinc-500 font-medium tracking-widest uppercase text-xs md:text-base">
          To my creative space
        </p>
      </div>

      {/* ---------------- SCREEN 2: TESTIMONIALS ---------------- */}
      <div className="w-full h-screen z-20 flex flex-col justify-center gap-8 md:gap-12 relative bg-white pointer-events-auto">
          {/* Solid gradient to blend the transition from Screen 1 */}
          <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          
          <div className="text-center z-30">
             <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2" data-aos="fade-up">Client Love</h3>
             <p className="text-zinc-500 font-medium" data-aos="fade-up" data-aos-delay="100">What people are saying</p>
          </div>

          <div className="flex flex-col gap-6">
              <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 10s linear infinite; /* Faster on mobile */
                }
                @media (min-width: 768px) {
                    .marquee-inner {
                        animation: marqueeScroll 25s linear infinite; /* Same speed on laptop */
                    }
                }
                .marquee-reverse {
                    animation-direction: reverse;
                }
              `}</style>
              
              <div className="marquee-row w-full mx-auto max-w-[100vw] overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                  <div className="marquee-inner flex transform-gpu min-w-[200%]">
                      {[...cardsData, ...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                          <CreateCard key={index} card={card} />
                      ))}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
              </div>

              <div className="marquee-row w-full mx-auto max-w-[100vw] overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                  <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%]">
                      {[...cardsData, ...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                          <CreateCard key={index} card={card} />
                      ))}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
              </div>
          </div>
      </div>

    </section>
  );
};

export default Welcome;
