import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useState } from 'react';

const services = [
  {
    id: "ux",
    title: "UX/UI & Digital Products",
    desc: "Is poor design costing you users? We fix friction. We design intuitive, human-centered interfaces that reduce churn, delight customers, and make your product a joy to use.",
    img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "websites",
    title: "High-Performance Websites",
    desc: "Websites that load in a blink. We build with modern stacks to ensure conversion rates multiply.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "brand",
    title: "Brand Identity & Positioning",
    desc: "We build memorable brands that stand out in crowded markets. From visual identity systems to voice and tone, we ensure your brand signals trust and drives loyalty.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "support",
    title: "Flexible Design Support",
    desc: "Your on-demand creative department. Clear your design backlog and keep your brand evolving with our flexible, credit-based support model. No cost commitments, only pay for what you need.",
    img: "https://images.unsplash.com/photo-1541888057235-900366ebf727?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGridFormed, setIsGridFormed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale lines on scroll
  const scaleX = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  // Rotate center badge
  const rotateBadge = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.4 && !isGridFormed) setIsGridFormed(true);
    if (latest < 0.4 && isGridFormed) {
      setIsGridFormed(false);
      setHoveredIndex(null);
    }
  });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#111] relative w-full font-sans text-white overflow-hidden min-h-[140vh] md:min-h-screen flex items-center justify-center">
       
       <div className="w-full max-w-[1600px] mx-auto h-[100vh] lg:h-[800px] relative flex flex-col items-center justify-center">
         
         {/* THE GRID LINES */}
         <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
            {/* Horizontal Line */}
            <motion.div 
              style={{ scaleX }}
              className="absolute top-1/2 left-0 w-full h-[1px] bg-[#333] origin-center"
            >
               {/* Measurement Labels */}
               <div className="absolute left-[15%] -top-5 font-mono text-[10px] text-[#555]">767px</div>
               <div className="absolute right-[15%] -top-5 font-mono text-[10px] text-[#555]">767px</div>
               {/* End Nodes */}
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-[#555]"></div>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-[#555]"></div>
            </motion.div>
            
            {/* Vertical Line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-1/2 w-[1px] h-full bg-[#333] origin-center"
            >
               {/* Measurement Labels */}
               <div className="absolute top-[20%] -left-10 font-mono text-[10px] text-[#555]">396px</div>
               <div className="absolute bottom-[20%] -left-10 font-mono text-[10px] text-[#555]">403px</div>
               {/* End Nodes */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-[#555]"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-[#555]"></div>
            </motion.div>
            
            {/* Center Motif */}
            <motion.div 
               style={{ rotate: rotateBadge, scale: scaleX }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-[#111] border border-[#333] flex items-center justify-center z-10"
            >
               <div className="w-[40px] h-[40px] rounded-full border-t-2 border-l-2 border-white/50 animate-[spin_4s_linear_infinite]"></div>
            </motion.div>
         </div>

         {/* 4 QUADRANTS CONTENT */}
         <div className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 z-10">
            {services.map((svc, i) => {
               const isTop = i < 2;

               return (
                 <div 
                   key={svc.id}
                   className={`relative px-6 md:px-12 lg:px-20 flex flex-col justify-center md:${isTop ? 'justify-end pb-8 md:pb-16' : 'justify-start pt-8 md:pt-16'} items-start text-left overflow-hidden pointer-events-auto group w-full h-full`}
                   onMouseEnter={() => {
                     if (isGridFormed) setHoveredIndex(i);
                   }}
                   onMouseLeave={() => setHoveredIndex(null)}
                 >

                    <div className="relative w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
                      {/* Left: Text Content */}
                      <div className={`relative z-20 flex flex-col w-full md:w-auto md:max-w-[22rem] lg:max-w-md ${isTop ? 'md:mt-auto' : 'md:mb-auto'}`}>
                         <motion.h3 
                           initial={{ opacity: 0, filter: "blur(10px)" }}
                           whileInView={{ opacity: 1, filter: "blur(0px)" }}
                           viewport={{ once: true, margin: "-50px" }}
                           transition={{ duration: 0.8, delay: 0.1 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                           className={`font-sans font-normal text-3xl md:text-3xl lg:text-4xl text-white m-0 group-hover:-translate-y-2 transition-transform duration-500`}
                         >
                           {svc.title}
                         </motion.h3>
                         
                         {/* Desktop Expandable Description */}
                         <motion.div
                           initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                           animate={{ 
                             height: hoveredIndex === i ? 'auto' : 0, 
                             opacity: hoveredIndex === i ? 1 : 0,
                             filter: hoveredIndex === i ? "blur(0px)" : "blur(10px)"
                           }}
                           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                           className="overflow-hidden md:block hidden w-full"
                           style={{ marginTop: hoveredIndex === i ? 20 : 0 }}
                         >
                            <p className="font-sans text-[#a0a0a0] text-sm md:text-base leading-relaxed mb-6 text-left font-light">
                              {svc.desc}
                            </p>
                            <button className="flex items-center gap-3 border border-white/10 bg-[#1a1a1a] px-6 py-2.5 hover:bg-white hover:text-black transition-colors font-sans text-sm text-white rounded-lg pointer-events-auto cursor-pointer group/btn">
                              Explore
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover/btn:translate-x-1 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </button>
                         </motion.div>
                         
                         {/* Mobile Visible Desc */}
                         <div className="md:hidden mt-4">
                            <p className="font-sans text-[#a0a0a0] text-base leading-relaxed mb-6 text-left font-light">
                              {svc.desc}
                            </p>
                            <button className="flex items-center gap-3 border border-white/10 bg-[#1a1a1a] px-5 py-2.5 hover:bg-white hover:text-black transition-colors font-sans text-sm text-white rounded-lg">
                              Explore
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </button>
                         </div>
                      </div>

                      {/* Right: Floating Image */}
                      <motion.div 
                        key={svc.id + "-img"}
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)", scale: 0.95 }}
                        animate={{ 
                          opacity: hoveredIndex === i ? 1 : 0, 
                          y: hoveredIndex === i ? 0 : 10,
                          filter: hoveredIndex === i ? "blur(0px)" : "blur(10px)",
                          scale: hoveredIndex === i ? 1 : 0.95
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute right-4 lg:right-12 z-0 hidden md:flex rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl pointer-events-none w-[12rem] h-[22rem] lg:w-[15rem] lg:h-[28rem] ${isTop ? 'bottom-0' : 'top-0'}`}
                        style={{
                          transformOrigin: isTop ? 'bottom center' : 'top center'
                        }}
                      >
                         <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                      </motion.div>
                    </div>

                 </div>
               );
            })}
         </div>

       </div>
    </section>
  );
}

