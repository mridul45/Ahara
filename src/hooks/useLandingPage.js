import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLandingPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return {
    theme,
    toggleTheme,
    selectedPlan,
    handlePlanSelect,
    handleLogin,
  };
};
