// Theme toggle: flip the `dark` class on <html> and persist the choice.
// The sun/moon icon swap is handled in CSS (keyed off `html.dark`), so it
// stays correct even if the Tailwind CDN hasn't finished loading.
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    });
  }

  // Follow system changes only when the user hasn't made an explicit choice.
  function onSystemChange(e) {
    let stored = null;
    try {
      stored = localStorage.getItem('theme');
    } catch (err) {}
    if (!stored) {
      root.classList.toggle('dark', e.matches);
    }
  }

  try {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (media.addEventListener) {
      media.addEventListener('change', onSystemChange);
    } else if (media.addListener) {
      // Safari < 14 fallback.
      media.addListener(onSystemChange);
    }
  } catch (e) {}
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
