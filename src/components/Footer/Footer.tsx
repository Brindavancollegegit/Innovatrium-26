import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border bg-base pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center">
              <span className="font-display text-[14px] font-bold text-primary">IEEE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[18px] md:text-[20px] font-medium">IEEE Student Branch</span>
              <span className="font-sans text-[14px] text-white/60">Brindavan College of Engineering</span>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center font-sans text-[11px] font-medium text-white/60 uppercase hover:text-primary transition-colors">
              IN
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center font-sans text-[11px] font-medium text-white/60 uppercase hover:text-primary transition-colors">
              IG
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center font-sans text-[11px] font-medium text-white/60 uppercase hover:text-primary transition-colors">
              X
            </a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-surface-border/50 text-white/40">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center md:text-left">
            <p className="font-sans text-[14px]">© {new Date().getFullYear()} IEEE SB Brindavan. All rights reserved.</p>
            <div className="flex items-center gap-4 font-sans text-[14px]">
              <span className="text-white/30">|</span>
              <span>Created by Tharjun</span>
              <a href="mailto:your-email@example.com" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Email</a>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">GitHub</a>
            </div>
          </div>
          <button 
            onClick={scrollToTop}
            className="font-sans text-[14px] inline-flex items-center gap-2 hover:text-white transition-colors mt-4 md:mt-0"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
