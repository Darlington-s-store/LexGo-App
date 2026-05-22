import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';
import Button from '../components/Button';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['3', '4', '2', '5']);
  const [focusedIndex, setFocusedIndex] = useState(3); // Start with index 3 focused to match screenshot state
  const inputRefs = useRef([]);

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/verify-phone'); // Redirect to phone verification after email verification
  };

  const handleChange = (value, index) => {
    // Only allow numeric input
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only keep last digit
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Backspace on empty input goes back
        inputRefs.current[index - 1].focus();
        setFocusedIndex(index - 1);
      } else {
        // Backspace on filled input clears it
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full md:w-1/2 flex flex-col p-8 sm:p-12 relative min-h-screen justify-between">
        {/* Top Header Row with Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="self-start flex items-center justify-center border border-gray-300 text-lexgo-dark font-medium rounded-lg px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>

        {/* Centered Main Content Area */}
        <div className="w-full max-w-md mx-auto flex flex-col justify-center flex-grow py-8">
          <div className="flex flex-col items-center mb-8">
            {/* Small Logo with subtext */}
            <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" className="mb-4" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-lexgo-dark text-center mb-4">Email Verification</h2>
          <p className="text-gray-500 text-sm text-center mb-10 max-w-sm mx-auto leading-relaxed">
            Enter the verification code we just sent on your email address kwe***************@gmail.com
          </p>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-center gap-4 sm:gap-6">
              {code.map((val, i) => {
                const isSelected = focusedIndex === i;
                return (
                  <input
                    key={i}
                    ref={el => (inputRefs.current[i] = el)}
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onFocus={() => setFocusedIndex(i)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 text-center text-3xl font-bold rounded-2xl transition-all duration-200 focus:outline-none
                      ${isSelected 
                        ? 'bg-white border-2 border-lexgo-dark shadow-sm' 
                        : 'bg-[#FAF6F6] border border-transparent'
                      }
                    `}
                  />
                );
              })}
            </div>

            <Button type="submit">
              Verify Code
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Didn't receive code? <button type="button" className="font-bold text-lexgo-dark hover:underline underline-offset-4 cursor-pointer">Resend</button>
          </p>
        </div>

        {/* Empty bottom spacer to match flex layout alignment */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default EmailVerification;

