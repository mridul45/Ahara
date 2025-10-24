import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@shared/hooks/useTheme.js';

export const useLandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
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
