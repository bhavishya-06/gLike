import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccess = (credentialResponse: any) => {
    console.log('Google Login Successful:', credentialResponse);
    onLoginSuccess();
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });
    // Add your form submission logic here
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://wallpapers.com/images/hd/4k-tech-cgoif1s63fsby58y.jpg')] flex items-center justify-center px-4">
      <div className="max-w-[350px] w-full bg-gradient-to-b from-white to-[#f4f7fb] rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,0.878)] m-5">
        <div className="text-center font-black text-3xl text-[#1089d3]">
          Sign In
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            required
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-x-2 border-transparent focus:outline-none focus:border-[#12B1D1]"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            required
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-x-2 border-transparent focus:outline-none focus:border-[#12B1D1]"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <span className="block mt-3 ml-3">
            <a href="#" className="text-xs text-[#0099ff] no-underline">
              Forgot Password?
            </a>
          </span>
          
          <button
            type="submit"
            className="w-full font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white py-4 my-5 rounded-[20px] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.878)] border-none transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.878)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.878)]"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6">
          <span className="block text-center text-xs text-[#aaa]">
            Or Sign in with
          </span>
          <div className="w-full flex justify-center gap-4 mt-2">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
        
        <span className="block text-center mt-4">
          <a href="#" className="text-[9px] text-[#0099ff] no-underline">
            Learn user licence agreement
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
