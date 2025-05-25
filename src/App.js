import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NowPage from "./pages/NowPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
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
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <BootSequence onComplete={() => setIsBooted(true)} />
        </Suspense>
      </ErrorBoundary>
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
    <ErrorBoundary>
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
        
        <AnalyticsDashboard />
      </div>
    </Router>
  </ErrorBoundary>
  );
};

export default App;
