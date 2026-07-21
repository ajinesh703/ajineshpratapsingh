// ============================================
// ajineshpratapsingh — Main Entry Point (TypeScript)
// ============================================

import { inject } from '@vercel/analytics'

inject()
import './style.css';
import './components/PaperChatbot.css';
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
import { PaperChatbot } from './components/PaperChatbot';

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
    '<div id="chatbot-react-root"></div>',
  ].join('\n');

  app.innerHTML = html;

  // Render React Papers component
  const reactRootEl = document.getElementById('papers-react-root');
  if (reactRootEl) {
    const root = createRoot(reactRootEl);
    root.render(React.createElement(ResearchPapers, { papers: researchPapers }));
  }

  // Render React Chatbot component
  const chatbotRootEl = document.getElementById('chatbot-react-root');
  if (chatbotRootEl) {
    const root = createRoot(chatbotRootEl);
    root.render(React.createElement(PaperChatbot, { papers: researchPapers, researchItems: researchItems }));
  }

  // Bootstrap interactions after DOM is painted
  initInteractions();
}

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', mountApp);

