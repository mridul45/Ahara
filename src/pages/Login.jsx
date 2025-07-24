import React from 'react'
import Authlayout from '../layouts/Authlayout'
import { useNavigate } from 'react-router-dom'

function Login() {
    
    const navigate = useNavigate();
    return (
        <>
            <Authlayout>
                <div className="bg-nirvana-three backdrop-blur-[16px] border border-nirvana-two rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] w-[70%] h-[80%] flex flex-col items-center justify-center">
                    <h1 className="text-[2.7rem] font-poppins text-center text-shiva-black font-bold">Sign In or</h1>
                    <h1 className="text-[2.7rem] font-poppins text-center text-shiva-black font-bold">Create an Account</h1>

                    <input type="text" placeholder='Email' className='mt-[2rem] w-[80%] p-[1rem] text-[1.2rem] font-inter text-shiva-black rounded-[10px] bg-secondary-white focus:outline-none border border-shiva-black' />
                    <input type="password" placeholder='Password' className='mt-[2rem] w-[80%] p-[1rem] text-[1.2rem] font-inter text-shiva-black rounded-[10px] bg-secondary-white focus:outline-none border border-shiva-black' />
                    <div className="w-[80%] flex justify-end mt-[1rem] font-medium">
                        <p className="text-sm text-shiva-black hover:underline cursor-pointer font-inter">Forgot Password?</p>
                    </div>
                    <button className="font-poppins bg-shiva-black text-shiva-white w-[80%] border-none rounded-[10px] p-[1rem] mt-[2rem] transform transition-transform duration-300 hover:scale-105">
                        Login
                    </button>
                    <button className="font-poppins bg-nirvana-one text-shiva-white w-[80%] border-none rounded-[10px] p-[1rem] mt-[0.8rem] transform transition-transform duration-300 hover:scale-105" onClick={() => navigate('/signup')}>
                        Signup
                    </button>

                    <p className="mt-[2rem] w-[80%] text-center text-[1.3rem] text-shiva-black font-inter">By continuing, you agree to our <span className="underline font-inter">Terms</span></p>
                    <p className="mt-[0.1rem] text-center text-[1.3rem] text-shiva-black font-inter"><span className='underline font-inter'>of Service</span> and Privacy Policy</p>
                </div>
            </Authlayout>
        </>
    )
}

export default Login