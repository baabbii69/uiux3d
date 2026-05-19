export const projects = [
  {
    id: "01",
    title: "Project Zero",
    category: "CREATIVE DEV / UI ARCHITECTURE",
    description: "An exploratory digital space for architectural visualization, blending real-time rendering with web-native interaction models.",
    challenges: [
      "The primary constraint was maintaining 60fps on mobile browsers while tracking over 10,000 real-time nodes.",
      "We developed a custom shader pipeline in WebGL to offload visual processing from the main thread, resulting in a 400% performance increase."
    ],
    year: "2024",
    client: "Internal Research",
    role: "Lead Engineer / Designer",
    tech: ["React Three Fiber", "GLSL", "Framer Motion", "Tailwind CSS"],
    heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=100&w=3000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1541888057235-900366ebf727?q=100&w=2500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=100&w=2500&auto=format&fit=crop"
    ],
    link: "/works/01",
    color: "#ff4e00",
    shape: "icosahedron"
  },
  {
    id: "02",
    title: "Nexus Platform",
    category: "UX STRATEGY / E-COMMERCE",
    description: "Real-time collaborative data visualization environment for logistics. We built a custom WebGL engine to handle 100k+ data points at 60fps.",
    challenges: [
      "Handling real-time state synchronization across multiple users without desyncing the 3D viewport.",
      "Implemented an authoritative server model using WebSockets to guarantee state parity, paired with client-side prediction for zero-latency interactions."
    ],
    year: "2025",
    client: "Nexus Global",
    role: "Frontend Architect",
    tech: ["React", "Three.js", "WebSockets", "Zustand"],
    heroImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=100&w=3000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=100&w=2500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=100&w=2500&auto=format&fit=crop"
    ],
    link: "/works/02",
    color: "#ffffff",
    shape: "box"
  },
  {
    id: "03",
    title: "Spatial OS",
    category: "PRODUCT DESIGN / FULLSTACK",
    description: "A web-based operating system focused entirely on audio routing and spatial logic.",
    challenges: [
      "Building a window management system that felt as fluid as a native OS within a standard DOM environment.",
      "Optimizing complex CSS transforms and avoiding layout thrashing during drag-and-drop operations."
    ],
    year: "2025",
    client: "SoundCore",
    role: "UX Engineer",
    tech: ["React", "Framer Motion", "Web Audio API", "SVG"],
    heroImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=100&w=3000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=100&w=2500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=100&w=2500&auto=format&fit=crop"
    ],
    link: "/works/03",
    color: "#00E5FF",
    shape: "sphere"
  },
  {
    id: "04",
    title: "The Archive",
    category: "3D EXPERIENCES / WEBGL",
    description: "Generative AI-powered library of brutalist design artifacts.",
    challenges: [
      "Integrating streaming AI responses directly into the layout without jarring visual shifts.",
      "Developing a custom masonry algorithm that resolves variable-height images seamlessly."
    ],
    year: "2026",
    client: "Foundation Arts",
    role: "Full-Stack Developer",
    tech: ["Next.js", "GPT-4", "Tailwind CSS", "Vercel AI SDK"],
    heroImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=100&w=3000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=100&w=2500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=100&w=2500&auto=format&fit=crop"
    ],
    link: "/works/04",
    color: "#ff0055",
    shape: "torusKnot"
  }
];

export const getProjectMap = () => {
  const map: Record<string, any> = {};
  projects.forEach((p) => {
    map[p.id] = p;
  });
  return map;
};
