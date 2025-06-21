import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import bg_white from '../../assets/login-white.png';
import bg_dark from '../../assets/login-dark.png';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const isDark = useSelector((state) => state.dark.is_Dark)
  const token = searchParams.get('token');
const navigate=useNavigate()
  const handleVerify = async () => {
    try {
      const response = await axios.get(`https://qresolve.duckdns.org/users/verify?token=${token}`);
      toast.success('Email verified successfully!');
      navigate('/')
    } catch (error) {
        console.log(error)
      toast.error('Verification failed.');
    }
  };

  return (
    <>
    {isDark?<div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg_dark})` }}
    >
      <div className="max-w-md w-full p-6 rounded-xl backdrop-blur-md bg-white/5 shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] text-center ">
        <h2 className="font-primary text-xl font-semibold mb-4">Email Verification</h2>
        <p className="mb-6">Click below to verify your email.</p>

        <button
          onClick={handleVerify}
          className="w-full py-2 bg-[#2A2A2A] text-lg font-primary rounded-md hover:bg-[#3a3a3a] transition-colors duration-200 hover:scale-[1.02] cursor-pointer"
        >
          Verify Email
        </button>
      </div>
    </div>:<div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg_white})` }}
    >
      <div className="max-w-md w-full p-6 rounded-xl backdrop-blur-xs shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center">
        <h2 className="font-primary text-xl font-semibold mb-4">Email Verification</h2>
        <p className="mb-6">Click below to verify your email.</p>

        <button
          onClick={handleVerify}
          className="font-primary w-full py-2 bg-[#DEE6E9] text-lg rounded-md hover:bg-[#cfd8db] transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          Verify Email
        </button>
      </div>
    </div>}
    </>
  );
};

export default VerifyEmail;
