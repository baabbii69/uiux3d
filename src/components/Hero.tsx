import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, ContactShadows, Edges, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

function BackgroundGrid() {
  const { mouse } = useThree();
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.x = THREE.MathUtils.lerp(gridRef.current.position.x, mouse.x * 0.5, 0.05);
      gridRef.current.position.y = THREE.MathUtils.lerp(gridRef.current.position.y, mouse.y * 0.5, 0.05);
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[40, 40, '#222', '#111']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]} />
    </group>
  );
}

function InteractiveShape() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { mouse } = useThree();

  useFrame((state) => {
    if (mesh.current) {
      // Rotate organically
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2 + (mouse.y * 0.2);
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2 + (mouse.x * 0.2);
      
      // Smooth scale transitions
      const targetScale = active ? 1.2 : (hovered ? 1.05 : 1);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.08));
    }
    if (material.current) {
      // Smooth material transitions
      material.current.distort = THREE.MathUtils.lerp(material.current.distort, hovered ? 0.6 : 0.3, 0.05);
      material.current.speed = THREE.MathUtils.lerp(material.current.speed, hovered ? 4 : 1.5, 0.05);
      
      // Color transition
      const targetColor = new THREE.Color(hovered ? "#00E5FF" : "#222222");
      material.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => setActive(true)}
        onPointerUp={() => setActive(false)}
      >
        <icosahedronGeometry args={[2, 20]} />
        <MeshDistortMaterial
          ref={material}
          color="#222"
          envMapIntensity={hovered ? 2 : 0.8}
          roughness={0.1}
          metalness={0.9}
        />
        <Edges scale={1.001} threshold={15} color={hovered ? "#fff" : "#00E5FF"} />
        
        {/* Figma bounding box metaphor when hovered */}
        <group visible={hovered}>
          <boxGeometry args={[4.2, 4.2, 4.2]} />
          <Edges color="#00E5FF" scale={1} threshold={15} />
        </group>
      </mesh>
    </Float>
  );
}

const cursors = [
  { id: 1, name: "Sarah_Design", color: "#FF3366", x: "70%", y: "25%", initial: { x: "-100%", y: "0%" } },
  { id: 2, name: "System_Log", color: "#00E5FF", x: "20%", y: "75%", initial: { x: "100%", y: "100%" } },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Custom cursor logic for local user
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  
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


  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center font-sans select-none cursor-none"
    >
      {/* 3D Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 cursor-auto"
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#00E5FF" />
          <Suspense fallback={null}>
            <InteractiveShape />
            <Environment preset="city" />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#00E5FF" />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Decorative Grid overlays */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 pointer-events-none" />

      {/* Top toolbar mimicking design tool */}
      <div className="absolute top-24 left-6 right-6 h-12 border border-white/10 rounded-xl z-30 flex items-center justify-between px-4 bg-[#111]/80 backdrop-blur-md hidden md:flex">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#333]" />
            <div className="w-3 h-3 rounded-full bg-[#333]" />
            <div className="w-3 h-3 rounded-full bg-[#333]" />
          </div>
          <div className="h-4 w-[1px] bg-[#333] mx-2" />
          <div className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Live Canvas
          </div>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex -space-x-2 mr-2">
             <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] border border-[#111] flex items-center justify-center text-[10px] text-black font-bold z-10">U</div>
             <div className="w-8 h-8 rounded-full bg-[#FF3366] border border-[#111] flex items-center justify-center text-[10px] text-white font-bold opacity-50 z-0">S</div>
          </div>
          <span className="text-white/30 font-mono text-[10px]">Auto-Saving...</span>
        </div>
      </div>

      {/* Hero Typography Foreground */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center pt-24 mix-blend-difference">
         <motion.div
           initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           className="px-6 py-2 rounded-full border border-white/30 font-mono text-xs uppercase tracking-widest text-white inline-flex items-center gap-3 mb-8"
         >
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
           Three.js / React Architecture
         </motion.div>

         <motion.h1 
           initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           className="font-display text-[12vw] md:text-[9vw] font-bold uppercase tracking-tighter text-white leading-[0.8] mb-8"
         >
           Creative <br/>
           <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>Computation.</span>
         </motion.h1>

         <motion.p
           initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="font-sans text-lg md:text-2xl text-[#ccc] font-light max-w-2xl px-6"
         >
           Forging interactive systems at the intersection of design, data, and pure rendering power.
         </motion.p>
      </div>

      {/* Floating UI Elements matching the live-collab metaphor */}
      <motion.div 
        drag
        dragMomentum={false}
        className="absolute bottom-[20%] left-[10%] w-[250px] bg-[#111] text-white rounded-lg p-4 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20 cursor-grab active:cursor-grabbing group hidden xl:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
         <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#888]">Properties</span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-white/20" />
               <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            </div>
         </div>
         <div className="space-y-3 font-mono text-[10px] text-[#888]">
            <div className="flex justify-between items-center">
              <span>X</span>
              <div className="bg-white/5 py-1 px-2 rounded w-16 text-white text-right">0.00</div>
            </div>
            <div className="flex justify-between items-center">
              <span>Y</span>
              <div className="bg-white/5 py-1 px-2 rounded w-16 text-white text-right">4.20</div>
            </div>
            <div className="w-full h-[1px] bg-white/5 my-2" />
            <div className="flex justify-between items-center">
              <span>Mesh</span>
              <span className="text-white">Icosahedron</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Fill</span>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
                 <span className="text-white">#00E5FF</span>
              </div>
            </div>
         </div>
      </motion.div>

      {/* Floating Toolbar 2 */}
      <motion.div 
        drag
        dragMomentum={false}
        className="absolute top-[30%] right-[10%] w-[60px] bg-[#111] text-white rounded-lg p-2 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20 flex flex-col gap-2 items-center cursor-grab active:cursor-grabbing hidden xl:flex"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
         <button className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
         </button>
         <button className="w-10 h-10 rounded bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
         </button>
         <button className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
            <span className="font-serif italic text-lg font-bold">T</span>
         </button>
         <button className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
         </button>
      </motion.div>

      {/* Simulated Cursors */}
      {cursors.map((c, i) => (
        <motion.div
           // ... (rest omitted to just apply removal of Local custom cursor)
          key={c.id}
          initial={{ left: c.initial.x, top: c.initial.y }}
          animate={{
            left: c.x,
            top: c.y,
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute z-[60] pointer-events-none drop-shadow-xl flex items-start hidden md:flex"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-1 -top-1">
            <path d="M5.65376 2.00018C5.23194 1.51737 4.41662 1.69654 4.23725 2.31155L0.230713 16.0594C0.0384594 16.7191 0.778848 17.2662 1.38531 16.9135L8.2323 12.9287C8.42398 12.8181 8.64835 12.7845 8.86877 12.8335L17.2755 14.6974C17.9152 14.839 18.4116 14.1539 18.0645 13.6067L5.65376 2.00018Z" fill={c.color}/>
          </svg>
          <div className="ml-5 mt-4 text-[10px] text-black px-2 py-0.5 whitespace-nowrap font-mono font-bold rounded shadow-lg" style={{ backgroundColor: c.color }}>
            {c.name}
          </div>
        </motion.div>
      ))}

    </section>
  );
}
