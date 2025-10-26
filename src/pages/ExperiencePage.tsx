// src/pages/ExperiencePage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Calendar, MapPin, ChevronRight,
  TrendingUp, Users,
  CheckCircle
} from 'lucide-react';
import './ExperiencePage.css';

interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: React.ReactNode;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  type: 'full-time' | 'part-time' | 'internship' | 'leadership';
  description: string;
  achievements: string[];
  technologies: string[];
  icon: React.ReactNode;
  color: string;
}

// Logo icon only - for timeline dots (cropped to just show the mountain icon)
const SunSkiLogoIcon = () => (
  <svg viewBox="-5 -5 85 78" width="80%" height="80%" fill="currentColor" style={{ overflow: 'visible' }}>
    <path d="M60.1,25.2c4.9-1.7,8.4-6.3,8.4-11.8C68.5,6.5,62.9,1,56,1S43.5,6.5,43.5,13.4c0,2,0.5,3.8,1.3,5.5l4.5-4.5L60.1,25.2z"/>
    <polygon points="25,18.4 0.7,42.7 12.9,54.8 25,42.7 49.3,66.9 61.4,54.8"/>
    <polygon points="39.1,28.5 63.4,52.8 73.5,42.7 49.2,18.5"/>
    <polygon points="0.7,42.7 12.9,54.8 25,18.5"/>
    <polygon points="25,18.5 25,42.7 49.2,66.9"/>
    <polygon points="39.1,28.5 63.4,52.8 49.2,18.5" opacity="0.2"/>
  </svg>
);

