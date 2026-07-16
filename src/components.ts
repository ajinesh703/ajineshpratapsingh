// ============================================
// ajineshpratapsingh — Component Renderers
// Dev aesthetic: dense, monospace, no fluff
// ============================================

import type { NewsArticle, ResearchItem } from './types';
import { icons } from './icons';
import { categoryLabels } from './data';



// ---- Navbar ----
export function renderNavbar(): string {
  return `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="#" class="nav-logo">
          <span class="logo-icon">${icons.logo}</span>
          <span class="logo-text">ajinesh<span class="logo-accent">pratapsingh</span></span>
        </a>
        <ul class="nav-links" id="nav-links">
          <li><a href="#trending" class="nav-link">trending</a></li>
          <li><a href="#research" class="nav-link">research</a></li>
          <li><a href="#papers" class="nav-link">papers</a></li>
          <li><a href="#portfolio" class="nav-link">portfolio</a></li>
          <li><a href="#about" class="nav-link">about</a></li>
        </ul>
        <div class="nav-actions">
          <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle theme">
            ${icons.moon}
          </button>
          <button class="search-btn" id="search-toggle" aria-label="Search">
            ${icons.search}
          </button>
          <button class="btn-primary" id="subscribe-btn">subscribe</button>
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="search-overlay" id="search-overlay">
        <div class="search-container">
          ${icons.searchLarge}
          <input type="text" class="search-input" id="search-input" placeholder="search papers, topics, news...">
          <kbd class="search-kbd">ESC</kbd>
        </div>
      </div>
    </nav>
  `;
}

