import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import portfolioImg from '../assets/Portfolio/Portfolio.png';

const Portfolio = () => {
  const sectionRef = useRef(null);
  const cropBoxRef = useRef(null);
  const holeRectRef = useRef(null);

  const [bgColor, setBgColor] = useState('bg-[#f4c400]'); // default yellow
  const colors = [
    'bg-red-500',
    'bg-[#f4c400]', // Original yellow
    'bg-green-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-orange-500'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initial states
    gsap.set([cropBoxRef.current, holeRectRef.current], {
      scale: 0.8,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    // Use GSAP quickTo for buttery smooth, slightly lagging movement
    const xToBox = gsap.quickTo(cropBoxRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const yToBox = gsap.quickTo(cropBoxRef.current, "y", { duration: 0.8, ease: "power3.out" });
    const xToHole = gsap.quickTo(holeRectRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const yToHole = gsap.quickTo(holeRectRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const boxSize = 280;
      const targetX = x - boxSize / 2;
      const targetY = y - boxSize / 2;

      // Apply quickTo
      xToBox(targetX);
      yToBox(targetY);
      xToHole(targetX);
      yToHole(targetY);
    };

    const handleMouseEnter = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut"
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Shared content perfectly matching your existing structure
  const contentJSX = (
    <>
      {/* Background text full white and center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1
          className="text-[18vw] font-black text-white leading-none tracking-tighter"
          data-aos="fade-up"
        >
          PO
          <span className="text-transparent [-webkit-text-stroke:4px_white]">R</span>
          TF
          <span className="text-transparent [-webkit-text-stroke:4px_white]">O</span>
          LIO
        </h1>
      </div>

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6">
        {/* Center Image */}
        <div className="relative w-full max-w-sm md:max-w-md flex justify-center z-20">
          <img
            src={portfolioImg}
            alt="Portfolio Portrait"
            className="w-full h-auto border-4 border-white shadow-2xl"
          />
        </div>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen ${bgColor} transition-colors duration-500 overflow-hidden flex items-center justify-center cursor-crosshair`}
    >

      {/* 1. Base Layer -> Original sharp portfolio */}
      {contentJSX}

      {/* 2. Soft blur overlay (static, covers everything) */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          WebkitBackdropFilter: 'blur(6px) brightness(0.85)',
          backdropFilter: 'blur(6px) brightness(0.85)'
        }}
      ></div>

      {/* --- HOVER REVEAL EFFECT LAYER --- */}

      {/* SVG Mask Definition with Soft Blur Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="soft-edges" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <mask id="reveal-mask">
            {/* Background is fully black (hidden) */}
            <rect width="100%" height="100%" fill="black" />
            {/* The reveal box is white (visible sharp content) */}
            <rect
              ref={holeRectRef}
              width="280"
              height="280"
              fill="white"
              x="0"
              y="0"
              filter="url(#soft-edges)"
            />
          </mask>
        </defs>
      </svg>

      {/* 3. Reveal Layer -> clipped square showing original sharp content only */}
      {/* We duplicate the background color and content so it's completely solid and opaque */}
      <div
        className={`absolute inset-0 z-40 pointer-events-none ${bgColor} transition-colors duration-500 flex items-center justify-center`}
        style={{
          WebkitMaskImage: 'url(#reveal-mask)',
          maskImage: 'url(#reveal-mask)'
        }}
      >
        {contentJSX}
      </div>

      {/* 4. Crop Box Frame (Animated Borders) */}
      <div
        ref={cropBoxRef}
        className="absolute top-0 left-0 z-50 pointer-events-none flex items-center justify-center"
        style={{ width: 280, height: 280 }}
      >
        <style>{`
          @keyframes march {
            0% { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0; }
          }
          .marching-ants {
            stroke-dasharray: 10;
            animation: march 0.6s linear infinite;
          }
        `}</style>

        {/* Soft glow */}
        <div className="absolute inset-0 shadow-[0_0_25px_rgba(59,130,246,0.15)]"></div>

        {/* Animated Dashed SVG border */}
        <svg className="absolute inset-0 w-full h-full">
          <rect width="100%" height="100%" fill="none" stroke="#3b82f6" strokeWidth="2.5" className="marching-ants" />
        </svg>

        {/* Corner Handles */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#3b82f6] border border-white"></div>
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#3b82f6] border border-white"></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#3b82f6] border border-white"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#3b82f6] border border-white"></div>
      </div>

      {/* 5. Color Selector */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-transparent pointer-events-auto">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBgColor(color)}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${color} ${bgColor === color
                ? 'scale-110 ring-4 ring-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                : 'border-2 border-white/40 hover:border-white'
              }`}
            aria-label={`Change background color`}
          />
        ))}
      </div>

    </section>
  );
};

export default Portfolio;
