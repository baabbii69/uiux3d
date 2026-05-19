import { motion } from 'motion/react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-16 px-6 md:px-12 overflow-hidden border-t border-[#222] z-10 text-white">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col gap-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-medium tracking-tight uppercase"
            >
              <span className="text-outline text-white/20">Ready to</span><br />
              Collaborate?
            </motion.h2>
            <div className="flex gap-6 mt-8">
               <Link 
                 to="/contact" 
                 className="group relative overflow-hidden font-mono text-sm uppercase tracking-widest border border-white/20 rounded-full px-8 py-4 transition-colors duration-300" 
                 data-cursor="pointer"
               >
                 <span className="relative z-10 group-hover:text-black transition-colors duration-300">Start a Project</span>
                 <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
               </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-[#888] font-mono text-sm uppercase tracking-widest">
            <h3 className="text-white mb-2">Socials</h3>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
              <Github size={16} /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
              <Twitter size={16} /> Twitter / X
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-16 sm:mt-32 w-full overflow-hidden flex flex-col items-center">
            {/* Massive text at the bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <h1 className="font-display text-[15vw] leading-[0.75] tracking-tighter text-center uppercase whitespace-nowrap text-white/5 select-none pointer-events-none">
                Dev & Design
              </h1>
            </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#222] font-mono text-xs text-[#555] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Joe Alex.</p>
          <p>Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
}
