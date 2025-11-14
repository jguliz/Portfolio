// src/pages/HomePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, Code2, Brain, Database,
  ChevronDown, GitBranch, Coffee,
  Rocket, Box, Github, Linkedin, Mail, FileSpreadsheet
} from 'lucide-react';
import * as THREE from 'three';
import {
  SiPython, SiR, SiJavascript, SiTypescript, SiCplusplus, SiSwift, SiMysql,
  SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiPostgresql, SiRedis, SiAmazon,
  SiGit, SiDocker, SiFastapi, SiNodedotjs, SiReact, SiPrefect, SiApacheairflow,
  SiApachespark, SiMlflow
} from 'react-icons/si';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [typedText, setTypedText] = useState('Data Scientist');
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const roles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Data Engineer"
  ];

  // Counter animation for stats
  const [counters, setCounters] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    commits: 0
  });

  const [totalCommits, setTotalCommits] = useState(923); // Total contributions including private repos

  // Three.js 3D Scene
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating 3D objects
    const objects: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.8),
      new THREE.IcosahedronGeometry(1.5),
      new THREE.TorusGeometry(1.2, 0.4, 16, 100),
      new THREE.ConeGeometry(1.2, 2.5, 8),
    ];

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    // Create 20 random objects
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry.clone(), material.clone());

      // Random position
      mesh.position.x = (Math.random() - 0.5) * 60;
      mesh.position.y = (Math.random() - 0.5) * 40;
      mesh.position.z = (Math.random() - 0.5) * 30;

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      // Store random velocity for animation
      (mesh.userData as any).velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      };
      (mesh.userData as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };

      objects.push(mesh);
      scene.add(mesh);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update camera position based on mouse
      camera.position.x += (mousePos.current.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mousePos.current.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate objects
      objects.forEach((obj) => {
        const velocity = (obj.userData as any).velocity;
        const rotationSpeed = (obj.userData as any).rotationSpeed;

        // Move objects
        obj.position.x += velocity.x;
        obj.position.y += velocity.y;
        obj.position.z += velocity.z;

        // Bounce off boundaries
        if (Math.abs(obj.position.x) > 30) velocity.x *= -1;
        if (Math.abs(obj.position.y) > 20) velocity.y *= -1;
        if (Math.abs(obj.position.z) > 15) velocity.z *= -1;

        // Rotate objects
        obj.rotation.x += rotationSpeed.x;
        obj.rotation.y += rotationSpeed.y;
        obj.rotation.z += rotationSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // Rotating roles effect
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    // Typing effect for current role
    let index = 0;
    setTypedText('');
    const typingInterval = setInterval(() => {
      if (index <= roles[currentRole].length) {
        setTypedText(roles[currentRole].slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentRole]);


  useEffect(() => {
    // Animate counters when in view
    if (isStatsInView) {
      const animateCounter = (target: number, key: keyof typeof counters) => {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      // Calculate years since January 1st, 2025
      const startDate = new Date('2025-01-01');
      const currentDate = new Date();
      const yearsSince = Math.max(0, Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)));

      animateCounter(10, 'projects');
      animateCounter(30, 'skills');
      animateCounter(yearsSince, 'experience');
      animateCounter(totalCommits, 'commits');
    }
  }, [isStatsInView, totalCommits]);

  const features = [
    {
      icon: <Brain />,
      title: 'Machine Learning',
      description: 'Developing intelligent systems with PyTorch, TensorFlow, and state-of-the-art algorithms for real-world applications',
    },
    {
      icon: <Database />,
      title: 'Data Engineering',
      description: 'Building robust data pipelines with SQL, Apache Spark, and cloud technologies to process millions of records',
    },
    {
      icon: <Code2 />,
      title: 'Software Development',
      description: 'Creating efficient, scalable applications with modern programming languages and best practices',
    }
  ];

  const techStack = [
    { name: 'Python', icon: <SiPython size={50} /> },
    { name: 'JavaScript', icon: <SiJavascript size={50} /> },
    { name: 'TypeScript', icon: <SiTypescript size={50} /> },
    { name: 'React', icon: <SiReact size={50} /> },
    { name: 'Node.js', icon: <SiNodedotjs size={50} /> },
    { name: 'PostgreSQL', icon: <SiPostgresql size={50} /> },
    { name: 'MySQL', icon: <SiMysql size={50} /> },
    { name: 'PyTorch', icon: <SiPytorch size={50} /> },
    { name: 'pandas', icon: <SiPandas size={50} /> },
    { name: 'NumPy', icon: <SiNumpy size={50} /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn size={50} /> },
    { name: 'XGBoost', icon: <Brain size={50} strokeWidth={1.5} /> },
    { name: 'Docker', icon: <SiDocker size={50} /> },
    { name: 'AWS', icon: <SiAmazon size={50} /> },
    { name: 'Git', icon: <SiGit size={50} /> },
    { name: 'FastAPI', icon: <SiFastapi size={50} /> },
    { name: 'Redis', icon: <SiRedis size={50} /> },
    { name: 'Excel', icon: <FileSpreadsheet size={50} strokeWidth={1.5} /> },
    { name: 'C++', icon: <SiCplusplus size={50} /> },
    { name: 'R', icon: <SiR size={50} /> },
    { name: 'Swift', icon: <SiSwift size={50} /> },
    { name: 'Prefect', icon: <SiPrefect size={50} /> },
    { name: 'Apache Airflow', icon: <SiApacheairflow size={50} /> },
    { name: 'Apache Spark', icon: <SiApachespark size={50} /> },
    { name: 'MLflow', icon: <SiMlflow size={50} /> }
  ];

  return (
    <div className="home-page">
      {/* Three.js 3D Background */}
      <div
        ref={containerRef}
        className="threejs-container"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <motion.div
          className="hero-content"
          style={{ y, opacity }}
        >
          {/* Simple Avatar */}
          <motion.div
            className="avatar-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="avatar-circle">
              <span className="avatar-text">JG</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="hero-title">
              <div className="greeting">Hello, I'm</div>
              <h1 className="name">Joshua Gulizia</h1>
            </div>

            {/* Role Display */}
            <div className="role-container">
              <span className="role-text">{typedText}</span>
              <motion.span
                className="cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              >
                |
              </motion.span>
            </div>

            <p className="hero-description">
              Transforming complex data into actionable insights and building
              intelligent systems that drive real-world impact. Pursuing Computer Science
              at the University of Houston with aspirations for a PhD in Data Science.
            </p>

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <motion.button
                className="btn-primary"
                onClick={() => onNavigate('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                className="btn-secondary"
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <motion.a
                href="https://github.com/jguliz"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/josh-gulizia-401474290"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:jgulizia1205@gmail.com"
                className="social-icon"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: Code2, value: counters.projects, label: 'Projects', suffix: '+' },
              { icon: Box, value: counters.skills, label: 'Technologies', suffix: '+' },
              { icon: Coffee, value: counters.experience === 0 ? '<1' : counters.experience, label: 'Years', suffix: '' },
              { icon: GitBranch, value: counters.commits, label: 'Contributions', suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <stat.icon className="stat-icon" size={32} />
                <div className="stat-value">
                  {stat.value}{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Expertise</h2>
          </motion.div>

          <div className="features-grid-new">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card-modern"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-card-glow" />
                <div className="feature-content-modern">
                  <div className="feature-icon-modern">{feature.icon}</div>
                  <h3 className="feature-title-modern">{feature.title}</h3>
                  <p className="feature-description-modern">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Skills</h2>
          </motion.div>

          <div className="tech-grid-modern">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-card-modern"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.5 }}
                whileHover={{ scale: 1.12, y: -8 }}
              >
                <div className="tech-card-inner">
                  <motion.div
                    className="tech-icon-logo"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h4 className="tech-name-modern">{tech.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="cta-title">Let's Collaborate</h2>
            <p className="cta-text">
              Ready to build something innovative together? Let's turn ideas into reality.
            </p>
            <motion.button
              className="cta-button"
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
