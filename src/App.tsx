// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/common/Navigation';
import HomePage from './pages/HomePage';
import ProjectsShowcase from './components/projects/ProjectsShowcase';
import ProjectDetail from './components/projects/ProjectDetail';
import './styles/global.css';

// Lazy load pages for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader = () => (
  <div className="page-loader">
    <motion.div
      className="loader-content"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="loader-spinner" />
      <p>Loading...</p>
    </motion.div>
  </div>
);

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Wrapper components for routing
const HomePageWrapper = () => {
  const navigate = useNavigate();
  return <HomePage onNavigate={(page) => navigate(`/${page}`)} />;
};

const ProjectsWrapper = () => {
  const navigate = useNavigate();
  return <ProjectsShowcase onProjectSelect={(id) => navigate(`/projects/${id}`)} />;
};

const ProjectDetailWrapper = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  return <ProjectDetail projectId={projectId || ''} onBack={() => navigate('/projects')} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
      {/* Background effects */}
      <div className="app-background">
        <div className="bg-grid" />
        <div className="bg-gradient-overlay" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePageWrapper />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsWrapper />} />
            <Route path="/projects/:projectId" element={<ProjectDetailWrapper />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Joshua Gulizia</h4>
          </div>
          <div className="footer-section">
            <h5>Quick Links</h5>
            <a href="/projects">Projects</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h5>Connect</h5>
            <a href="https://github.com/jguliz" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/josh-gulizia-401474290" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:jgulizia1205@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Joshua Gulizia. All rights reserved.</p>
          <p>Built with React, TypeScript, and ❤️</p>
        </div>
      </footer>

      {/* Global styles for app components */}
      <style>{`
        .app {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
        }

        .app-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        .bg-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            rgba(10, 10, 10, 0.4) 100%
          );
        }

        .main-content {
          position: relative;
          z-index: 1;
          padding-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .page-loader {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }

        .loader-content {
          text-align: center;
        }

        .loader-spinner {
          width: 50px;
          height: 50px;
          margin: 0 auto 1rem;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a, #0f0f0f);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .splash-content {
          text-align: center;
        }

        .splash-logo {
          width: 150px;
          height: 150px;
          margin: 0 auto 2rem;
          position: relative;
        }

        .logo-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .splash-title {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
        }

        .splash-loader {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .splash-loader::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #ffffff, #cccccc);
          border-radius: 3px;
        }

        .app-footer {
          position: relative;
          z-index: 1;
          background: #0f0f0f;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 3rem 0 2rem;
          margin-top: 0;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .footer-section h4 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-section h5 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .footer-section p {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .footer-section button,
        .footer-section a {
          display: block;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          padding: 0.25rem 0;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-section button:hover,
        .footer-section a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 2rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-bottom p {
          margin: 0.25rem 0;
        }

        @media (max-width: 768px) {
          .main-content {
            padding-top: 60px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      `}</style>
      </div>
    </Router>
  );
};

export default App;