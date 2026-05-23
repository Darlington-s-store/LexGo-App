import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock } from 'lucide-react';
import Logo from '../components/Logo';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pendingRole, setPendingRole] = useState('');

  const handleRoleSelect = (role) => {
    if (role === 'student') {
      navigate('/signup');
    } else {
      setPendingRole(role === 'lecturer' ? 'Lecturer' : 'Law Aspirant');
      setShowModal(true);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-lexgo-dark pattern-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center z-10">
        <Logo color="white" textClass="text-white" size="large" className="mb-12" />
        
        <div className="w-full space-y-4">
          <button 
            onClick={() => handleRoleSelect('student')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg cursor-pointer"
          >
            Student
          </button>
          <button 
            onClick={() => handleRoleSelect('lecturer')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg cursor-pointer"
          >
            Lecturer
          </button>
          <button 
            onClick={() => handleRoleSelect('aspirant')}
            className="w-full bg-white text-lexgo-dark font-semibold py-4 rounded-lg hover:bg-gray-100 transition shadow-sm text-lg cursor-pointer"
          >
            Law Aspirant
          </button>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col items-center text-center">
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg text-gray-500 hover:text-lexgo-dark bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4 mt-2">
              <Clock size={24} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-lexgo-dark mb-2">
              {pendingRole} Access Coming Soon
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
              We are working hard to bring the {pendingRole} portal online. In the meantime, you can explore the platform by signing up as a Student.
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/signup');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-lexgo-dark text-white font-bold text-xs hover:bg-opacity-95 transition cursor-pointer text-center"
              >
                Sign Up as Student
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelection;
