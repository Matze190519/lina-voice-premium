import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function PremiumCard({ children, className, ...props }: PremiumCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* 1. The Moving Border Light (Brighter) */}
      <div className="absolute inset-0 z-0">
        {/* Increased opacity from 0.5 to 0.8 for the light beam */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(56,189,248,0.9)_360deg)] animate-[spin_4s_linear_infinite] opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Inner Mask - Increased inset to 2px for thicker, more visible border */}
      <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-[inherit] z-0" />

      {/* 3. Surface Sheen (Brighter) */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none overflow-hidden rounded-[inherit]">
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
      </div>

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
