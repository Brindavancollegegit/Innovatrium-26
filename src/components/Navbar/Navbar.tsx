import { ArrowRight, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logos outside the capsule */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Brindavan Logo - 1st Hierarchy */}
          <div className="flex items-center shrink-0 bg-white p-2 md:p-3 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] border border-white/20 h-16 md:h-20 transition-transform hover:scale-105">
            <img src="/Brindavan-logo.png" alt="Brindavan College" className="h-full w-auto object-contain" />
          </div>
          
          {/* IEEE Logo - 2nd Hierarchy */}
          <div className="flex items-center shrink-0 bg-white p-1.5 md:p-2.5 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-white/20 h-12 md:h-16 transition-transform hover:scale-105">
            <img src="/IEEE-logo.png" alt="IEEE" className="h-full w-auto object-contain" />
          </div>

          {/* Society Logos - 3rd Hierarchy */}
          <div className="hidden md:flex items-center gap-3 shrink-0 bg-white p-1.5 md:p-2 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-white/20 h-10 md:h-12 transition-transform hover:scale-105">
            <img src="/CS-society.png" alt="CS Society" className="h-full w-auto object-contain" />
            <img src="/SP-Society.png" alt="SP Society" className="h-full w-auto object-contain" />
            <img src="/WIE.png" alt="WIE" className="h-full w-auto object-contain" />
          </div>

          <div className="hidden xl:flex flex-col pl-3 border-l border-white/20">
            <span className="font-sans text-[15px] font-semibold leading-tight text-white">IEEE SB</span>
            <span className="font-sans text-[11px] font-medium text-white/60 leading-tight uppercase tracking-[0.05em]">Brindavan</span>
          </div>
        </div>

        {/* Center Nav Capsule */}
        <div className="hidden lg:flex items-center gap-6 glass-card px-8 py-3">
          <a href="#home" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">Home</a>
          <a href="#about" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">About</a>
          <a href="#workshop" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">Workshop</a>
          <a href="#tracks" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">Tracks</a>
          <a href="#venue" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">Venue</a>
          <a href="#college" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">College</a>
          <a href="#contact" className="font-sans text-[14px] text-white/80 hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <a href="#register" className="hidden md:flex items-center gap-3 bg-white text-[#0A0A0A] font-sans text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
            Register Now
          </a>
          <a href="#register" className="hidden md:flex w-10 h-10 glass-card items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
          <button className="lg:hidden glass-card p-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 glass-card p-4 flex flex-col gap-4">
          <a href="#home" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">About</a>
          <a href="#workshop" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">Workshop</a>
          <a href="#tracks" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">Tracks</a>
          <a href="#venue" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">Venue</a>
          <a href="#college" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">College</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="font-sans text-[14px] text-white/80">Contact</a>
          <a href="#register" onClick={() => setIsOpen(false)} className="font-sans text-[14px] font-medium text-primary">Register Now</a>
        </div>
      )}
    </nav>
  );
}
