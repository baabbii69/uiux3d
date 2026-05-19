import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { title: "Works", path: "/works", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" },
  { title: "About", path: "/about", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { title: "Contact", path: "/contact", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-start px-6 md:px-12 py-8 pointer-events-none text-white">
        
        {/* Logo */}
        <Link 
           to="/" 
           className="font-mono text-sm tracking-widest uppercase pointer-events-auto transition-all duration-500 z-50 flex items-center gap-3 px-6 py-4 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg" 
           data-cursor="pointer"
        >
          SYS_LOG
        </Link>
        
        {/* Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="font-mono text-sm uppercase tracking-widest pointer-events-auto z-50 flex items-center justify-center gap-3 md:gap-5 group px-6 md:px-8 py-4 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 shadow-lg"
          data-cursor="pointer"
        >
          <span className="relative overflow-hidden flex flex-col h-5 font-bold pt-0.5">
             <motion.span 
               animate={{ y: isOpen ? -24 : 0 }} 
               transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
               className="leading-none"
             >
               Menu
             </motion.span>
             <motion.span 
               animate={{ y: isOpen ? -20 : 24 }} 
               transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
               className="leading-none absolute top-full left-0 text-[var(--color-accent)]"
             >
               Close
             </motion.span>
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] group-hover:scale-[2] group-hover:bg-white transition-all duration-300" />
        </button>

      </nav>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", transition: { delay: 0.4, duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505] flex items-center justify-center overflow-hidden"
          >
            
            {/* Background Images Reveal */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
               {navLinks.map((link) => (
                 <motion.img 
                   key={link.title}
                   src={link.img}
                   initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                   animate={{ 
                     opacity: hoveredLink === link.title ? 1 : 0, 
                     scale: hoveredLink === link.title ? 1 : 1.05,
                     filter: hoveredLink === link.title ? "blur(0px)" : "blur(20px)"
                   }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="absolute inset-0 w-full h-full object-cover saturate-0"
                 />
               ))}
            </div>

            <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end h-full py-32">
               
               {/* Links */}
               <div className="flex flex-col w-full text-left">
                 {navLinks.map((link, i) => (
                   <div key={link.title} className="overflow-hidden">
                     <motion.div 
                       initial={{ y: "120%", rotate: 2 }}
                       animate={{ y: "0%", rotate: 0 }}
                       exit={{ y: "120%", transition: { delay: (navLinks.length - 1 - i) * 0.1, duration: 0.5, ease: [0.77, 0, 0.175, 1] } }}
                       transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.77, 0, 0.175, 1] }}
                     >
                       <Link 
                         to={link.path} 
                         onMouseEnter={() => setHoveredLink(link.title)}
                         onMouseLeave={() => setHoveredLink(null)}
                         className="group block py-2 md:py-4 transition-all duration-500 w-max"
                         data-cursor="nav-link"
                       >
                          <div className="flex items-start gap-4 md:gap-8">
                            <span className="font-mono text-xs md:text-sm tracking-widest text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500 pt-3 md:pt-6">
                              0{i+1}
                            </span>
                            <span className="font-display text-5xl md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter leading-[0.8] text-white/50 group-hover:text-white transition-all duration-500 group-hover:translate-x-4">
                              {link.title}
                            </span>
                          </div>
                       </Link>
                     </motion.div>
                   </div>
                 ))}
               </div>

               {/* Footer of Menu */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, transition: { duration: 0.3 } }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="flex flex-col gap-8 md:text-right mt-auto pb-12"
               >
                 <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] flex flex-col gap-2">
                   <span className="text-[var(--color-accent)]">Socials</span>
                   <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Twitter</a>
                   <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">Instagram</a>
                   <a href="#" className="hover:text-white transition-colors" data-cursor="pointer">LinkedIn</a>
                 </div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-[#888] flex flex-col gap-2">
                   <span className="text-[var(--color-accent)]">Inquiries</span>
                   <a href="mailto:hello@syslog.com" className="hover:text-white transition-colors" data-cursor="pointer">hello@syslog.com</a>
                 </div>
               </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
