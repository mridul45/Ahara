import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/navlogo.png';
import { recommended, topPicks, trending, newAdditions } from '../utils/cardData';

function BusinessPage() {
  return (
    <>
      <div className="w-[100vw] h-fit flex flex-row items-center justify-evenly">
        <div
          className="w-[8%] h-[10rem] flex flex-row items-center bg-no-repeat bg-left bg-contain relative top-[-2rem]"
          style={{ backgroundImage: `url(${logo})` }}
        />
        <input
          type="text"
          placeholder="Search for a tutorial..."
          className="
            w-[80%]
            bg-slate-200
            p-[1rem]
            rounded-[20px]
            relative
            top-[-2rem]
            font-inter
            border-none
            outline-none
            focus:outline-none
            focus:shadow-md
            transition-shadow
          "
        />
        <button className="bg-shiva-blue text-secondary-white font-inter relative top-[-2rem] pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem] border-none rounded-[5px]">
          Search
        </button>
      </div>

      <hr className="w-[50vw] ml-auto mr-auto text-shiva-blue relative top-[-2rem]" />

      <h1 className="text-shiva-blue font-poppins font-bold text-center text-[2rem] mt-[2rem]">
        Recommended for you
      </h1>

      <div className="w-[90%] h-fit flex flex-row mt-[3rem] ml-auto mr-auto">
        {recommended.map((card) => (
          <Link to={`/details/${card.id}`} key={card.id} className="w-[20%] h-full flex flex-col rounded-[10px] shadow-sm group transform transition-transform duration-300 ease-out transform-gpu will-change-transform hover:scale-105 hover:z-10 ml-[2rem] first:ml-0">
            <div className="w-full h-[16rem] relative overflow-hidden rounded-t-[10px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden="true"
              />
              <button
                aria-label="Play"
                className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto focus:opacity-100 focus:scale-100 focus:pointer-events-auto focus:outline-none"
              >
                <div className="rounded-full p-3 bg-black/50 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
            <h3 className="text-[1.3rem] font-medium text-shiva-black font-inter mx-auto mt-[1rem] text-center">
              {card.title}
            </h3>
          </Link>
        ))}
      </div>

      <h1 className="text-shiva-blue font-poppins font-bold text-center text-[2rem] mt-[4rem]">
        Top Picks
      </h1>

      <div className="w-[90%] h-fit flex flex-row mt-[3rem] ml-auto mr-auto">
        {topPicks.map((card) => (
          <Link to={`/details/${card.id}`} key={card.id} className="w-[20%] h-full flex flex-col rounded-[10px] shadow-sm group transform transition-transform duration-300 ease-out transform-gpu will-change-transform hover:scale-105 hover:z-10 ml-[2rem] first:ml-0">
            <div className="w-full h-[16rem] relative overflow-hidden rounded-t-[10px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden="true"
              />
              <button
                aria-label="Play"
                className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto focus:opacity-100 focus:scale-100 focus:pointer-events-auto focus:outline-none"
              >
                <div className="rounded-full p-3 bg-black/50 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
            <h3 className="text-[1.3rem] font-medium text-shiva-black font-inter mx-auto mt-[1rem] text-center">
              {card.title}
            </h3>
          </Link>
        ))}
      </div>

      <h1 className="text-shiva-blue font-poppins font-bold text-center text-[2rem] mt-[4rem]">
        Trending
      </h1>

      <div className="w-[90%] h-[60rem] ml-auto mr-auto mt-[2rem] flex flex-wrap justify-between">
        {trending.map((card) => (
            <div key={card.id} className="w-[49%] h-[49%] flex flex-row bg-secondary-white shadow-sm rounded-[8px] mb-4">
                <div
                    className="w-[45%] h-full bg-center bg-no-repeat bg-cover overflow-hidden rounded-l-[8px]"
                    style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="w-[55%] h-full flex flex-col">
                    <h3 className="font-poppins text-shiva-blue text-[1.3rem] font-semibold ml-[1rem] mt-[1rem]">
                        {card.title}
                    </h3>
                    <hr className="w-[16%] ml-[1rem]" />
                    <p className="text-justify ml-[1rem] w-[90%] mt-[1.4rem] font-inter text-shiva-black font-medium">
                        {card.description}
                    </p>
                    <Link to={`/details/${card.id}`} className="w-[90%] bg-shiva-black ml-auto mr-auto p-[0.7rem] text-secondary-white font-inter mt-[1.6rem] border-none rounded-[10px] transform transition duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none hover:shadow-lg text-center">
                        Explore
                    </Link>
                </div>
            </div>
        ))}
      </div>

      <h1 className="text-shiva-blue font-poppins font-bold text-center text-[2rem] mt-[4rem]">
        New Additions
      </h1>

      <div className="w-[90%] h-fit flex flex-row mt-[3rem] ml-auto mr-auto mb-[2rem]">
        {newAdditions.map((card) => (
          <Link to={`/details/${card.id}`} key={card.id} className="w-[20%] h-full flex flex-col rounded-[10px] shadow-sm group transform transition-transform duration-300 ease-out transform-gpu will-change-transform hover:scale-105 hover:z-10 ml-[2rem] first:ml-0">
            <div className="w-full h-[16rem] relative overflow-hidden rounded-t-[10px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden="true"
              />
              <button
                aria-label="Play"
                className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto focus:opacity-100 focus:scale-100 focus:pointer-events-auto focus:outline-none"
              >
                <div className="rounded-full p-3 bg-black/50 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
            <h3 className="text-[1.3rem] font-medium text-shiva-black font-inter mx-auto mt-[1rem] text-center">
              {card.title}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}

export default BusinessPage;