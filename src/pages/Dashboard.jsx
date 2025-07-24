import React from 'react'
import { GiMeditation } from 'react-icons/gi';
// import CircularProgress from '../Components/CircularProgress';
import CircularProgressIndicator from '../components/CircularProgressIndicator';
import { FaMicrochip } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import bgImage from '../assets/backgrounds/util_image_one.jpg';
import { FaPlay } from 'react-icons/fa'
import Sidebar from '../layouts/components/Sidebar';


function Dashboard() {
    return (
        <>
            <div className="w-[100vw] h-[100vh] bg-primary-bg flex flex-row">

                <div className="w-[20%] h-[100%] bg-shiva-blue flex flex-col justify-around over">
                    <Sidebar text1="Home" text2="My Sessions" text3="Meal Planner" text4="Progsthics" text5="Settings"/>
                </div>

                <div className="w-[80%] h-[100%] flex flex-col">

                    <div className="w-[full] h-fit">
                        <h1 className="text-[3rem] font-poppins font-semibold text-shiva-black ml-[2rem] mt-[2rem]">My Dashboard</h1>
                    </div>

                    <div className="w-full h-fit flex flex-row mt-[2rem] ml-[2rem]">

                        <div className="w-[25%] flex flex-col bg-secondary-white p-[2rem] rounded-[10px] shadow-md">
                            <p className='text-[1.6rem] font-medium font-inter'>Session Completion</p>
                            <p className='text-[3rem] font-semibold font-inter'>68</p>
                            <p className="text-[1.2rem] font-inter">Sessions Completed</p>
                        </div>

                        <div className="w-[25%] flex flex-col bg-secondary-white p-[2rem] rounded-[10px] shadow-md ml-[2rem]">
                            <p className='text-[1.6rem] font-medium font-inter'>Streak</p>
                            <p className='text-[3rem] font-semibold font-inter'>8450 Kcal</p>
                            <p className="text-[1.2rem] font-inter">Current Streak</p>
                        </div>

                        <div className="w-[25%] flex flex-col bg-secondary-white p-[2rem] rounded-[10px] shadow-md ml-[2rem]">
                            <p className='text-[1.6rem] font-medium font-inter'>Today's Nutrients</p>
                            <div className="w-full h-full flex flex-row items-center justify-evenly">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-[2.8rem] mt-[1rem]">🥬</p>
                                    <p className="text-[1.2rem] font-inter">Greens</p>
                                </div>

                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-[2.8rem] mt-[1rem]">🍊</p>
                                    <p className="text-[1.2rem] font-inter">Sweet</p>
                                </div>

                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-[2.8rem] mt-[1rem]">🧀</p>
                                    <p className="text-[1.2rem] font-inter">Cheese</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="w-full h-fit flex flex-row mt-[2rem] ml-[2rem]">

                        <div className="w-[25%] h-fit bg-secondary-white flex flex-col  items-center rounded-[10px] shadow-md">
                            <h2 className="text-[1.3rem] font-semibold font-inter mt-[1.1rem]">Upcomming Sessions</h2>
                            <div className="w-[96%] h-fit flex items-center justify-evenly mt-[1rem] p-[1rem] rounded-[10px]">
                                <div className="w-[10px] h-[10px] rounded-[100%] bg-amber-400"></div>
                                <p className="font-medium font-inter">Fri,11th July</p>
                                <p className="font-medium font-inter">35 Mins</p>
                            </div>

                            <div className="w-[96%] h-fit flex items-center justify-evenly mt-[1rem] p-[1rem] rounded-[10px]">
                                <div className="w-[10px] h-[10px] rounded-[100%] bg-amber-400"></div>
                                <p className="font-medium font-inter">Fri,11th July</p>
                                <p className="font-medium font-inter">35 Mins</p>
                            </div>

                            <div className="w-[96%] h-fit flex items-center justify-evenly mt-[1rem] p-[1rem] rounded-[10px]">
                                <div className="w-[10px] h-[10px] rounded-[100%] bg-amber-400"></div>
                                <p className="font-medium font-inter">Fri,11th July</p>
                                <p className="font-medium font-inter">35 Mins</p>
                            </div>
                        </div>

                        <div className="w-[25%] h-fit bg-secondary-white flex flex-col items-center rounded-[10px] shadow-md ml-[2rem] p-[1rem]">
                            <h2 className="text-[1.3rem] font-inter font-semibold">Calm Progress</h2>
                            <div className="mt-[2rem]">
                                <CircularProgressIndicator value={75} size={120} />
                            </div>
                            <p className="w-[90%] font-medium font-inter text-center mt-[1rem]">You Have reached the 75% mark..</p>
                            <p className="w-[90%] font-medium font-inter text-center">Keep Up the good work.✌️</p>
                        </div>

                        <div className="w-[25%] h-fit bg-secondary-white flex flex-col rounded-[10px] shadow-md ml-[2rem] items-center p-[1rem]">
                            <h2 className="text-[1.3rem] font-inter font-semibold">Mindful Neural Engine</h2>
                            <div className="mt-[1rem] flex flex-row] items-center justify-center">
                                <GiMeditation
                                    size={80}
                                    className="text-shiva-blue ml-4"
                                    title="Person in meditation pose"
                                />
                            </div>
                            <p className='text-justify mt-[0.8rem] font-inter'>Performed Vajrasana for 15 minutes. The Neural Engine assited by correcting the posture...</p>

                            <h2 className="text-[1.5rem] font-inter font-semibold mt-[1.2rem]">Recommendation System</h2>
                            <div className="mt-[0.5rem] flex flex-row] items-center justify-center">
                                <FaMicrochip
                                    size={40}
                                    className="text-shiva-blue ml-4"
                                    title="Person in meditation pose"
                                />
                            </div>
                            <p className='text-justify mt-[0.8rem] font-inter'>Generated 50 plus personalised recommendations to assist you on your nirvana journey..</p>


                            <h2 className="text-[1.5rem] font-inter font-semibold mt-[1.2rem]">Diet Charts</h2>
                            <div className="mt-[0.5rem] flex flex-row items-center justify-center">
                                <GiMeal
                                    size={40}
                                    className="text-shiva-blue ml-4"
                                    title="Person in meditation pose"
                                />
                            </div>
                            <p className='text-justify mt-[0.8rem] font-inter'>Generated a meal plan tailored specifically to you taste...</p>
                        </div>
                    </div>

                    <div className="w-[50%] h-fit bg-secondary-white shadow-md rounded-[10px] relative top-[-30%] ml-[2rem] p-[1rem] flex flex-row">

                    <div
                            className="relative w-[30%] h-[10rem] bg-contain bg-center bg-no-repeat rounded-[10px] overflow-hidden group"
                            style={{ backgroundImage: `url(${bgImage})` }}
                        >
                            {/* semi‑transparent overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                            {/* play button, hidden until hover */}
                            <button
                                className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                aria-label="Play video"
                            >
                                <FaPlay className="text-2xl" />
                            </button>
                        </div>

                        <div className="w-[70%] flex items-center justify-center">
                            <div className="mt-[0.1rem]">
                                <CircularProgressIndicator value={60} size={120} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Dashboard