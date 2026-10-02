import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const BackgroundElements: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const elements = [
    { type: 'dot', top: '15%', left: '10%', size: 'w-2 h-2', delay: '0s', tint: 'bg-lime' },
    { type: 'ring', top: '25%', left: '85%', size: 'w-6 h-6 border-2', delay: '1s', tint: 'border-ink' },
    { type: 'cross', top: '45%', left: '15%', size: 'w-4 h-4', delay: '2s', tint: 'text-lime' },
    { type: 'diamond', top: '65%', left: '80%', size: 'w-3 h-3', delay: '0.5s', tint: 'bg-ink' },
    { type: 'dot', top: '85%', left: '20%', size: 'w-1.5 h-1.5', delay: '1.5s', tint: 'bg-lime' },
    { type: 'ring', top: '10%', left: '70%', size: 'w-8 h-8 border-[1px]', delay: '0.2s', tint: 'border-lime' },
    { type: 'cross', top: '35%', left: '90%', size: 'w-3 h-3', delay: '2.5s', tint: 'text-ink' },
    { type: 'diamond', top: '75%', left: '10%', size: 'w-2 h-2', delay: '1.2s', tint: 'bg-lime' },
    { type: 'dot', top: '55%', left: '75%', size: 'w-2.5 h-2.5', delay: '0.8s', tint: 'bg-ink' },
    { type: 'ring', top: '90%', left: '85%', size: 'w-5 h-5 border-[1px]', delay: '2.2s', tint: 'border-lime' },
  ];

  const activeElements = isMobile ? elements.slice(0, 4) : elements;

  const getElementStyle = (el: any) => {
    const baseStyle = `${el.size} absolute ${shouldReduceMotion ? '' : 'animate-float-slow'} opacity-[0.06] pointer-events-none`;
    
    switch (el.type) {
      case 'dot':
        return `${baseStyle} ${el.tint} rounded-full`;
      case 'ring':
        return `${baseStyle} ${el.tint} rounded-full bg-transparent`;
      case 'diamond':
        return `${baseStyle} ${el.tint} rotate-45`;
      case 'cross':
        return `${baseStyle} flex items-center justify-center`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {activeElements.map((el, i) => (
        <div
          key={i}
          className={getElementStyle(el)}
          style={{
            top: el.top,
            left: el.left,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'cross' && (
            <div className={`relative w-full h-full ${el.tint}`}>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-current -translate-x-1/2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
