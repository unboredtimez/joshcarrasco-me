// Theme toggle: persist preference and keep the correct icon visible.
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');

  function syncIcons() {
    const isDark = root.classList.contains('dark');
    // In dark mode, offer the sun (switch to light); in light mode, offer the moon.
    if (sun) sun.classList.toggle('hidden', !isDark);
    if (moon) moon.classList.toggle('hidden', isDark);
  }

  syncIcons();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {}
      syncIcons();
    });
  }

  // Follow system changes only when the user hasn't made an explicit choice.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem('theme');
    } catch (err) {}
    if (!stored) {
      root.classList.toggle('dark', e.matches);
      syncIcons();
    }
  });
})();

// Mobile menu open/close.
(function () {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!menuToggle || !menu) return;

  function closeMenu() {
    menu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', () => {
    const isHidden = menu.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(!isHidden));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();

// Reveal-on-scroll for sections.
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => observer.observe(el));
});

// Back-to-top button.
(function () {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'grid' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
