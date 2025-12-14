import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// --- Elegant Spotlight (Brighter) ---
const SpotlightBackground = () => {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const springX = useSpring(x, { stiffness: 25, damping: 25, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 25, damping: 25, mass: 0.8 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      x.set(clientX);
      y.set(clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Spotlight - Increased Opacity for better visibility */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-[90px] pointer-events-none"
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 1
        }}
      />
    </div>
  );
};

// --- Premium Shimmer Card (Brighter Light Beam) ---
const ShimmerCard = ({ title }: { title: string }) => {
  return (
    <div className="relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden group">
      
      {/* 1. The Moving Border Light (Brighter) */}
      <div className="absolute inset-0 z-0">
        {/* Increased opacity from 0.5 to 0.8 for the light beam */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(56,189,248,0.9)_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Mobile: Always visible, increased opacity */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(56,189,248,0.7)_360deg)] animate-[spin_5s_linear_infinite] opacity-100 md:hidden" />
      </div>

      {/* 2. Inner Mask */}
      <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-2xl z-0" />

      {/* 3. Surface Sheen (Brighter) */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
      </div>

      <div className="relative z-20">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">
          Hellerer Lichtstrahl. Deutlich sichtbar, aber immer noch elegant.
        </p>
      </div>
    </div>
  );
};

export default function DesignDemo() {
  return (
    <div className="min-h-screen text-white overflow-hidden selection:bg-cyan-500/30 relative">
      <SpotlightBackground />

      <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          Brighter Light Demo
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center">
          Lina Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">Crystal Clear</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-12">
          Spotlight & Lichtstrahlen verstärkt.<br/>
          Jetzt deutlich sichtbar auf allen Screens.
        </p>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <ShimmerCard title="High Energy" />
          <ShimmerCard title="Bright Core" />
          <ShimmerCard title="Clear Voice" />
        </div>
      </div>
    </div>
  );
}
