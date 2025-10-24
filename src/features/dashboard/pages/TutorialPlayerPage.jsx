import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, PlayCircle, ChevronLeft } from 'lucide-react';

import { tutorials } from '@features/dashboard/data/appData.js';

const TutorialPlayerPage = () => {
    const { id } = useParams();
    const tutorial = tutorials.find(t => t.id === Number.parseInt(id, 10));

    if (!tutorial) {
        return <div className="text-center py-10">Tutorial not found</div>;
    }

    const relatedTutorials = tutorials
        .filter(t => t.category === tutorial.category && t.id !== tutorial.id)
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-bg-dark text-text-primary font-sans">
            <div className="container mx-auto p-4 lg:p-8">
                <Link to="/business" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
                    <ChevronLeft size={20} />
                    Back to Tutorials
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="aspect-video bg-surface-2 rounded-xl overflow-hidden shadow-2xl">
                            <video
                                src={`/videos/tutorial_${tutorial.id}.mp4`} // Placeholder video URL
                                controls
                                autoPlay
                                className="w-full h-full object-cover"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">{tutorial.title}</h1>
                            <p className="text-md text-text-secondary mb-4">{tutorial.category}</p>
                            <p className="text-text-secondary leading-relaxed">{tutorial.description}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Next in this series</h2>
                        <div className="space-y-4">
                            {relatedTutorials.map(related => (
                                <Link to={`/player/${related.id}`} key={related.id} className="flex items-center gap-4 p-3 bg-surface-2 rounded-lg hover:bg-surface-1 transition-colors">
                                    <img src={related.image} alt={related.title} className="w-24 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="font-semibold text-text-primary">{related.title}</h3>
                                        <p className="text-sm text-text-secondary flex items-center gap-1.5"><Clock size={14} /> {related.duration} min</p>
                                    </div>
                                    <PlayCircle size={24} className="ml-auto text-cyan-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPlayerPage;
