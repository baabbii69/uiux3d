import { motion } from 'motion/react';
import { useRef } from 'react';

const capabilities = [
  {
    id: "01",
    title: "Systemic Architecture",
    tags: ["React", "State Machines", "Scale"],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    desc: "Rigorous component design scaling from micro-interactions to vast enterprise applications without faltering. Form dictates function, but function relies on an unbreakable foundation.",
    bg: "bg-[#111]"
  },
  {
    id: "02",
    title: "Creative Engineering",
    tags: ["WebGL", "Three.js", "Motion"],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    desc: "Merging unapologetic aesthetic choices with WebGL, shaders, and complex DOM animation orchestration. Creating visceral feedback loops.",
    bg: "bg-[var(--color-accent)]"
  },
  {
    id: "03",
    title: "Spatial Interaction",
    tags: ["3D", "Immersion", "Physics"],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    desc: "Building intuitive 3D interfaces and immersive environments that extend beyond the flat digital plane. Drag, drop, pan, zoom.",
    bg: "bg-[#222]"
  },
  {
    id: "04",
    title: "Performance",
    tags: ["60fps", "Optimization", "Vite"],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    desc: "A beautiful site is useless if it drops frames. We engineer the underlying data structures to guarantee butter-smooth experiences.",
    bg: "bg-[#111]"
  }
];

export default function Capabilities() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-[#050505] overflow-hidden border-t border-white/5" ref={constraintsRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-24 md:flex justify-between items-end">
          <h2 className="font-display text-5xl md:text-8xl leading-none uppercase tracking-tighter text-white max-w-2xl">
            Core <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-accent)' }}>Capabilities</span>
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest text-[#666] max-w-sm mt-8 md:mt-0 lg:text-right">
            [ System Architecture ] <br/>
            Uncompromising focus and obsessive execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[350px]">
          {capabilities.map((cap, idx) => (
            <motion.div 
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragMomentum={true}
              whileDrag={{ scale: 1.02, zIndex: 50 }}
              key={cap.id}
              className={`p-8 md:p-12 relative flex flex-col justify-between group overflow-hidden ${cap.colSpan} ${cap.rowSpan} ${cap.bg} border border-[#333] cursor-grab active:cursor-grabbing hover:border-white transition-colors duration-500`}
            >
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className={`font-mono text-xl ${cap.bg.includes('accent') ? 'text-black' : 'text-[#666]'}`}>
                  [{cap.id}]
                </span>
                <div className="flex gap-2 flex-wrap justify-end max-w-[200px]">
                  {cap.tags.map(tag => (
                    <span key={tag} className={`font-mono text-[10px] uppercase px-2 py-1 border ${cap.bg.includes('accent') ? 'border-black/20 text-black' : 'border-white/10 text-[#aaa]'} rounded-full`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <h3 className={`font-display text-4xl md:text-5xl uppercase tracking-tighter mb-6 ${cap.bg.includes('accent') ? 'text-black' : 'text-white'}`}>
                  {cap.title}
                </h3>
                <p className={`font-sans text-sm md:text-base leading-relaxed ${cap.bg.includes('accent') ? 'text-black/80' : 'text-[#aaa]'}`}>
                  {cap.desc}
                </p>
              </div>

              {/* Interaction prompt */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-8 h-8 rounded-full border ${cap.bg.includes('accent') ? 'border-black/20 text-black' : 'border-white/20 text-white'} flex items-center justify-center`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
