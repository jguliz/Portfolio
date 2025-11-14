// src/pages/AboutPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, MapPin, Calendar, Award,
  Target, Heart, Coffee, Code2, BookOpen,
  Sparkles, TrendingUp, Users, Star, User
} from 'lucide-react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  // Calculate days since a start date (Jan 1, 2024 = 600 energy drinks)
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const energyDrinkCount = 600 + daysPassed;

  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Animate the counter on mount
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = energyDrinkCount / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= energyDrinkCount) {
        setDisplayCount(energyDrinkCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [energyDrinkCount]);
  const education = {
    degree: 'Bachelor of Science in Computer Science',
    minor: 'Mathematics',
    university: 'University of Houston',
    location: 'Houston, TX',
    graduation: 'December 2026',
    gpa: '3.8/4.0',
    coursework: [
      'Machine Learning', 'Data Science', 'Database Systems', 
      'Data Structures', 'Statistics', 'Linear Algebra',
      'Algorithms', 'Artificial Intelligence'
    ]
  };

  const certifications = [
    {
      title: 'IBM Data Science Professional Certificate',
      issuer: 'IBM',
      date: 'In Progress',
      skills: ['Machine Learning', 'SQL', 'Data Visualization']
    }
  ];

  const interests = [
    { icon: <Code2 />, title: 'Coding', description: 'Building innovative solutions' },
    { icon: <TrendingUp />, title: 'Finance', description: 'Algorithmic trading & analysis' },
    { icon: <BookOpen />, title: 'Research', description: 'AI & Machine Learning papers' },
    { icon: <Users />, title: 'Mentoring', description: 'Teaching programming to students' }
  ];

  const values = [
    { icon: <Target />, title: 'Excellence', description: 'Striving for the highest quality in everything I do' },
    { icon: <Heart />, title: 'Passion', description: 'Genuinely loving the craft of building great software' },
    { icon: <Sparkles />, title: 'Innovation', description: 'Always looking for creative solutions to complex problems' },
    { icon: <Users />, title: 'Collaboration', description: 'Believing that great things are built by great teams' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
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
            <User size={48} />
          </motion.div>
          <h1 className="hero-title">About Me</h1>
          <p className="hero-subtitle">
            Data Scientist | Machine Learning Engineer
          </p>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Education</h2>
          </motion.div>
          
          <motion.div 
            className="education-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="edu-header">
              <GraduationCap className="edu-icon" />
              <div className="edu-info">
                <h3>{education.degree}</h3>
                <p className="edu-minor">Minor in {education.minor}</p>
                <p className="edu-university">{education.university}</p>
              </div>
              <div className="edu-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{education.location}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{education.graduation}</span>
                </div>
              </div>
            </div>
            
            <div className="coursework">
              <h4>Relevant Coursework</h4>
              <div className="course-grid">
                {education.coursework.map((course, index) => (
                  <motion.span 
                    key={course}
                    className="course-chip"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Certifications</h2>
          </motion.div>
          
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.title}
                className="cert-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Award className="cert-icon" />
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
                <div className="cert-skills">
                  {cert.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Me Section */}
      <section className="values-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What Drives Me</h2>
          </motion.div>

          <div className="values-grid-combined">
            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Target />
              </motion.div>
              <h3>Excellence</h3>
              <p>Striving for the highest quality in everything I do</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Heart />
              </motion.div>
              <h3>Passion</h3>
              <p>Genuinely loving the craft of building great software</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen />
              </motion.div>
              <h3>Research</h3>
              <p>Exploring AI & Machine Learning through academic papers</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp />
              </motion.div>
              <h3>Finance</h3>
              <p>Algorithmic trading and quantitative analysis</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles />
              </motion.div>
              <h3>Innovation</h3>
              <p>Always looking for creative solutions to complex problems</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users />
              </motion.div>
              <h3>Mentoring</h3>
              <p>Teaching programming and helping students grow</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="fun-facts">
        <div className="container">
          <motion.div
            className="facts-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Fun Facts</h2>
            <div className="facts-grid">
              <motion.div
                className="fact-item"
                whileHover={{ scale: 1.1 }}
              >
                <Coffee size={32} />
                <span className="fact-number">{displayCount.toLocaleString()}+</span>
                <span className="fact-label">Energy Drinks</span>
              </motion.div>
              <motion.div
                className="fact-item"
                whileHover={{ scale: 1.1 }}
              >
                <Code2 size={32} />
                <span className="fact-number">100K+</span>
                <span className="fact-label">Lines of Code</span>
              </motion.div>
              <motion.div
                className="fact-item"
                whileHover={{ scale: 1.1 }}
              >
                <Users size={32} />
                <span className="fact-number">200+</span>
                <span className="fact-label">Students Mentored</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;