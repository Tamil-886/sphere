/**
 * CampSphere - Dark Mode Toggle Controller
 * assets/js/dark-mode.js
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'campsphere_theme';
  const htmlElement = document.documentElement;

  // Initialize theme from LocalStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark') {
      applyDarkMode(true);
    } else if (savedTheme === 'light') {
      applyDarkMode(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyDarkMode(true);
    } else {
      applyDarkMode(false);
    }
  }

  // Apply dark mode classes and update icons
  function applyDarkMode(isDark) {
    if (isDark) {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.setAttribute('data-bs-theme', 'dark');
      if (document.body) {
        document.body.classList.add('dark-mode');
      }
      localStorage.setItem(STORAGE_KEY, 'dark');
      updateThemeToggleButtons(true);
    } else {
      htmlElement.removeAttribute('data-theme');
      htmlElement.removeAttribute('data-bs-theme');
      if (document.body) {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem(STORAGE_KEY, 'light');
      updateThemeToggleButtons(false);
    }

    // Broadcast theme change event
    try {
      window.dispatchEvent(new CustomEvent('campsphere-theme-change', { detail: { isDark } }));
    } catch (e) {}
  }

  // Toggle theme
  function toggleTheme() {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark' || 
                   (document.body && document.body.classList.contains('dark-mode'));
    applyDarkMode(!isDark);
  }

  // Update button icons & labels
  function updateThemeToggleButtons(isDark) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const labelSpan = btn.querySelector('.theme-label');
      const spanClass = labelSpan ? labelSpan.className : 'theme-label';

      if (isDark) {
        btn.innerHTML = `<i class="bi bi-sun-fill text-warning"></i> <span class="${spanClass}">Light</span>`;
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.classList.remove('text-dark');
      } else {
        btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i> <span class="${spanClass}">Dark</span>`;
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });
  }

  // Event listener setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
    });
  } else {
    initTheme();
  }

  // Global click delegate for theme toggle buttons
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.theme-toggle-btn');
    if (target) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Run immediate sync on script execution
  initTheme();
})();