// Full logo with text - for company name display in content
const SunSkiLogo = () => (
  <svg viewBox="0 0 242.2 68" width="180" height="52" fill="currentColor">
    <path d="M60.1,25.2c4.9-1.7,8.4-6.3,8.4-11.8C68.5,6.5,62.9,1,56,1S43.5,6.5,43.5,13.4c0,2,0.5,3.8,1.3,5.5l4.5-4.5L60.1,25.2z"/>
    <polygon points="25,18.4 0.7,42.7 12.9,54.8 25,42.7 49.3,66.9 61.4,54.8"/>
    <polygon points="39.1,28.5 63.4,52.8 73.5,42.7 49.2,18.5"/>
    <polygon points="0.7,42.7 12.9,54.8 25,18.5"/>
    <polygon points="25,18.5 25,42.7 49.2,66.9"/>
    <polygon points="39.1,28.5 63.4,52.8 49.2,18.5" opacity="0.2"/>
    <path d="M97,16.9c-0.2-1.5-1.4-2.5-4.6-2.5c-2.4,0-3.7,0.7-3.7,2.1c0,0.7,0.5,1.1,1.6,1.3c1.8,0.3,7.3,1.1,9.4,1.5c4,0.7,6.4,2.3,6.4,6.1c0,7.3-9.4,7.3-12.3,7.3c-7.3,0-12.5-1.3-12.9-7.3h8.4c0.2,1.6,1.1,2.6,4.8,2.6c1.8,0,3.7-0.4,3.7-2.2c0-1.1-0.9-1.5-3.4-1.9l-7.1-1.1c-4.4-0.7-6.1-2.9-6.1-6.1c0-2.8,1.7-6.8,11.1-6.8c7.8,0,12.4,1.9,12.9,6.9H97z"/>
    <path d="M108.5,15.8h6.4v8.4c0,2.8,1.2,3.7,3.3,3.7c2.2,0,4-1.2,4-3.9v-8.2h6.4V32h-6.2v-2.1h-0.1c-1.3,1.6-3.6,2.8-6.8,2.8c-3.9,0-6.9-1.7-6.9-6.6V15.8z"/>
    <path d="M131.8,15.8h6.2v2.3h0.1c1.3-1.6,3.6-2.8,6.8-2.8c4,0,6.9,1.9,6.9,6V32h-6.4v-8.8c0-2.1-1.2-3.1-3.3-3.1c-2.2,0-4,1.2-4,3.9v8h-6.4V15.8z"/>
    <path d="M173.6,29.6c-1.6,2-4.6,3-7.6,3c-6.4,0-8.5-3.5-8.5-6.4c0-2.7,1.6-5,5.6-6.4c-1.9-1.7-2.3-3.1-2.3-4.3c0-2.9,2-4.8,5.5-4.8c3.4,0,5.4,2.1,5.4,4.6c0,1.7-1,3.7-4.1,5l5.7,5.2c0.6-1,0.9-1.9,1-3.3h2.8c-0.1,1.6-0.5,3.4-1.8,5.2l5,4.6h-4.2L173.6,29.6z M164.8,21.5c-3.3,1.4-4.1,2.9-4.1,4.6c0,1.7,1.2,4,5.4,4c2.1,0,4.2-0.5,5.5-2.2L164.8,21.5z M165.8,18.7c2.2-0.9,3.1-2.1,3.1-3.2c0-1.2-1.1-2.3-2.6-2.3c-1.9,0-2.8,1.1-2.8,2.2C163.6,16.4,164.3,17.3,165.8,18.7"/>
    <path d="M199.6,16.9c-0.2-1.5-1.4-2.5-4.6-2.5c-2.4,0-3.7,0.7-3.7,2.1c0,0.7,0.5,1.1,1.6,1.3c1.8,0.3,7.3,1.1,9.4,1.5c4,0.7,6.4,2.3,6.4,6.1c0,7.3-9.4,7.3-12.3,7.3c-7.3,0-12.5-1.3-12.9-7.3h8.4c0.2,1.6,1.1,2.6,4.8,2.6c1.8,0,3.7-0.4,3.7-2.2c0-1.1-0.9-1.5-3.4-1.9l-7.1-1.1c-4.4-0.7-6.1-2.9-6.1-6.1c0-2.8,1.7-6.8,11.1-6.8c7.8,0,12.4,1.9,12.9,6.9H199.6z"/>
    <polygon points="211.2,10.1 217.5,10.1 217.5,21.5 223.9,15.8 232.5,15.8 225,21.8 233.2,32 224.5,32 219.9,25.9 217.5,27.8 217.5,32 211.2,32"/>
    <path d="M234.6,10.1h6.4v3.8h-6.4V10.1z M234.6,15.8h6.4V32h-6.4V15.8z"/>
    <path d="M113,45.1c-0.2-1.5-1.4-2.5-4.6-2.5c-2.4,0-3.7,0.7-3.7,2.1c0,0.7,0.5,1.1,1.6,1.3c1.8,0.3,7.3,1.1,9.4,1.5c4,0.7,6.4,2.3,6.4,6.1c0,7.2-9.4,7.3-12.3,7.3c-7.2,0-12.5-1.3-12.9-7.2h8.4c0.2,1.6,1.1,2.6,4.8,2.6c1.8,0,3.7-0.4,3.7-2.2c0-1.1-0.9-1.5-3.4-1.9l-7.1-1.1c-4.4-0.7-6.1-2.9-6.1-6c0-2.8,1.7-6.8,11.1-6.8c7.8,0,12.4,1.9,12.9,6.9H113z"/>
    <path d="M123.9,44h6.2v2.2h0.1c1.3-1.6,3.6-2.6,6.2-2.6c5.7,0,9.5,3.2,9.5,8.8c0,4.7-3.5,8.5-9.4,8.5c-2.8,0-5-0.9-6-2.1h-0.1v7.3h-6.3V44z M134.8,56.3c2.9,0,4.5-1.4,4.5-4.1c0-2.7-1.6-4.1-4.5-4.1c-3,0-4.5,1.6-4.5,4.1S131.8,56.3,134.8,56.3z"/>
    <path d="M159.1,43.3c7.3,0,11.4,3,11.4,8.8s-4,8.8-11.4,8.8c-7.3,0-11.4-3-11.4-8.8S151.7,43.3,159.1,43.3z M154.4,52.1c0,3.1,1.8,4.6,4.7,4.6c2.9,0,4.7-1.5,4.7-4.6c0-3.1-1.8-4.6-4.7-4.6C156.2,47.5,154.4,49.1,154.4,52.1z"/>
    <path d="M172.3,44h6.3v3.2h0.1c1.3-2.2,3.7-3.6,6.6-3.6c0.7,0,1.5,0.1,2.2,0.2v5.9c-0.8-0.3-2.3-0.5-3.5-0.5c-3.6,0-5.2,1.9-5.2,4.8v6.3h-6.3V44z"/>
    <path d="M188.5,44h3.3v-5.2h6.3V44h4.2v4.2h-4.2v6.5c0,1.5,0.4,1.7,2.1,1.7c0.8,0,1.4,0,2.2-0.1v4c-1.3,0.2-3,0.3-4.8,0.3c-4.1,0-5.8-1-5.8-4.5v-7.9h-3.3V44z"/>
    <path d="M211.3,55.2c0.1,0.6,0.3,1.1,0.9,1.4c0.6,0.3,1.4,0.5,2.8,0.5c1.4,0,2.9-0.3,2.9-1.4c0-0.9-0.6-1.1-2.2-1.3l-5.7-0.7c-3.7-0.4-5.6-1.8-5.6-4.5c0-4.4,3.8-5.8,9.9-5.8c4.3,0,9.8,0.8,10.1,5.4h-7.1c-0.1-0.7-0.5-1.1-1.1-1.4c-0.6-0.3-1.5-0.4-2.3-0.4c-1.8,0-2.9,0.4-2.9,1.5c0,0.5,0.4,1,2,1.1l5.5,0.6c4.4,0.5,6.5,1.8,6.5,5c0,3.8-3.7,5.6-10.4,5.6c-4.5,0-10.6-0.8-10.7-5.7H211.3z"/>
  </svg>
);

