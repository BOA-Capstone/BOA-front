import React from 'react';

type UserPageLayoutProps = {
  children: React.ReactNode;
};

const UserPageLayout: React.FC<UserPageLayoutProps> = ({ children }) => (
  <div className="min-h-screen w-screen px-0 bg-[url('/src/assets/photo8.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-left">
    <div className="fixed top-0 left-0 w-full z-30">
      <div className="w-full bg-black text-white text-center text-xl font-bold py-4 shadow-lg">
        <span className="text-[var(--cyan)]">OptiEV</span> 사용자
      </div>
    </div>
    <div className="w-full max-w-2xl mx-auto bg-black/80 rounded-2xl shadow-xl px-16 py-16 flex flex-col items-center mt-16">
      {children}
    </div>
  </div>
);

export default UserPageLayout;
