import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const phases = [
  { id: "01", title: "Discovery", desc: "No pixels map without a structural foundation. We analyze user intent, constraints, and backend requirements before touching the UI.", accent: "#00E5FF", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { id: "02", title: "Blueprint", desc: "Forging the visual vocabulary. Typography, motion curves, and layout principles defined in brutalist detail.", accent: "#FF3366", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" },
  { id: "03", title: "Assembly", desc: "Translating static design into high-performance architecture. React components, WebGL integration, and API hookups.", accent: "#CCFF00", img: "https://images.unsplash.com/photo-1541888057235-900366ebf727?q=80&w=2069&auto=format&fit=crop" },
  { id: "04", title: "Launch", desc: "Frame-rate auditing, micro-interactions, and responsive edge-cases. The gap between 'good' and 'award-winning'.", accent: "#FFFFFF", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
];

function StackCard({ phase, i, progress }: { phase: any, i: number, progress: any }) {
  const targetScale = 1 - ( (phases.length - i) * 0.05);

  const scale = useTransform(progress, [i * 0.25, 1], [1, targetScale]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${i * 40}px)` }}
        initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl h-[70vh] md:h-[80vh] bg-[#111] overflow-hidden relative shadow-2xl origin-top"
      >
        <div className="absolute inset-0 flex flex-col md:flex-row">
          
          <div className="w-full md:w-1/2 h-full p-8 md:p-16 flex flex-col justify-between z-10 relative bg-[#0c0c0c]/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="font-mono text-sm tracking-widest text-[#888]">PHASE</div>
              <div className="font-mono font-bold text-lg" style={{ color: phase.accent }}>[{phase.id}]</div>
            </div>
            
            <div>
              <h3 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-8">
                {phase.title}
              </h3>
              <p className="font-sans text-[#aaa] text-lg md:text-xl leading-relaxed max-w-sm">
                {phase.desc}
              </p>
            </div>
            
            <div className="flex gap-2 items-center">
               <div className="w-4 h-[1px] bg-[#333]" />
               <div className="w-4 h-[1px]" style={{ backgroundColor: phase.accent }} />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-full relative overflow-hidden">
             <div className="absolute inset-0 bg-black/50 z-10 mix-blend-overlay" />
             <img src={phase.img} className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt={phase.title} />
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="bg-[#050505] relative w-full pt-32 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 sticky top-12 z-20 mix-blend-difference pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter text-white"
        >
          The <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-accent)' }}>Process</span>
        </motion.h2>
      </div>

      <div className="relative mt-[-20vh]">
        {phases.map((phase, i) => (
           <StackCard key={phase.id} phase={phase} i={i} progress={scrollYProgress} />
        ))}
      </div>
      
    </section>
  );
}
