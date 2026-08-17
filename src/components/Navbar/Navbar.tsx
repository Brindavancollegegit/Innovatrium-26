import { useState } from 'react';
import { ArrowRight, List, X, House, Info, Stack, Sparkle, MapPin, GraduationCap, Envelope, CalendarBlank, Ticket, Clock } from '@phosphor-icons/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home', icon: House },
    { href: '#about', label: 'About', icon: Info },

    { href: '#tracks', label: 'Tracks', icon: Stack },
    { href: '#timeline', label: 'Timeline', icon: Clock },
    { href: '#venue', label: 'Venue', icon: MapPin },
    { href: '#college', label: 'College', icon: GraduationCap },
    { href: '#contact', label: 'Contact', icon: Envelope },
  ];

  return (
    <nav className="fixed top-2.5 sm:top-4 md:top-6 left-0 right-0 z-50 px-3 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#030712]/85 px-3 py-2.5 sm:px-5 sm:py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
        
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 shrink-0">
          
          {/* Brindavan Logo */}
          <img 
            src="/Brindavan-logo.webp" 
            alt="Brindavan College" 
            className="h-10 sm:h-12 lg:h-16 xl:h-[72px] w-auto object-contain shrink-0 transition-transform hover:scale-105" 
          />
          
          {/* IEEE SB Logo */}
          <img 
            src="/IEEE-logo.webp" 
            alt="IEEE" 
            className="h-11 sm:h-14 lg:h-[72px] xl:h-[84px] w-auto object-contain shrink-0 transition-transform hover:scale-105" 
          />

          {/* Society Logos Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 xl:gap-3 shrink-0 transition-transform hover:scale-105">
            <img src="/CS-society.webp" alt="CS Society" className="h-5 sm:h-7 lg:h-10 xl:h-[40px] w-auto object-contain" />
            <img src="/SP-Society.webp" alt="SP Society" className="h-5 sm:h-7 lg:h-10 xl:h-[40px] w-auto object-contain" />
            <img src="/WIE.webp" alt="WIE" className="h-5 sm:h-7 lg:h-10 xl:h-[40px] w-auto object-contain" />
          </div>

          <div className="hidden xl:flex flex-col pl-3 border-l border-white/20">
            <span className="font-sans text-[14px] font-semibold leading-tight text-white">IEEE SB</span>
            <span className="font-sans text-[10px] font-medium text-white/60 leading-tight uppercase tracking-[0.05em]">Brindavan</span>
          </div>
        </div>

        {/* CENTER LINKS */}
        <div className="hidden xl:flex items-center gap-4 glass-card px-5 py-2">
          {navLinks.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="font-sans text-[13px] font-medium text-white/75 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* RIGHT CTA */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <a 
            href="#register" 
            className="hidden sm:inline-flex items-center gap-2 btn-gradient font-sans text-[13px] font-medium px-5 py-2 rounded-full transition-all shadow-md hover:shadow-emerald-500/25 active:scale-[0.98]"
          >
            <Ticket weight="duotone" className="w-3.5 h-3.5" />
            <span>Register Now</span>
          </a>
          
          <button
            className="xl:hidden flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X weight="duotone" className="w-4 h-4" /> : <List weight="duotone" className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-3 right-3 mt-2 rounded-[24px] border border-white/15 bg-[#05080c]/98 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CalendarBlank weight="duotone" className="w-3.5 h-3.5 text-blue-400" /> Competition Day
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin weight="duotone" className="w-3.5 h-3.5 text-emerald-400" /> Bengaluru
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left mb-3">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 font-sans text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <a
            href="#register"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl btn-gradient py-3 font-sans text-[14px] font-semibold transition-all shadow-lg active:scale-[0.98]"
          >
            <Ticket weight="duotone" className="w-4 h-4" />
            <span>Register for Fest</span>
            <ArrowRight weight="duotone" className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}