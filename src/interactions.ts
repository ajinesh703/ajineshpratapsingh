// ============================================
// ajineshpratapsingh — Interactive Behaviors (TypeScript)
// ============================================

import type { FilterCategory, ComponentElements } from './types';

/**
 * Queries and returns all key DOM elements used by interaction handlers.
 */
function getElements(): ComponentElements {
  return {
    navbar: document.getElementById('navbar'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    navLinks: document.getElementById('nav-links'),
    searchToggle: document.getElementById('search-toggle'),
    searchOverlay: document.getElementById('search-overlay'),
    searchInput: document.getElementById('search-input') as HTMLInputElement | null,
    newsletterForm: document.getElementById('newsletter-form') as HTMLFormElement | null,
    subscribeBtn: document.getElementById('subscribe-btn'),
  };
}

// ---- Animated Counter ----
function animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
  const startTime: number = performance.now();

  function update(currentTime: number): void {
    const elapsed: number = currentTime - startTime;
    const progress: number = Math.min(elapsed / duration, 1);
    const easeOut: number = 1 - Math.pow(1 - progress, 3);
    const current: number = Math.round(target * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ---- Navbar Scroll Behavior ----
function initNavbarScroll(navbar: HTMLElement): void {
  window.addEventListener('scroll', (): void => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ---- Mobile Menu ----
function initMobileMenu(btn: HTMLElement, navLinks: HTMLElement): void {
  btn.addEventListener('click', (): void => {
    btn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    link.addEventListener('click', (): void => {
      btn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// ---- READ BUTTON — Open in New Tab ----
// ============================================
/**
 * Attaches click handlers to all `.btn-read` and `.btn-read-more` buttons.
 * Each button should have a `data-url` attribute with the article/paper URL.
 * Falls back to `data-id` to construct a slug-based URL if needed.
 *
 * HTML example:
 *   <button class="btn-read" data-url="https://arxiv.org/abs/2212.09748">Read Paper</button>
 *   <button class="btn-read-more" data-url="https://openai.com/blog/gpt-5">Read More</button>
 */
function initReadButtons(): void {
  const readSelectors = '.btn-read, .btn-read-more, [data-action="read"]';

  document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(readSelectors).forEach((btn) => {
    btn.addEventListener('click', (e: Event): void => {
      e.preventDefault();

      const url: string | null =
        btn.getAttribute('data-url') ||
        (btn instanceof HTMLAnchorElement ? btn.getAttribute('href') : null);

      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        // If no URL is set, show a subtle toast
        showToast('Link unavailable for this article.', 'error');
      }
    });
  });
}

// ============================================
// ---- DOWNLOAD BUTTON ----
// ============================================
/**
 * Handles download for paper/article cards.
 * Supports:
 *  - `data-pdf` → direct PDF URL to download
 *  - `data-url` → fallback: open in new tab if no PDF available
 *
 * HTML example:
 *   <button class="btn-download" data-pdf="https://arxiv.org/pdf/2212.09748">Download PDF</button>
 */
function initDownloadButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('.btn-download, [data-action="download"]').forEach((btn) => {
    btn.addEventListener('click', (e: Event): void => {
      e.preventDefault();

      const pdfUrl: string | null = btn.getAttribute('data-pdf');
      const fallbackUrl: string | null = btn.getAttribute('data-url');
      const filename: string = btn.getAttribute('data-filename') || 'ajineshpratapsingh-paper.pdf';

      if (pdfUrl) {
        // Create a hidden anchor and trigger download
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = pdfUrl;
        anchor.download = filename;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        // Visual feedback on button
        const originalHTML: string = btn.innerHTML;
        btn.innerHTML = '✓ Downloading…';
        btn.style.opacity = '0.7';
        btn.setAttribute('disabled', 'true');

        setTimeout((): void => {
          btn.innerHTML = originalHTML;
          btn.style.opacity = '';
          btn.removeAttribute('disabled');
        }, 2500);

        showToast('Download started!', 'success');
      } else if (fallbackUrl) {
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
        showToast('Opening paper in new tab…', 'info');
      } else {
        showToast('No download available for this paper.', 'error');
      }
    });
  });
}

// ============================================
// ---- SEARCH — Live Filter Across All Cards ----
// ============================================
/**
 * Wires up the search input (`#search-input`) to live-filter:
 *  - `.news-card`      → matches title, excerpt, category
 *  - `.research-card`  → matches title, excerpt, tags, source
 *  - `.paper-card`     → matches title, authors, abstract, venue
 *
 * Cards that don't match are hidden; a "no results" message is shown
 * if every card in a section is hidden.
 */
function initSearch(
  toggle: HTMLElement,
  overlay: HTMLElement,
  input: HTMLInputElement
): void {
  // ── Open / Close ──────────────────────────────────────────────
  const openSearch = (): void => {
    overlay.classList.add('active');
    input.focus();
  };

  const closeSearch = (): void => {
    overlay.classList.remove('active');
    // Clear search and restore all cards when closing
    input.value = '';
    filterAllCards('');
  };

  toggle.addEventListener('click', (): void => {
    overlay.classList.contains('active') ? closeSearch() : openSearch();
  });

  document.addEventListener('keydown', (e: KeyboardEvent): void => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? closeSearch() : openSearch();
    }
  });

  document.addEventListener('click', (e: MouseEvent): void => {
    const target = e.target as Node;
    if (!overlay.contains(target) && !toggle.contains(target)) {
      closeSearch();
    }
  });

  // ── Live Filter ───────────────────────────────────────────────
  input.addEventListener('input', (): void => {
    const query: string = input.value.trim().toLowerCase();
    filterAllCards(query);
  });
}

/**
 * Filters all card types based on a search query string.
 * Pass an empty string to restore all cards.
 */
function filterAllCards(query: string): void {
  const allCards = document.querySelectorAll<HTMLElement>(
    '.news-card, .research-card, .paper-card'
  );

  let anyVisible = false;

  allCards.forEach((card) => {
    // Collect all searchable text from the card
    const getText = (selector: string): string =>
      (card.querySelector(selector) as HTMLElement | null)?.textContent ?? '';

    const tagTexts: string[] = Array.from(card.querySelectorAll<HTMLElement>('.tag')).map(
      (t) => t.textContent ?? ''
    );

    const searchableFields: string[] = [
      getText('.card-title'),
      getText('.news-title'),
      getText('.paper-title'),
      getText('.card-excerpt'),
      getText('.news-excerpt'),
      getText('.paper-abstract'),
      getText('.card-category'),
      getText('.news-category'),
      getText('.card-source'),
      getText('.card-venue'),
      ...tagTexts,
    ];

    const haystack: string = searchableFields
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const isMatch: boolean = !query || haystack.includes(query);

    if (isMatch) {
      card.style.display = '';
      card.style.opacity = '1';
      anyVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Show/hide "no results" message
  let noResults = document.getElementById('search-no-results');
  if (!anyVisible && query) {
    if (!noResults) {
      noResults = document.createElement('p');
      noResults.id = 'search-no-results';
      noResults.textContent = `No results found for "${query}"`;
      noResults.style.cssText =
        'text-align:center;color:var(--text-muted);padding:2rem 0;font-size:0.95rem;';
      // Append after the first cards container found
      const container =
        document.querySelector('.news-grid, .research-grid, .papers-grid') ||
        document.querySelector('main');
      container?.appendChild(noResults);
    } else {
      noResults.textContent = `No results found for "${query}"`;
      noResults.style.display = 'block';
    }
  } else if (noResults) {
    noResults.style.display = 'none';
  }
}

// ============================================
// ---- SHARE BUTTON — Copy Link to Clipboard ----
// ============================================
/**
 * Copies the article/paper URL to clipboard.
 * Uses `data-url` on the button, or falls back to `window.location.href`.
 *
 * HTML example:
 *   <button class="btn-share" data-url="https://arxiv.org/abs/2212.09748">Share</button>
 *
 * Also supports the Web Share API on mobile browsers.
 */
function initShareButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('.btn-share, [data-action="share"]').forEach((btn) => {
    btn.addEventListener('click', async (e: Event): Promise<void> => {
      e.preventDefault();

      const url: string = btn.getAttribute('data-url') || window.location.href;
      const title: string =
        btn.getAttribute('data-title') ||
        btn.closest('.news-card, .research-card, .paper-card')
          ?.querySelector('.card-title, .news-title, .paper-title')
          ?.textContent?.trim() ||
        document.title;

      // Use native Web Share API if available (mobile)
      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          return;
        } catch {
          // User cancelled share — do nothing
          return;
        }
      }

      // Desktop fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!', 'success');

        // Brief visual feedback
        const originalHTML: string = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        setTimeout((): void => {
          btn.innerHTML = originalHTML;
        }, 2000);
      } catch {
        // Clipboard API blocked — manual fallback
        const textArea: HTMLTextAreaElement = document.createElement('textarea');
        textArea.value = url;
        textArea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Link copied!', 'success');
      }
    });
  });
}

// ============================================
// ---- BOOKMARK — Persist in localStorage ----
// ============================================
/**
 * Bookmarks are saved to localStorage under the key `ajineshpratapsingh_bookmarks`.
 * Each bookmark is identified by the card's `data-id` attribute.
 *
 * HTML example:
 *   <div class="news-card" data-id="news-featured"> … </div>
 *   <button class="btn-bookmark">…</button>
 */

const BOOKMARK_KEY = 'ajineshpratapsingh_bookmarks';

function getBookmarks(): Set<string> {
  try {
    const raw: string | null = localStorage.getItem(BOOKMARK_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveBookmarks(bookmarks: Set<string>): void {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks]));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

function applyBookmarkState(btn: HTMLButtonElement, isBookmarked: boolean): void {
  const svg: SVGElement | null = btn.querySelector('svg');

  if (isBookmarked) {
    btn.classList.add('bookmarked');
    svg?.setAttribute('fill', 'currentColor');
    btn.style.color = 'var(--accent)';
    btn.style.background = 'var(--accent-bg)';
    btn.setAttribute('aria-label', 'Remove bookmark');
    btn.setAttribute('title', 'Remove bookmark');
  } else {
    btn.classList.remove('bookmarked');
    svg?.setAttribute('fill', 'none');
    btn.style.color = '';
    btn.style.background = '';
    btn.setAttribute('aria-label', 'Bookmark this article');
    btn.setAttribute('title', 'Bookmark this article');
  }
}

function initBookmarks(): void {
  const bookmarks: Set<string> = getBookmarks();

  document.querySelectorAll<HTMLButtonElement>('.btn-bookmark').forEach((btn) => {
    // Find parent card's ID
    const card: HTMLElement | null = btn.closest('[data-id]');
    const id: string | null = card ? card.getAttribute('data-id') : null;

    if (!id) return;

    // Restore persisted state on page load
    applyBookmarkState(btn, bookmarks.has(id));

    btn.addEventListener('click', (e: Event): void => {
      e.preventDefault();

      if (bookmarks.has(id)) {
        bookmarks.delete(id);
        applyBookmarkState(btn, false);
        showToast('Bookmark removed.', 'info');
      } else {
        bookmarks.add(id);
        applyBookmarkState(btn, true);
        showToast('Bookmarked!', 'success');
      }

      saveBookmarks(bookmarks);
    });
  });
}

// ============================================
// ---- TOAST NOTIFICATION HELPER ----
// ============================================
export type ToastType = 'success' | 'error' | 'info';

const TOAST_COLORS: Record<ToastType, string> = {
  success: '#22c55e',
  error:   '#ef4444',
  info:    'var(--accent)',
};

export function showToast(message: string, type: ToastType = 'info', duration: number = 3000): void {
  // Remove any existing toast
  document.getElementById('np-toast')?.remove();

  const toast: HTMLDivElement = document.createElement('div');
  toast.id = 'np-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${TOAST_COLORS[type]};
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    z-index: 9999;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame((): void => {
    requestAnimationFrame((): void => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  // Animate out & remove
  setTimeout((): void => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout((): void => toast.remove(), 300);
  }, duration);
}

// ---- Scroll Reveal & Counter Observer ----
function initScrollAnimations(): void {
  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('hero-stats')) {
          const counters = entry.target.querySelectorAll<HTMLElement>('.stat-number');
          counters.forEach((counter) => {
            const target: number = parseInt(counter.getAttribute('data-count') || '0', 10);
            if (target > 0) animateCounter(counter, target, 2000);
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealSelectors: string =
    '.news-card, .research-card, .paper-card, .section-header, .newsletter-card';
  document.querySelectorAll<HTMLElement>(revealSelectors).forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  const heroStats: HTMLElement | null = document.querySelector('.hero-stats');
  if (heroStats) {
    heroStats.classList.add('reveal');
    observer.observe(heroStats);
  }
}

// ---- Filter Tabs ----
function initFilterTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.filter-tab');
  const cards = document.querySelectorAll<HTMLElement>('.research-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (): void => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter: FilterCategory = (tab.getAttribute('data-filter') || 'all') as FilterCategory;

      cards.forEach((card) => {
        const cardCategory: string = card.getAttribute('data-category') || '';
        const shouldShow: boolean = filter === 'all' || cardCategory === filter;

        if (shouldShow) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame((): void => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---- Newsletter Form ----
function initNewsletter(form: HTMLFormElement): void {
  form.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email') as HTMLInputElement | null;
    const btn = form.querySelector<HTMLButtonElement>('.newsletter-btn');

    if (!btn) return;

    const originalText: string = btn.textContent || 'Subscribe';
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#22c55e';
    if (emailInput) emailInput.value = '';

    setTimeout((): void => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3000);
  });
}

// ---- Subscribe Button ----
function initSubscribeButton(btn: HTMLElement): void {
  btn.addEventListener('click', (): void => {
    const aboutSection: HTMLElement | null = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout((): void => {
        const emailInput = document.getElementById('newsletter-email') as HTMLInputElement | null;
        emailInput?.focus();
      }, 600);
    }
  });
}

// ---- Smooth Scroll ----
function initSmoothScroll(navbar: HTMLElement): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event): void {
      e.preventDefault();
      const href: string | null = this.getAttribute('href');
      if (!href) return;

      const target: HTMLElement | null = document.querySelector(href);
      if (target) {
        const navHeight: number = navbar.offsetHeight;
        const targetPosition: number =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ---- Active Nav Highlight ----
function initActiveNavHighlight(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');

  function updateActiveNav(): void {
    const scrollPosition: number = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop: number = section.offsetTop;
      const sectionHeight: number = section.offsetHeight;
      const sectionId: string | null = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

// ---- Paper Pagination ----
function initPaperPagination(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.pagination-tab');
  const cards = document.querySelectorAll<HTMLElement>('.paper-card');

  if (tabs.length === 0 || cards.length === 0) return;

  function showPage(pageNumber: number): void {
    cards.forEach((card) => {
      const cardPage = parseInt(card.getAttribute('data-page') || '1', 10);
      if (cardPage === pageNumber) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        requestAnimationFrame((): void => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Initial show page 1
  showPage(1);

  tabs.forEach((tab) => {
    tab.addEventListener('click', (): void => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const page = parseInt(tab.getAttribute('data-page') || '1', 10);
      showPage(page);

      // Scroll papers section header into view smoothly when page is changed
      const papersSection = document.getElementById('papers');
      if (papersSection) {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = papersSection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// Public init — called from main.ts
// ============================================
export function initInteractions(): void {
  const els = getElements();

  if (els.navbar) {
    initNavbarScroll(els.navbar);
    initSmoothScroll(els.navbar);
  }

  if (els.mobileMenuBtn && els.navLinks) {
    initMobileMenu(els.mobileMenuBtn, els.navLinks);
  }

  if (els.searchToggle && els.searchOverlay && els.searchInput) {
    initSearch(els.searchToggle, els.searchOverlay, els.searchInput);
  }

  if (els.newsletterForm) {
    initNewsletter(els.newsletterForm);
  }

  if (els.subscribeBtn) {
    initSubscribeButton(els.subscribeBtn);
  }

  initScrollAnimations();
  initFilterTabs();
  initBookmarks();
  initActiveNavHighlight();
  initPaperPagination();

  // ── New functional buttons ──
  initReadButtons();
  initDownloadButtons();
  initShareButtons();
}