import React, { useState } from 'react'
import bg_white from '../../assets/login-white.png'
import bg_black from '../../assets/login-dark.png'
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { useFormik } from 'formik';
const APIURL = import.meta.env.VITE_API_URL;
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const isDark = useSelector((state) => state.dark.is_Dark)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${APIURL}/users/login`, values);
                console.log("Login successful:", response.data);
                navigate('/')
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
            }
        },
    });

    return (
        <>
            {isDark ? <div
                className="bg-cover bg-center min-h-screen w-full flex justify-center items-center px-4"
                style={{ backgroundImage: `url(${bg_black})` }}
            >
                <form
                    onSubmit={formik.handleSubmit}
                    className="w-[90%] max-w-md min-h-[400px] p-6 rounded-xl backdrop-blur-md bg-white/5 shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] text-white flex flex-col justify-center gap-4"
                >
                    <h2 className="font-primary text-2xl md:text-3xl text-center opacity-80">LOGIN</h2>
                    <div className="w-full border-b-2 flex items-center gap-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full h-10 bg-transparent placeholder-white focus:outline-none"
                        />
                        <MdOutlineEmail className="text-xl text-white" />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-400 text-sm">{formik.errors.email}</p>
                    )}
                    <div className="w-full border-b-2 flex items-center gap-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full h-10 bg-transparent placeholder-white focus:outline-none"
                        />
                        <IoKeyOutline className="text-xl text-white" />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-400 text-sm">{formik.errors.password}</p>
                    )}
                    <div className="w-full text-right text-sm opacity-65">
                        <h4>Forget Password?</h4>
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#2A2A2A] text-lg font-primary rounded-md hover:cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                    <div className="w-full text-center text-sm opacity-65">
                        <h4>Don’t have an account? <span className="underline cursor-pointer">Register</span></h4>
                    </div>
                </form>
            </div>
                : <div
                    className="bg-cover bg-center h-[100vh] w-[100vw] flex justify-center items-center"
                    style={{ backgroundImage: `url(${bg_white})` }}
                >
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-[90%] max-w-md min-h-[400px] p-6 rounded-xl backdrop-blur-xs shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col justify-center gap-4 text-black"
                    >
                        <h2 className="font-primary text-2xl md:text-3xl text-center opacity-80">LOGIN</h2>
                        <div className="w-full border-b-2 flex items-center gap-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full h-10 bg-transparent focus:outline-none placeholder-gray-500"
                            />
                            <MdOutlineEmail className="text-xl text-gray-500" />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-400 text-sm">{formik.errors.email}</p>
                        )}
                        <div className="w-full border-b-2 flex items-center gap-2">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full h-10 bg-transparent focus:outline-none placeholder-gray-500"
                            />
                            <IoKeyOutline className="text-xl text-gray-500" />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-400 text-sm">{formik.errors.password}</p>
                        )}
                        <div className="w-full text-right opacity-65 text-sm">
                            <h4>Forget Password?</h4>
                        </div>
                        <div className="w-full">
                            <button
                                type="submit"
                                className="font-primary w-full py-2 bg-[#DEE6E9] text-lg hover:cursor-pointer rounded-md"
                            >
                                Login
                            </button>
                        </div>
                        <div className="w-full text-center opacity-65 text-sm">
                            <h4>Don’t have an account? <span className="underline cursor-pointer">Register</span></h4>
                        </div>
                    </form>
                </div>}
        </>
    )
}
