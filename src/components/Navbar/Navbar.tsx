import { ArrowRight, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-3 md:top-6 left-0 right-0 z-50 px-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 rounded-[34px] border border-white/10 bg-[#030712]/70 px-2.5 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:gap-4 md:rounded-[40px] md:px-5 md:py-3.5">
        {/* Logos outside the capsule */}
        <div className="flex min-w-0 flex-1 items-center gap-1 md:gap-4">
          {/* Brindavan Logo - 1st Hierarchy */}
          <div className="flex items-center shrink-0 bg-white p-1 md:p-3 rounded-2xl shadow-sm border border-white/20 h-[34px] md:h-16 transition-transform hover:scale-105">
            <img src="/Brindavan-logo.webp" alt="Brindavan College" width="160" height="48" fetchPriority="high" className="h-full w-auto object-contain" />
          </div>
          
          {/* IEEE Logo - 2nd Hierarchy */}
          <div className="flex items-center shrink-0 bg-white p-[3px] md:p-2.5 rounded-2xl shadow-sm border border-white/20 h-[30px] md:h-14 transition-transform hover:scale-105">
            <img src="/IEEE-logo.webp" alt="IEEE" width="120" height="40" className="h-full w-auto object-contain" />
          </div>

          {/* Society Logos - 3rd Hierarchy */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0 bg-white p-[3px] md:p-2 rounded-2xl shadow-sm border border-white/20 h-[30px] md:h-11 transition-transform hover:scale-105 overflow-hidden">
            <img src="/CS-society.webp" alt="CS Society" width="36" height="36" className="h-full max-h-[18px] sm:max-h-none w-auto object-contain" />
            <img src="/SP-Society.webp" alt="SP Society" width="36" height="36" className="h-full max-h-[18px] sm:max-h-none w-auto object-contain" />
            <img src="/WIE.webp" alt="WIE" width="36" height="36" className="h-full max-h-[18px] sm:max-h-none w-auto object-contain" />
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
        <div className="flex items-center justify-end gap-2">
          <a href="#register" className="hidden md:flex items-center gap-3 btn-gradient font-sans text-[14px] font-medium px-6 py-2.5 rounded-full transition-colors shadow-lg shadow-blue-500/20">
            Register Now
          </a>
          <a href="#register" className="hidden md:flex w-10 h-10 glass-card items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
          <button
            className="lg:hidden flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-3 right-3 mt-2 rounded-[24px] border border-white/10 bg-[#081015]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <div className="grid grid-cols-2 gap-2 text-left">
            <a href="#home" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">Home</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">About</a>
            <a href="#workshop" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">Workshop</a>
            <a href="#tracks" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">Tracks</a>
            <a href="#venue" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">Venue</a>
            <a href="#college" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">College</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white/85 transition-colors hover:bg-white/10">Contact</a>
            <a href="#register" onClick={() => setIsOpen(false)} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl btn-gradient px-4 py-3 font-sans text-[14px] font-medium transition-colors shadow-lg shadow-blue-500/20">
              Register Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
