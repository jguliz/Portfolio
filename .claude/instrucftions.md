# Dark Bento UI System - Claude Code Instructions

Use this as custom instructions or reference when building dark-themed Bento UI applications.

## Quick Reference

### Color System
```css
--bg-primary: #0A0A0F;
--surface-primary: #1A1A24;
--accent-blue: #3B82F6;
--accent-purple: #8B5CF6;
--bullish: #10B981;
--bearish: #EF4444;
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.7);
--border: rgba(255, 255, 255, 0.1);
```

### Bento Grid Base
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.bento-item {
  background: rgba(26, 26, 36, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bento-item:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

### Standard Animation
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### Glassmorphism
```css
.glass {
  background: rgba(26, 26, 36, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.125);
}
```

## React Component Pattern
```tsx
import { motion } from 'framer-motion';

const BentoItem = ({ children, size = 'small' }) => (
  <motion.div
    className={`bento-item bento-${size}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, scale: 1.01 }}
  >
    {children}
  </motion.div>
);
```

## Design Principles
1. Dark theme with sophisticated palettes
2. Bento Grid (modular, compartmentalized layouts)
3. Smooth animations (0.3s hover, 0.6s page load)
4. Glassmorphism effects
5. Premium fintech aesthetic
6. Mobile-first responsive

## Component Types
- Trading cards (price, change, mini chart)
- Stats cards (icon, label, value, trend)
- Chart containers (header, controls, canvas)
- Data tables (responsive, hover states)
- Alert cards (icon, title, message, action)

## Default Settings
- Border radius: 16px
- Gap between items: 20px
- Padding: 24px
- Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Font: Inter or system font stack
- Contrast: WCAG AA (4.5:1 minimum)

## When to Apply
Use this system for:
- Trading platforms
- Fintech dashboards  
- SaaS applications
- Data visualization interfaces
- Analytics pages
- Portfolio trackers

Always:
- Use dark backgrounds
- Apply Bento grid layouts
- Add hover animations
- Ensure mobile responsiveness
- Follow accessibility standards