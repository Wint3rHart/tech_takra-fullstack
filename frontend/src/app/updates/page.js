"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const posts = [
  { id: 1, heading: "The Future of Web Design", text: "Exploring the latest trends..." },
  { id: 2, heading: "Building Scalable Apps", text: "Learn the best practices..." },
  { id: 3, heading: "Animation in Modern Web", text: "Discover how motion design..." },
  { id: 4, heading: "CSS Grid Mastery", text: "Master the art of layout..." },
  { id: 5, heading: "React Performance Tips", text: "Optimize your React applications..." },
  { id: 6, heading: "TypeScript Benefits", text: "Understanding how type safety..." },
  { id: 7, heading: "Dark Mode Design", text: "Creating beautiful dark themes..." },
  { id: 8, heading: "Responsive Typography", text: "Learn how to create fluid text..." },
  { id: 9, heading: "API Integration Best Practices", text: "Efficiently connect your frontend..." },
  { id: 10, heading: "Accessibility Matters", text: "Building inclusive web experiences..." },
];
console.log(posts.reverse());

const Card = ({ post, index }) => {
  const cardRef = useRef(null);

  // Individual card scroll progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Fade out as card reaches top
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0]);
  
  // Optional: slight scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
      }}
      className="min-h-[350px] sm:min-h-[400px] max-w-4xl mx-auto w-full p-8 rounded-sm mb-8
        bg-gray-800/75 
        shadow-[inset_1px_1px_5px_rgba(212,175,55,0.3),inset_-4px_-4px_7px_rgba(0,0,0,0.4)]
        will-change-transform"
    >
      <div className="text-center">
        <h3 className="w-full font-playfair md:w-[85%] mx-auto text-xl sm:text-xl md:text-4xl lg:text-4xl 
          font-bold text-[#d4af37] leading-tight pb-6 border-b-2 rounded-sm border-gray-500 mb-6
          drop-shadow-[2px_2px_2px_rgba(255,255,255,0.1)]">
          {post.heading}
        </h3>

        <p className="text-lg font-inter sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
          {post.text}
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 0.1], [0, -300]);

  return (
    <section
      ref={containerRef}
      className="min-h-[300vh] bg-gray-900 py-20 px-4 relative bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.7),rgb(0,0,0,.4))] bg-fixed"
    >
      <div className="fixed top-0 left-0 h-[100vh] w-[98vw]">
        {/* Fireflies/Stars Effect */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
        <div className="absolute top-32 right-24 w-2 h-2 bg-white/70 rounded-full animate-pulse shadow-md shadow-white/50"></div>
        <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse shadow-lg shadow-amber-300/50"></div>
        <div className="absolute top-1/3 right-32 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping shadow-sm shadow-white/40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-amber-500/70 rounded-full animate-pulse shadow-md shadow-amber-500/50"></div>
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping shadow-md shadow-white/40"></div>
        <div className="absolute bottom-1/4 right-20 w-1 h-1 bg-amber-200/80 rounded-full animate-pulse shadow-sm shadow-amber-200/60"></div>
        <div className="absolute top-40 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping shadow-sm shadow-white/50"></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse shadow-lg shadow-amber-400/40"></div>
        <div className="absolute top-1/5 left-40 w-1 h-1 bg-white/40 rounded-full animate-ping shadow-sm shadow-white/30"></div>
        
        {/* Larger Pulsing Lights */}
        <div className="absolute top-24 right-40 w-3 h-3 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
        <div className="absolute bottom-24 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse shadow-xl shadow-white/50 blur-sm"></div>
        <div className="absolute top-1/2 left-20 w-2.5 h-2.5 bg-amber-300/40 rounded-full animate-pulse shadow-lg shadow-amber-300/60 blur-sm"></div>
        
        {/* Twinkling Stars */}
        <div className="absolute top-16 right-16 w-0.5 h-0.5 bg-white/90 rounded-full animate-ping shadow-sm shadow-white/70"></div>
        <div className="absolute top-28 left-1/2 w-0.5 h-0.5 bg-white/80 rounded-full animate-ping shadow-sm shadow-white/60"></div>
        <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping shadow-sm shadow-white/50"></div>
        <div className="absolute top-36 right-1/5 w-0.5 h-0.5 bg-white/85 rounded-full animate-ping shadow-sm shadow-white/65"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/6 right-1/6 w-6 h-6 bg-amber-400/20 rounded-full animate-pulse shadow-2xl shadow-amber-400/40 blur-md"></div>
        <div className="absolute bottom-1/6 left-1/6 w-5 h-5 bg-white/15 rounded-full animate-pulse shadow-2xl shadow-white/30 blur-md"></div>
        
        {/* Moving Light Trails */}
        <div className="absolute top-1/3 left-1/2 w-1 h-8 bg-gradient-to-b from-amber-400/60 to-transparent rounded-full animate-pulse shadow-lg shadow-amber-400/50 transform rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-6 bg-gradient-to-t from-white/50 to-transparent rounded-full animate-pulse shadow-md shadow-white/40 transform -rotate-45"></div>
        
        {/* Corner Accent Lights */}
        <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
        <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
        <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
        
        {/* Glowing Particles */}
        <div className="absolute top-12 left-1/4 w-1 h-1 bg-amber-200/80 rounded-full animate-ping shadow-md shadow-amber-200/60"></div>
        <div className="absolute bottom-16 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping shadow-sm shadow-white/50"></div>
        <div className="absolute top-44 right-1/4 w-1 h-1 bg-amber-300/70 rounded-full animate-ping shadow-md shadow-amber-300/50"></div>
      </div>

      <div className="max-w-4xl mx-auto mb-32 text-center">
        <motion.h1 
          style={{ y }}
          className="text-5xl font-cinzel mt-24 sm:text-6xl md:text-5xl font-bold text-[#d4af37] mb-6
            drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)]"
        >
          Updates{" "}
          <strong className="text-stone-200 inline-block drop-shadow-[0_0_6px_rgba(255,255,255,0.01)]">
            &
          </strong>{" "}
          Notifications
        </motion.h1>

        <p className="text-stone-300 text-xl sm:text-2xl font-light [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">
          
        </p>
      </div>

      <div className="relative">
        {posts.reverse().map((post, index) => (
          <Card
            key={post.id}
            post={post}
            index={index}
          />
        ))}
      </div>

      <div className="h-[50vh]" />
    </section>
  );
}