import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values directly for zero-latency tracking
  const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  // Spring physics for smooth trailing
  const springX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="nav-link"]')) {
        setCursorVariant('nav-link');
      } else if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="pointer"]')) {
        setCursorVariant('hovering');
      } else if (target.tagName.toLowerCase() === 'h1' || target.closest('[data-cursor="text"]')) {
        setCursorVariant('hovering-text');
      } else {
        setCursorVariant('default');
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    }

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // If mobile or touch device, hide the custom cursor completely
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none drop-shadow-2xl"
        style={{ 
          x: springX, 
          y: springY,
          opacity: isVisible ? 1 : 0
        }}
      >
         <motion.div 
           initial={false}
           animate={{
             scale: cursorVariant === 'hovering' ? 1.5 : (cursorVariant === 'hovering-text' ? 0.8 : (cursorVariant === 'nav-link' ? 2 : 1)),
             rotate: cursorVariant === 'hovering' ? -15 : (cursorVariant === 'nav-link' ? -15 : 0)
           }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="relative flex items-start"
         >
            <motion.svg 
              initial={false}
              animate={{ fill: cursorVariant === 'nav-link' ? 'var(--color-accent)' : 'white' }}
              width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
              className="absolute -left-1 -top-1 origin-top-left"
            >
              <path d="M5.65376 2.00018C5.23194 1.51737 4.41662 1.69654 4.23725 2.31155L0.230713 16.0594C0.0384594 16.7191 0.778848 17.2662 1.38531 16.9135L8.2323 12.9287C8.42398 12.8181 8.64835 12.7845 8.86877 12.8335L17.2755 14.6974C17.9152 14.839 18.4116 14.1539 18.0645 13.6067L5.65376 2.00018Z" />
            </motion.svg>
            
            <motion.div 
               initial={false}
               animate={{
                 opacity: cursorVariant === 'default' ? 1 : 0,
                 y: cursorVariant === 'default' ? 0 : 5
               }}
               className="ml-6 mt-5 bg-white text-black px-2.5 py-1 text-[10px] whitespace-nowrap font-mono font-bold rounded-md shadow-xl"
            >
              You
            </motion.div>
         </motion.div>
      </motion.div>
      
      {/* Remove default cursor across the app by adding a style block */}
      <style>{`
        @media (min-width: 768px) {
          body, * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
