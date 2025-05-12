import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import NavigationBar from './components/NavigationBar';
import AdsBox from './components/AdsBox';
import FeedbackButton from './components/FeedbackButton';
import HelpPanel from './components/HelpPanel';

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
        <meta name="description" content="Calculate your GPA, CGPA or convert scales quickly." />
        <link rel="canonical" href="https://grade.technie.in/" />
      </Helmet>

      <NavigationBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="my-4">
        <div id="export-area">
          <Routes>
            <Route path="/" element={<CGPACalculator />} />
            <Route path="/cgpa" element={<CGPACalculator />} />
            <Route path="/gpa" element={<GPACalculator />} />
            <Route path="/converter" element={<ScaleConverter />} />
            <Route path="*" element={<h4>Page Not Found</h4>} />
          </Routes>
        </div>
      </main>

      <AdsBox />
      <FeedbackButton />
      <HelpPanel />
    </HelmetProvider>
  );
}

export default App;
