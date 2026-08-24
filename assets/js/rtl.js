/**
 * CampSphere - RTL (Right-to-Left) Toggle Controller
 * assets/js/rtl.js
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'campsphere_direction';
  const htmlElement = document.documentElement;

  function initRTL() {
    const savedDir = localStorage.getItem(STORAGE_KEY);
    if (savedDir === 'rtl') {
      applyRTL(true);
    } else {
      applyRTL(false);
    }
  }

  function applyRTL(isRTL) {
    if (isRTL) {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
      localStorage.setItem(STORAGE_KEY, 'rtl');
      updateRTLToggleButtons(true);
    } else {
      htmlElement.removeAttribute('dir');
      htmlElement.setAttribute('lang', 'en');
      localStorage.setItem(STORAGE_KEY, 'ltr');
      updateRTLToggleButtons(false);
    }
  }

  function toggleRTL() {
    const isRTL = htmlElement.getAttribute('dir') === 'rtl';
    applyRTL(!isRTL);
  }

  function updateRTLToggleButtons(isRTL) {
    const toggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    toggleBtns.forEach(btn => {
      if (isRTL) {
        btn.innerHTML = '<i class="bi bi-translate"></i> <span class="rtl-label">LTR</span>';
        btn.setAttribute('aria-label', 'Switch to Left-to-Right');
      } else {
        btn.innerHTML = '<i class="bi bi-translate"></i> <span class="rtl-label">RTL</span>';
        btn.setAttribute('aria-label', 'Switch to Right-to-Left');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initRTL();
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('.rtl-toggle-btn');
      if (target) {
        e.preventDefault();
        toggleRTL();
      }
    });
  });

  initRTL();
})();
