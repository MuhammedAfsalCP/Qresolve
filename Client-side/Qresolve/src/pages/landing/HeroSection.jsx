import React from 'react'
import Nav from '../../components/Nav'
import { FaArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
export const HeroSection = () => {
    const isDark = useSelector((state) => state.dark.is_Dark)
    return (
        <>
            {isDark ? <div className="min-h-screen w-full bg-black flex flex-col items-center   justify-between">

                {/* Navbar */}
                <div className='w-full h-[40vh]  flex justify-center'>
                    <Nav />
                </div>

                {/* Hero Content */}
                <div className='w-[100vw] h-[60vh] flex flex-col justify-between'>
                    <div className="flex flex-col items-center text-center gap-5">
                        <h1 className="text-5xl md:text-6xl font-bold font-primary">
                            IT HELP, REIMAGINED
                        </h1>
                        <p className="text-[#3b3b3b] text-md max-w-[600px] font-primary">
                            Get AI-powered solutions to your IT issues or connect with certified experts in minutes.
                        </p>
                        <button className="bg-[#DFDFDF] text-black text-sm px-4 py-2 rounded-md 
hover:bg-[#FFD700] hover:text-black 
transition-all duration-300 ease-in-out font-primary
">
                            Try For Free
                        </button>
                        <div className="mt-10 animate-bounce flex justify-center">
                            <div className="w-10 h-10  border-1 rounded-full flex items-center justify-center">
                                <FaArrowDown className='text-xl' />
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className="min-h-screen w-full bg-white flex flex-col items-center   justify-between">

                {/* Navbar */}
                <div className='w-full h-[40vh]  flex justify-center'>
                    <Nav />
                </div>

                {/* Hero Content */}
                <div className='w-[100vw] h-[60vh] flex flex-col justify-between'>
                    <div className="flex flex-col items-center text-center gap-5">
                        <h1 className="text-5xl md:text-6xl font-bold font-primary">
                            IT HELP, REIMAGINED
                        </h1>
                        <p className="text-gray-500 text-md max-w-[600px] font-primary">
                            Get AI-powered solutions to your IT issues or connect with certified experts in minutes.
                        </p>
                        <button className="bg-[#2A2A2A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3b3b3b] transition-all font-primary">
                            Try For Free
                        </button>
                        <div className="mt-10 animate-bounce flex justify-center">
                            <div className="w-10 h-10  border-1 rounded-full flex items-center justify-center">
                                <FaArrowDown className='text-xl' />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>}
        </>
    )
}
