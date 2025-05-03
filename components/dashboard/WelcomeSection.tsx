import React from 'react';

interface WelcomeSectionProps {
  brandName: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ brandName }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {brandName}</h1>
      <p className="text-white/70">Manage your product promotions and model collaborations</p>
    </div>
  );
}; 