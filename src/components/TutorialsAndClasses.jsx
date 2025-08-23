import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, PlayCircle, Star, History, CalendarPlus, Zap, Clock3 } from 'lucide-react';
import { tutorials } from '../utils/appData'; // Import tutorials from appData

// Mock data for continueWatching (uses imported tutorials)
export const continueWatching = [
    { ...tutorials[1], progress: 50 },
    { ...tutorials[6], progress: 25 },
    { ...tutorials[3], progress: 75 },
];

export const liveClasses = [
  { id: 1, title: 'Morning Flow Yoga', instructor: 'Elena Ray', time: '8:00 AM', duration: 45, difficulty: 'Intermediate' },
  { id: 2, title: 'HIIT Power Session', instructor: 'Mark Chen', time: '12:30 PM', duration: 30, difficulty: 'Advanced' },
  { id: 3, title: 'Guided Mindfulness', instructor: 'Aisha Khan', time: '6:00 PM', duration: 20, difficulty: 'Beginner' },
  { id: 4, title: 'Restorative Yin', instructor: 'Elena Ray', time: '8:30 PM', duration: 60, difficulty: 'Beginner' },
  { id: 5, title: 'Sunset Wind-down', instructor: 'Aisha Khan', time: '7:00 PM', duration: 30, difficulty: 'Beginner' },
];

export const TutorialCard = ({ tutorial }) => (
    <Link to={`/details/${tutorial.id}`} className="group block glass rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 u-will-change-transform u-preserve-3d animate-levitate-slow depth-z-10">
        <div className="relative">
            <img src={tutorial.image} alt={tutorial.title} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="text-white/80" size={64} />
            </div>
        </div>
        <div className="p-4">
            <p className="text-xs font-semibold bg-zen-gradient text-transparent bg-clip-text mb-1">{tutorial.category}</p>
            <h3 className="text-md font-bold text-text-primary mb-2">{tutorial.title}</h3>
            <p className="text-xs text-text-secondary flex items-center gap-1"><Clock size={14} /> {tutorial.duration} min</p>
        </div>
    </Link>
);

export const ContinueWatchingCard = ({ tutorial }) => (
    <Link to={`/details/${tutorial.id}`} className="group block glass rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 u-will-change-transform u-preserve-3d animate-levitate depth-z-12">
        <div className="relative">
            <img src={tutorial.image} alt={tutorial.title} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="text-white/80" size={64} />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
                <div className="bg-brand-gradient h-full" style={{ width: `${tutorial.progress}%` }}></div>
            </div>
        </div>
        <div className="p-4">
            <h3 className="text-md font-bold text-text-primary mb-2 truncate">{tutorial.title}</h3>
            <p className="text-xs text-text-secondary">{tutorial.progress}% complete</p>
        </div>
    </Link>
);