import React, { useState } from 'react';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';
import { Footer } from '../common/Footer';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { ToastContainer } from '../common/ToastContainer';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, showSidebar = true }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-100 selection:text-teal-900 text-slate-800">
      <DisclaimerBanner variant="compact" />
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex w-full">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        <main className="flex-1 flex flex-col min-w-0 pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};
