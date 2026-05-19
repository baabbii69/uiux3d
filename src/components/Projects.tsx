import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, Suspense } from 'react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Icosahedron, TorusKnot, Box, Sphere, Environment } from '@react-three/drei';
import { projects } from '../data/projects';

function InteractiveShape({ type, color }: { type: string; color: string }) {
  return (
    <>
      <OrbitControls enableZoom={false} makeDefault autoRotate autoRotateSpeed={2} />
      <Float rotationIntensity={1.5} floatIntensity={2} speed={2}>
        {type === "icosahedron" && (
          <Icosahedron args={[1.5, 0]}>
            <meshStandardMaterial color={color} wireframe />
          </Icosahedron>
        )}
        {type === "box" && (
          <Box args={[2, 2, 2]}>
            <meshStandardMaterial color={color} wireframe />
          </Box>
        )}
        {type === "sphere" && (
          <Sphere args={[1.5, 32, 32]}>
            <meshStandardMaterial color={color} wireframe />
          </Sphere>
        )}
        {type === "torusKnot" && (
          <TorusKnot args={[1, 0.3, 128, 16]}>
            <meshStandardMaterial color={color} wireframe />
          </TorusKnot>
        )}
      </Float>
    </>
  );
}

export default function ParallaxProjects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  // A subtle background color shift
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#050505", "#111111", "#000000"]
  );

  return (
    <motion.section 
      ref={targetRef} 
      className="h-[400vh] relative"
      style={{ backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-20 left-6 md:left-12 z-20 flex flex-col gap-2 pointer-events-none">
          <h2 className="font-mono text-sm tracking-widest text-[#888] uppercase">03 // Selected works</h2>
          <p className="font-display text-4xl text-white uppercase tracking-tighter">The Evidence.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-6 md:px-32 absolute top-1/2 -translate-y-1/2 mt-16">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="w-[85vw] md:w-[60vw] h-[60vh] flex-shrink-0 flex items-center justify-center relative group"
            >
              {/* Image / Shape container */}
              <div className="absolute inset-0 overflow-hidden bg-[#111] rounded-2xl border border-white/5 cursor-grab active:cursor-grabbing">
                 <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 10]} intensity={1} />
                      <Suspense fallback={null}>
                        <InteractiveShape type={project.shape} color={project.color} />
                      </Suspense>
                    </Canvas>
                 </div>
                 
                 <div className="absolute inset-0 pointer-events-none">
                   <div 
                     className="absolute inset-0 opacity-10 group-hover:opacity-30 mix-blend-screen transition-opacity duration-1000 blur-[100px]"
                     style={{ backgroundColor: project.color }}
                   />
                 </div>
                 
                 <div className="absolute -right-12 -top-12 opacity-5 font-display font-bold text-[30vw] leading-none select-none pointer-events-none group-hover:-translate-x-12 group-hover:translate-y-12 transition-transform duration-1000">
                   0{index + 1}
                 </div>
              </div>

              {/* Foreground content - pointer events none so you can drag 3D object */}
              <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between pointer-events-none">
                <div className="overflow-hidden">
                  <motion.div 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="font-mono text-xs md:text-sm tracking-widest text-[#ccc] backdrop-blur-md bg-black/40 px-4 py-2 border border-white/10 w-max rounded-full uppercase pointer-events-auto"
                  >
                    {project.category}
                  </motion.div>
                </div>
                
                <div className="overflow-hidden flex justify-between items-end pointer-events-auto">
                  <Link to={`/works/${project.id}`} className="block outline-none" data-cursor="pointer">
                    <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white transform group-hover:translate-x-4 transition-transform duration-500 origin-bottom-left cursor-pointer">
                      <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>{project.title}</span>
                    </h3>
                  </Link>
                  <div className="hidden md:block font-mono text-[10px] uppercase text-[#888] pb-4 pr-4 tracking-widest text-right">
                    Drag to interact <br/> Shape: {project.shape}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Ending Card / Call to action */}
          <div className="w-[85vw] md:w-[60vw] h-[60vh] flex-shrink-0 flex items-center justify-center relative">
             <div className="text-center flex flex-col items-center gap-8">
                <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-white">More Archives</h3>
                <Link to="/works" className="font-mono text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors" data-cursor="pointer">
                  View Full Roster
                </Link>
             </div>
          </div>
        </motion.div>
        
      </div>
    </motion.section>
  );
}
