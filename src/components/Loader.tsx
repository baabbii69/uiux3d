import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to let 3D canvas and assets load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[999] bg-[#050505] text-white flex flex-col items-center justify-center p-12 overflow-hidden"
        >
          {/* Logo container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
             <motion.h1 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -50, opacity: 0 }}
               transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
               className="font-mono text-xl tracking-[0.5em] uppercase text-center"
             >
               Loading
               <span className="inline-block w-1 h-1 bg-[var(--color-accent)] animate-pulse ml-2" />
             </motion.h1>
          </div>

          {/* Progress bar line */}
          <div className="absolute bottom-12 w-1/3 max-w-sm h-[1px] bg-white/10 overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               animate={{ x: "0%" }}
               transition={{ duration: 1.2, ease: "linear" }}
               className="w-full h-full bg-white relative"
             >
               <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white shadow-[0_0_10px_#fff]" />
             </motion.div>
          </div>
          
          {/* Grid lines background for cinematic feel */}
          <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
             <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2" />
             <div className="h-full w-[1px] bg-white/20 absolute left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
