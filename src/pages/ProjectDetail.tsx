import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

function ParallaxImage({ src, alt, speed = 0.5 }: { src: string, alt: string, speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`]);
  
  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden bg-[#0a0a0a]">
      <motion.img 
        style={{ y, scale: 1.15 }} 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-[120%] object-cover opacity-90" 
      />
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex(p => p.id === id);
  const safeIndex = projectIndex !== -1 ? projectIndex : 0;
  const project = projects[safeIndex];
  const nextProject = projects[(safeIndex + 1) % projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const textY = useTransform(heroProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const blurVal = useTransform(heroProgress, [0, 1], [0, 20]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[var(--color-accent)] selection:text-white"
    >
      {/* HERO SECTION */}
      <div ref={heroRef} className="relative w-full h-[120vh] flex flex-col justify-between overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage src={project.heroImg} alt={project.title} speed={0.4} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#050505]" />
        </div>

        {/* Top Meta Area */}
        <div className="relative z-10 w-full px-6 lg:px-12 pt-32 lg:pt-48 flex justify-between items-start font-mono text-xs uppercase tracking-widest text-[#aaa]">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <span className="block mb-2 text-[#666]">Client</span>
            <span className="text-white">{project.client}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-right">
            <span className="block mb-2 text-[#666]">Year</span>
            <span className="text-white">{project.year}</span>
          </motion.div>
        </div>

        {/* Center Massive Typography */}
        <motion.div 
          style={{ y: textY, opacity, filter: `blur(${blurVal.get()}px)` as any }}
          className="relative z-10 w-full px-6 lg:px-12 flex flex-col items-center text-center pb-32"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase font-medium mix-blend-difference"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 font-serif text-2xl md:text-3xl lg:text-4xl italic text-[#888] font-light max-w-3xl"
          >
            {project.description}
          </motion.p>
        </motion.div>
      </div>

      {/* INTRODUCTION SECTION */}
      <div className="w-full bg-[#050505] relative z-20 py-32 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
           <div className="lg:col-span-5">
             <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-8">Role & Deliverables</h4>
             <div className="font-sans text-xl lg:text-2xl font-light text-white leading-relaxed mb-12 border-l border-[#333] pl-6">
                {project.role}
             </div>
             
             <div className="flex flex-wrap gap-3">
               {project.tech.map((t: string) => (
                 <span key={t} className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono tracking-widest text-[#888] bg-[#111]">
                   {t}
                 </span>
               ))}
             </div>
           </div>

           <div className="lg:col-span-1" />

           <div className="lg:col-span-6 flex flex-col gap-12">
             {project.challenges && project.challenges.map((challenge: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group"
                >
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-4">Phase 0{i + 1}</h4>
                  <p className="font-sans text-xl lg:text-3xl text-[#aaa] font-light leading-relaxed group-hover:text-white transition-colors duration-500">
                    {challenge}
                  </p>
                </motion.div>
             ))}
           </div>
        </div>
      </div>

      {/* FULL WIDTH IMAGE BREAK */}
      {project.imgs && project.imgs.length > 0 && (
        <div className="w-full h-[70vh] lg:h-screen relative bg-[#111]">
          <ParallaxImage src={project.imgs[0]} alt="Hero detail" speed={0.8} />
        </div>
      )}

      {/* MASONRY / BENTO GALLERY */}
      {project.imgs && project.imgs.length > 1 && (
        <div className="w-full bg-[#050505] py-32 lg:py-64 px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
             <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-16 text-center focus-text">Selected Artifacts</h4>
             
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
               {project.imgs.slice(1).map((img: string, i: number) => {
                 // Dynamic Bento Pattern
                 let colSpan = 'md:col-span-6';
                 let aspect = 'aspect-square';
                 
                 const mod = i % 5;
                 if (mod === 0) {
                   colSpan = 'md:col-span-12';
                   aspect = 'aspect-video md:aspect-[21/9]'; 
                 } else if (mod === 1) {
                   colSpan = 'md:col-span-7';
                   aspect = 'aspect-[4/3]';
                 } else if (mod === 2) {
                   colSpan = 'md:col-span-5';
                   aspect = 'aspect-[3/4]';
                 } else if (mod === 3) {
                   colSpan = 'md:col-span-5';
                   aspect = 'aspect-[3/4]';
                 } else if (mod === 4) {
                   colSpan = 'md:col-span-7';
                   aspect = 'aspect-[4/3]';
                 }

                 return (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                     whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className={`w-full overflow-hidden rounded-2xl bg-[#0a0a0a] ${colSpan} border border-white/5`}
                   >
                     <div className={`relative w-full ${aspect} hover:scale-[1.02] transition-transform duration-1000 ease-out cursor-crosshair group`}>
                        <img src={img} alt={`Gallery artifact ${i}`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                     </div>
                   </motion.div>
                 );
               })}
             </div>
          </div>
        </div>
      )}

      {/* NEXT PROJECT IN FOCUS */}
      <NextProject transitionTo={() => navigate(`/works/${nextProject.id}`)} project={nextProject} />
    </motion.div>
  );
}

function NextProject({ transitionTo, project }: { transitionTo: () => void, project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll trigger for the next project banner
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const bannerScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  
  const [triggered, setTriggered] = useState(false);
  
  // Handle auto-scroll transition
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v >= 0.99 && !triggered) {
        setTriggered(true);
        transitionTo();
      }
    });
    return unsub;
  }, [scrollYProgress, transitionTo, triggered]);

  // Handle manual click
  const handleClick = () => {
    if (!triggered) {
      setTriggered(true);
      transitionTo();
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[150vh] bg-[#050505] relative flex flex-col justify-end">
       {/* Sticky container to hold the CTA until it fills the screen */}
       <div className="sticky bottom-0 h-screen w-full flex items-center justify-center p-4 lg:p-8 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ scale: bannerScale }}
            className="w-full h-full bg-[#111] rounded-3xl overflow-hidden relative group pointer-events-auto cursor-pointer"
            onClick={handleClick}
          >
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
               <img src={project.heroImg} alt="Next project" className="w-full h-full object-cover opacity-40 mix-blend-screen saturate-0 group-hover:scale-110 group-hover:opacity-60 group-hover:saturate-100 transition-all duration-[2s] ease-out" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
             </div>
             
             {/* Content */}
             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8">
               <motion.span style={{ scale: textScale }} className="font-mono text-sm uppercase tracking-widest text-[#aaa] mb-6 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  Next Project
               </motion.span>
               
               <motion.h2 
                 style={{ scale: textScale }}
                 className="font-display text-5xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase tracking-tighter text-white font-medium group-hover:text-[var(--color-accent)] transition-all duration-700 mb-8"
               >
                 {project.title}
               </motion.h2>

               <motion.div 
                 style={{ scale: textScale }}
                 className="flex flex-col items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
               >
                 <span className="font-sans text-sm md:text-base font-light text-white">Click or keep scrolling to open</span>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                 </svg>
               </motion.div>
             </div>
          </motion.div>
       </div>
    </div>
  );
}
