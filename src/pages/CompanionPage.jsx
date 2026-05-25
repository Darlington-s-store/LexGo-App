import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mic, X } from 'lucide-react';

const CompanionPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'speaking'
  const [message, setMessage] = useState('How may i help you');

  useEffect(() => {
    let timer;
    if (status === 'listening') {
      setMessage('Listening...');
      // Simulate speech detection after 3 seconds
      timer = setTimeout(() => {
        setStatus('processing');
      }, 3000);
    } else if (status === 'processing') {
      setMessage('Processing request...');
      // Simulate thinking delay
      timer = setTimeout(() => {
        setStatus('speaking');
      }, 2000);
    } else if (status === 'speaking') {
      setMessage("I'm looking up that legal precedent for you.");
      // Optional: Speech Synthesis voice response
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("I'm looking up that legal precedent for you.");
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setTimeout(() => {
            setStatus('idle');
            setMessage('How may i help you');
          }, 1500);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        timer = setTimeout(() => {
          setStatus('idle');
          setMessage('How may i help you');
        }, 3000);
      }
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleMicClick = () => {
    if (status === 'idle') {
      setStatus('listening');
    } else {
      setStatus('idle');
      setMessage('How may i help you');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#060B18] border border-[#111A30] rounded-[32px] p-8 min-h-[600px] shadow-2xl relative overflow-hidden flex flex-col justify-between items-center text-white animate-fade-in">
      
      {/* Top Capsule Button */}
      <div className="z-10 mt-4">
        <div className="bg-white text-[#060B18] px-6 py-2.5 rounded-full flex items-center gap-2.5 shadow-md font-bold text-sm tracking-tight border border-slate-100">
          <Headphones size={16} className="stroke-[2.5]" />
          <span>Companion</span>
        </div>
      </div>

      {/* Center 3D Iridescent Sphere */}
      <div className="z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          {/* Sphere Image */}
          <img 
            src="/companion-sphere.png" 
            alt="Companion Sphere" 
            className={`w-56 h-56 md:w-64 md:h-64 object-contain rounded-full shadow-2xl relative z-10 transition-all duration-700 ${
              status === 'listening' ? 'scale-105 animate-pulse-slow' : 
              status === 'processing' ? 'scale-100 animate-spin' : 
              status === 'speaking' ? 'scale-105 animate-pulse-slow' : 'animate-spin-slow'
            }`}
          />
          {/* Outer glowing aura ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        </div>

        {/* Status Text */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center text-white mt-8 h-10 select-none max-w-sm">
          {message}
        </h2>
      </div>

      {/* Bottom Row Controls */}
      <div className="z-10 w-full flex items-center justify-center relative mb-6">
        
        {/* Microphone Container with concentric pulsing rings */}
        <div className="relative flex items-center justify-center w-36 h-36">
          
          {/* Outer Pulsing Ring 2 */}
          <div className={`border border-white/5 rounded-full absolute transition-all duration-500 ${
            status === 'listening' ? 'w-32 h-32 opacity-100 animate-ping' : 
            status === 'processing' ? 'w-28 h-28 opacity-60 opacity-0' : 
            status === 'speaking' ? 'w-30 h-30 opacity-80 animate-pulse-slow' : 'w-28 h-28 opacity-40'
          }`} />

          {/* Inner Pulsing Ring 1 */}
          <div className={`border border-white/10 rounded-full absolute transition-all duration-500 ${
            status === 'listening' ? 'w-24 h-24 opacity-100 animate-pulse' : 
            status === 'processing' ? 'w-22 h-22 opacity-80 animate-ping' : 
            status === 'speaking' ? 'w-22 h-22 opacity-90 animate-pulse' : 'w-20 h-20 opacity-60'
          }`} />
          
          {/* Microphone Button */}
          <button 
            onClick={handleMicClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300 relative z-10 ${
              status === 'listening' ? 'bg-red-500 text-white scale-110 hover:bg-red-600' : 'bg-white text-[#060B18] hover:bg-slate-100 hover:scale-105 active:scale-95'
            }`}
            aria-label="Toggle Microphone"
          >
            <Mic size={24} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Close Button X (Positioned on the Right of the Microphone) */}
        <button
          onClick={handleClose}
          className="absolute right-[5%] sm:right-[15%] w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition duration-150 cursor-pointer shadow-md"
          aria-label="Close Assistant"
        >
          <X size={18} />
        </button>

      </div>

    </div>
  );
};

export default CompanionPage;
