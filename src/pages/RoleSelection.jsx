import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // You could save the role to state/context here
    navigate('/signup-step-1');
  };

  return (
    <div className="min-h-screen bg-lexgo-dark pattern-bg flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-sm flex flex-col items-center z-10">
        <Logo color="white" textClass="text-white" size="large" className="mb-12" />
        
        <div className="w-full space-y-4">
          <button 
            onClick={() => handleRoleSelect('student')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg"
          >
            Student
          </button>
          <button 
            onClick={() => handleRoleSelect('lecturer')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg"
          >
            Lecturer
          </button>
          <button 
            onClick={() => handleRoleSelect('aspirant')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg"
          >
            Law Aspirant
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
