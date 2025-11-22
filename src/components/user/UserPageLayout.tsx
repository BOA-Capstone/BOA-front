import React from 'react';

import { Button } from '../ui/button';

type UserPageLayoutProps = {
  children: React.ReactNode;
  onHome?: () => void;
};

const UserPageLayout: React.FC<UserPageLayoutProps> = ({ children, onHome }) => (
  <div className="min-h-screen w-screen px-0 bg-[url('/src/assets/photo8.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-left">
    <div className="fixed top-0 left-0 w-full z-30">
      <div className="w-full bg-black text-white text-center text-xl font-bold py-4 shadow-lg flex items-center justify-center relative">
  <span className="text-[var(--cyan)]">OptiEV</span>&nbsp;운전자
        {onHome && (
          <Button
            variant="secondary"
            className="absolute right-8 top-1/2 -translate-y-1/2 px-4 py-1 font-semibold text-base"
            onClick={onHome}
          >
            처음으로
          </Button>
        )}
      </div>
    </div>
    <div className="w-full max-w-2xl mx-auto bg-black/80 rounded-2xl shadow-xl px-16 py-16 flex flex-col items-center mt-16">
      {children}
    </div>
  </div>
);

export default UserPageLayout;
