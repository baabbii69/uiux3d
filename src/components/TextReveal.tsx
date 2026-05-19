import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export default function TextReveal({ text, className, highlightWords = [] }: TextRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "start 20%"]
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={cn("flex flex-wrap gap-x-[1.5vw] gap-y-[1vw]", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        // Setup opacity and blur based on scroll
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const y = useTransform(scrollYProgress, [start, end], [10, 0]);
        // const filter = useTransform(scrollYProgress, [start, end], ['blur(8px)', 'blur(0px)']);
        // Note: filter is performance heavy during fast scrolling, let's stick to opacity/y for a cleaner look

        const isHighlighted = highlightWords.includes(word.replace(/[^a-zA-Z]/g, ''));

        return (
          <motion.span 
            key={i} 
            style={{ opacity, y }}
            className={isHighlighted ? "text-[var(--color-accent)] font-medium" : ""}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
