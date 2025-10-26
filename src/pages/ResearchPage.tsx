// src/pages/ResearchPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import './ResearchPage.css';

const ResearchPage: React.FC = () => {
  return (
    <div className="research-page">
      {/* Hero Section */}
      <section className="research-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="hero-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Brain size={48} />
          </motion.div>
          <h1 className="hero-title">Research</h1>
          <p className="hero-subtitle">No research publications or papers available at this time</p>
        </motion.div>
      </section>
    </div>
  );
};

export default ResearchPage;
