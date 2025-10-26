// src/components/projects/ProjectsShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Brain, Database, Globe, Smartphone,
  Filter, Search, Star, Github, ExternalLink,
  Clock, CheckCircle, Activity, TrendingUp,
  Zap, Users, Award, Target, BarChart3,
  ChevronRight, Sparkles, Play, Eye
} from 'lucide-react';
import { projectsData, type Project } from '../../data/ProjectsData';
import './ProjectsShowcase.css';

interface ProjectsShowcaseProps {
  onProjectSelect?: (projectId: string) => void;
}

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onProjectSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Code2 />, color: '#667eea' },
    { id: 'ml', label: 'Machine Learning', icon: <Brain />, color: '#f093fb' },
    { id: 'web', label: 'Web Development', icon: <Globe />, color: '#00d4aa' },
    { id: 'data', label: 'Data Science', icon: <Database />, color: '#ffd700' },
    { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone />, color: '#ff6b6b' },
  ];

  const statusColors = {
    'in-progress': { bg: '#ffd700', text: 'In Progress', icon: <Activity /> },
    'completed': { bg: '#00d4aa', text: 'Completed', icon: <CheckCircle /> },
    'maintained': { bg: '#667eea', text: 'Maintained', icon: <Clock /> }
  };

  const filteredProjects = projectsData
    .filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
    });

  const regularProjects = filteredProjects;

  useEffect(() => {
    // Parallax effect for featured project
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const parallaxElements = containerRef.current.querySelectorAll('.parallax-bg');
        parallaxElements.forEach((el: any) => {
          el.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    return (
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        onClick={() => onProjectSelect?.(project.id)}
      >
        {/* Status Badge */}
        <div className={`status-badge ${project.status}`}>
          {statusColors[project.status].icon}
          <span>{statusColors[project.status].text}</span>
        </div>

        {/* Thumbnail */}
        <div className="project-thumbnail">
          {project.thumbnail && <img src={project.thumbnail} alt="" />}
          <div className="tech-badges">
            {project.techStack.slice(0, 3).map((tech) => (
              <div key={tech.name} className="tech-badge">
                {tech.name}
              </div>
            ))}
            {project.techStack.length > 3 && (
              <div className="tech-badge more">
                +{project.techStack.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>

          {/* Tags */}
          <div className="project-tags">
            {project.tags.slice(0, 5).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="project-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()} className="action-link" title="View on GitHub">
                <Github size={18} />
              </a>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()} className="action-link" title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
            <button className="action-link" onClick={() => onProjectSelect?.(project.id)} title="View Details">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="projects-showcase" ref={containerRef}>
      {/* Hero Section */}
      <motion.div
        className="showcase-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="hero-pattern" />
          <div className="parallax-bg" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Code2 size={48} />
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Projects
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore my portfolio of innovative solutions, from ML-powered platforms to stunning web experiences
          </motion.p>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="showcase-controls">
        <div className="controls-wrapper">
          {/* Search */}
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="category-filters">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  '--cat-color': cat.color
                } as React.CSSProperties}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>

          {/* View Options */}
          <div className="view-options">
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <div className="view-mode">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                <BarChart3 size={18} />
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                <TrendingUp size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="advanced-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="filter-group">
                <label>Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                  <option value="date">Latest First</option>
                  <option value="name">Alphabetical</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Projects Grid */}
      <div className={`projects-grid ${viewMode}`}>
        <AnimatePresence mode="popLayout">
          {regularProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search size={48} />
          <h3>No projects found</h3>
          <p>Try adjusting your filters or search query</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsShowcase;