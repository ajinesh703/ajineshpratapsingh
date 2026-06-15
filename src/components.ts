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
          <li><a href="#about" class="nav-link">about</a></li>
        </ul>
        <div class="nav-actions">
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
              <li><a href="#">github</a></li>
              <li><a href="#">twitter / x</a></li>
              <li><a href="#">rss feed</a></li>
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
