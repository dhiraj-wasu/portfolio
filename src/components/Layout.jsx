import React from 'react';
import DynamicNavigation from "./navigation/DynamicNavigation";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { StaticBackground } from '../App'; // We will export StaticBackground from App.jsx

const Layout = ({ children, theme, toggleTheme, sideNavOpen, setSideNavOpen }) => {
  return (
    <div className="relative min-h-screen flex flex-col text-foreground overflow-x-hidden">
      <StaticBackground theme={theme} />
      <DynamicNavigation
        theme={theme}
        toggleTheme={toggleTheme}
        isLegacyLayout
      />
      <SideNav open={sideNavOpen} onClose={() => setSideNavOpen(false)} />
      
      <main className="flex-grow pt-20 outline-none" tabIndex={-1}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default React.memo(Layout);