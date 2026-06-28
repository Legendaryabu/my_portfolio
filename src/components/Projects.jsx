import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/project/image-1.png';
import img2 from '../assets/project/image-2.png';
import img3 from '../assets/project/image-3.png';
import img4 from '../assets/project/image-4.png';
import img5 from '../assets/project/image-5.jpeg';
import img6 from '../assets/project/image-6.png';
import img7 from '../assets/project/image-7.png';
import img8 from '../assets/project/image-8.png';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in the viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      // The front flap rotates from its bottom hinge
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        let row, col;
        // Top row: 3 cards
        if (index < 3) { row = 0; col = index; }
        // Middle row: 1 card on left, 1 card on right (Center is the folder)
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        // Bottom row: 3 cards
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      // Hide all cards perfectly inside the folder initially
      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder flap lifts and folds down (opening the physical folder)
          tl.to(folderFrontRef.current, {
            rotationX: -130, // Folds flat towards the screen
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively to show they are leaving the folder
          tl.to(cardsRef.current, {
            y: -120,
            scale: 0.9,
            zIndex: 70, // Bring cards in front of the folder flap
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into their final grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 320;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 180;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-4, 4),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.75;
          const gap = 24;
          
          // Initial Setup: Pull all cards horizontally into the center folder
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          // 1. Open Folder
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          // 2. Rise from folder
          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          // 3. Arrange into native horizontal carousel
          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");

          // Native scroll snapping effect for scale & opacity
          if (mobileCarouselRef.current) {
            const carousel = mobileCarouselRef.current;
            carousel.addEventListener('scroll', () => {
              const scrollLeft = carousel.scrollLeft;
              mobileCardsRef.current.forEach((card, i) => {
                if (!card) return;
                const cardCenter = i * (cardW + gap); 
                const dist = Math.abs(scrollLeft - cardCenter);
                
                const maxDist = cardW + gap;
                const progress = Math.max(0, 1 - dist / maxDist);
                
                gsap.set(card, {
                  scale: 0.92 + (0.08 * progress),
                  opacity: 0.5 + (0.5 * progress)
                });
              });
            }, { passive: true });
          }
        }

      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={containerRef} className="bg-[#f7f6f2] min-h-[100svh] md:min-h-[150vh] relative font-sans overflow-x-clip text-zinc-900 w-full flex items-center justify-center py-20 md:py-40">
      
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full flex items-start justify-center pointer-events-none z-0 pt-1 md:pt-0">
        <h1 className="text-[15vw] sm:text-[18vw] md:text-[22vw] font-black text-zinc-950 tracking-tighter leading-none whitespace-nowrap uppercase">
          My Work
        </h1>
      </div>

      {/* Ambient Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#f4c400]/15 rounded-full blur-[120px] pointer-events-none z-0 " />

      {/* Main Perspective Container */}
      <div className=" mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container (Centered Stacking Context) */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#f4c400] rounded-[24px] shadow-[0_20px_50px_rgba(217,163,0,0.3)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            {/* Top Tab */}
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#d9a300] rounded-t-xl" />
            
            {/* Paper Texture & Depth */}
            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_20px_40px_rgba(0,0,0,0.08)] opacity-60 pointer-events-none" />
            <div className="absolute inset-0 rounded-[24px] opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
            
            <div className="relative z-10 text-[#d9a300] font-black text-2xl tracking-widest uppercase opacity-40">
              Archive
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectImages.map((img, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[75vw] md:w-[28vw] max-w-[340px] aspect-video will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[28px] overflow-hidden border border-white/60 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500 group hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2 cursor-pointer relative z-10 will-change-transform">
                <img src={img} alt={`Project ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
                
                {/* Explore Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold tracking-wider text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">EXPLORE</span>
                </div>
                
                {/* Glow ring on hover */}
                <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-white/50 rounded-[28px] transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#f4c400] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.15)] flex flex-col justify-end p-6 border-t border-white/30">
              <div className="absolute inset-0 rounded-b-[24px] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05)] pointer-events-none" />
              <div className="absolute inset-0 rounded-b-[24px] opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
              <div className="w-20 h-1.5 bg-black/10 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectImages.map((img, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[75vw] aspect-video snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/60 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500">
              <img src={img} alt={`Project ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