// ---- Hero ----
export function renderHero(): string {
  return `
    <header class="hero" id="hero">
      <div class="hero-container">
        <div class="hero-badge animate-fade-up">
          <span class="badge-dot"></span>
          tracking 2,400+ sources
        </div>
        <h1 class="hero-title animate-fade-up delay-1">
          AI & ML research,<br>
          <span class="hero-gradient-text">curated for developers.</span>
        </h1>
        <p class="hero-subtitle animate-fade-up delay-2">
          Trending news, important papers, and latest research in artificial intelligence and machine learning. No hype, just signal.
        </p>
        <div class="hero-actions animate-fade-up delay-3">
          <a href="#trending" class="btn-hero-primary">
            explore ${icons.arrowRight}
          </a>
          <a href="#papers" class="btn-hero-secondary">browse papers</a>
        </div>
        <div class="hero-stats animate-fade-up delay-4">
          <div class="stat">
            <span class="stat-number" data-count="1240">0</span>
            <span class="stat-label">papers</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-number" data-count="386">0</span>
            <span class="stat-label">articles</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-number" data-count="52">0</span>
            <span class="stat-label">topics</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ---- News Card ----
function renderNewsCard(article: NewsArticle): string {
  const featuredClass = article.featured ? 'featured' : '';

  return `
    <article class="news-card ${featuredClass}" id="${article.id}" data-id="${article.id}">
      <div class="card-content">
        <div class="card-meta">
          <span class="card-category">${article.category}</span>
          <span class="card-date">${article.date}</span>
        </div>
        <h3 class="card-title">${article.title}</h3>
        <p class="card-excerpt">${article.excerpt}</p>
        <div class="card-footer">
          <span class="read-time">${article.readTime}</span>
          <div class="card-actions">
            <button class="btn-paper btn-read-more" data-url="${article.url || '#'}" data-action="read">read →</button>
            <button class="btn-paper btn-bookmark" aria-label="Bookmark">${icons.bookmark}</button>
            <button class="btn-paper btn-share" data-url="${article.url || '#'}" data-title="${article.title}" aria-label="Share">${icons.externalLink} share</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ---- Trending Section ----
export function renderTrendingSection(articles: NewsArticle[]): string {
  return `
    <section class="section" id="trending">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">${icons.trendingUp} trending</div>
          <h2 class="section-title">Trending AI News</h2>
          <p class="section-subtitle">Latest breakthroughs and developments in the AI space.</p>
        </div>
        <div class="news-grid">
          ${articles.map(renderNewsCard).join('')}
        </div>
      </div>
    </section>
  `;
}

// ---- Research Card ----
function renderResearchCard(item: ResearchItem, index: number): string {
  const num = String(index + 1).padStart(2, '0');
  const displayCategory = categoryLabels[item.category] || item.category;

  return `
    <article class="research-card" id="${item.id}" data-id="${item.id}" data-category="${item.category}">
      <div class="research-number">${num}</div>
      <div class="research-content">
        <div class="card-meta">
          <span class="card-category">${displayCategory}</span>
          <span class="card-date">${item.date}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-excerpt">${item.excerpt}</p>
        <div class="research-tags">
          ${item.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="research-source">${item.source}</span>
          <div class="card-actions">
            <button class="btn-paper btn-read-more" data-url="${item.url || '#'}" data-action="read">read →</button>
            <button class="btn-paper btn-bookmark" aria-label="Bookmark">${icons.bookmark}</button>
            <button class="btn-paper btn-share" data-url="${item.url || '#'}" data-title="${item.title}" aria-label="Share">${icons.externalLink} share</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ---- Research Section ----
export function renderResearchSection(items: ResearchItem[]): string {
  return `
    <section class="section" id="research">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">${icons.settings} research</div>
          <h2 class="section-title">Latest Research on AI & ML</h2>
          <p class="section-subtitle">Deep dives from top labs and universities worldwide.</p>
        </div>
        <div class="filter-tabs" id="research-filters">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="llm">LLMs</button>
          <button class="filter-tab" data-filter="cv">Vision</button>
          <button class="filter-tab" data-filter="rl">RL</button>
          <button class="filter-tab" data-filter="acl">Safety</button>
        </div>
        <div class="research-grid">
          ${items.map((item, i) => renderResearchCard(item, i)).join('')}
        </div>
      </div>
    </section>
  `;
}


// ---- Papers Section ----
export function renderPapersSection(): string {
  return `
    <section class="section" id="papers">
      <div id="papers-react-root"></div>
    </section>
  `;
}

// ---- Portfolio ----
export function renderPortfolio(): string {
  return `
    <section class="section" id="portfolio">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">portfolio</div>
          <h2 class="section-title">Ajinesh Pratap Singh</h2>
          <p class="section-subtitle">AI/ML Engineer & Full-Stack Developer · B.Tech ECE, Dr. Ram Manohar Lohia Avadh University (2023–2027)</p>
        </div>

        <div class="portfolio-links">
          <a href="https://github.com/ajinesh703" target="_blank" rel="noopener noreferrer" class="portfolio-link-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            github
          </a>
          <a href="https://www.linkedin.com/in/ajinesh-pratap-singh-b59141248/" target="_blank" rel="noopener noreferrer" class="portfolio-link-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            linkedin
          </a>
          <a href="mailto:ajineshpratap@gmail.com" class="portfolio-link-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            email
          </a>
        </div>

        <!-- Experience -->
        <div class="portfolio-block">
          <h3 class="portfolio-block-title">experience</h3>
          <div class="experience-list">
            <div class="experience-item">
              <div class="exp-header">
                <div class="exp-role">Back-End AI Engineering Intern</div>
                <div class="exp-date">Jul – Aug 2026</div>
              </div>
              <div class="exp-company">FlyRank Corp</div>
              <p class="exp-desc">Built backend AI pipelines and integrated ML models into production services.</p>
            </div>
            <div class="experience-item">
              <div class="exp-header">
                <div class="exp-role">Web Developer Intern</div>
                <div class="exp-date">May – Jun 2026</div>
              </div>
              <div class="exp-company">InAmigos Foundation</div>
              <p class="exp-desc">Developed and maintained web applications, implemented responsive UI components.</p>
            </div>
            <div class="experience-item">
              <div class="exp-header">
                <div class="exp-role">Data Scientist Intern</div>
                <div class="exp-date">May – Jun 2026</div>
              </div>
              <div class="exp-company">Sysslan IT Solutions</div>
              <p class="exp-desc">Worked on data analysis pipelines, built predictive models and automated reporting workflows.</p>
            </div>
          </div>
        </div>

        <!-- Projects -->
        <div class="portfolio-block">
          <h3 class="portfolio-block-title">projects</h3>
          <div class="projects-grid">
            <div class="project-card">
              <div class="project-name">RepoChat</div>
              <p class="project-desc">RAG-based conversational interface over GitHub repositories. Ask questions about any codebase and get contextual answers with source references.</p>
              <div class="project-tags">
                <span class="tag">FastAPI</span>
                <span class="tag">React</span>
                <span class="tag">LangChain</span>
                <span class="tag">FAISS</span>
                <span class="tag">RAG</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-name">CropGuard AI</div>
              <p class="project-desc">Plant disease detection system achieving 96.14% accuracy. Upload a leaf photo and get instant diagnosis with treatment suggestions.</p>
              <div class="project-tags">
                <span class="tag">MobileNetV2</span>
                <span class="tag">TensorFlow</span>
                <span class="tag">Python</span>
                <span class="tag">96.14% acc</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-name">Legal RAG Assistant</div>
              <p class="project-desc">Retrieval-augmented generation system for Indian legal documents. Processes 500+ documents for contextual legal research and Q&A.</p>
              <div class="project-tags">
                <span class="tag">ChromaDB</span>
                <span class="tag">Streamlit</span>
                <span class="tag">LangChain</span>
                <span class="tag">500+ docs</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-name">ATS Resume Score Checker</div>
              <p class="project-desc">Automated resume scoring tool that compares resumes against job descriptions using TF-IDF similarity to optimize ATS compatibility.</p>
              <div class="project-tags">
                <span class="tag">TF-IDF</span>
                <span class="tag">Flask</span>
                <span class="tag">NLP</span>
                <span class="tag">Python</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="portfolio-block">
          <h3 class="portfolio-block-title">skills</h3>
          <div class="skills-grid">
            <div class="skill-group">
              <div class="skill-group-label">languages</div>
              <div class="skill-tags">
                <span class="tag">Python</span>
                <span class="tag">JavaScript</span>
                <span class="tag">TypeScript</span>
                <span class="tag">SQL</span>
              </div>
            </div>
            <div class="skill-group">
              <div class="skill-group-label">frameworks & tools</div>
              <div class="skill-tags">
                <span class="tag">FastAPI</span>
                <span class="tag">React.js</span>
                <span class="tag">LangChain</span>
                <span class="tag">TensorFlow</span>
                <span class="tag">Flask</span>
              </div>
            </div>
            <div class="skill-group">
              <div class="skill-group-label">databases & infra</div>
              <div class="skill-tags">
                <span class="tag">FAISS</span>
                <span class="tag">ChromaDB</span>
                <span class="tag">Git</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="portfolio-block">
          <h3 class="portfolio-block-title">achievements</h3>
          <div class="achievements-list">
            <div class="achievement-item">
              <span class="achievement-number">1100+</span>
              <span class="achievement-text">problems solved on LeetCode</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-number">4000+</span>
              <span class="achievement-text">GitHub contributions</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">⬆</span>
              <span class="achievement-text">Merged PRs to <strong>SymPy</strong> (open-source math library)</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">⬆</span>
              <span class="achievement-text">Merged PRs to <strong>SimplifyJobs/New-Grad-Positions</strong></span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

// ---- Newsletter ----
export function renderNewsletter(): string {
  return `
    <section class="section" id="about">
      <div class="container">
        <div class="newsletter-card">
          <div class="newsletter-content">
            <h2 class="newsletter-title">Get the weekly digest.</h2>
            <p class="newsletter-text">Top AI & ML research, delivered every Friday. No spam, no fluff — unsubscribe anytime.</p>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" class="newsletter-input" id="newsletter-email" placeholder="you@email.com" required>
              <button type="submit" class="btn-primary newsletter-btn">subscribe</button>
            </form>
            <p class="newsletter-note">4,200+ subscribers</p>
            <div class="about-social-links">
              <a href="https://github.com/ajinesh703" target="_blank" rel="noopener noreferrer" class="about-social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                github.com/ajinesh703
              </a>
              <a href="https://www.linkedin.com/in/ajinesh-pratap-singh-b59141248/" target="_blank" rel="noopener noreferrer" class="about-social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                linkedin/ajinesh
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ---- Footer ----
export function renderFooter(): string {
  return `
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#" class="nav-logo">
              <span class="logo-icon">${icons.logoSmall}</span>
              <span class="logo-text">ajinesh<span class="logo-accent">pratapsingh</span></span>
            </a>
            <p class="footer-description">Curated AI & ML research, news, and papers for developers and researchers.</p>
          </div>
          <div class="footer-links-group">
            <h4 class="footer-heading">explore</h4>
            <ul class="footer-links">
              <li><a href="#trending">trending</a></li>
              <li><a href="#research">research</a></li>
              <li><a href="#papers">papers</a></li>
              <li><a href="#">topics</a></li>
            </ul>
          </div>
          <div class="footer-links-group">
            <h4 class="footer-heading">topics</h4>
            <ul class="footer-links">
              <li><a href="#">LLMs</a></li>
              <li><a href="#">computer vision</a></li>
              <li><a href="#">reinforcement learning</a></li>
              <li><a href="#">AI safety</a></li>
            </ul>
          </div>
          <div class="footer-links-group">
            <h4 class="footer-heading">links</h4>
            <ul class="footer-links">
              <li><a href="https://github.com/ajinesh703" target="_blank" rel="noopener noreferrer">github</a></li>
              <li><a href="https://www.linkedin.com/in/ajinesh-pratap-singh-b59141248/" target="_blank" rel="noopener noreferrer">linkedin</a></li>
              <li><a href="mailto:ajineshpratap@gmail.com">email</a></li>
              <li><a href="#portfolio">portfolio</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 ajineshpratapsingh</p>
          <p>built by ajinesh pratap singh</p>
        </div>
      </div>
    </footer>
  `;
}
