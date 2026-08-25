/**
 * CampSphere - Navigation, Navbar Auth State & Sidebar Controller
 * assets/js/navigation.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Welcome Back Toast on Page Load
  // ------------------------------------------------------------------------
  const welcomeToast = sessionStorage.getItem('campsphere_welcome_toast');
  if (welcomeToast) {
    sessionStorage.removeItem('campsphere_welcome_toast');
    if (window.showCampToast) {
      setTimeout(() => {
        window.showCampToast(welcomeToast, 'success', 'Signed In');
      }, 350);
    }
  }

  // ------------------------------------------------------------------------
  // 2. Determine Paths & Active Nav Link Highlighting
  // ------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isInSubfolder = window.location.pathname.includes('/parent/');
  const rootPath = isInSubfolder ? '../' : '';
  const parentPath = isInSubfolder ? '' : 'parent/';

  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .sidebar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkFile = href.split('/').pop();
      if (linkFile === currentPath) {
        link.classList.add('active');
        const dropdownParent = link.closest('.dropdown');
        if (dropdownParent) {
          const toggle = dropdownParent.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      }
    }
  });

  // ------------------------------------------------------------------------
  // 3. Dynamic Navbar Auth State Manager (User Dropdown vs Login Button)
  // ------------------------------------------------------------------------
  function renderNavbarAuthState() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    const isLoggedIn = session && session.loggedIn;
    const userName = isLoggedIn ? (session.name || `${session.firstName || ''} ${session.lastName || ''}`.trim() || 'Parent User') : '';
    const firstName = isLoggedIn ? (session.firstName || userName.split(' ')[0] || 'Parent') : '';
    const userEmail = isLoggedIn ? (session.email || '') : '';
    const userAvatar = isLoggedIn ? (session.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80') : '';

    // Update all user name displays across the page (Hero, Badges, Dropdowns)
    if (isLoggedIn) {
      document.querySelectorAll('.user-display-name').forEach(el => el.textContent = userName);
      document.querySelectorAll('.user-display-firstname').forEach(el => el.textContent = firstName);
      document.querySelectorAll('.user-display-email').forEach(el => el.textContent = userEmail);
    }

    // Dynamic Hero Banner Greeting on Home Page
    const heroGreetings = document.querySelectorAll('#heroUserGreeting, .hero-user-greeting');
    heroGreetings.forEach(el => {
      if (isLoggedIn) {
        el.innerHTML = `<i class="bi bi-person-check-fill text-primary"></i> Welcome back, <strong class="user-display-name text-navy">${userName}</strong>! <span class="badge bg-primary-subtle text-primary border border-primary-subtle ms-1">Active Parent</span>`;
      } else {
        el.innerHTML = `<i class="bi bi-sun-fill text-warning"></i> Summer 2026 Registration Now Open!`;
      }
    });

    // Find auth elements in public Navbars (excluding footers and dashboard sidebars)
    const authElements = document.querySelectorAll('a[href*="login.html"], .nav-user-dropdown');
    
    authElements.forEach(el => {
      // Exclude footer and sidebar elements
      if (el.closest('.footer-camp') || el.closest('.sidebar-footer') || el.closest('.dashboard-sidebar')) {
        return;
      }

      if (isLoggedIn) {
        let providerBadge = '<span class="badge bg-success-light text-success mt-1" style="font-size: 0.68rem;"><i class="bi bi-shield-check me-1"></i> Active Parent Account</span>';
        if (session.authProvider === 'Google') {
          providerBadge = '<span class="badge bg-primary-light text-primary mt-1" style="font-size: 0.68rem;"><i class="bi bi-google me-1"></i> Google Account</span>';
        } else if (session.authProvider === 'Apple') {
          providerBadge = '<span class="badge bg-dark text-white mt-1" style="font-size: 0.68rem;"><i class="bi bi-apple me-1"></i> Apple ID</span>';
        }

        const userDropdownHtml = `
          <div class="dropdown nav-user-dropdown ms-lg-1">
            <button class="btn btn-outline-primary btn-sm dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3 py-1 fw-bold shadow-xs" type="button" id="navUserMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${userAvatar}" alt="${userName}" class="rounded-circle nav-user-avatar" style="width: 26px; height: 26px; object-fit: cover;">
              <span class="user-display-name">${userName}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2" aria-labelledby="navUserMenuDropdown" style="min-width: 240px;">
              <li class="px-3 py-2 border-bottom mb-2 bg-light rounded-2">
                <strong class="d-block text-navy user-display-name">${userName}</strong>
                <small class="text-muted text-truncate d-block" style="font-size: 0.75rem;">${userEmail}</small>
                ${providerBadge}
              </li>
              <li><a class="dropdown-item py-2 rounded-2 fw-semibold" href="${parentPath}dashboard.html"><i class="bi bi-speedometer2 text-primary me-2"></i> Parent Dashboard</a></li>
              <li><hr class="dropdown-divider my-1"></li>
              <li><a class="dropdown-item py-2 rounded-2 text-danger nav-logout-action" href="javascript:void(0)"><i class="bi bi-box-arrow-right me-2"></i> Sign Out</a></li>
            </ul>
          </div>
        `;

        if (el.outerHTML !== userDropdownHtml) {
          el.outerHTML = userDropdownHtml;
        }
      } else {
        const loginBtnHtml = `
          <a href="${rootPath}login.html" class="btn btn-primary btn-sm ms-lg-1">
            <i class="bi bi-person-circle me-1"></i> Parent Login
          </a>
        `;
        if (el.classList.contains('nav-user-dropdown')) {
          el.outerHTML = loginBtnHtml;
        }
      }
    });

    // Attach Logout Click Listeners
    document.querySelectorAll('.nav-logout-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('campsphere_user_session');
        localStorage.removeItem('campsphere_active_user_id');
        if (window.showCampToast) {
          window.showCampToast('You have been safely signed out.', 'info', 'Signed Out');
        }
        
        if (isInSubfolder) {
          window.location.href = `${rootPath}index.html`;
        } else {
          renderNavbarAuthState();
        }
      });
    });
  }

  renderNavbarAuthState();

  // ------------------------------------------------------------------------
  // 4. Dashboard Sidebar Sign Out Handler
  // ------------------------------------------------------------------------
  document.querySelectorAll('.dashboard-sidebar .sidebar-footer a[href*="login.html"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('campsphere_user_session');
      localStorage.removeItem('campsphere_active_user_id');
      if (window.showCampToast) {
        window.showCampToast('You have been safely signed out.', 'info', 'Signed Out');
      }
      setTimeout(() => {
        window.location.href = `${rootPath}index.html`;
      }, 400);
    });
  });

  // ------------------------------------------------------------------------
  // 5. Dashboard Sidebar Toggle for Mobile / Tablet
  // ------------------------------------------------------------------------
  const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');

  if (sidebarToggleBtn && dashboardSidebar) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dashboardSidebar.classList.toggle('show');
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992 && dashboardSidebar.classList.contains('show')) {
        if (!dashboardSidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
          dashboardSidebar.classList.remove('show');
        }
      }
    });
  }
});
