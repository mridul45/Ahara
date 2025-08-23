import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Video, Users, Sun, Moon, History, CalendarPlus, Zap, Clock3, Clock, Star } from 'lucide-react';
import Footer from '../layouts/components/Footer'; // Import the footer
import { useTheme } from '../hooks/useTheme'; // Import the useTheme hook
import { tutorials, instructors } from '../utils/appData'; // Import tutorials and instructors from appData
import { continueWatching, liveClasses, TutorialCard, ContinueWatchingCard } from '../components/TutorialsAndClasses'; // Import moved components and data

const BusinessPage = () => {
  const [activeTab, setActiveTab] = useState('tutorials');
  const { theme, toggleTheme } = useTheme(); // Use the theme hook

  const latestTutorials = [...tutorials].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const popularTutorials = [...tutorials].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const quickTutorials = tutorials.filter(t => t.duration <= 20);
  const mediumTutorials = tutorials.filter(t => t.duration > 20 && t.duration <= 45);
  const longTutorials = tutorials.filter(t => t.duration > 45);

  const renderTutorials = () => (
    <div className="space-y-16 u-perspective-900">
        <section>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2"><History className="text-cyan-400"/> Continue Watching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {continueWatching.map(tutorial => <ContinueWatchingCard key={tutorial.id} tutorial={tutorial} />)}
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2"><CalendarPlus className="text-cyan-400"/> Latest Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {latestTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2"><Zap className="text-cyan-400"/> Most Popular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {popularTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2"><Clock3 className="text-cyan-400"/> Browse by Duration</h2>
            <div className="space-y-10">
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Quick Sessions (Under 20 mins)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {quickTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Medium Sessions (20-45 mins)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mediumTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Long Sessions (45+ mins)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {longTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
                    </div>
                </div>
            </div>
        </section>
    </div>
  );

  const renderLiveClasses = () => (
    <div className="space-y-4">
      {liveClasses.map(cls => (
        <div key={cls.id} className="glass rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-lg font-bold text-text-primary">{cls.title}</h3>
            <p className="text-sm text-text-secondary">with {cls.instructor}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-text-secondary mt-2">
              <span className="flex items-center gap-1"><Clock size={14} /> {cls.time} ({cls.duration} min)</span>
              <span className="flex items-center gap-1"><Star size={14} /> {cls.difficulty}</span>
            </div>
          </div>
          <button className="btn-brand w-full md:w-auto shrink-0">
            Join Live
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary relative overflow-hidden">
      {/* New 3D Background Effect */}
      <div className="background-3d-effect"></div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <header className="text-center my-12 relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-zen-gradient text-transparent bg-clip-text mb-4">
            Explore Our Tutorials
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find the perfect session to fit your goals, schedule, and mood. New content added weekly.
          </p>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="absolute top-0 right-0 p-2 rounded-full bg-surface-2 text-text-primary hover:bg-surface-1 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Search & Tabs */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search for yoga, HIIT, meditation..."
              className="w-full bg-surface-2 border border-dark rounded-full py-3 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          <div className="flex justify-center items-center gap-4 p-1 rounded-full bg-surface-2 max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`w-full py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'tutorials' ? 'bg-brand-gradient text-slate-900' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Video className="inline-block mr-2" size={16} />
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`w-full py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'live' ? 'bg-brand-gradient text-slate-900' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Users className="inline-block mr-2" size={16} />
              Live Classes
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="my-16">
          {activeTab === 'tutorials' ? renderTutorials() : renderLiveClasses()}
        </main>

        {/* Meet the Instructors */}
        <section className="my-16">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-10">Browse by Instructor</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {instructors.map(instructor => (
                    <div key={instructor.id} className="text-center glass p-6 rounded-xl hover:border-cyan-400/50 border border-transparent transition-colors">
                        <img src={instructor.image} alt={instructor.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                        <h3 className="text-xl font-bold text-text-primary">{instructor.name}</h3>
                        <p className="text-text-secondary">{instructor.specialty}</p>
                    </div>
                ))}
            </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default BusinessPage;