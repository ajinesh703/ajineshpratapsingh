import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Mail, 
  ExternalLink, 
  Sun, 
  Moon, 
  BookOpen, 
  Briefcase, 
  Code, 
  Award, 
  Cpu, 
  ArrowLeft,
  CheckCircle,
  GitPullRequest
} from 'lucide-react';

// --- CountUp Component for Achievements ---
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
            // Ease out cubic
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

// --- Tilt Component for Hero Card ---
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate normalized coordinates (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;

    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Limit rotation to max 4 degrees
  const rotateX = isHovered ? -coords.y * 4 : 0;
  const rotateY = isHovered ? coords.x * 4 : 0;

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
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
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

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Framer Motion staggered transition configurations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-16 px-4 md:px-8 max-w-7xl mx-auto z-10 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Drifting blurred background blobs */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[var(--blob-1)] blur-[100px] animate-mesh-drift" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[var(--blob-2)] blur-[120px] animate-mesh-drift-reverse" />
        <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-[var(--blob-3)] blur-[90px] animate-mesh-drift" />
      </div>

      {/* Grid overlay for aesthetic texture */}
      <div className="absolute inset-0 -z-10 noise-overlay opacity-30 pointer-events-none" />

      {/* Floating navigation bar */}
      <nav className="w-full flex items-center justify-between mb-12 relative z-50">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="AI Brain Logo" className="w-10 h-10 rounded-xl shadow-md border border-[var(--card-border)] object-cover" />
          <a href="/" className="inline-flex items-center gap-2 text-sm font-mono font-semibold tracking-tight text-[var(--accent-color)] group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>back to research hub</span>
          </a>
        </div>

        {/* Custom animated Theme Switch */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="relative flex items-center gap-2 p-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md cursor-pointer hover:border-[var(--card-border-hover)] transition-all duration-300"
          aria-label="Toggle theme"
        >
          <div className="relative flex items-center justify-between w-14 h-7 rounded-full bg-slate-900/10 dark:bg-white/10 px-1">
            <motion.div 
              layout 
              className="absolute left-1 w-5 h-5 rounded-full bg-[var(--accent-color)] shadow-md"
              animate={{ x: theme === 'dark' ? 26 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <Sun className="w-3.5 h-3.5 ml-1 text-amber-500 z-10 pointer-events-none" />
            <Moon className="w-3.5 h-3.5 mr-1 text-indigo-300 z-10 pointer-events-none" />
          </div>
        </button>
      </nav>

      {/* Bento Grid layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        
        {/* HERO CARD - Asymmetric 2x2/grid-cols-4 span */}
        <motion.div 
          variants={itemVariants} 
          className="md:col-span-4 lg:col-span-4 row-span-2 group"
        >
          <TiltCard className="h-full glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-glow)] rounded-bl-full filter blur-2xl opacity-40 pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-glow)] mb-6 border border-[var(--card-border-hover)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                Available for internships & collaborations
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.08] text-slate-800 dark:text-slate-100">
                Ajinesh Pratap <br />
                <span className="text-[var(--accent-color)]">Singh</span>
              </h1>
              
              <p className="text-lg md:text-xl font-sans text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
                "I ship AI/ML systems end-to-end — from RAG pipelines to production-ready full-stack apps."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA */}
              <a 
                href="https://mathesis-rag.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--shadow-color)]"
              >
                <span>View Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a 
                href="https://github.com/ajinesh703" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-border-hover)] text-slate-700 dark:text-slate-300 font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                <span>GitHub Profile</span>
              </a>
            </div>
          </TiltCard>
        </motion.div>

        {/* EDUCATION CARD - Bento 1x1 span */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-[var(--card-border-hover)]">
                <BookOpen className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Education</span>
            </div>
            
            <div>
              <h2 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 mb-2">B.Tech in ECE</h2>
              <p className="text-sm font-sans text-slate-500 dark:text-slate-400 mb-4">
                Electronics and Communication Engineering
              </p>
              <div className="text-xs font-mono text-[var(--accent-color)] mb-4">
                Dr. Ram Manohar Lohia Avadh University, Ayodhya, UP, India
              </div>
            </div>
            
            <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
              <span className="text-xs text-slate-400">Duration</span>
              <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">Aug 2023 – Expected Jul 2027</span>
            </div>
          </div>
        </motion.div>

        {/* ACHIEVEMENTS CARD - Bento 1x1 span */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-[var(--card-border-hover)]">
                <Award className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Stats</span>
            </div>
            
            <div className="space-y-6">
              {/* LeetCode count */}
              <div>
                <div className="text-3xl font-display font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                  <CountUp end={1000} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  LeetCode problems solved across DSA, DP, Graph Theory & Systems
                </div>
              </div>

              {/* GitHub contributions count */}
              <div>
                <div className="text-3xl font-display font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                  <CountUp end={1000} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  GitHub contributions & Open Source PRs merged to SymPy & SimplifyJobs
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SKILLS CARD - Bento Wide spanning 3 columns on medium grids */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-3 lg:col-span-3"
        >
          <div className="glass-card rounded-3xl p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[var(--accent-color)]" />
                <span>Skills & Tech Stack</span>
              </h2>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Expertise</span>
            </div>

            <div className="space-y-4">
              {/* Languages */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">Languages</span>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-500/5 border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">Frameworks & Libraries</span>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'React.js', 'Streamlit', 'TensorFlow', 'LangChain', 'pandas', 'NumPy', 'pytest'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-500/5 border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI/ML */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">AI/ML & Vector DBs</span>
                <div className="flex flex-wrap gap-2">
                  {['RAG', 'Computer Vision', 'NLP', 'Transfer Learning', 'MobileNetV2', 'FAISS', 'ChromaDB', 'Ollama', 'Mistral LLM'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--card-border-hover)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concepts & Tools */}
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">Concepts & Tools</span>
                <div className="flex flex-wrap gap-2">
                  {['DSA', 'System Design', 'OOP', 'DBMS', 'Git', 'Postman', 'Linux', 'Bash'].map(skill => (
                    <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-500/5 border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EXPERIENCE CARD - Bento Wide spanning 3 columns on medium grids */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-3 lg:col-span-3"
        >
          <div className="glass-card rounded-3xl p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[var(--accent-color)]" />
                <span>Professional Experience</span>
              </h2>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">History</span>
            </div>

            <div className="relative border-l border-[var(--card-border)] pl-4 space-y-6">
              
              {/* FlyRank */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-color)] ring-4 ring-[var(--accent-glow)]" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-slate-800 dark:text-slate-200">FlyRank Corp</h3>
                    <span className="text-xs font-mono text-[var(--accent-color)]">Back-End AI Engineering Intern (Remote)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">Jul – Aug 2026</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Built backend AI services in a 6-week program; implemented OOP-based components for models & pipelines using Python & REST APIs.
                </p>
              </div>

              {/* InAmigos */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-slate-800 dark:text-slate-200">InAmigos Foundation</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Web Developer Intern (Remote)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">May – Jun 2026</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Designed responsive web interfaces with HTML5/CSS3/JavaScript; consumed RESTful APIs with asynchronous data fetching.
                </p>
              </div>

              {/* Sysslan */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-slate-800 dark:text-slate-200">Sysslan IT Solutions</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Data Scientist Intern (Remote)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">May – Jun 2026</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Conducted EDA and statistical modeling on business datasets; built preprocessing pipelines using reusable OOP transformer classes.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* PROJECTS SECTION HEADER - spanning all columns */}
        <div className="md:col-span-6 mt-12 mb-2">
          <div className="flex items-center gap-3">
            <span className="h-[1px] flex-grow bg-[var(--card-border)]" />
            <h2 className="text-2xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Code className="w-6 h-6 text-[var(--accent-color)]" />
              <span>Featured Projects</span>
            </h2>
            <span className="h-[1px] flex-grow bg-[var(--card-border)]" />
          </div>
        </div>

        {/* PROJECT 1: REPOCHAT - Spans 4 columns on large screens for visual variation */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-6 lg:col-span-4"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider">GitHub Q&A via RAG</span>
                <a 
                  href="https://github.com/ajinesh703/RepoChat" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl border border-[var(--card-border)] hover:bg-[var(--card-border-hover)] text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                RepoChat
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Full-stack app enabling natural language queries over GitHub repositories. Built with a modular class-based FastAPI backend and a clean React frontend, executing vector retrieval via a performant FAISS indexing pipeline. Tested for retrieval accuracy with robust pytest test suites.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Python', 'FastAPI', 'LangChain', 'FAISS', 'React.js', 'REST API', 'pytest'].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-500/5 text-slate-500 dark:text-slate-400 border border-[var(--card-border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 2: CROPGUARD AI - Spans 2 columns, has high-prominence accuracy stat */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-3 lg:col-span-2"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between border-2 border-indigo-500/20 relative overflow-hidden group">
            {/* Highlighted Stat Overlay */}
            <div className="absolute top-4 right-4 py-2 px-3 bg-emerald-500/10 text-emerald-500 font-mono font-bold text-lg rounded-xl border border-emerald-500/20 shadow-md">
              96.14% Acc
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider">Computer Vision</span>
                <a 
                  href="https://github.com/ajinesh703" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl border border-[var(--card-border)] hover:bg-[var(--card-border-hover)] text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                CropGuard AI
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Production-ready plant disease detection app powered by TensorFlow/MobileNetV2. Utilizes a modular OOP-based inference pipeline capable of running concurrent image diagnostic uploads. Validated extensively on the PlantVillage dataset across 38 distinct crop categories.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['FastAPI', 'React.js', 'MobileNetV2', 'TensorFlow', 'REST API'].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-500/5 text-slate-500 dark:text-slate-400 border border-[var(--card-border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 3: LEGAL RAG ASSISTANT - Spans 3 columns */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-3 lg:col-span-3"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider">Semantic Search</span>
                <a 
                  href="https://github.com/ajinesh703" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl border border-[var(--card-border)] hover:bg-[var(--card-border-hover)] text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
              </div>
              
              <h3 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                Legal RAG Assistant
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Exposes REST endpoints for querying Indian legal documents. Resolves retrieval latency by leveraging ChromaDB embeddings alongside LangChain. Features a Streamlit frontend supporting multi-lingual query options for Indian legal scripts.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['LangChain', 'ChromaDB', 'Streamlit', 'Sentence Transformers'].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-500/5 text-slate-500 dark:text-slate-400 border border-[var(--card-border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 4: ATS RESUME SCORE CHECKER - Spans 3 columns */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-6 lg:col-span-3"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--accent-color)] font-semibold uppercase tracking-wider">NLP / Text Similarity</span>
                <a 
                  href="https://github.com/ajinesh703" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl border border-[var(--card-border)] hover:bg-[var(--card-border-hover)] text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
              </div>
              
              <h3 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                ATS Resume Score Checker
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Automated resume scanning scoring engine. Integrates Cosine Similarity text vectors alongside TF-IDF extraction routines. Exposes validation endpoints using a clean Flask backend divided into distinct text processing and scoring architecture.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Python', 'TF-IDF', 'Cosine Similarity', 'Flask', 'REST API'].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-500/5 text-slate-500 dark:text-slate-400 border border-[var(--card-border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* MERGED CONTRIBS / OPEN SOURCE CARD - Bento 2 columns */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-6 lg:col-span-4"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-indigo-500" />
                <span>Open Source Contributions</span>
              </h2>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Contributions</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="p-1 rounded-lg bg-indigo-500/10 text-[var(--accent-color)] border border-[var(--card-border-hover)] mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    SymPy (Python Symbolic Math Library)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Resolved a critical TypeError raised during symbolic computation evaluation pipelines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-1 rounded-lg bg-indigo-500/10 text-[var(--accent-color)] border border-[var(--card-border-hover)] mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    SimplifyJobs / New-Grad-Positions
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fixed an automated repository build script failure in the workflows pipeline.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-slate-400">
              <span>Total GitHub contributions:</span>
              <span className="font-mono text-indigo-500 font-semibold">1,000+ Contributions</span>
            </div>
          </div>
        </motion.div>

        {/* CONTACT / FOOTER CARD - Bento 2 columns */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-6 lg:col-span-2"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-4">Get in touch</span>
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight">
                Let's build something <span className="text-[var(--accent-color)]">remarkable</span>.
              </h3>
            </div>

            <div className="space-y-4">
              <a 
                href="mailto:ajineshpratap@gmail.com" 
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-border-hover)] hover:text-indigo-500 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-indigo-500" />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">ajineshpratap@gmail.com</span>
              </a>

              <a 
                href="https://github.com/ajinesh703" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-border-hover)] hover:text-indigo-500 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">github.com/ajinesh703</span>
              </a>

              <a 
                href="https://linkedin.com/in/ajineshpratapsingh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-border-hover)] hover:text-indigo-500 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">linkedin.com/in/ajineshpratapsingh</span>
              </a>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
