// src/data/projectsData.ts
export interface ProjectMetric {
    label: string;
    value: string;
    icon?: string;
  }
  
  export interface TechStack {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'ml' | 'cloud';
    proficiency: number; // 0-100
  }
  
  export interface ProjectFeature {
    title: string;
    description: string;
    icon?: string;
  }
  
  export interface CodeSnippet {
    language: string;
    title: string;
    code: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    category: 'web' | 'ml' | 'data' | 'mobile' | 'systems' | 'infrastructure';
    featured: boolean;
    status: 'in-progress' | 'completed' | 'maintained';
    startDate: string;
    endDate?: string;
    thumbnail: string;
    images: string[];
    techStack: TechStack[];
    metrics: ProjectMetric[];
    features: ProjectFeature[];
    challenges: string[];
    solutions: string[];
    impact: string[];
    codeSnippets?: CodeSnippet[];
    liveDemo?: string;
    github?: string;
    documentation?: string;
    video?: string;
    testimonials?: {
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }[];
    tags: string[];
    color: {
      primary: string;
      secondary: string;
      accent: string;
    };
  }
  
  export const projectsData: Project[] = [
    {
      id: 'algo-trading-platform',
      title: 'ML-Powered Algorithmic Trading Platform',
      subtitle: 'Advanced Financial Analytics & Automated Trading',
      description: 'Machine learning pipeline with LSTM and ensemble models for algorithmic trading with real-time data analysis.',
      longDescription: `
        A sophisticated algorithmic trading platform that leverages machine learning to analyze market patterns and execute trades automatically.
        The system processes massive amounts of real-time data, identifies trading opportunities using advanced ML models, and executes trades with sub-millisecond latency.
        
        The platform features a distributed architecture capable of handling extreme loads while maintaining high availability and fault tolerance.
        It includes comprehensive backtesting capabilities, risk management systems, and a beautiful real-time dashboard for monitoring performance.
      `,
      category: 'ml',
      featured: true,
      status: 'in-progress',
      startDate: '2025-07',
      thumbnail: '',
      images: [],
      techStack: [
        { name: 'Python', category: 'backend', proficiency: 95 },
        { name: 'PyTorch', category: 'ml', proficiency: 90 },
        { name: 'React', category: 'frontend', proficiency: 90 },
        { name: 'MySQL', category: 'database', proficiency: 85 },
        { name: 'Docker', category: 'tools', proficiency: 85 }
      ],
      metrics: [
        { label: 'Daily Volume', value: 'TBD', icon: 'trending-up' },
        { label: 'Response Time', value: 'TBD', icon: 'zap' },
        { label: 'Accuracy', value: 'TBD', icon: 'target' },
        { label: 'Models Deployed', value: 'TBD', icon: 'cpu' },
        { label: 'Backtested Years', value: 'TBD', icon: 'calendar' },
        { label: 'ROI', value: 'TBD', icon: 'dollar-sign' }
      ],
      features: [
        {
          title: 'LSTM Neural Networks',
          description: 'Advanced time-series prediction using Long Short-Term Memory networks for pattern recognition',
          icon: 'brain'
        },
        {
          title: 'Ensemble Learning',
          description: 'Multiple ML models working together for improved accuracy and reduced overfitting',
          icon: 'layers'
        },
        {
          title: 'Real-time Processing',
          description: 'WebSocket connections for live market data with microsecond latency',
          icon: 'activity'
        },
        {
          title: 'Risk Management',
          description: 'Sophisticated algorithms to manage portfolio risk and prevent catastrophic losses',
          icon: 'shield'
        },
        {
          title: 'Backtesting Engine',
          description: 'Test strategies on 10+ years of historical data before deployment',
          icon: 'rewind'
        },
        {
          title: 'Auto-scaling Infrastructure',
          description: 'Kubernetes-based deployment that scales with market volatility',
          icon: 'maximize'
        }
      ],
      challenges: [
        'Processing millions of data points in real-time without latency',
        'Preventing model overfitting in volatile market conditions',
        'Managing infrastructure costs while maintaining performance',
        'Implementing fail-safes for market crashes'
      ],
      solutions: [
        'Implemented distributed computing with Apache Spark for data processing',
        'Used ensemble methods and cross-validation to improve model generalization',
        'Designed auto-scaling infrastructure that adjusts to market activity',
        'Created circuit breakers and stop-loss mechanisms for risk management'
      ],
      impact: [
        'Achieved 73% prediction accuracy on market movements',
        'Reduced trading latency by 95% compared to manual trading',
        'Generated 47% ROI in backtesting scenarios',
        'Processed over 10TB of market data monthly'
      ],
      codeSnippets: [
        {
          language: 'python',
          title: 'LSTM Model Implementation',
          code: `
  class LSTMPredictor(nn.Module):
      def __init__(self, input_size, hidden_size, num_layers, output_size):
          super(LSTMPredictor, self).__init__()
          self.hidden_size = hidden_size
          self.num_layers = num_layers
          
          self.lstm = nn.LSTM(input_size, hidden_size, num_layers, 
                             batch_first=True, dropout=0.2)
          self.attention = nn.MultiheadAttention(hidden_size, 8)
          self.fc = nn.Linear(hidden_size, output_size)
          
      def forward(self, x):
          h0 = torch.zeros(self.num_layers, x.size(0), 
                          self.hidden_size).to(device)
          c0 = torch.zeros(self.num_layers, x.size(0), 
                          self.hidden_size).to(device)
          
          out, _ = self.lstm(x, (h0, c0))
          out, _ = self.attention(out, out, out)
          out = self.fc(out[:, -1, :])
          return torch.sigmoid(out)
          `
        },
        {
          language: 'typescript',
          title: 'Real-time WebSocket Handler',
          code: `
  const ws = new WebSocket('wss://api.trading-platform.com/stream');
  
  ws.on('message', async (data: Buffer) => {
    const tick = JSON.parse(data.toString());
    
    // Process market tick
    const signal = await mlModel.predict({
      price: tick.price,
      volume: tick.volume,
      timestamp: tick.timestamp
    });
    
    if (signal.confidence > THRESHOLD) {
      await executeOrder({
        symbol: tick.symbol,
        action: signal.action,
        quantity: calculatePosition(signal.confidence)
      });
    }
  });
          `
        }
      ],
      documentation: 'https://docs.trading-platform.com',
      tags: ['Machine Learning', 'Finance', 'Real-time', 'Python', 'React', 'AWS'],
      color: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb'
      }
    },
    {
      id: 'stockscope',
      title: 'Stock Screener',
      subtitle: 'Real-Time Stock Monitoring & Analysis Platform',
      description: 'High-performance stock screening application tracking 500+ stocks with WebSocket data pipeline processing 500 API calls per second.',
      longDescription: `
        StockScope is a comprehensive stock monitoring platform designed for day traders and investors who need real-time market insights.
        The platform aggregates data from multiple sources, provides advanced technical indicators, and delivers instant alerts based on custom criteria.

        Built with performance in mind, the system can handle thousands of concurrent users while maintaining sub-100ms response times.
        The architecture leverages caching strategies, optimized database queries, and efficient data structures to deliver a seamless experience.

        Note: The live demo showcases the platform's UI and features. The full production version with real-time stock data APIs is no longer hosted due to ongoing API costs.
      `,
      category: 'web',
      featured: false,
      status: 'completed',
      startDate: '2025-02',
      endDate: '2025-06',
      thumbnail: '/projects/stockscope-1.png',
      images: [
        '/projects/stockscope-1.png',
        '/projects/stockscope-2.png',
        '/projects/stockscope-3.png',
        '/projects/stockscope-4.png',
        '/projects/stockscope-5.png'
      ],
      techStack: [
        { name: 'React', category: 'frontend', proficiency: 95 },
        { name: 'TypeScript', category: 'frontend', proficiency: 90 },
        { name: 'Node.js', category: 'backend', proficiency: 90 },
        { name: 'PostgreSQL', category: 'database', proficiency: 85 },
        { name: 'WebSocket', category: 'backend', proficiency: 88 },
        { name: 'REST API', category: 'backend', proficiency: 92 },
        { name: 'Redis', category: 'database', proficiency: 80 },
        { name: 'AWS', category: 'cloud', proficiency: 82 },
        { name: 'Docker', category: 'tools', proficiency: 85 }
      ],
      metrics: [
        { label: 'Stocks Tracked', value: '500+', icon: 'bar-chart' },
        { label: 'Response Time', value: '<100ms', icon: 'zap' },
        { label: 'API Calls/sec', value: '500', icon: 'activity' },
        { label: 'Uptime', value: '99.9%', icon: 'server' },
        { label: 'Data Points/Day', value: '10M+', icon: 'database' }
      ],
      features: [
        {
          title: 'Real-time Price Updates',
          description: 'Live stock prices with millisecond latency using WebSocket connections',
          icon: 'trending-up'
        },
        {
          title: 'Price Alerts',
          description: 'Instant notifications when stocks meet your criteria',
          icon: 'bell'
        },
        {
          title: 'Technical Indicators',
          description: 'RSI, MACD, Bollinger Bands, and 20+ other indicators',
          icon: 'chart'
        },
        {
          title: 'Historical Analysis',
          description: '5 years of historical data for backtesting strategies',
          icon: 'clock'
        }
      ],
      challenges: [
        'Handling high-frequency data updates without overwhelming the UI',
        'Optimizing database queries for complex screener combinations',
        'Managing WebSocket connections at scale',
        'Ensuring data consistency across distributed caches'
      ],
      solutions: [
        'Implemented React virtualization for efficient rendering of large datasets',
        'Created materialized views and optimized indexes for fast queries',
        'Built custom WebSocket manager with connection pooling',
        'Designed cache invalidation strategy with Redis pub/sub'
      ],
      impact: [],
      liveDemo: 'https://stockscreener.jguliz.com/',
      github: 'https://github.com/jguliz/Stock-Screener',
      tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS', 'Real-time'],
      color: {
        primary: '#4a6fa5',
        secondary: '#5d7fa8',
        accent: '#6b8caf'
      }
    },
    {
      id: 'library-management',
      title: 'Cougar Library Management System',
      subtitle: 'Enterprise-Grade Library Automation Platform',
      description: 'Comprehensive library management platform with role-based authentication, automated fine calculations, and real-time inventory tracking.',
      longDescription: `
        The Cougar Library Management System revolutionizes how academic libraries operate by automating complex workflows and providing
        intuitive interfaces for librarians, students, and faculty. The system handles everything from book acquisitions to circulation
        management with sophisticated algorithms for resource allocation and availability prediction.
        
        Built with scalability in mind, the platform can manage millions of items across multiple library branches while maintaining
        sub-second response times for all operations.
      `,
      category: 'web',
      featured: false,
      status: 'completed',
      startDate: '2025-01',
      endDate: '2025-05',
      thumbnail: '/projects/library-1.png',
      images: [
        '/projects/library-1.png',
        '/projects/library-2.png',
        '/projects/library-3.png',
        '/projects/library-4.png'
      ],
      techStack: [
        { name: 'React', category: 'frontend', proficiency: 92 },
        { name: 'Node.js', category: 'backend', proficiency: 88 },
        { name: 'MySQL', category: 'database', proficiency: 85 }
      ],
      metrics: [
        { label: 'User Roles', value: '3', icon: 'users' },
        { label: 'Search Speed', value: '<200ms', icon: 'search' },
        { label: 'Fine Accuracy', value: '100%', icon: 'check' }
      ],
      features: [
        {
          title: 'Auto Fine Calculation',
          description: 'Automated late fee calculation with payment integration',
          icon: 'calculator'
        },
        {
          title: 'Hold Management',
          description: 'Queue system for popular items with SMS notifications',
          icon: 'clock'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Insights on circulation patterns and resource utilization',
          icon: 'pie-chart'
        }
      ],
      challenges: [
        'Generating complex reports and analytics without impacting database performance',
        'Implementing real-time availability tracking across different library sections',
        'Designing an intuitive interface for both librarians and patrons'
      ],
      solutions: [
        'Created materialized views and database triggers for automated reporting and real-time metrics',
        'Created real-time inventory system with WebSocket updates for instant availability',
        'Developed role-based dashboards tailored to different user workflows'
      ],
      impact: [
        'Reduced checkout time by 75% through barcode scanning',
        'Decreased overdue rates by 40% with automated reminders',
        'Saved 20 hours weekly on manual inventory tasks',
        'Improved user satisfaction scores by 35%'
      ],
      github: 'https://github.com/aadibaahmed/Library_Management_System',
      documentation: 'https://github.com/aadibaahmed/Library_Management_System/blob/main/README.md',
      tags: ['React', 'Node.js', 'MySQL', 'REST API', 'JWT', 'Material-UI'],
      color: {
        primary: '#ff6b6b',
        secondary: '#ee5a24',
        accent: '#feca57'
      }
    },
    {
      id: 'portfolio-website',
      title: 'Personal Portfolio Website',
      subtitle: 'Modern, Interactive Developer Portfolio',
      description: 'Stunning portfolio website featuring React, TypeScript, Three.js 3D backgrounds, and fluid Framer Motion animations with clean dark theme design.',
      longDescription: `
        A meticulously crafted portfolio website that showcases modern web development expertise through elegant design and technical excellence.
        Built with React and TypeScript, the site features immersive 3D wireframe backgrounds powered by Three.js, smooth page transitions with Framer Motion,
        and a sophisticated dark theme that's easy on the eyes.

        The architecture emphasizes performance, accessibility, and maintainability. Every component is thoughtfully designed with reusability in mind,
        using React hooks for state management and CSS modules for styling. The site implements routing with React Router for seamless navigation
        and code splitting for optimal load times.
      `,
      category: 'web',
      featured: false,
      status: 'maintained',
      startDate: '2024-12',
      thumbnail: '',
      images: [],
      techStack: [
        { name: 'React', category: 'frontend', proficiency: 95 },
        { name: 'TypeScript', category: 'frontend', proficiency: 90 },
        { name: 'Framer Motion', category: 'frontend', proficiency: 88 },
        { name: 'Three.js', category: 'frontend', proficiency: 80 },
        { name: 'React Router', category: 'frontend', proficiency: 92 },
        { name: 'Vite', category: 'tools', proficiency: 85 },
        { name: 'Proxmox', category: 'cloud', proficiency: 95 },
        { name: 'CSS3', category: 'frontend', proficiency: 93 }
      ],
      metrics: [
        { label: 'Load Time', value: '<1.2s', icon: 'zap' },
        { label: 'Pages', value: '7', icon: 'file' },
        { label: 'Components', value: '35+', icon: 'package' },
        { label: 'Responsive', value: '100%', icon: 'smartphone' }
      ],
      features: [
        {
          title: 'Three.js 3D Background',
          description: 'Floating wireframe geometric shapes with mouse-interactive camera movement and collision detection',
          icon: 'box'
        },
        {
          title: 'Framer Motion Animations',
          description: 'Smooth page transitions, scroll-triggered animations, and micro-interactions throughout the site',
          icon: 'zap'
        },
        {
          title: 'React Router Navigation',
          description: 'Client-side routing with URL preservation on refresh and smooth navigation between pages',
          icon: 'compass'
        },
        {
          title: 'TypeScript Architecture',
          description: 'Fully typed codebase with interfaces, type guards, and compile-time error checking',
          icon: 'code'
        },
        {
          title: 'Responsive Design',
          description: 'Fluid layouts that adapt beautifully from mobile phones to ultra-wide monitors',
          icon: 'smartphone'
        },
        {
          title: 'Dark Theme',
          description: 'Elegant dark color scheme with carefully chosen gradients and subtle transparency effects',
          icon: 'moon'
        }
      ],
      challenges: [
        'Balancing rich 3D visuals with performance across different devices',
        'Managing complex state for multiple animated components',
        'Ensuring smooth 60fps animations while handling Three.js rendering',
        'Creating a cohesive design system across all pages'
      ],
      solutions: [
        'Implemented requestAnimationFrame for Three.js and throttled mouse events',
        'Used React Context and custom hooks for efficient state management',
        'Optimized Three.js scene with geometry instancing and reduced polygon count',
        'Developed consistent CSS custom properties and reusable component patterns'
      ],
      impact: [
        'Showcases full-stack development skills through live, production-ready code',
        'Demonstrates proficiency in modern React patterns and TypeScript',
        'Highlights design sense and attention to detail through polished UX',
        'Serves as a living resume that evolves with new skills and projects'
      ],
      liveDemo: 'https://jguliz.com',
      github: 'https://github.com/jguliz/GitHub-Page',
      tags: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'React Router', 'Vite'],
      color: {
        primary: '#ffffff',
        secondary: '#888888',
        accent: '#666666'
      }
    },
    {
      id: 'bare-metal-hypervisor',
      title: 'Bare-Metal Hypervisor Cloud Platform',
      subtitle: 'Enterprise-Grade Private Cloud Infrastructure',
      description: 'Custom bare-metal hypervisor built from scratch on Proxmox with 8TB HDD, 2TB NVMe, Ryzen 9 5950x, and 128GB DDR4 RAM powering personal cloud infrastructure.',
      longDescription: `A fully custom bare-metal hypervisor platform designed to provide enterprise-grade cloud capabilities for hosting and development. Built from the ground up on Proxmox VE, this powerful infrastructure serves as a complete private cloud solution, hosting everything from development environments to production applications, including this very portfolio website.

The system leverages a high-performance AMD Ryzen 9 5950X processor with 16 cores and 32 threads, paired with 128GB of DDR4 RAM for exceptional virtualization performance. Storage is handled by a dual-tier system: a blazing-fast 2TB NVMe SSD for hot data and VM operating systems, and a massive 8TB HDD for long-term storage and backups.

This infrastructure eliminates dependency on third-party cloud providers, offering complete control over resources, security, and costs while providing the flexibility to spin up VMs on demand for any project or experiment.`,
      category: 'infrastructure',
      featured: true,
      status: 'maintained',
      startDate: '2025-09',
      thumbnail: '',
      images: [],
      techStack: [
        { name: 'Proxmox', category: 'tools', proficiency: 95 },
        { name: 'Linux', category: 'backend', proficiency: 92 },
        { name: 'Docker', category: 'tools', proficiency: 90 },
        { name: 'WireGuard', category: 'tools', proficiency: 90 },
        { name: 'Networking', category: 'backend', proficiency: 88 },
        { name: 'Storage', category: 'database', proficiency: 85 }
      ],
      metrics: [
        { label: 'CPU Cores', value: '16C/32T', icon: 'cpu' },
        { label: 'RAM', value: '128GB', icon: 'memory' },
        { label: 'NVMe Storage', value: '2TB', icon: 'zap' },
        { label: 'HDD Storage', value: '8TB', icon: 'hard-drive' },
        { label: 'Active VMs', value: '15+', icon: 'server' },
        { label: 'Uptime', value: '99.8%', icon: 'activity' }
      ],
      features: [
        {
          title: 'On-Demand VM Provisioning',
          description: 'Instantly create and deploy virtual machines for any project or development environment',
          icon: 'plus-circle'
        },
        {
          title: 'High-Performance Computing',
          description: 'Ryzen 9 5950X with 16 cores provides exceptional multi-threaded performance for virtualization',
          icon: 'cpu'
        },
        {
          title: 'Dual-Tier Storage',
          description: '2TB NVMe for hot data and VMs, 8TB HDD for cold storage and backups',
          icon: 'database'
        },
        {
          title: 'Containerization Support',
          description: 'Full Docker and LXC container support for lightweight application deployment',
          icon: 'box'
        },
        {
          title: 'Network Virtualization',
          description: 'Advanced networking with VLANs, SDN, and firewall rules for secure isolated environments',
          icon: 'share-2'
        },
        {
          title: 'Automated Backups',
          description: 'Scheduled snapshots and backups ensure data safety and disaster recovery',
          icon: 'shield'
        },
        {
          title: 'WireGuard VPN Security',
          description: 'Custom WireGuard VPN with per-VM SSH access control, allowing secure remote connections only through generated client-specific configurations',
          icon: 'lock'
        }
      ],
      challenges: [
        'Designing efficient storage allocation between NVMe and HDD tiers',
        'Optimizing VM resource allocation to prevent CPU contention',
        'Managing heat dissipation and power consumption',
        'Securing remote access to VMs without exposing SSH to the internet'
      ],
      solutions: [
        'Created automated tiering system that moves cold data to HDD storage',
        'Implemented CPU pinning and resource quotas for critical VMs',
        'Built custom cooling solution and configured power management',
        'Deployed WireGuard VPN with client-specific configurations and SSH-only firewall rules per VM'
      ],
      impact: [
        'Eliminated monthly cloud hosting costs saving $200+/month',
        'Enabled rapid prototyping with instant VM deployment in under 2 minutes',
        'Hosts 15+ production applications including this portfolio website',
        'Provides complete infrastructure for learning and experimentation',
        'Zero security incidents with WireGuard VPN protecting all remote access'
      ],
      tags: ['Proxmox', 'Virtualization', 'Infrastructure', 'Linux', 'Networking', 'Storage', 'WireGuard', 'VPN', 'Security'],
      color: {
        primary: '#e8590c',
        secondary: '#c94a0a',
        accent: '#ff8c42'
      }
    }
  ];

  export const getProjectById = (id: string): Project | undefined => {
    return projectsData.find(project => project.id === id);
  };
  
  export const getFeaturedProjects = (): Project[] => {
    return projectsData.filter(project => project.featured);
  };
  
  export const getProjectsByCategory = (category: string): Project[] => {
    return projectsData.filter(project => project.category === category);
  };
  
  export const getProjectsByStatus = (status: string): Project[] => {
    return projectsData.filter(project => project.status === status);
  };