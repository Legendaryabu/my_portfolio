
import footerImg from '../assets/footer/footer.png';

const Footer = () => {
  const navLinks = ["Home", "About", "Portfolio", "Service", "Contact"];
  const marqueeText = "WEB DEVELOPER • Code_X_abd • FULLSTACK • FREELANCER • PORTFOLIO • ".repeat(4);

  return (
    <footer className="w-full bg-[#f4c400] text-zinc-950 rounded-t-[50px] md:rounded-t-[100px] pt-16 pb-12 px-8 overflow-hidden relative shadow-[0_-20px_50px_rgba(244,196,0,0.1)]">
      
      {/* Massive Infinite Marquee Background Text */}
      <div className="absolute top-8 md:top-12 left-0 w-full pointer-events-none opacity-[0.05] z-0 flex flex-col gap-0 overflow-hidden select-none">
        <style>{`
          @keyframes slide-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slide-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-slide-left {
            animation: slide-left 40s linear infinite;
          }
          .animate-slide-right {
            animation: slide-right 40s linear infinite;
          }
        `}</style>
        
        {/* Layer 1: Runs Left */}
        <div className="flex whitespace-nowrap animate-slide-left w-max">
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
        </div>

        {/* Layer 2: Runs Right */}
        <div className="flex whitespace-nowrap animate-slide-right w-max">
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
        </div>

        {/* Layer 3: Runs Left */}
        <div className="flex whitespace-nowrap animate-slide-left w-max">
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {marqueeText}
            </h1>
        </div>

        {/* Layer 4: Runs Right (Instagram) */}
        <div className="flex whitespace-nowrap animate-slide-right w-max">
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {"STARTER • ".repeat(8)}
            </h1>
            <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-zinc-950 leading-none pr-8">
                {"STATER • ".repeat(8)}
            </h1>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-7xl mx-auto">
        
        {/* Profile Card Area */}
        <div className="flex flex-col items-center justify-center w-full mb-8 z-10">
            {/* Profile Image */}
            <img 
                src={footerImg} 
                alt="Leeshark Footer Portrait" 
                className="w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] object-contain drop-shadow-2xl mb-6"
            />
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <a 
                    href="https://www.instagram.com/abd_0816?igsh=eHhqYWVoMDl5ZXhp"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 md:px-12 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 text-sm md:text-base tracking-wide"
                >
                    Follow
                </a>
                <a 
                    href="https://ig.me/m/abd_0816"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-zinc-200 hover:bg-white text-zinc-900 font-bold py-3 px-8 md:px-12 rounded-xl transition-all shadow-lg text-sm md:text-base tracking-wide"
                >
                    Message
                </a>
            </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center">
            <a href="#" className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-1">
            <span className="text-zinc-950">abd</span>
            <span className="text-white drop-shadow-md">.web</span>
            </a>
            <p className="mt-4 text-zinc-800 font-medium text-center max-w-sm">
                Crafting digital experiences that inspire and perform.
            </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-4 md:gap-12 px-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-bold text-zinc-900 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl h-[2px] bg-zinc-950/10 rounded-full mt-2 md:mt-4" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-xs sm:text-sm font-bold text-zinc-800 text-center md:text-left gap-4 md:gap-0 mt-2 md:mt-0">
          <p className="px-4 leading-relaxed">© {new Date().getFullYear()} abd.web. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
