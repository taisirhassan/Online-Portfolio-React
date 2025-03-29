import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NowPage from "./pages/NowPage";
import { SOCIAL_LINKS } from "./constants";
import "./App.css";
import "./styles/main.scss";

// Lazy load the MatrixRain component
const MatrixRain = lazy(() => import("./components/MatrixRain"));
const BootSequence = lazy(() => import("./components/BootSequence"));

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BootSequence onComplete={() => setIsBooted(true)} />
      </Suspense>
    );
  }

  const HomePageWithProps = () => (
    <>
      <Navigation
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        aria-label="Main navigation"
      />
      <HomePage isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <footer className="terminal__footer">
        <p>
          Built with React & SASS •{" "}
          <a 
            href={SOCIAL_LINKS.sourceCode}
            aria-label="View source code on GitHub"
          >
            View source on GitHub
          </a>
        </p>
      </footer>
    </>
  );

  return (
    <Router>
      <div className={`terminal ${isDarkMode ? "dark" : "light"}`} role="application">
        <Suspense fallback={null}>
          <MatrixRain isDarkMode={isDarkMode} />
        </Suspense>

        <div className="terminal__container">
          <Routes>
            <Route path="/" element={<HomePageWithProps />} />
            <Route path="/now" element={<NowPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
