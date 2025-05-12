// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import NavigationBar from './components/NavigationBar';
import AdsBox from './components/AdsBox';
import FeedbackButton from './components/FeedbackButton';
import HelpPanel from './components/HelpPanel';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CGPACalculator from './pages/CGPACalculator';
import GPACalculator from './pages/GPACalculator';
import ScaleConverter from './pages/ScaleConverter';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) ?? true
  );

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>VIT Grade Calculator</title>
        <meta
          name="description"
          content="Calculate your GPA, CGPA or convert scales quickly."
        />
        <link rel="canonical" href="https://grade.technie.in/" />
      </Helmet>

      <NavigationBar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cgpa" element={<CGPACalculator />} />
          <Route path="/gpa" element={<GPACalculator />} />
          <Route path="/converter" element={<ScaleConverter />} />
          <Route path="*" element={<h4>Page Not Found</h4>} />
        </Routes>
      </main>

      <AdsBox />
      <FeedbackButton />
      <HelpPanel />
      <Footer />
    </HelmetProvider>
  );
}

export default App;
