// ============================================
// NeuralPulse — Type Definitions
// ============================================

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  icon: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  excerpt: string;
  category: ResearchCategory;
  date: string;
  source: string;
  tags: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  year: number;
  venue: string;
  citations: string;
}

export type ResearchCategory = 'llm' | 'cv' | 'rl' | 'acl';
export type FilterCategory = 'all' | ResearchCategory;

export interface CounterConfig {
  element: HTMLElement;
  target: number;
  duration: number;
}

export interface ComponentElements {
  navbar: HTMLElement | null;
  mobileMenuBtn: HTMLElement | null;
  navLinks: HTMLElement | null;
  searchToggle: HTMLElement | null;
  searchOverlay: HTMLElement | null;
  searchInput: HTMLInputElement | null;
  newsletterForm: HTMLFormElement | null;
  subscribeBtn: HTMLElement | null;
}
