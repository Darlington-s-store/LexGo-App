import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/Button';

const Success = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6">
      {/* Clean white card layout with soft shadows and rounded corners */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col items-center text-center">
        
        {/* Dark circular badge containing a white checkmark icon */}
        <div className="w-16 h-16 bg-lexgo-dark rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Check className="text-white" size={32} strokeWidth={3} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-lexgo-dark mb-4 tracking-tight">
          Account Created Successfully
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xs sm:max-w-sm">
          Welcome aboard. Your account has been successfully set up. You now have access to explore legal courses, take quizzes, and review your assessments.
        </p>

        {/* Go to Dashboard button */}
        <Button onClick={handleGoToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Success;
