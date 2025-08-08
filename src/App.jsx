import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import BackToTop from "./components/BackToTop";
import TerminalOverlay from "./components/TerminalOverlay";
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
  const getPreferredDark = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(getPreferredDark);
  const [isBooted, setIsBooted] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  useEffect(() => {
    const onToggleTerminal = () => setTerminalOpen((v) => !v);
    window.addEventListener('toggle-terminal', onToggleTerminal);
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        setTerminalOpen((v) => !v);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('toggle-terminal', onToggleTerminal);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

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
      <div className={`terminal ${isDarkMode ? "dark" : "light"} crt`} role="application">
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
        <BackToTop />
        <TerminalOverlay
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onNavigate={(id) => {
            if (id === 'now') {
              window.location.href = '/now';
              return;
            }
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onTheme={(mode) => setIsDarkMode(mode === 'dark')}
        />
      </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
