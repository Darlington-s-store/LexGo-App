import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/success');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Premium pulsing indicator dot */}
      <div className="relative flex items-center justify-center mb-6 w-12 h-12">
        <div className="w-3.5 h-3.5 bg-lexgo-dark rounded-full animate-ping absolute opacity-75"></div>
        <div className="relative w-3.5 h-3.5 bg-lexgo-dark rounded-full"></div>
      </div>
      
      {/* Loading text */}
      <p className="text-lexgo-dark font-semibold text-lg md:text-xl tracking-tight text-center">
        Please wait... setting things up
      </p>
    </div>
  );
};

export default SettingUp;
