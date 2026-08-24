/**
 * CampSphere - Core JavaScript & Animation Controller
 * assets/js/main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Preloader Handling
  const preloader = document.querySelector('.camp-preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.style.display = 'none';
        }
      }, 400);
    };

    // Hide immediately when window loaded, or after maximum 350ms failsafe
    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 150);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 150));
      setTimeout(hidePreloader, 600); // Safety fallback
    }
  }

  // 2. Scroll-Reveal Observer Engine (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without observer
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 3. Sticky Navbar with Smooth Blur Transition
  const navbar = document.querySelector('.navbar-camp');
  if (navbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('is-sticky');
      } else {
        navbar.classList.remove('is-sticky');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // 4. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Enhanced Live Stats Counter Animation
  const counters = document.querySelectorAll('.stat-number, [data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const countAttr = el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      
      // If data-count is not specified, parse numbers from textContent
      let targetNumber = 0;
      if (countAttr) {
        targetNumber = parseFloat(countAttr.replace(/,/g, ''));
      } else {
        const text = el.textContent.trim();
        const match = text.match(/[\d,.]+/);
        if (match) {
          targetNumber = parseFloat(match[0].replace(/,/g, ''));
        }
      }

      if (isNaN(targetNumber) || targetNumber <= 0) return;

      const isFloat = countAttr ? countAttr.includes('.') : false;
      const duration = 1600; // ms
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const easeOutQuad = (t) => t * (2 - t);

      const counterInterval = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = targetNumber * progress;

        if (isFloat) {
          el.textContent = `${prefix}${currentCount.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${prefix}${Math.floor(currentCount).toLocaleString()}${suffix}`;
        }

        if (frame >= totalFrames) {
          if (isFloat) {
            el.textContent = `${prefix}${targetNumber.toFixed(1)}${suffix}`;
          } else {
            el.textContent = `${prefix}${targetNumber.toLocaleString()}${suffix}`;
          }
          clearInterval(counterInterval);
        }
      }, frameRate);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 6. Interactive Stickers Sound / Bounce Micro-Reaction
  const stickers = document.querySelectorAll('.camp-sticker');
  stickers.forEach(sticker => {
    sticker.addEventListener('click', () => {
      sticker.style.transform = 'scale(1.25) rotate(-8deg)';
      setTimeout(() => {
        sticker.style.transform = '';
      }, 300);
    });
  });

  // 7. Testimonials Carousel / Slider Auto-Rotator (if applicable)
  const testimonialCards = document.querySelectorAll('.testimonial-slider-item');
  if (testimonialCards.length > 1) {
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;

    const showTestimonial = (index) => {
      testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
        card.classList.toggle('active', i === index);
      });
      const dots = document.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    // Auto switch every 5.5 seconds if not hovered
    let autoInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(currentTestimonial);
    }, 5500);

    const container = document.querySelector('.testimonial-carousel-container');
    if (container) {
      container.addEventListener('mouseenter', () => clearInterval(autoInterval));
      container.addEventListener('mouseleave', () => {
        autoInterval = setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
          showTestimonial(currentTestimonial);
        }, 5500);
      });
    }
  }

  // 8. Add Shimmer Effect to Key Action Buttons
  const actionButtons = document.querySelectorAll('.hero-actions .btn, .cta-banner .btn, .program-footer .btn-accent');
  actionButtons.forEach(btn => {
    if (!btn.classList.contains('btn-shimmer')) {
      btn.classList.add('btn-shimmer');
    }
  });

  // 9. Toast Notification Dispatcher
  window.showCampToast = function (message, type = 'success', title = 'Notification') {
    let container = document.querySelector('.toast-container-custom');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `camp-toast ${type}`;

    let iconClass = 'bi-check-circle-fill text-success';
    if (type === 'error' || type === 'danger') iconClass = 'bi-x-circle-fill text-danger';
    if (type === 'warning') iconClass = 'bi-exclamation-triangle-fill text-warning';
    if (type === 'info') iconClass = 'bi-info-circle-fill text-primary';

    toast.innerHTML = `
      <i class="bi ${iconClass} fs-4"></i>
      <div class="flex-grow-1">
        <h6 class="mb-0 fw-bold">${title}</h6>
        <p class="mb-0 small text-muted">${message}</p>
      </div>
      <button type="button" class="btn-close ms-2" aria-label="Close"></button>
    `;

    container.appendChild(toast);

    toast.querySelector('.btn-close').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  };

  // 10. Global Newsletter Form Simulation
  const newsletterForms = document.querySelectorAll('.newsletter-form, form[onsubmit*="showCampToast"]');
  newsletterForms.forEach(form => {
    if (!form.getAttribute('onsubmit')) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          window.showCampToast(`Thank you! ${emailInput.value} has been subscribed to CampSphere updates.`, 'success', 'Subscribed!');
          emailInput.value = '';
        }
      });
    }
  });

  // 11. Bootstrap Tooltip & Popover initialization
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // 12. Program Details Live Booking Calculator
  const calcEarlyCare = document.getElementById('calcEarlyCare');
  const calcLateCare = document.getElementById('calcLateCare');
  const detailTotalDeposit = document.getElementById('detailTotalDeposit');
  const detailBaseTuitionDisplay = document.getElementById('detailBaseTuitionDisplay');
  const earlyCareRow = document.getElementById('earlyCareRow');
  const lateCareRow = document.getElementById('lateCareRow');

  window.currentProgramBasePrice = 395;

  window.updateDetailTuitionCalc = function() {
    let base = window.currentProgramBasePrice || 395;
    let total = base;

    if (detailBaseTuitionDisplay) {
      detailBaseTuitionDisplay.textContent = `$${base.toFixed(2)}`;
    }

    if (calcEarlyCare && calcEarlyCare.checked) {
      total += 35;
      if (earlyCareRow) earlyCareRow.style.setProperty('display', 'flex', 'important');
    } else {
      if (earlyCareRow) earlyCareRow.style.setProperty('display', 'none', 'important');
    }

    if (calcLateCare && calcLateCare.checked) {
      total += 45;
      if (lateCareRow) lateCareRow.style.setProperty('display', 'flex', 'important');
    } else {
      if (lateCareRow) lateCareRow.style.setProperty('display', 'none', 'important');
    }

    if (detailTotalDeposit) {
      detailTotalDeposit.textContent = `$${total.toFixed(2)}`;
    }
  };

  if (calcEarlyCare) calcEarlyCare.addEventListener('change', window.updateDetailTuitionCalc);
  if (calcLateCare) calcLateCare.addEventListener('change', window.updateDetailTuitionCalc);


  // 13. Program Details Subnav Active Tracking on Scroll
  const subnavLinks = document.querySelectorAll('.program-subnav-pills .nav-link');
  if (subnavLinks.length) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 120;
      subnavLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const section = document.querySelector(targetId);
          if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              subnavLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          }
        }
      });
    });
  }

  // 14. Global Wishlist Navbar Badge Sync
  window.syncGlobalWishlistCount = function() {
    try {
      const saved = localStorage.getItem('campsphere_wishlist');
      const list = saved ? JSON.parse(saved) : [];
      const count = list.length;

      document.querySelectorAll('.wishlist-nav-count, .wishlist-count-badge').forEach(badge => {
        badge.textContent = count;
      });

      document.querySelectorAll('.nav-wishlist-btn').forEach(btn => {
        if (count > 0) {
          btn.classList.add('has-items');
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'bi bi-heart-fill text-danger';
          }
        } else {
          btn.classList.remove('has-items');
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'bi bi-heart';
          }
        }
      });
    } catch (e) {}
  };

  window.syncGlobalWishlistCount();
  window.addEventListener('storage', (e) => {
    if (e.key === 'campsphere_wishlist') {
      window.syncGlobalWishlistCount();
    }
  });
});



