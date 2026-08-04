import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a glass-card, button, or link
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
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-screen"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 12),
        y: mousePosition.y - (isHovering ? 24 : 12),
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.5)',
        border: isHovering ? '1px solid rgba(255, 255, 255, 0.8)' : '0px solid transparent'
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Inner dot for normal state, fades out on hover */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
