import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-screen pt-32 pb-24"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <h1 className="font-display text-5xl md:text-9xl uppercase tracking-tighter text-white mb-24 flex flex-col pt-12">
          <span>Selected</span>
          <span className="text-transparent ml-0 md:ml-32" style={{ WebkitTextStroke: '2px var(--color-accent)' }}>Works</span>
        </h1>
        
        <div className="relative w-full" ref={containerRef}>
          {projects.map((project, index) => {
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                total={projects.length}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, total }: { project: any, index: number, total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);
  const filter = useTransform(scrollYProgress, [0, 0.7], ["blur(20px)", "blur(0px)"]);
  
  return (
    <div className="sticky top-24 md:top-32 h-[80vh] w-full flex items-center justify-center mb-12" style={{ zIndex: index }}>
      <motion.div 
        ref={cardRef}
        style={{ scale, opacity, filter, willChange: "transform, opacity, filter" }}
        className="w-full h-full bg-[#111] border border-white/10 p-6 md:p-12 flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="absolute inset-0 w-full h-full">
           <img src={project.heroImg} alt={project.title} loading={index === 0 ? "eager" : "lazy"} decoding={index === 0 ? "sync" : "async"} fetchPriority={index === 0 ? "high" : "auto"} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 saturate-0 group-hover:saturate-100 mix-blend-screen" />
           <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000" />
        </div>
        
        <div className="relative z-10 flex justify-between items-start">
           <span className="font-mono text-4xl text-[var(--color-accent)] font-bold">[{project.id}]</span>
           <div className="flex gap-4 font-mono text-xs uppercase text-white/50">
             <span>{project.year}</span>
             <span>//</span>
             <span>{project.client}</span>
           </div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
          <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-white font-bold leading-none max-w-xl">
             {project.title}
          </h2>
          <div className="flex flex-col items-end gap-6 text-right max-w-xs">
            <p className="font-sans text-white/80 leading-relaxed group-hover:text-white transition-colors duration-500">
               {project.description}
            </p>
            <Link to={project.link} className="inline-flex items-center gap-2 border border-[var(--color-accent)] px-6 py-3 uppercase font-mono text-xs text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black transition-colors" data-cursor="pointer">
               View Case Study
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
