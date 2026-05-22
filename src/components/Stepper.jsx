import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center text-sm font-medium mb-2">
        <span>Step {currentStep} of 2</span>
        <span>{currentStep === 1 ? 'Basic Information' : 'Academic Information'}</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 relative">
        <div 
          className="bg-lexgo-dark h-2 rounded-full transition-all duration-300"
          style={{ width: currentStep === 1 ? '50%' : '100%' }}
        />
      </div>

      {/* Circles */}
      <div className="flex justify-between items-center px-4 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-lexgo-dark text-white font-bold text-lg mb-2 shadow-sm">
            {currentStep > 1 ? <Check size={20} /> : '1'}
          </div>
          <span className="text-xs font-semibold text-lexgo-dark">Basic Info</span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 shadow-sm ${currentStep === 2 ? 'bg-lexgo-dark text-white' : 'bg-gray-50 text-lexgo-dark'}`}>
            2
          </div>
          <span className={`text-xs ${currentStep === 2 ? 'font-semibold text-lexgo-dark' : 'text-gray-500'}`}>Academic Info</span>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