const ExperiencePage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const experiences: Experience[] = [
    {
      id: 'data-science-intern',
      title: 'Data Science Intern',
      company: 'Sun & Ski Sports',
      companyLogo: <SunSkiLogo />,
      location: 'Houston, TX',
      startDate: 'Aug 2025',
      endDate: 'Present',
      current: true,
      type: 'internship',
      description: 'Leading data analytics initiatives for a major sports retail chain with 40+ locations.',
      achievements: [
        'Analyzed 10M+ rows of sales data using PostgreSQL and pandas across 40 retail locations',
        'Created 5 Power BI dashboards for performance metrics, reducing weekly reporting time by 80%',
        'Streamlined data cleaning using Python, resolving 1,700+ data inconsistencies and anomalies',
        'Implemented automated ETL pipelines processing 100K+ daily transactions',
        'Developed predictive models for inventory optimization with 85% accuracy'
      ],
      technologies: ['Python', 'PostgreSQL', 'Power BI', 'Pandas', 'NumPy', 'Scikit-learn', 'ETL', 'Azure'],
      icon: <SunSkiLogoIcon />,
      color: '#667eea'
    },
    {
      id: 'operations-officer',
      title: 'Operations Officer',
      company: 'Code Coogs',
      companyLogo: <img src={`${import.meta.env.BASE_URL}logowhite.png`} alt="Code Coogs" style={{ width: '180px', height: 'auto', display: 'block', margin: '0' }} />,
      location: 'University of Houston',
      startDate: 'Jan 2025',
      endDate: 'Present',
      current: true,
      type: 'leadership',
      description: 'Leading technical education initiatives for one of the university\'s biggest coding organizations.',
      achievements: [
        'Conduct technical workshops teaching full-stack development to 200+ students per semester',
        'Collaborate with officers to coordinate workshop scheduling and curriculum development',
        'Mentor students on programming fundamentals, project development, and industry best practices',
        'Developed comprehensive workshop materials covering React, Node.js, and cloud deployment'
      ],
      technologies: ['React', 'Node.js', 'JavaScript', 'Python', 'Git', 'AWS', 'Docker'],
      icon: <Users />,
      color: '#f093fb'
    },
    {
      id: 'bookkeeper',
      title: 'QuickBooks Bookkeeper',
      company: 'Reel It Inn Rentals',
      location: 'Freeport, TX',
      startDate: 'Apr 2023',
      endDate: 'Jul 2025',
      current: false,
      type: 'part-time',
      description: 'Managed complete financial operations for a vacation rental business.',
      achievements: [
        'Managed $60K yearly revenue processing 50+ monthly transactions in QuickBooks',
        'Maintained financial records with 99% accuracy for accounts payable and receivable',
        'Generated monthly financial reports to track revenue trends and inform management decisions',
        'Automated invoice generation and payment tracking, saving 10 hours weekly',
        'Implemented digital filing system for improved document management'
      ],
      technologies: ['QuickBooks', 'Excel', 'Financial Reporting', 'Data Analysis', 'Automation'],
      icon: <TrendingUp />,
      color: '#00d4aa'
    }
  ];


  return (
    <div className="experience-page">
      {/* Hero Section */}
      <section className="experience-hero">
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
            <Briefcase size={48} />
          </motion.div>
          <h1 className="hero-title">Professional Experience</h1>
          <p className="hero-subtitle">
            Building impactful solutions through data science, leadership, and innovation
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <motion.div 
            className="timeline-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`timeline-item ${exp.current ? 'current' : ''} ${selectedExperience === exp.id ? 'selected' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
              >
                <motion.div 
                  className="timeline-dot"
                  style={{ background: exp.color }}
                  whileHover={{ scale: 1.2 }}
                >
                  {exp.icon}
                </motion.div>
                
                <motion.div 
                  className="timeline-content"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="content-header">
                    <div className="header-info">
                      <h3>{exp.title}</h3>
                      {exp.companyLogo && (
                        <div className="company-logo-container">
                          {exp.companyLogo}
                        </div>
                      )}
                      {!exp.companyLogo && <p className="company">{exp.company}</p>}
                      <div className="meta">
                        <span className="location">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="date">
                          <Calendar size={14} />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.current && (
                      <span className="current-badge">Current</span>
                    )}
                  </div>
                  
                  <p className="description">{exp.description}</p>
                  
                  <motion.div
                    className="expanded-content"
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{
                      maxHeight: selectedExperience === exp.id ? '1000px' : 0,
                      opacity: selectedExperience === exp.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="achievements">
                      <h4>Key Achievements</h4>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <CheckCircle size={16} />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="tech-stack">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="tech-tag"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  <button className="expand-btn">
                    <span>{selectedExperience === exp.id ? 'Show Less' : 'Show More'}</span>
                    <ChevronRight className={selectedExperience === exp.id ? 'rotated' : ''} />
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;