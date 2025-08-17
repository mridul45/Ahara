import React, { lazy } from 'react';
import bg2 from '../assets/backgrounds/bg2.jpeg';
import bgcard1 from '../assets/backgrounds/bg_card1.png';
import bgcard2 from '../assets/backgrounds/bg_card2.png';
import bgcard3 from '../assets/backgrounds/bg_card3.png';
import { useNavigate } from 'react-router-dom'
import Footer from '../layouts/components/Footer';
import Navbar from '../layouts/components/Navbar';

const MeditatingManModel = lazy(() => import('../components/wireframes/MeditatingMan'));
const Brain = lazy(() => import('../components/wireframes/Humanbrain'));
const HelperBotWireframe = lazy(() => import('../components/wireframes/Helperbot'));
const ShivaWireframe = lazy(() => import('../components/wireframes/Shiva'));


function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="h-[70vh] w-[100vw] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bg2})` }}
      >


        <Navbar
          t1={"About"}
          t2={"Vision"}
          t3={"Features"}
          t4={"Pricing"}
          t5={"Contact"}
          t6={
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer"
            >
              Signup/Login
            </span>
          }
        />

        <div className="h-[80%] w-[40%] flex flex-col items-center ml-[2.5rem] mt-[2rem] justify-center relative top-[-12rem]">
          <h1 className="font-['Poppins'] font-semibold text-[2.7rem] text-primary-bg">Personalized</h1>
          <div className="w-full flex items-center justify-center bg-red-500] mt-[1.5rem]">
            <h2 className='font-["Poppins"] text-secondary-white w-[70%] text-[1.3rem] font-medium'>Get Personalized recommendations to find the right path to your mindfulness journey.</h2>
          </div>

          <div
            className="w-[30%] h-[10%] mt-[2rem] bg-shiva-blue text-secondary-white flex items-center justify-center rounded-[30px] font-inter hover:bg-secondary-white hover:text-shiva-blue hover:scale-110 transition-all duration-300 ease-in-out"
          >
            Get Started
          </div>

        </div>
      </div>

      {/* <Card heading="About" text="Āhāra is your all-in-one wellness companion, blending personalized yoga and meditation guidance with smart, budget-friendly meal planning. By creating tailored routines and sourcing local ingredients based on your location, Āhāra helps you build healthy habits that fit your lifestyle. Whether you’re just starting your mindfulness journey or seeking deeper Zen practices, Āhāra’s dual modes offer approachable daily exercises and exclusive advanced teachings to nourish your body, calm your mind, and enrich your spirit." /> */}
      <div className="w-[80%] h-fit rounded-[10px] bg-secondary-white ml-auto mr-auto flex flex-col items-center justify-center shadow-sm relative top-[-2.3rem] p-[1rem] pb-[2rem]">
        <h1 className='text-[2rem] font-poppins text-shiva-blue font-medium'>About</h1>
        <hr className="w-[5%] text-shiva-black" />
        <p className="text-justify font-inter text-shiva-black text-[1.1rem] w-[80%] mt-[1rem]">Ahara is an innovative healthtech platform that seamlessly blends cutting-edge AI with holistic wellness, empowering users to achieve true balance in body and mind. By integrating real-time yoga posture correction, hyper-personalized diet planning based on local and budget-friendly ingredients, and an intelligent conversational companion, Ahara transforms daily well-being into an engaging, supportive journey. With curated spiritual content in Zen Mode and a calming, modern user experience, Ahara sets a new standard for accessible, meaningful, and results-driven digital health solutions.</p>
      </div>

      <div className="w-[80%] h-fit rounded-[10px] bg-secondary-white ml-auto mr-auto flex flex-col items-center justify-center shadow-sm relative top-[-2.3rem] p-[1rem] pb-[2rem] mt-[1.3rem]">
        <h1 className='text-[2rem] font-poppins text-shiva-blue font-medium'>Vision</h1>
        <hr className="w-[5%] text-shiva-black" />
        <p className="text-justify font-inter text-shiva-black text-[1.1rem] w-[80%] mt-[1rem]">Ahara’s vision is to redefine holistic well-being by leveraging advanced artificial intelligence to make health—physical, nutritional, and spiritual—accessible, personalized, and deeply engaging for everyone. We aspire to empower individuals with intuitive tools that nurture self-care, self-discovery, and continuous growth, all rooted in actionable insights and authentic mindfulness traditions. By harmoniously integrating innovation with ancient wisdom, Ahara envisions a world where every user can achieve lasting balance, empowered by technology that truly understands and supports their unique wellness journey.</p>
      </div>

      {/* <div style={{ width: "20%", height: "20%", background: "#fafafa" }}>
        <MeditatingManModel width="100%" height="100%" />
      </div> */}
      <h1 className="font-poppins font-semibold text-[2.7rem] text-shiva-blue text-center mt-[2rem]">Features</h1>

      <div className="flex flex-col w-[80%] ml-auto mr-auto mt-[3rem]">

        <div className="flex flex-row w-[100%] h-[40rem] bg-secondary-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="w-[50%] h-[100%]">
            {/* <WireframeScene width="100%" height="100%" /> */}
            <Brain width='100%' height='100%' />
          </div>

          <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
            <h1 className='text-[2rem] font-medium font-poppins text-shiva-black'>Yoga and Meditation Tutorial</h1>
            <hr className="w-[27%] mx-auto mt-[0.2rem]" />
            <p className="text-justify w-[80%] font-inter text-[1.2rem] mt-[4rem] text-nirvana-three">Our Yoga & Meditation Tutorials deliver on-demand, expert-led sessions for every level, from beginners to advanced practitioners. Select from quick 5-minute energizers to full 60-minute flows focused on strength, flexibility, or stress relief. Each tutorial offers clear, step-by-step guidance in both yoga asanas and mindfulness practices. Track your completed sessions, earn achievement badges, and access your personal progress dashboard—so you can cultivate consistency and growth, whether you’re at home, the office, or traveling.</p>
          </div>
        </div>

        <div className="mt-[1rem] flex flex-row w-[100%] h-[40rem] bg-secondary-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
            <h1 className='text-[2rem] font-medium font-poppins text-shiva-black'>Ahara Intelligence</h1>
            <hr className="w-[20%] mx-auto mt-[0.2rem]" />
            <p className="text-justify w-[80%] font-inter text-[1.2rem] mt-[4rem] text-nirvana-three">Our AI-powered meal planner taps into live inventory and pricing data from grocery stores and markets within a 10–15 km radius of your home to identify the freshest, most affordable ingredients near you. By combining this local sourcing intelligence with your personal profile—calorie targets, dietary preferences, budget constraints, and cooking equipment—Āhāra generates a fully customized week-long diet chart. Each plan comes with a streamlined shopping list, cost estimates, nutrient-balanced recipes, and instant substitutions if an item is unavailable, making it effortless to eat well on time and on budget.</p>
          </div>

          <div className="w-[50%] h-[100%]">
            <Brain width='100%' height='100%' />
          </div>
        </div>

        <div className="mt-[1rem] flex flex-row w-[100%] h-[40rem] bg-secondary-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">

          <div className="w-[50%] h-[100%]">
            <HelperBotWireframe width='100%' height='100%' />
          </div>

          <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
            <h1 className='text-[2rem] font-medium font-poppins text-shiva-black'>PosturePerfect™: AI-Powered Alignment</h1>
            <hr className="w-[30%] mx-auto mt-[0.2rem]" />
            <p className="text-justify w-[80%] font-inter text-[1.2rem] mt-[4rem] text-nirvana-three">Our AI-Driven Posture Correction uses real-time computer vision to analyze your yoga and meditation poses as you practice. You’ll receive instant, on-screen feedback—highlighting misaligned joints and suggesting precise adjustments—so you can build strength and flexibility safely, even when you’re training solo.</p>
          </div>

        </div>

        <div className="mt-[1rem] flex flex-row w-[100%] h-[40rem] bg-shiva-blue rounded-[12px] shadow-[0_4px_20px_rgba(46,74,120,0.5)]">

          <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
            <h1 className='text-[2rem] font-medium font-poppins text-primary-bg'>The Zen Mode</h1>
            <hr className="w-[15%] mx-auto mt-[0.2rem] text-primary-bg" />
            <ul className="list-none flex flex-col items-center justify-center p-[2rem] w-[100%] text-justify text-secondary-white text-[1.1rem] font-light">
              <li className='font-inter'>Access exclusive, monastery‑led meditation sessions recorded in sacred spaces—immerse yourself in authentic, time‑tested practices.</li>
              <li className='mt-[1.5rem] font-inter'>Unlock “Sound of Silence” background tracks, engineered to block distractions and guide your mind into profound stillness.</li>
              <li className='mt-[1.5rem] font-inter'>Follow step‑by‑step chakra and mantra sequences voiced by temple priests—each session designed to align body, mind, and spirit.</li>
              <li className='mt-[1.5rem] font-inter'>AI‑tuned pranayama routines that sense your stress levels and adjust pacing in real‑time for optimal relaxation.</li>
              <li className='mt-[1.5rem] font-inter'>Gentle, customizable notifications that prompt you to pause, reflect, or perform short ritual practices—keeping your Zen practice consistent all day.</li>
            </ul>
          </div>

          <div className="w-[50%] h-[100%]">
            <ShivaWireframe width='100%' height='100%' />
          </div>

        </div>
      </div>

      <h1 className="font-poppins font-semibold text-[2.7rem] text-shiva-blue text-center mt-[5rem]">Pricing</h1>

      <div className="h-[50rem] w-[80%] ml-auto mr-auto mt-[2rem] flex items-center justify-between">
        <div className="group relative h-[30rem] w-[32%] rounded-[10px] overflow-hidden
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all duration-300
                flex flex-col items-center justify-center">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgcard1})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40
                  group-hover:bg-black/70
                  transition-colors duration-300" />

          {/* Title container */}
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Default label (slides up & fades out) */}
            <h2 className="font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0">
              Basic
            </h2>

            {/* Hover label (slides up into view) */}
            <h2 className="absolute inset-0 flex items-center justify-center
                   font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[9rem] group-hover:opacity-100
                   opacity-0">
              $5/Month
            </h2>

            {/* Underline (slides up with default) */}
            <hr className="w-[10%] border-white mt-2 w-[8%]
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0" />
          </div>

          {/* Hidden list */}
          <ul className="list-disc absolute inset-0 flex flex-col items-start justify-center
                 w-full px-8 space-y-2 text-white
                 opacity-0 pointer-events-none
                 group-hover:opacity-100 group-hover:pointer-events-auto
                 transition-opacity duration-500">
            <li className="ml-4 font-inter">On Demand Yoga & Meditation Tutorials</li>
            <li className="ml-4 font-inter">Customized dashboard</li>
            <li className="ml-4 font-inter">Daily practice reminders via push or email</li>
            <li className="ml-4 font-inter">Weekly progress summary</li>
            <li className="ml-4 font-inter">Track how you feel post‑session</li>
            <li className="ml-4 font-inter">Beginner posture library</li>
            <li className="ml-4 font-inter">Access to seasonal “mini‑series”</li>
          </ul>

        </div>


        <div className="group relative h-[30rem] w-[32%] rounded-[10px] overflow-hidden
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all duration-300
                flex flex-col items-center justify-center">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgcard2})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40
                  group-hover:bg-black/70
                  transition-colors duration-300" />

          {/* Title container */}
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Default label (slides up & fades out) */}
            <h2 className="font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0">
              Advanced
            </h2>

            {/* Hover label (slides up into view) */}
            <h2 className="absolute inset-0 flex items-center justify-center
                   font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[10.9rem] group-hover:opacity-100
                   opacity-0">
              $13/Month
            </h2>

            {/* Underline (slides up with default) */}
            <hr className="w-[10%] border-white mt-2 w-[9%]
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0" />
          </div>

          {/* Hidden list */}
          <ul className="list-disc absolute inset-0 flex flex-col items-start justify-center
                 w-full px-8 space-y-2 text-white
                 opacity-0 pointer-events-none
                 group-hover:opacity-100 group-hover:pointer-events-auto
                 transition-opacity duration-500">
            <li className="ml-4 font-inter">On Demand Yoga & Meditation Tutorials</li>
            <li className="ml-4 font-inter">Customized Dashboard</li>
            <li className="ml-4 font-inter">Advanced vision model for real time posture correction.</li>
            <li className="ml-4 font-inter">Advanced Inteligence for personalised and localized diet charts</li>
            <li className="ml-4 font-inter">Priority in‑app coach support</li>
            <li className="ml-4 font-inter">One to one mentoring.</li>
            <li className="ml-4 font-inter">Personalized intelligence to guide you throughout the journey</li>
          </ul>

        </div>

        <div className="group relative h-[30rem] w-[32%] rounded-[10px] overflow-hidden
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all duration-300
                flex flex-col items-center justify-center">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgcard3})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40
                  group-hover:bg-black/70
                  transition-colors duration-300" />

          {/* Title container */}
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Default label (slides up & fades out) */}
            <h2 className="font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0">
              The Zen Mode
            </h2>

            {/* Hover label (slides up into view) */}
            <h2 className="absolute inset-0 flex items-center justify-center
                   font-poppins font-semibold text-[2rem] text-white
                   transition-transform duration-300
                   group-hover:-translate-y-[12.9rem] group_hover:opacity-100
                   opacity-0">
              $20/Month
            </h2>

            {/* Underline (slides up with default) */}
            <hr className="w-[10%] border-white mt-2 w-[15%]
                   transition-transform duration-300
                   group-hover:-translate-y-[40px] group-hover:opacity-0" />
          </div>

          {/* Hidden list */}
          <ul className="list-disc absolute inset-0 flex flex-col items-start justify-center
                 w-full px-8 space-y-2 text-white
                 opacity-0 pointer-events-none
                 group-hover:opacity-100 group-hover:pointer-events-auto
                 transition-opacity duration-500">
            <li className="ml-4 font-inter">Monastery‑filmed masterclasses and authentic sessions with temple priests</li>
            <li className="ml-4 font-inter">Advanced mantra & chakra series for Deep alignment practices</li>
            <li className="ml-4 font-inter">“Sound of Silence” immersion tracks and Distraction‑blocking binaural audio</li>
            <li className="ml-4 font-inter">Advanced Inteligence for personalised and localized diet charts</li>
            <li className="ml-4 font-inter">AI‑paced breath rituals and Dynamic pranayama guided by your stress levels</li>
            <li className="ml-4 font-inter">Access to more advanced intelligence to guide you on your mindfullness journey</li>
            <li className="ml-4 font-inter">Books and other reading material</li>
          </ul>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Landing