import React from 'react';
import Logo from './Logo';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-lexgo-dark pattern-bg flex-col items-center justify-center relative overflow-hidden">
      {/* 
        The background pattern is handled by the .pattern-bg class in index.css.
      */}
      <Logo color="white" textClass="text-white" className="z-10" />
    </div>
  );
};

export default Sidebar;
