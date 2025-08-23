import { tutorials } from './appData'; // Import tutorials from appData

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
