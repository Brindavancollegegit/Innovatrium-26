import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('.glass-card') || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 z-[999999] pointer-events-none will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 0.7
      }}
    >
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.18)] backdrop-blur-[2px]"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.95 : 0.85,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          width: isHovering ? '2.5rem' : '1.5rem',
          height: isHovering ? '2.5rem' : '1.5rem'
        }}
      />
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 1 : 0.9
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          width: '0.35rem',
          height: '0.35rem'
        }}
      />
    </motion.div>
  );
}
