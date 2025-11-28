import React from 'react';

const OnboardingLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default OnboardingLayout;