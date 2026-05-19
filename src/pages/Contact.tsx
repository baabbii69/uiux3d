import { motion } from 'motion/react';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="bg-[var(--color-bg-dark)] text-white min-h-screen pt-32 selection:bg-[var(--color-accent)] selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 min-h-[80vh] flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="flex flex-col gap-12 lg:sticky lg:top-48">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 bg-[var(--color-accent)] animate-pulse rounded-full" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#888]">Initiate Sequence</span>
              </div>
              <h1 className="font-display text-7xl md:text-[8vw] lg:text-[7vw] font-bold uppercase tracking-tighter leading-[0.85] text-white">
                Start A <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Project.</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-xl md:text-2xl font-light max-w-md text-[#aaa]"
            >
              I only take on a limited number of projects per year to ensure maximum quality and focus. Let's build something enduring.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-8 font-mono text-sm uppercase tracking-widest mt-8"
            >
              <div className="group w-fit">
                <p className="text-[#666] mb-2 text-xs">Direct Transmission</p>
                <a href="mailto:joealex69420@gmail.com" className="text-2xl text-white relative flex items-center overflow-hidden" data-cursor="pointer">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">joealex69420@gmail.com</span>
                  <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full text-[var(--color-accent)] group-hover:translate-y-0">joealex69420@gmail.com</span>
                </a>
              </div>
              <div>
                <p className="text-[#666] mb-2 text-xs">Operating Out Of</p>
                <p className="text-xl text-white/80">London / Remote Global</p>
              </div>
            </motion.div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-12 justify-center bg-[#0a0a0a] p-8 md:p-16 rounded-[2rem] border border-white/5"
            onSubmit={(e) => e.preventDefault()}
          >
             <div className="font-display text-3xl uppercase tracking-tighter mb-4 border-b border-white/10 pb-8">
               Project Request Form
             </div>

            <div className="relative group z-10 w-full mt-4">
              <input type="text" id="name" required className="w-full bg-transparent border-b border-[#333] py-4 text-xl focus:outline-none focus:border-white peer transition-colors text-white placeholder-transparent focus:bg-[#111] px-4 rounded-t-lg" placeholder="Name" data-cursor="text" />
              <label htmlFor="name" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] font-mono text-sm uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#888] peer-focus:left-0 peer-valid:left-0">
                Your Name
              </label>
            </div>
            
            <div className="relative group z-10 w-full mt-4">
              <input type="email" id="email" required className="w-full bg-transparent border-b border-[#333] py-4 text-xl focus:outline-none focus:border-white peer transition-colors text-white placeholder-transparent focus:bg-[#111] px-4 rounded-t-lg" placeholder="Email" data-cursor="text" />
              <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] font-mono text-sm uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#888] peer-focus:left-0 peer-valid:left-0">
                Your Email
              </label>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <span className="text-[#666] font-mono text-sm uppercase tracking-widest">Project Budget</span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"].map((budget) => (
                  <label key={budget} className="flex items-center justify-center p-4 border border-[#333] rounded-lg cursor-pointer hover:border-[var(--color-accent)] transition-colors text-sm font-mono text-[#888] hover:text-white group relative overflow-hidden">
                    <input type="radio" name="budget" value={budget} className="sr-only peer" />
                    <span className="relative z-10 peer-checked:text-white">{budget}</span>
                    <div className="absolute inset-0 bg-[#222] scale-y-0 group-hover:scale-y-100 peer-checked:bg-[var(--color-accent)] peer-checked:scale-y-100 transition-transform origin-bottom duration-300 z-0"></div>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative group z-10 w-full mt-8">
              <textarea id="message" required rows={5} className="w-full bg-transparent border-b border-[#333] py-4 text-xl focus:outline-none focus:border-white peer transition-colors resize-none text-white placeholder-transparent focus:bg-[#111] px-4 rounded-t-lg" placeholder="Message" data-cursor="text" />
              <label htmlFor="message" className="absolute left-4 top-6 text-[#666] font-mono text-sm uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#888] peer-focus:left-0 peer-valid:left-0">
                Project Details
              </label>
            </div>

            <button type="submit" className="group relative w-full mt-8 rounded-full overflow-hidden border border-white/20" data-cursor="pointer">
              <span className="relative z-10 font-mono text-sm uppercase tracking-widest px-12 py-6 block text-white transition-colors duration-500">
                Send Transmission
              </span>
              <div className="absolute inset-0 bg-[var(--color-accent)] scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:scale-y-100 z-0"></div>
            </button>
          </motion.form>
        </div>
      </div>
      
      <div className="mt-24 border-t border-white/5">
        <Footer />
      </div>
    </motion.div>
  );
}
