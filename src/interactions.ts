// ============================================
// NeuralPulse — Interactive Behaviors (TypeScript)
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
    // Ease-out cubic
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

// ---- Search ----
function initSearch(
  toggle: HTMLElement,
  overlay: HTMLElement,
  input: HTMLInputElement
): void {
  const openSearch = (): void => {
    overlay.classList.add('active');
    input.focus();
  };

  const closeSearch = (): void => {
    overlay.classList.remove('active');
  };

  toggle.addEventListener('click', (): void => {
    overlay.classList.contains('active') ? closeSearch() : openSearch();
  });

  document.addEventListener('keydown', (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeSearch();
    }
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

        // Trigger counters on hero-stats
        if (entry.target.classList.contains('hero-stats')) {
          const counters = entry.target.querySelectorAll<HTMLElement>('.stat-number');
          counters.forEach((counter) => {
            const target: number = parseInt(counter.getAttribute('data-count') || '0', 10);
            if (target > 0) {
              animateCounter(counter, target, 2000);
            }
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Reveal cards and section headers
  const revealSelectors: string =
    '.news-card, .research-card, .paper-card, .section-header, .newsletter-card';
  document.querySelectorAll<HTMLElement>(revealSelectors).forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Reveal hero stats
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
      // Update active state
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

// ---- Bookmark Toggle ----
function initBookmarks(): void {
  document.querySelectorAll<HTMLButtonElement>('.btn-bookmark').forEach((btn) => {
    btn.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      btn.classList.toggle('bookmarked');
      const svg: SVGElement | null = btn.querySelector('svg');

      if (btn.classList.contains('bookmarked')) {
        svg?.setAttribute('fill', 'currentColor');
        btn.style.color = 'var(--accent)';
        btn.style.background = 'var(--accent-bg)';
      } else {
        svg?.setAttribute('fill', 'none');
        btn.style.color = '';
        btn.style.background = '';
      }
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
}
