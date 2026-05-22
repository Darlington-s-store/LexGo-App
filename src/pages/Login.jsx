import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    navigate('/dashboard'); // Redirect to student dashboard
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <Logo color="#0A1128" textClass="text-lexgo-dark" size="small" className="mb-2" />
            <h2 className="text-3xl font-bold text-lexgo-dark mb-2">Welcome Back!</h2>
            <p className="text-gray-500 text-sm">Log In to Unlock the Experience</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField 
              label="Email"
              type="email"
              placeholder="Enter your Email"
              icon={Mail}
            />
            
            <InputField 
              label="password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
            />

            <div className="flex justify-end mb-6">
              <a href="#" className="text-sm font-medium text-lexgo-dark hover:underline underline-offset-4">
                Forgot Password
              </a>
            </div>

            <Button type="submit">
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account? <Link to="/signup-step-1" className="font-semibold text-lexgo-dark hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
