import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import Expertise from '../components/Expertise';
import ParallaxProjects from '../components/Projects';
import Capabilities from '../components/Capabilities';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="bg-[var(--color-bg-dark)] min-h-screen"
    >
      <Hero />
      <Philosophy />
      <Expertise />
      <ParallaxProjects />
      <Capabilities />
      <Footer />
    </motion.div>
  );
}
