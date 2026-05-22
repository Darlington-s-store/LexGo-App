import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Stepper from '../components/Stepper';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [program, setProgram] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!institution || !studentId.trim() || !studyLevel || !program || !password.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const step1Data = JSON.parse(localStorage.getItem('lexgo_signup_temp') || '{}');
      const finalProfile = {
        fullName: step1Data.fullName || '',
        email: step1Data.email || '',
        institution,
        studentId,
        studyLevel,
        program,
        password
      };
      localStorage.setItem('lexgo_profile', JSON.stringify(finalProfile));
      localStorage.removeItem('lexgo_signup_temp');
    } catch (err) {
      console.error(err);
    }
    navigate('/verify-email');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full md:w-1/2 flex flex-col items-center p-8 sm:p-12 h-screen overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <div className="flex flex-col items-center mb-6 pt-4">
            <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" className="mb-2" />
          </div>

          <Stepper currentStep={2} />

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-lexgo-dark mb-1">Academic Information</h2>
            <p className="text-gray-500 text-sm">Fill in your academic details</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 pb-8">
            <SelectField 
              label="Name of Institution *"
              placeholder="Select your institution name"
              options={['Harvard University', 'Yale University', 'Stanford University', 'Ghana School of Law', 'University of Ghana']}
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
            
            <InputField 
              label="STUDENT ID"
              type="text"
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <SelectField 
                  label="LEVEL OF STUDY"
                  placeholder="Select level"
                  options={['Undergraduate', 'Postgraduate']}
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <SelectField 
                  label="PROGRAM"
                  placeholder="Select program"
                  options={['LLB', 'JD', 'LLM']}
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  required
                />
              </div>
            </div>

            <InputField 
              label="PASSWORD"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputField 
              label="CONFIRM PASSWORD"
              type="password"
              placeholder="confirm your password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="flex items-start mt-4 mb-6">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-lexgo-dark focus:ring-lexgo-dark"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-500">
                By you clicking Sign Up, you agree to our <span className="text-orange-500 hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-orange-500 hover:underline cursor-pointer">Privacy Policy</span>.
              </label>
            </div>

            <Button type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;
