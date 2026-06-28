import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import greenImg from '../assets/service/green.jpeg';
import orangeImg from '../assets/service/orange.jpeg';
import purpleImg from '../assets/service/purple.jpeg';
import redImg from '../assets/service/red.jpeg';
import whiteImg from '../assets/service/white.jpeg';
import yellowImg from '../assets/service/yellow.jpeg';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { img: greenImg, bgColor: '#648c11', title: 'Business Website', desc: 'Corporate websites optimized for conversion, speed, and premium brand presence.', tag: 'Corporate' },
  { img: orangeImg, bgColor: '#ff4500', title: 'Admin Dashboard', desc: 'Complex data visualization and intuitive management interfaces for enterprises.', tag: 'SaaS' },
  { img: purpleImg, bgColor: '#000080', title: 'E-Commerce Store', desc: 'High-performance online stores with seamless checkout and beautiful product showcases.', tag: 'Retail' },
  { img: redImg, bgColor: '#ff0000', title: 'Full Stack Web App', desc: 'Custom web applications built with highly scalable architecture and robust logic.', tag: 'App' },
  { img: yellowImg, bgColor: '#fff000', title: 'Portfolio Website', desc: 'Breathtaking creative portfolios for agencies, artists, and photographers.', tag: 'Creative' },
  { img: whiteImg, bgColor: '#f5f5f5', title: 'Website Redesign', desc: 'Modernizing legacy websites with fresh, award-winning aesthetics and animations.', tag: 'Design' },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Set initial positions
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            // Math for a perfect half-circle curve!
            const radius = 1800; // Size of the circle
            const angleSpread = 18; // Degrees between each card
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            // Perfect circle formula
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); // Drops down along the curve
            const z = -Math.abs(offset) * 50; // Slight depth
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; // Tilt the cards so they perfectly follow the curve!
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, // Flat 2D rotation for the pure curve effect
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          // Update solid background colors and text strokes based on active card
          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        // Initialize positions
        updateCards(0);

        // The ScrollTrigger timeline
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 500vh of scrolling duration
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (servicesData.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="service"
      ref={sectionRef} 
      className="relative w-full h-screen bg-white text-black overflow-hidden flex items-center justify-center md:[perspective:1000px]"
    >
      {/* Dynamic Light Background Colors */}
      {servicesData.map((s, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{ backgroundColor: s.bgColor }}
        />
      ))}

      {/* Massive Background Typography (Transparent with Stroke) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {servicesData.map((s, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i === 5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.4)'}`,
               opacity: 0 // Controlled by GSAP
            }}
          >
            SERVICES
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {servicesData.map((s, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[80vw] sm:w-[350px] md:w-[420px] h-[450px] md:h-[550px] rounded-[30px] p-4 bg-white backdrop-blur-2xl border border-gray-200 flex flex-col justify-between overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {/* Inner Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Full Card Image */}
            <div className="w-full h-full rounded-[20px] overflow-hidden relative z-10">
              <img 
                src={s.img} 
                alt={s.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
          </div>
        ))}
      </div>
      


    </section>
  );
};

export default Services;
