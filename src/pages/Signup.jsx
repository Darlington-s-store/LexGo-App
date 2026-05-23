import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Stepper from '../components/Stepper';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [program, setProgram] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !institution || !studentId.trim() || !studyLevel || !program || !password.trim() || !confirmPassword.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const finalProfile = {
        fullName: fullName.trim(),
        email: email.trim(),
        institution,
        studentId: studentId.trim(),
        studyLevel,
        program,
        password
      };
      localStorage.setItem('lexgo_profile', JSON.stringify(finalProfile));
    } catch (err) {
      console.error(err);
    }
    navigate('/verify-email');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-md py-6">
          <div className="flex flex-col items-center mb-6">
            <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" className="mb-2" />
          </div>

          <Stepper currentStep={step} />

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-lexgo-dark mb-1">
              {step === 1 ? 'Basic Information' : 'Academic Information'}
            </h2>
            <p className="text-gray-500 text-sm">
              {step === 1 ? 'Fill in your personal details' : 'Fill in your academic and security details'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <InputField 
                label="Full Name *"
                type="text"
                placeholder="Enter Your Full Name"
                icon={User}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <InputField 
                label="Email Address *"
                type="email"
                placeholder="Enter your Email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" className="mt-4">
                Next Step
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <SelectField 
                label="Name of Institution *"
                placeholder="Select your institution name"
                options={['Harvard University', 'Yale University', 'Stanford University', 'Ghana School of Law', 'University of Ghana']}
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />
              
              <InputField 
                label="STUDENT ID *"
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <SelectField 
                    label="LEVEL OF STUDY *"
                    placeholder="Select level"
                    options={['Undergraduate', 'Postgraduate']}
                    value={studyLevel}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <SelectField 
                    label="PROGRAM *"
                    placeholder="Select program"
                    options={['LLB', 'JD', 'LLM']}
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    required
                  />
                </div>
              </div>

              <InputField 
                label="PASSWORD *"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <InputField 
                label="CONFIRM PASSWORD *"
                type="password"
                placeholder="Confirm your password"
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
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-lexgo-dark focus:ring-lexgo-dark cursor-pointer"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-gray-500 select-none">
                  By clicking Sign Up, you agree to our <span className="text-[#E27D2C] hover:underline cursor-pointer font-semibold">Terms & Conditions</span> and <span className="text-[#E27D2C] hover:underline cursor-pointer font-semibold">Privacy Policy</span>.
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs sm:text-sm hover:bg-gray-50 transition cursor-pointer text-center"
                >
                  Back
                </button>
                <div className="flex-1">
                  <Button type="submit">
                    Create Account
                  </Button>
                </div>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="font-semibold text-lexgo-dark hover:underline underline-offset-2">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
