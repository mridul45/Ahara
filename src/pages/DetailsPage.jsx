import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recommended, topPicks, trending, newAdditions } from '../utils/cardData';

function DetailsPage() {
  const { id } = useParams();
  const allCards = [...recommended, ...topPicks, ...trending, ...newAdditions];
  const card = allCards.find((card) => card.id === parseInt(id));

  if (!card) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Card not found</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${card.image})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />
      <Link to="/business" className="absolute top-8 left-8 text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
      <div className="relative max-w-4xl w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-bg font-poppins mb-4 leading-tight">
              {card.title}
            </h1>
            <div className="w-24 h-1 bg-shiva-gold mb-6" />
            <p className="text-lg text-gray-200 font-inter mb-8 leading-relaxed">
              {card.description || 'No description available.'}
            </p>
          </div>
          <button className="px-10 py-4 font-inter text-white bg-white/10 border border-white/20 rounded-lg shadow-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
