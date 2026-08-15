import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Mail, 
  Sun, 
  Moon, 
  BookOpen, 
  Briefcase, 
  Code, 
  Cpu, 
  ArrowLeft,
  GitPullRequest,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Calendar
} from 'lucide-react';

// --- CountUp Component for Gestalt-driven Numeric Stats ---
const CountUp: React.FC<{ end: number; duration?: number; prefix?: string; suffix?: string }> = ({ 
  end, 
  duration = 2, 
  prefix = "", 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            }
          };
          animationFrameId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return <span ref={elementRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// --- Tilt Component for Hero Figure-Ground Elevation ---
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;

    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateX = isHovered ? -coords.y * 3.5 : 0;
  const rotateY = isHovered ? coords.x * 3.5 : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(8px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};

export default function PortfolioApp() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const copyEmail = () => {
    navigator.clipboard.writeText('ajineshpratap@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Motion variants for Continuity & Proximity
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <div className="relative min-h-screen py-10 md:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto z-10 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Figure-Ground: Atmospheric background lighting */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] left-[8%] w-[450px] h-[450px] rounded-full bg-[var(--blob-1)] blur-[120px] animate-mesh-drift" />
        <div className="absolute top-[45%] right-[10%] w-[520px] h-[520px] rounded-full bg-[var(--blob-2)] blur-[140px] animate-mesh-drift-reverse" />
        <div className="absolute bottom-[10%] left-[20%] w-[380px] h-[380px] rounded-full bg-[var(--blob-3)] blur-[110px] animate-mesh-drift" />
      </div>

      {/* Tactile Texture Overlay */}
      <div className="absolute inset-0 -z-10 noise-overlay opacity-30 pointer-events-none" />

      {/* ========================================================
          1. NAVIGATION BAR — Gestalt Proximity & Common Region
          ======================================================== */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex items-center justify-between mb-10 md:mb-12 relative z-50 glass-card px-5 py-3 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-subtle)] hover:text-[var(--accent-color)] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>research hub</span>
          </a>
          <span className="text-[var(--card-border)]">/</span>
          <span className="text-xs font-mono font-semibold text-[var(--text-main)]">
            portfolio
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Contact Link */}
          <a 
            href="#contact" 
            className="hidden sm:inline-flex text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-[var(--card-border-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            contact
          </a>

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[var(--card-border-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* ========================================================
          MAIN GESTALT LAYOUT GRID
          - Proximity: tightly organized items
          - Similarity: identical card structures & action buttons
          - Common Region: explicit glass card boundaries
          - Continuity: Eye flow from Hero -> Stats -> Exp -> Projects -> Skills -> Achievements -> Contact
          ======================================================== */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12 md:space-y-16"
      >
        
        {/* ======================================================
            SECTION 1: HERO & PROFILE REGION
            (Common Region: Unified Hero identity module)
            (Continuity: Heading -> Description -> CTAs)
            (Figure-Ground: High-contrast primary CTA)
            ====================================================== */}
        <motion.div variants={itemVariants} className="w-full">
          <TiltCard className="glass-card rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-glow)] rounded-bl-full filter blur-3xl opacity-50 pointer-events-none" />
            
            <div className="relative z-10">
              {/* Proximity: Availability Pill + University Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[var(--emerald-accent)] bg-[var(--emerald-glow)] border border-[var(--emerald-accent)]/20">
                  <span className="w-2 h-2 rounded-full bg-[var(--emerald-accent)] animate-pulse" />
                  <span>Open for AI/ML & Full-Stack Roles</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[var(--text-subtle)] bg-[var(--card-bg-subtle)] border border-[var(--card-border)]">
                  <MapPin className="w-3 h-3 text-[var(--accent-color)]" />
                  <span>Ayodhya, UP, India</span>
                </div>
              </div>

              {/* Continuity: Name & Clear Tagline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[var(--text-main)] mb-4 leading-[1.06]">
                Ajinesh Pratap <span className="text-[var(--accent-color)]">Singh</span>
              </h1>
              
              <div className="text-lg sm:text-xl md:text-2xl font-display font-medium text-[var(--text-muted)] mb-4">
                AI/ML Engineer & Full-Stack Developer
              </div>

              <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed max-w-3xl mb-8">
                B.Tech ECE undergraduate (2023–2027) at <strong className="text-[var(--text-main)] font-semibold">Dr. Ram Manohar Lohia Avadh University</strong>. Building production-ready AI/ML systems end-to-end — from semantic RAG architectures and deep learning classifiers to high-throughput web APIs.
              </p>

              {/* Similarity: Standardized Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                {/* Figure-Ground: High-contrast Primary CTA */}
                <a 
                  href="https://mathesis-rag.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Similarity: Secondary Action Buttons with matching padding & typography */}
                <a 
                  href="https://github.com/ajinesh703" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary-action inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/ajinesh-pratap-singh-b59141248/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary-action inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span>LinkedIn</span>
                </a>

                <button 
                  onClick={copyEmail}
                  className="btn-secondary-action inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ======================================================
            SECTION 2: KEY STATS / PROOF POINTS
            (Similarity: All 4 stat cards share uniform metrics format)
            (Common Region: Explicit statistical quadrant)
            ====================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider mb-2">Problem Solving</span>
            <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] mb-1">
              <CountUp end={1100} suffix="+" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">LeetCode DSA & System Problems</span>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-mono text-[var(--emerald-accent)] uppercase tracking-wider mb-2">Open Source</span>
            <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] mb-1">
              <CountUp end={4000} suffix="+" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">GitHub Contributions & Merged PRs</span>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider mb-2">Model Accuracy</span>
            <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] mb-1">
              96.14%
            </div>
            <span className="text-xs text-[var(--text-muted)]">MobileNetV2 Crop Diagnostics</span>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-mono text-[var(--emerald-accent)] uppercase tracking-wider mb-2">Internships</span>
            <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] mb-1">
              3
            </div>
            <span className="text-xs text-[var(--text-muted)]">Industry & Research Internships</span>
          </div>
        </motion.div>

        {/* ======================================================
            SECTION 3: EXPERIENCE & EDUCATION
            (Common Region: Unified Timeline & Credentials container)
            (Proximity: Dates + Roles + Impact bullets tightly coupled)
            ====================================================== */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--card-border-hover)]">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">
                Experience & Education
              </h2>
              <p className="text-xs font-mono text-[var(--text-subtle)]">
                // professional track record & academic foundation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Experience Sub-Region (Spans 2 columns) */}
            <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 space-y-8">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] pb-2 border-b border-[var(--card-border)]">
                Industry Internships
              </div>

              {/* FlyRank */}
              <div className="relative pl-6 border-l-2 border-[var(--accent-color)] space-y-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg-color)] border-2 border-[var(--accent-color)]" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-display font-bold text-[var(--text-main)]">
                    Back-End AI Engineering Intern
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-subtle)] px-2.5 py-1 rounded-md bg-[var(--card-bg-subtle)] border border-[var(--card-border)]">
                    Jul – Aug 2026
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--accent-color)] font-semibold">
                  FlyRank Corp · Remote
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Architected and deployed backend AI microservices in an intensive 6-week program. Built modular OOP pipeline architectures connecting foundational LLM components and inference endpoints with RESTful services.
                </p>
              </div>

              {/* InAmigos */}
              <div className="relative pl-6 border-l-2 border-[var(--card-border)] space-y-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg-color)] border-2 border-[var(--text-subtle)]" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-display font-bold text-[var(--text-main)]">
                    Web Developer Intern
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-subtle)] px-2.5 py-1 rounded-md bg-[var(--card-bg-subtle)] border border-[var(--card-border)]">
                    May – Jun 2026
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] font-semibold">
                  InAmigos Foundation · Remote
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Engineered responsive, accessible front-end interfaces using modern JavaScript, CSS3, and HTML5. Integrated asynchronous REST API consumers for smooth real-time data flows.
                </p>
              </div>

              {/* Sysslan */}
              <div className="relative pl-6 border-l-2 border-[var(--card-border)] space-y-2">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg-color)] border-2 border-[var(--text-subtle)]" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-display font-bold text-[var(--text-main)]">
                    Data Scientist Intern
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-subtle)] px-2.5 py-1 rounded-md bg-[var(--card-bg-subtle)] border border-[var(--card-border)]">
                    May – Jun 2026
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] font-semibold">
                  Sysslan IT Solutions · Remote
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Conducted exploratory data analysis (EDA) and built statistical modeling workflows. Designed reusable OOP transformer pipelines in Python for clean dataset preparation.
                </p>
              </div>
            </div>

            {/* Education Sub-Region (1 column) */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] pb-2 border-b border-[var(--card-border)] mb-6 flex items-center justify-between">
                  <span>Education</span>
                  <BookOpen className="w-4 h-4 text-[var(--accent-color)]" />
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-glow)] border border-[var(--card-border-hover)]">
                    <Calendar className="w-3 h-3" />
                    <span>2023 – 2027</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                    B.Tech in Electronics & Communication
                  </h3>

                  <p className="text-sm font-medium text-[var(--accent-color)]">
                    Dr. Ram Manohar Lohia Avadh University
                  </p>

                  <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
                    Ayodhya, Uttar Pradesh, India
                  </p>

                  <div className="pt-4 border-t border-[var(--card-border)] space-y-2">
                    <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Key Coursework</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Linear Algebra', 'OOP'].map(c => (
                        <span key={c} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-xs text-[var(--text-muted)]">
                💡 Focused on the intersection of modern Deep Learning, Vector Databases, and Scalable Backend Architectures.
              </div>
            </div>

          </div>
        </motion.div>

        {/* ======================================================
            SECTION 4: FEATURED PROJECTS
            (Similarity: All 4 project cards follow identical structure)
            (Common Region: Each project has self-contained elevation)
            (Figure-Ground: Prominent tags and GitHub links)
            ====================================================== */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--card-border-hover)]">
                <Code className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">
                  Featured Projects
                </h2>
                <p className="text-xs font-mono text-[var(--text-subtle)]">
                  // RAG architectures, computer vision classifiers & NLP tools
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PROJECT 1: REPOCHAT */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group">
              <div>
                {/* Header: Proximity Category + Action Button */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--accent-glow)] border border-[var(--card-border-hover)]">
                    RAG / Codebase QA
                  </span>
                  <a 
                    href="https://github.com/ajinesh703/RepoChat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:text-[var(--accent-color)] text-[var(--text-subtle)] transition-colors"
                    aria-label="View RepoChat on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--text-main)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  RepoChat
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  Full-stack conversational agent enabling natural language exploration over any public GitHub repository. Powered by a class-based FastAPI backend with LangChain chunking, FAISS vector indexing, and a responsive React UI. Thoroughly unit-tested with pytest.
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[var(--card-border)] flex flex-wrap gap-2">
                  {['FastAPI', 'React.js', 'LangChain', 'FAISS', 'Python', 'pytest', 'REST API'].map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECT 2: CROPGUARD AI */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[var(--emerald-accent)] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--emerald-glow)] border border-[var(--emerald-accent)]/20">
                    Computer Vision · 96.14% Acc
                  </span>
                  <a 
                    href="https://github.com/ajinesh703" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:text-[var(--accent-color)] text-[var(--text-subtle)] transition-colors"
                    aria-label="View CropGuard AI on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--text-main)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  CropGuard AI
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  High-precision agricultural disease diagnosis platform. Leverages TensorFlow and transfer-learning via MobileNetV2 trained across 38 plant disease classes. Features real-time image diagnostic uploads with instant treatment suggestions.
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[var(--card-border)] flex flex-wrap gap-2">
                  {['MobileNetV2', 'TensorFlow', 'Python', 'FastAPI', 'React.js', 'Computer Vision'].map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECT 3: LEGAL RAG ASSISTANT */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--accent-glow)] border border-[var(--card-border-hover)]">
                    Semantic Search · 500+ Docs
                  </span>
                  <a 
                    href="https://github.com/ajinesh703" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:text-[var(--accent-color)] text-[var(--text-subtle)] transition-colors"
                    aria-label="View Legal RAG on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--text-main)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  Legal RAG Assistant
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  Context-aware retrieval engine indexing 500+ Indian legal documents, judicial precedents, and statutory acts. Combines ChromaDB vector collections with LangChain QA chains and an intuitive Streamlit interface for fast semantic research.
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[var(--card-border)] flex flex-wrap gap-2">
                  {['ChromaDB', 'Streamlit', 'LangChain', 'Python', 'Embeddings', 'NLP'].map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECT 4: ATS RESUME SCORE CHECKER */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--accent-glow)] border border-[var(--card-border-hover)]">
                    NLP & Similarity
                  </span>
                  <a 
                    href="https://github.com/ajinesh703" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:text-[var(--accent-color)] text-[var(--text-subtle)] transition-colors"
                    aria-label="View ATS Checker on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--text-main)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  ATS Resume Score Checker
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  Automated resume analysis and scoring engine matching candidate resumes against target job descriptions. Uses TF-IDF vectorization and Cosine Similarity to identify keyword alignment and provide actionable optimization feedback.
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[var(--card-border)] flex flex-wrap gap-2">
                  {['TF-IDF', 'Flask', 'Python', 'Cosine Similarity', 'NLP', 'REST API'].map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ======================================================
            SECTION 5: SKILLS MATRIX & OPEN SOURCE CONTRIBUTIONS
            (Common Region: Grouped Domain Cards)
            (Similarity: Uniform badge styling across categories)
            ====================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Skills Matrix (Spans 2 columns) */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--card-border)]">
              <span className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--card-border-hover)]">
                <Cpu className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Skills & Technical Stack
                </h2>
                <p className="text-xs font-mono text-[var(--text-subtle)]">
                  // categorized by functional domain
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Category 1: Languages */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--text-subtle)] uppercase">Programming Languages</span>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript', 'TypeScript', 'SQL', 'C / C++ (DSA)'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-[var(--card-border-hover)] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2: Frameworks & AI/ML */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--text-subtle)] uppercase">AI/ML & Backend Frameworks</span>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'React.js', 'LangChain', 'TensorFlow', 'Flask', 'Streamlit', 'MobileNetV2', 'pandas', 'NumPy', 'pytest'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[var(--accent-glow)] border border-[var(--card-border-hover)] text-[var(--accent-color)] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 3: Vector Databases & Tools */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--text-subtle)] uppercase">Vector Databases & DevOps</span>
                <div className="flex flex-wrap gap-2">
                  {['FAISS', 'ChromaDB', 'Git & GitHub', 'REST APIs', 'Linux / Bash', 'Postman', 'Docker'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[var(--card-bg-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-[var(--card-border-hover)] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Open Source Contributions (Spans 1 column) */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--card-border)] mb-4">
                <span className="p-2 rounded-xl bg-[var(--emerald-glow)] text-[var(--emerald-accent)] border border-[var(--emerald-accent)]/20">
                  <GitPullRequest className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-display font-bold text-[var(--text-main)]">
                    Open Source Impact
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-subtle)]">
                    // upstream merged PRs
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* SymPy */}
                <div className="p-3.5 rounded-2xl bg-[var(--card-bg-subtle)] border border-[var(--card-border)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[var(--text-main)]">SymPy</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--emerald-glow)] text-[var(--emerald-accent)]">Merged</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Resolved symbolic computation type error in core mathematical evaluation pipelines.
                  </p>
                </div>

                {/* SimplifyJobs */}
                <div className="p-3.5 rounded-2xl bg-[var(--card-bg-subtle)] border border-[var(--card-border)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[var(--text-main)]">SimplifyJobs</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--emerald-glow)] text-[var(--emerald-accent)]">Merged</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Fixed CI/CD build scripts for New-Grad-Positions repository automation pipeline.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-subtle)]">LeetCode Ranking:</span>
              <span className="font-mono font-bold text-[var(--accent-color)]">1100+ Solved</span>
            </div>
          </div>

        </motion.div>

        {/* ======================================================
            SECTION 6: CONTACT & FOOTER REGION
            (Common Region: Dedicated Call to Action Container)
            (Continuity: Direct contact actionables in proximity)
            ====================================================== */}
        <motion.div variants={itemVariants} id="contact" className="w-full">
          <div className="glass-card rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--accent-glow)] rounded-full filter blur-3xl opacity-40 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-color)] font-semibold mb-2 block">
                  Let's collaborate
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] mb-4">
                  Ready to build high-impact <span className="text-[var(--accent-color)]">AI systems</span>?
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-lg">
                  Whether you're looking for an AI/ML engineering intern, a full-stack developer, or open-source collaboration, my inbox is always open.
                </p>
              </div>

              <div className="space-y-3">
                {/* Email Action */}
                <a 
                  href="mailto:ajineshpratap@gmail.com"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)]">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-subtle)] font-mono">Email Address</div>
                      <div className="text-sm font-mono font-medium text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                        ajineshpratap@gmail.com
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[var(--accent-color)] transition-colors" />
                </a>

                {/* LinkedIn Action */}
                <a 
                  href="https://www.linkedin.com/in/ajinesh-pratap-singh-b59141248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-subtle)] font-mono">LinkedIn Profile</div>
                      <div className="text-sm font-mono font-medium text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                        linkedin.com/in/ajinesh-pratap-singh
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[var(--accent-color)] transition-colors" />
                </a>

                {/* GitHub Action */}
                <a 
                  href="https://github.com/ajinesh703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-subtle)] font-mono">GitHub Profile</div>
                      <div className="text-sm font-mono font-medium text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                        github.com/ajinesh703
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[var(--accent-color)] transition-colors" />
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-subtle)]">
              <div>© 2026 Ajinesh Pratap Singh · Crafted with Gestalt Principles</div>
              <div className="flex items-center gap-4">
                <a href="#top" className="hover:text-[var(--accent-color)] transition-colors">back to top ↑</a>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
