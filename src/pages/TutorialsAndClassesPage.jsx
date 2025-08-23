import React from 'react';
import { tutorials } from '../utils/appData';
import { continueWatching, liveClasses } from '../utils/classData';
import { TutorialCard, ContinueWatchingCard } from '../components/TutorialsAndClasses';

const Section = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {children}
        </div>
    </section>
);

const LiveClassCard = ({ liveClass }) => (
    <div className="group glass rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 u-will-change-transform u-preserve-3d animate-levitate-veryslow depth-z-8">
        <div>
            <p className="text-xs font-semibold bg-zen-gradient text-transparent bg-clip-text mb-2">LIVE NOW</p>
            <h3 className="text-lg font-bold text-text-primary mb-2">{liveClass.title}</h3>
            <p className="text-sm text-text-secondary mb-4">with {liveClass.instructor}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className="flex items-center gap-1"><Clock3 size={14} /> {liveClass.duration} min</span>
            <button className="btn-brand-sm flex items-center gap-1.5">
                <PlayCircle size={16} />
                Join Now
            </button>
        </div>
    </div>
);

export default function TutorialsAndClassesPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Section title="Continue Watching">
                {continueWatching.map(tutorial => <ContinueWatchingCard key={tutorial.id} tutorial={tutorial} />)}
            </Section>

            <Section title="Live Classes">
                {liveClasses.map(liveClass => <LiveClassCard key={liveClass.id} liveClass={liveClass} />)}
            </Section>

            <Section title="All Tutorials">
                {tutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}
            </Section>
        </div>
    );
}
