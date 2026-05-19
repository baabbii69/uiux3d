import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Duality() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ["-20%", "5%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["20%", "-5%"]);
  const blurFilter = useTransform(scrollYProgress, [0, 0.4], ["blur(15px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="py-32 w-full overflow-hidden bg-[var(--color-bg-lighter)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Design Side */}
          <motion.div style={{ x: leftX, filter: blurFilter }} className="w-full md:w-1/2 flex flex-col items-start gap-6 border-l md:border-l-0 md:border-r border-[#333] pl-6 md:pl-0 md:pr-12 md:text-right md:items-end">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[var(--color-accent)]">
              The Form
            </h2>
            <p className="text-xl text-[#888] font-light max-w-sm">
              Meticulous UI/UX design focused on spatial harmony, distinctive typography, and immersive interactions.
            </p>
            <ul className="text-sm font-mono text-[#555] flex flex-col gap-2 mt-4">
              <li>01. USER RESEARCH</li>
              <li>02. WIREFRAMING</li>
              <li>03. INTERFACE DESIGN</li>
              <li>04. MOTION SYSTEM</li>
            </ul>
          </motion.div>

          {/* Dev Side */}
          <motion.div style={{ x: rightX, filter: blurFilter }} className="w-full md:w-1/2 flex flex-col items-start gap-6 border-l border-[#333] pl-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[var(--color-accent-alt)]">
              The Function
            </h2>
            <p className="text-xl text-[#888] font-light max-w-sm">
              Robust backend architecture engineered for speed and scalability using Python and Go.
            </p>
            <ul className="text-sm font-mono flex flex-col gap-2 mt-4 text-[#555]">
              <li>01. API ARCHITECTURE</li>
              <li>02. DATABASE DESIGN</li>
              <li>03. SYSTEM SCALABILITY</li>
              <li>04. PIPELINE AUTOMATION</li>
            </ul>
          </motion.div>

        </div>

        <div className="mt-32 w-full max-w-4xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-5xl uppercase font-medium leading-tight"
          >
            I don't just design the surface.<br/>
            Wait, I don't just build the engine either.<br/>
            <span className="text-outline">I engineer the entire vehicle.</span>
          </motion.h3>
        </div>

      </div>
    </section>
  );
}
