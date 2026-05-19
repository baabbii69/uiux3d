import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import { useRef, useEffect } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="bg-[var(--color-bg-light)] text-[var(--color-text-dark)] min-h-screen pt-24 selection:bg-[var(--color-accent)] selection:text-white"
      ref={containerRef}
    >
      {/* Top toolbar mimicking design tool for consistency */}
      <div className="fixed top-0 left-0 w-full h-12 bg-[#111] border-b border-[#222] z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="h-4 w-[1px] bg-[#333] mx-2" />
          <div className="font-mono text-xs text-[#888] flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/></svg>
            <span>System / Joe Alex / Profile_Data</span>
          </div>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-[#888]">
          <div className="bg-[#222] px-2 py-1 rounded border border-[#333]">View Only</div>
          <button className="bg-white text-black px-4 py-1 rounded font-bold">Edit Profile</button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        
        {/* Canvas-like Hero Section */}
        <div className="min-h-[60vh] relative overflow-hidden bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl mb-24 cursor-none group">
          {/* Abstract canvas grid */}
          <motion.div 
            className="absolute inset-[0%] opacity-30 pointer-events-none z-0" 
            style={{ 
              backgroundImage: `radial-gradient(circle at center, #444 1px, transparent 1px)`, 
              backgroundSize: `32px 32px`,
              x: useTransform(springX, [0, 2000], [0, -30]),
              y: useTransform(springY, [0, 2000], [0, -30])
            }} 
          />

          {/* Local Custom Cursor inside container */}
          <motion.div 
            className="absolute z-50 pointer-events-none mix-blend-difference drop-shadow-2xl"
            style={{ x: springX, y: springY }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.65376 2.00018C5.23194 1.51737 4.41662 1.69654 4.23725 2.31155L0.230713 16.0594C0.0384594 16.7191 0.778848 17.2662 1.38531 16.9135L8.2323 12.9287C8.42398 12.8181 8.64835 12.7845 8.86877 12.8335L17.2755 14.6974C17.9152 14.839 18.4116 14.1539 18.0645 13.6067L5.65376 2.00018Z" fill="white"/>
            </svg>
            <div className="absolute top-6 left-5 bg-white text-black px-2 py-0.5 text-[10px] whitespace-nowrap font-sans font-bold rounded shadow-xl">
              You
            </div>
          </motion.div>

          {/* Bounding box UI metaphor */}
          <motion.div 
             style={{ y: y1, opacity }} 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] border border-[#333] bg-[#111] p-8 md:p-16 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] z-10 transition-colors duration-500 group-hover:border-[var(--color-accent)]"
          >
            {/* Transform Handles */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute -top-6 left-0 text-[#666] group-hover:text-[var(--color-accent)] transition-colors font-mono text-[10px] uppercase font-bold tracking-widest flex gap-2 items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"><path d="M4 4h16v16H4z"/></svg>
              # Profile_Data
            </div>

            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] text-white">
                Systematic <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>Creative</span> <br/>
                Engineering.
              </h1>
              <div className="font-mono text-xs uppercase tracking-widest text-[#888] text-left md:text-right p-4 bg-white/5 border border-white/10 rounded backdrop-blur-sm">
                <p className="border-b border-white/10 pb-2 mb-2">Experience: 8+ Years</p>
                <p className="border-b border-white/10 pb-2 mb-2">Focus: UI Architecture</p>
                <p>Location: Earth (Remote)</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-24 md:mt-48 mb-32">
          
          <div className="md:col-span-5 relative">
            <motion.div 
               style={{ y: y2 }}
               className="aspect-[4/5] bg-zinc-200 rounded-[2rem] overflow-hidden relative group md:sticky md:top-32"
               data-cursor="text"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300 via-zinc-200 to-zinc-400" />
              {/* Abstract lines simulation */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)', backgroundSize: '100% 4px' }} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                 <div className="w-32 h-32 rounded-full border border-black/20 flex flex-col items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full" />
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 z-20 font-display text-black text-2xl uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                Data Profile.<br/>
                <span className="text-sm font-mono text-black/50 tracking-widest block mt-2">Active Status</span>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-1" />

          <div className="md:col-span-6 flex flex-col gap-16 pt-12 md:pt-0">
            <div className="max-w-2xl font-sans text-2xl md:text-4xl text-[var(--color-text-dark)] font-light leading-snug tracking-tight">
              <p className="mb-8">
                I operate at the precise intersection of rigorous logic and unbridled creativity. 
              </p>
              <p className="text-[#666]">
                My foundation in Python and Go microservices ensures I understand constraints and scalability. My obsession with typography and motion ensures I never let those constraints ruin a perfect user experience.
              </p>
            </div>

            <div className="flex flex-col gap-12 pt-16 border-t border-black/10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[var(--color-accent)]" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-[#888]">Experience Timeline</h3>
                </div>
                
                <div className="flex flex-col border-t border-black/10">
                  <div className="py-8 border-b border-black/10 flex flex-col md:flex-row justify-between gap-4 group">
                    <div className="font-mono text-sm text-[#888]">2022 — Present</div>
                    <div className="flex flex-col gap-2 w-full md:w-2/3">
                      <h4 className="font-display text-2xl uppercase font-semibold group-hover:text-[var(--color-accent)] transition-colors">Lead System Architect</h4>
                      <div className="font-sans text-[#555]">Acme Corp / Remote</div>
                      <p className="font-sans text-sm text-[#666] font-light mt-2 max-w-lg">
                        Spearheading the transition from legacy monolithic interfaces to distributed micro-frontend architectures. Overhauling design systems across 4 product lines.
                      </p>
                    </div>
                  </div>
                  
                  <div className="py-8 border-b border-black/10 flex flex-col md:flex-row justify-between gap-4 group">
                    <div className="font-mono text-sm text-[#888]">2019 — 2022</div>
                    <div className="flex flex-col gap-2 w-full md:w-2/3">
                      <h4 className="font-display text-2xl uppercase font-semibold group-hover:text-[var(--color-accent)] transition-colors">Senior UI Engineer</h4>
                      <div className="font-sans text-[#555]">Studio Fragment / NY</div>
                      <p className="font-sans text-sm text-[#666] font-light mt-2 max-w-lg">
                        Bridged the gap between the design team and the Go backend engineers. Developed custom WebGL interactions for high-profile marketing campaigns.
                      </p>
                    </div>
                  </div>

                  <div className="py-8 border-b border-black/10 flex flex-col md:flex-row justify-between gap-4 group">
                    <div className="font-mono text-sm text-[#888]">2016 — 2019</div>
                    <div className="flex flex-col gap-2 w-full md:w-2/3">
                      <h4 className="font-display text-2xl uppercase font-semibold group-hover:text-[var(--color-accent)] transition-colors">Full-Stack Developer</h4>
                      <div className="font-sans text-[#555]">Tech Startups / SF</div>
                      <p className="font-sans text-sm text-[#666] font-light mt-2 max-w-lg">
                        Built end-to-end applications using React and Python (FastAPI). Focused on rapid prototyping and user testing to find product-market fit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 pt-16 border-t border-black/10">
                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-black font-bold border-b border-black/10 pb-2">Interaction Stack</h4>
                  <ul className="flex flex-col gap-2 font-display text-xl uppercase text-[#444]">
                    <li>Figma (Expert)</li>
                    <li>Framer / Webflow</li>
                    <li>GSAP / Framer Motion</li>
                    <li>Three.js / WebGL</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-black font-bold border-b border-black/10 pb-2">Engineering Core</h4>
                  <ul className="flex flex-col gap-2 font-display text-xl uppercase text-[#444]">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Go (APIs)</li>
                    <li>Python (FastAPI)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-32 md:py-48">
          <TextReveal 
            text="The best digital products don't feel like software. They feel like a natural extension of human intent. Seamless, responsive, and alive."
            className="font-display text-[6vw] leading-none uppercase text-[var(--color-text-dark)]"
            highlightWords={['software.', 'alive.', 'human', 'intent.']}
          />
        </div>

      </div>
      
      {/* Footer wrapped in dark theme */}
      <div className="bg-[var(--color-bg-dark)] text-white">
        <Footer />
      </div>
    </motion.div>
  );
}
