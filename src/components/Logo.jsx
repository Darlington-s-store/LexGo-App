import React from 'react';

const Logo = ({ className = '', color = 'white', textClass = 'text-white', size = 'large' }) => {
  const isLarge = size === 'large';
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isLarge ? "w-28 h-28 md:w-32 md:h-32 mb-4" : "w-16 h-16 mb-2"}
      >
        {/* Top Ball */}
        <circle cx="50" cy="9.5" r="4.5" fill={color} />
        
        {/* Stem */}
        <line x1="50" y1="14" x2="50" y2="22" stroke={color} strokeWidth="3" />
        
        {/* Crossbeam */}
        <line x1="16" y1="24" x2="84" y2="24" stroke={color} strokeWidth="4" />
        
        {/* Left Hanger Strings */}
        <path d="M 6,54 L 16,24 L 26,54" stroke={color} strokeWidth="2.5" />
        
        {/* Left Scale Pan */}
        <path d="M 6,54 L 26,54 A 10,9 0 0 1 6,54 Z" fill={color} />
        
        {/* Right Hanger Strings */}
        <path d="M 74,54 L 84,24 L 94,54" stroke={color} strokeWidth="2.5" />
        
        {/* Right Scale Pan */}
        <path d="M 74,54 L 94,54 A 10,9 0 0 1 74,54 Z" fill={color} />
        
        {/* Pillar */}
        <path 
          d="M 44,24 L 56,24 C 55,26 53,28 53,30 L 53,68 C 53,74 55,78 57,82 L 43,82 C 45,78 47,74 47,68 L 47,30 C 47,28 45,26 44,24 Z" 
          fill={color} 
        />
        
        {/* Pedestal Base */}
        <path 
          d="M 21,88 L 79,88 C 79,85 78,82 75,82 L 25,82 C 22,82 21,85 21,88 Z" 
          fill={color} 
        />
      </svg>
      <div className={`text-center ${textClass}`}>
        <h1 className={`${isLarge ? "text-4xl md:text-5xl" : "text-2xl"} font-bold tracking-tight`}>LexGo</h1>
        <p className={`${isLarge ? "text-lg md:text-xl" : "text-xs"} font-light tracking-wide mt-1`}>Law on the Go</p>
      </div>
    </div>
  );
};

export default Logo;
