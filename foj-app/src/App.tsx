import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ServiceContentSection } from './components/ServiceContentSection';
import { servicePages } from './data/servicePages';

function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Root redirects to company-formation, which shows the original hero */}
          <Route path="/" element={<Navigate to="/company-formation" replace />} />
          {servicePages.map((page) => (
            <Route
              key={page.id}
              path={`/${page.id}`}
              element={<ServiceContentSection data={page} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/company-formation" replace />} />
        </Routes>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

function App() {
  return <AppLayout />;
}

export default App;
