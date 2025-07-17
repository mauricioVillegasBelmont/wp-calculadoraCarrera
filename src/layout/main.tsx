import React  from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps){
  return(
    <>
    <div  data-mode="light" className="min-h-full w-full">
      <div className="flex flex-col p-6 bg-white text-gray-800 max-w-5xl mx-auto">
        {children}
      </div>
    </div>
    </>
  );
}