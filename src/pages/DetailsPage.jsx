import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, PlayCircle, ArrowLeft, Sun, Moon } from 'lucide-react';
import Footer from '../layouts/components/Footer';
import { useTheme } from '../hooks/useTheme';
import { tutorials, instructors } from '../utils/appData'; // Import tutorials and instructors from appData

function DetailsPage() {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();

  const tutorial = tutorials.find(t => t.id === parseInt(id));

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-bg-dark text-text-primary flex items-center justify-center">
        <h1 className="text-3xl font-bold">Tutorial Not Found</h1>
      </div>
    );
  }

  const instructor = instructors.find(inst => inst.id === tutorial.instructorId);
  const relatedTutorials = tutorials.filter(t => t.category === tutorial.category && t.id !== tutorial.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary relative overflow-hidden">
      {/* Background Effect */}
      <div className="background-3d-effect"></div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with Back Button and Theme Toggle */}
        <header className="relative flex justify-between items-center mb-12">
          <Link to="/business" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 z-10">
            <ArrowLeft size={20} /> Back to Tutorials
          </Link>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface-2 text-text-primary hover:bg-surface-1 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Tutorial Details Section */}
        <section className="my-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-lg glass">
            <img src={tutorial.image} alt={tutorial.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="text-white/80" size={80} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold bg-zen-gradient text-transparent bg-clip-text mb-2">{tutorial.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">{tutorial.title}</h1>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">{tutorial.description}</p>
            <div className="flex items-center gap-4 text-text-secondary mb-8">
              <span className="flex items-center gap-1"><Clock size={18} /> {tutorial.duration} min</span>
              <span className="flex items-center gap-1"><PlayCircle size={18} /> Watch Now</span>
            </div>
            <button className="btn-brand px-8 py-3 text-lg">Start Tutorial</button>
          </div>
        </section>

        {/* Instructor Bio Section */}
        {instructor && (
          <section className="my-16 glass p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-text-primary mb-6">About the Instructor</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img src={instructor.image} alt={instructor.name} className="w-32 h-32 rounded-full object-cover shadow-md" />
              <div>
                <h3 className="text-xl font-bold text-text-primary">{instructor.name}</h3>
                <p className="text-text-secondary mb-2">{instructor.specialty}</p>
                <p className="text-text-secondary leading-relaxed">{instructor.bio}</p>
              </div>
            </div>
          </section>
        )}

        {/* Related Tutorials Section */}
        {relatedTutorials.length > 0 && (
          <section className="my-16">
            <h2 className="text-3xl font-bold text-text-primary mb-6">More Like This</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedTutorials.map(t => (
                <Link to={`/details/${t.id}`} key={t.id} className="group block glass rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 u-will-change-transform u-preserve-3d animate-levitate-slow depth-z-10">
                  <div className="relative">
                    <img src={t.image} alt={t.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="text-white/80" size={64} />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold bg-zen-gradient text-transparent bg-clip-text mb-1">{t.category}</p>
                    <h3 className="text-md font-bold text-text-primary mb-2">{t.title}</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1"><Clock size={14} /> {t.duration} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
