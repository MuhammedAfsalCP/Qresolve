import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo_black from '../assets/logo-black.png';
import logo_white from '../assets/logo-white.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isDark = useSelector((state) => state.dark.is_Dark);
    const navigate = useNavigate()
    return (
        <nav className="w-full flex flex-col items-center ">
            {/* Mobile Toggle */}
            <div className="w-full flex md:hidden justify-between items-center px-4 py-3">
                <div className="h-[40px]">
                    <img
                        src={isDark ? logo_white : logo_black}
                        alt="Logo"
                        className="h-full object-contain"
                    />
                </div>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Desktop View */}
            <div
                className={`hidden md:flex w-[80%] h-[60px] rounded-md justify-between items-center px-4 mt-10
        ${isDark ? 'bg-gradient-to-r from-[#1a1919] to-[#1a1a1a]' : 'bg-gradient-to-r from-[#eeeeee] to-[#dcdcdc] border-2'}
        `}
            >
                <div className='w-[10%] h-full flex items-center justify-center'>
                    <img src={isDark ? logo_white : logo_black} alt="Logo" className="h-[80%] object-contain" />
                </div>

                <div className='w-[90%] flex justify-between'>
                    <div className='w-[50%] h-full flex items-center pl-2'>
                        <ul className="flex gap-10 text-md font-primary opacity-75">
                            <li className="cursor-pointer hover:scale-[1.05]">ABOUT</li>
                            <li className="cursor-pointer hover:scale-[1.05]">SERVICES</li>
                            <li className="cursor-pointer hover:scale-[1.05]">CONTACT US</li>
                        </ul>
                    </div>
                    <div className='w-[28%] h-full flex items-center justify-around mr-5'>
                        <button onClick={()=>navigate('/login')} className={`font-primary text-l w-[30%] rounded-md h-[60%] transition-all duration-300 ease-in-out 
              ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}>LOGIN</button>
                        <button onClick={()=>navigate('/register')} className={`font-primary text-l w-[60%] rounded-md h-[60%] transition-all duration-300 ease-in-out 
              ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}>GET STARTED</button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={`md:hidden w-full flex flex-col items-start px-6 py-4 gap-4 shadow-md backdrop-blur-md bg-white/30 dark:bg-black/30 
          ${isDark ? 'text-white' : 'text-black'}`}>
                    <ul className="flex flex-col gap-3 text-md font-primary w-full">
                        <li className="cursor-pointer hover:scale-[1.05]">ABOUT</li>
                        <li className="cursor-pointer hover:scale-[1.05]">SERVICES</li>
                        <li className="cursor-pointer hover:scale-[1.05]">CONTACT US</li>
                    </ul>
                    <div className='flex flex-col gap-2 w-full mt-4'>
                        <button onClick={()=>navigate('/login')} className={`font-primary text-l w-full py-2 rounded-md transition-all duration-300 ease-in-out 
              ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>LOGIN</button>
                        <button onClick={()=>navigate('/register')} className={`font-primary text-l w-full py-2 rounded-md transition-all duration-300 ease-in-out 
              ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>GET STARTED</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;