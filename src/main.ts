// ============================================
// ajineshpratapsingh — Main Entry Point (TypeScript)
// ============================================

import './style.css';
import { newsArticles, researchItems, researchPapers } from './data';
import {
  renderNavbar,
  renderHero,
  renderTrendingSection,
  renderResearchSection,
  renderPapersSection,
  renderNewsletter,
  renderFooter,
} from './components';
import { initInteractions } from './interactions';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ResearchPapers } from './components/ResearchPapers';

/**
 * Assembles the full page HTML from typed data and component renderers,
 * mounts it to the DOM, then initialises all interactive behaviours.
 */
function mountApp(): void {
  const app: HTMLElement | null = document.getElementById('app');
  if (!app) {
    console.error('NeuralPulse: #app root element not found.');
    return;
  }

  // Compose page from components
  const html: string = [
    renderNavbar(),
    renderHero(),
    renderTrendingSection(newsArticles),
    renderResearchSection(researchItems),
    renderPapersSection(),
    renderNewsletter(),
    renderFooter(),
  ].join('\n');

  app.innerHTML = html;

  // Render React Papers component
  const reactRootEl = document.getElementById('papers-react-root');
  if (reactRootEl) {
    const root = createRoot(reactRootEl);
    root.render(React.createElement(ResearchPapers, { papers: researchPapers }));
  }

  // Bootstrap interactions after DOM is painted
  initInteractions();
}

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', mountApp);
