import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Stepper from '../components/Stepper';

const SignupStep1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      localStorage.setItem('lexgo_signup_temp', JSON.stringify({ email, password, fullName }));
    } catch (err) {
      console.error(err);
    }
    navigate('/signup-step-2');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" className="mb-2" />
          </div>

          <Stepper currentStep={1} />

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-lexgo-dark mb-1">Basic Information</h2>
            <p className="text-gray-500 text-sm">Fill in your personal details</p>
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            <InputField 
              label="Email"
              type="email"
              placeholder="Enter your Email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <InputField 
              label="password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputField 
              label="Full Name"
              type="text"
              placeholder="Enter Your Full Name"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Button type="submit" className="mt-4">
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="font-semibold text-lexgo-dark hover:underline underline-offset-2">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupStep1;
