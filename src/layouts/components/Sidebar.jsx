import React from 'react'
import { FaHome, FaRegCalendarAlt, FaUtensils, FaChartLine, FaCog, FaBell, FaSeedling } from 'react-icons/fa'
import logo from "../../assets/logo/navlogo.png";

function Sidebar({text1,text2,text3,text4,text5}) {
    const baseClasses = "transform text-[1.7rem] text-[#F9FAFB] transition-transform duration-200 hover:scale-110"
    return (
        <>
            <div className="w-full h-[100%] bg-shiva-blue flex flex-col justify-around">

                <div className="w-[100%] h-fit bg-shiva-blue flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-[80%] h-auto filter brightness-0 invert mt-[-3rem]" />
                </div>

                <div className="w-[100%] h-fit">
                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px]">
                        <FaHome className={baseClasses} />
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">{text1}</h3>
                    </div>

                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px] mt-[0.2rem]">
                        <div className="ml-[3.2rem]">
                            <FaRegCalendarAlt className={baseClasses} />
                        </div>
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">{text2}</h3>
                    </div>

                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px] mt-[0.2rem]">
                        <div className="ml-[3.6rem]">
                            <FaUtensils className={baseClasses} />
                        </div>
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">{text3}</h3>
                    </div>

                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px] mt-[0.2rem]">
                        <div className="ml-[2.7rem]">
                            <FaChartLine className={baseClasses} />
                        </div>
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">{text4}</h3>
                    </div>

                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px] mt-[0.2rem]">
                        <div className="ml-[1.2rem]">
                            <FaCog className={baseClasses} />
                        </div>
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">{text5}</h3>
                    </div>
                </div>

                <div className="w-[80%] h-fit ml-auto mr-auto 
                                bg-white/5 
                                backdrop-blur-md 
                                rounded-[16px] 
                                shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
                                border border-white/30 flex flex-col items-center p-[1rem]">
                    <div className="w-[90%] flex flex-row items-center ml-auto mr-auto justify-center mt-[-3rem] p-[0.7rem] border-none rounded-[10px] mt-[0.2rem]">
                        <div className="ml-[1.2rem]">
                            <FaBell className={baseClasses} />
                        </div>
                        <h3 className="text-primary-bg font-medium font-poppins text-[1.1rem] mt-[0.2rem] ml-[1rem]">Notifications</h3>
                    </div>

                    <hr className="w-[80%] text-primary-bg" />

                    <div className="w-[100%] h-fit mt-[2rem] flex flex-row items-center justify-center">
                        <div className="w-[30%] flex flex-col items-center justify-center">
                            <FaSeedling className="transform text-[5rem] text-primary-bg transition-transform duration-200 hover:scale-110" />
                        </div>

                        <div className="w-[70%] flex flex-col items-center justify-center ml-[1rem]">
                            <p className="text-center w-[100%] text-primary-bg font-poppins">New:</p>
                            <p className="text-center w-[100%] text-primary-bg font-poppins">Growing with Meditation...</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Sidebar