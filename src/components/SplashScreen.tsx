import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreLogo } from '../pages/Login';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(nextProgress);
      
      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 200);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Empty dependency array to prevent restart on re-renders

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center"
    >
      <div className="relative flex items-center justify-center mb-8">
        {/* Background Circle */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            className="text-slate-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          {/* Progress Circle */}
          <circle
            className="text-amber-500"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900 font-mono tracking-tighter">
            {Math.floor(progress)}<span className="text-sm text-slate-500 ml-0.5">%</span>
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-3 animate-pulse">
        <StoreLogo compact={true} />
        <p className="text-xs font-bold tracking-[3px] text-slate-400 uppercase">
          Loading Experience
        </p>
      </div>
    </motion.div>
  );
};
