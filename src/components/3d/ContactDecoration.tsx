import React from 'react';
import { useReducedMotion } from 'framer-motion';

export const ContactDecoration: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div 
      className="absolute top-12 right-12 md:top-24 md:right-24 pointer-events-none z-0" 
      aria-hidden="true"
    >
      <div 
        className={`w-24 h-24 md:w-32 md:h-32 rounded-full border border-lime opacity-15 
          ${shouldReduceMotion ? '' : 'animate-float-slow'}`}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-lime rounded-full opacity-50" />
      </div>
    </div>
  );
};
