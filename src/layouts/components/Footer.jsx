import React from 'react'
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,        // “X” (formerly Twitter)
  FaFacebook,
  FaYoutube
} from 'react-icons/fa'
import logo from "../../assets/logo/navlogo.png";


function Footer() {
    const baseClasses = "text-[2rem] text-[#F9FAFB] transition-transform duration-200 hover:scale-110";
    return (
        <>
            <div className="bg-shiva-blue flex flex-row items-center mt-[10rem] h-[60vh]">

                <div className="w-[20%] h-[40vh] flex flex-col items-center justify-center">
                    <img src={logo} alt="logo" className="h-[13rem] w-auto filter brightness-0 invert" />
                    <p className="text-primary-bg font-poppins relative top-[-5rem] w-full ml-[9rem]">&copy; 2025 Ahara. All rights reserved.</p>
                </div>

                <div className="w-[15%] h-[40vh] flex flex-col items-start p-[2rem] ml-[4rem]">
                    <h1 className="font-poppins text-[1.3rem] text-primary-bg">COMMUNITY</h1>
                    <hr className="w-[20%] text-primary-bg" />

                    <p className='font-inter mt-[3rem] text-primary-bg'>Blogs</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Community</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Articles</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Lifestyle Tips</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Diet Articles</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Related Professionals</p>
                </div>

                <div className="w-[15%] h-[40vh] flex flex-col items-start p-[2rem] ml-[0.1rem]">
                    <h1 className="font-['Poppins'] text-[1.3rem] text-primary-bg">RESOURCES</h1>
                    <hr className="w-[20%] text-primary-bg" />

                    <p className='font-inter mt-[3rem] text-primary-bg'>Guides and Tutorials</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Meditation Library</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Yoga Pose Index</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Ahara Intelligence</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Nutrition Glossary</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Mobile App</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Events and Webinars</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>FAQs</p>
                    <p className='font-inter mt-[0.6rem] text-primary-bg'>Accessibility Support</p>
                </div>

                <div className="w-[15%] h-[40vh] flex flex-col items-start p-[2rem] ml-[0.1rem]">
                    <h1 className="font-poppins text-[1.3rem] text-primary-bg">COMPANY</h1>
                    <hr className="w-[20%] text-primary-bg" />

                    <p className='font-["Open_Sans"] mt-[3rem] text-primary-bg'>About Us</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Our Team</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Careers</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Press and Media</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Contact Us</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Affiliate Program</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>T & C</p>
                    <p className='font-["Open_Sans"] mt-[0.6rem] text-primary-bg'>Privacy Policy</p>
                </div>

                <div className="w-px h-[50%] bg-primary-bg" />

                <div className="w-[15%] h-[40vh] flex flex-col items-start p-[2rem] ml-[3rem]">
                    <h1 className="font-['Poppins'] text-[1.3rem] text-primary-bg">CONNECT WITH US</h1>
                    <hr className="w-[20%] text-primary-bg" />

                    <div className="w-[70%] mt-[3rem] flex flex-row items-center justify-between">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className={baseClasses} />
                        </a>
                        <p className="text-primary-bg font-medium ml-[1rem] font-poppins">Linkedin</p>
                    </div>

                    <div className="w-[70%] mt-[0.6rem] flex flex-row items-center justify-between">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className={baseClasses} />
                        </a>
                        <p className="text-primary-bg font-medium font-poppins ml-[1rem]">Instagram</p>
                    </div>

                    <div className="w-[70%] mt-[0.6rem] flex flex-row items-center justify-between">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className={baseClasses} />
                        </a>
                        <p className="text-primary-bg font-medium font-poppins ml-[1rem]">Twitter/X</p>
                    </div>

                    <div className="w-[70%] mt-[0.6rem] flex flex-row items-center justify-between">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className={baseClasses} />
                        </a>
                        <p className="text-primary-bg font-medium font-poppins ml-[1rem]">YouTube</p>
                    </div>

                    <div className="w-[70%] mt-[0.6rem] flex flex-row items-center justify-between">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className={baseClasses} />
                        </a>
                        <p className="text-[#F9FAFB] font-medium font-['Poppins'] ml-[1rem]">Facebook</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer