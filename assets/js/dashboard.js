/**
 * CampSphere - Comprehensive Parent Dashboard Controller
 * assets/js/dashboard.js
 * 
 * Manages all interactive features for the Parent Portal:
 * 1. Camper Profiles & Add/Edit/Delete Child
 * 2. Enrollments Management, Status Filtering & Cancellations
 * 3. Weekly Day Schedule & Camper Filters
 * 4. Payments, Card Management, Pay Balance & Receipts
 * 5. Live Multi-Contact Counselor/Staff Messaging
 * 6. Profile, Security PIN & Notification Settings
 * 7. Mobile Sidebar & Theme Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. LocalStorage Mock Database Initialization
  // ==========================================================================
  function initDashboardStorage() {
    // 1.1 Children
    if (!localStorage.getItem('campsphere_children')) {
      const defaultChildren = [
        {
          id: 'CH-101',
          name: 'Emma Watson',
          dob: '2018-04-12',
          age: 8,
          grade: '3rd Grade',
          allergies: 'Peanuts (Mild - Carry EpiPen)',
          medications: 'Claritin (As needed for seasonal pollen)',
          dietary: 'Nut-Free Table Required',
          emergencyContact: 'Sarah Watson (Mother) - (555) 019-2834',
          doctor: 'Dr. Robert Chen, Tahoe Pediatrics ((555) 234-5678)',
          authorizedPickups: 'Sarah Watson (Mother), David Watson (Father), Elena Rostova (Grandmother)',
          avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&auto=format&fit=crop&q=80',
          activeCamp: 'Junior STEM & Robotics',
          sessionDate: 'June 15 – June 19, 2026',
          status: 'Active Camper'
        },
        {
          id: 'CH-102',
          name: 'Lucas Watson',
          dob: '2015-08-20',
          age: 11,
          grade: '6th Grade',
          allergies: 'None reported',
          medications: 'None',
          dietary: 'Standard Chef Lunch',
          emergencyContact: 'Sarah Watson (Mother) - (555) 019-2834',
          doctor: 'Dr. Robert Chen, Tahoe Pediatrics ((555) 234-5678)',
          authorizedPickups: 'Sarah Watson (Mother), David Watson (Father)',
          avatar: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=160&auto=format&fit=crop&q=80',
          activeCamp: 'Summer Sports Adventure',
          sessionDate: 'June 22 – June 26, 2026',
          status: 'Active Camper'
        }
      ];
      localStorage.setItem('campsphere_children', JSON.stringify(defaultChildren));
    }

    // 1.2 Enrollments
    if (!localStorage.getItem('campsphere_enrollments')) {
      const defaultEnrollments = [
        {
          id: 'CS-849201',
          childId: 'CH-101',
          childName: 'Emma Watson',
          childAge: 8,
          programName: 'Junior STEM & Robotics',
          track: 'STEM Lab',
          sessionDate: 'June 15 – June 19, 2026',
          amount: '$395.00',
          status: 'Confirmed',
          dateCreated: 'May 10, 2026',
          location: 'Innovation Hub & Robotics Lab',
          counselor: 'Jessica Vance',
          paidStatus: 'Paid in Full'
        },
        {
          id: 'CS-729104',
          childId: 'CH-102',
          childName: 'Lucas Watson',
          childAge: 11,
          programName: 'Summer Sports Adventure',
          track: 'Sports & Athletics',
          sessionDate: 'June 22 – June 26, 2026',
          amount: '$360.00',
          status: 'Confirmed',
          dateCreated: 'May 12, 2026',
          location: 'Athletic Field & Pine Pavilion',
          counselor: 'Coach Marcus Hayes',
          paidStatus: 'Paid in Full'
        },
        {
          id: 'CS-510293',
          childId: 'CH-101',
          childName: 'Emma Watson',
          childAge: 8,
          programName: 'Splash & Swim Safari',
          track: 'Aquatics',
          sessionDate: 'July 06 – July 10, 2026',
          amount: '$340.00',
          status: 'Confirmed',
          dateCreated: 'May 18, 2026',
          location: 'Olympic Pool & Lake Tahoe Shore',
          counselor: 'Chloe Bennett',
          paidStatus: 'Paid in Full'
        }
      ];
      localStorage.setItem('campsphere_enrollments', JSON.stringify(defaultEnrollments));
    }

    // 1.3 User Profile & Security PIN
    if (!localStorage.getItem('campsphere_parent_profile')) {
      const defaultProfile = {
        firstName: 'Sarah',
        lastName: 'Watson',
        email: 'parent@campsphere.com',
        phone: '(555) 019-2834',
        address: '4288 Meadow Pine Way, South Lake Tahoe, CA 96150',
        pickupPin: '4829',
        emergencyName: 'David Watson (Father)',
        emergencyPhone: '(555) 987-6543',
        notifySms: true,
        notifyEmail: true,
        notifyPhotos: true,
        twoFactor: false
      };
      localStorage.setItem('campsphere_parent_profile', JSON.stringify(defaultProfile));
    }
  }

  initDashboardStorage();

  // Helper function for Toast Notifications
  function notify(msg, type = 'success', title = 'CampSphere Portal') {
    if (window.showCampToast) {
      window.showCampToast(msg, type, title);
    } else {
      console.log(`[${title}] ${msg}`);
    }
  }

  // ==========================================================================
  // 2. Responsive Mobile Sidebar Toggle
  // ==========================================================================
  function initDashboardSidebar() {
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    if (!dashboardSidebar || dashboardSidebar.dataset.sidebarInitialized === 'true') return;
    dashboardSidebar.dataset.sidebarInitialized = 'true';

    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    const openSidebar = () => {
      dashboardSidebar.classList.add('show');
      backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      dashboardSidebar.classList.remove('show');
      backdrop.classList.remove('show');
      document.body.style.overflow = '';
    };

    // Use event delegation for all toggle buttons
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.sidebar-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (dashboardSidebar.classList.contains('show')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      }
    });

    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dashboardSidebar.classList.contains('show')) {
        closeSidebar();
      }
    });

    dashboardSidebar.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && window.innerWidth < 992) {
        closeSidebar();
      }
    });
  }
  initDashboardSidebar();

  // Update Camper Count Badges in Sidebar & Nav
  function updateCamperBadges() {
    const children = JSON.parse(localStorage.getItem('campsphere_children') || '[]');
    document.querySelectorAll('.camper-count-badge').forEach(b => {
      b.textContent = children.length;
    });
  }
  updateCamperBadges();

  // Dynamic Data Fetchers for User Account Isolation
  function getActiveUserEnrollments() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    if (session && session.loggedIn) {
      const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (activeUser && activeUser.enrollments) {
        return activeUser.enrollments;
      }
    }

    // Default fallback to campsphere_enrollments
    try {
      return JSON.parse(localStorage.getItem('campsphere_enrollments') || '[]');
    } catch (e) {
      return [];
    }
  }

  function getActiveUserCampers() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    if (session && session.loggedIn) {
      const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (activeUser && activeUser.children && activeUser.children.length > 0) {
        return activeUser.children;
      }
    }

    // Default fallback to campsphere_children
    try {
      return JSON.parse(localStorage.getItem('campsphere_children') || '[]');
    } catch (e) {
      return [];
    }
  }

  function getActiveUserDailySchedules() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    if (session && session.loggedIn) {
      const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (activeUser && activeUser.dailySchedules) {
        return activeUser.dailySchedules;
      }
    }

    // Default fallback to campsphere_daily_schedules
    try {
      const local = JSON.parse(localStorage.getItem('campsphere_daily_schedules') || 'null');
      if (local && Array.isArray(local) && local.length > 0) return local;
    } catch (e) {}

    // Fallback default sample for initial logged-in user view
    if (!session || !session.loggedIn) {
      return [
        {
          id: 'DS-482019',
          transactionId: 'TXN-DS-482019',
          type: 'Daily Schedule',
          passId: 'daily-2',
          scheduleTitle: 'STEM & Robotics Single Day',
          activityDate: 'Tuesday, June 16, 2026',
          timeSlot: '8:30 AM – 4:00 PM',
          camperName: 'Emma Watson',
          amount: '$95.00',
          paymentStatus: 'Paid in Full',
          status: 'Confirmed',
          bookingDate: 'May 10, 2026'
        }
      ];
    }
    return [];
  }

  function getActiveUserWeeklySchedules() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    if (session && session.loggedIn) {
      const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (activeUser && activeUser.weeklySchedules) {
        return activeUser.weeklySchedules;
      }
    }

    // Default fallback to campsphere_weekly_schedules
    try {
      const local = JSON.parse(localStorage.getItem('campsphere_weekly_schedules') || 'null');
      if (local && Array.isArray(local) && local.length > 0) return local;
    } catch (e) {}

    // Fallback default sample for initial logged-in user view
    if (!session || !session.loggedIn) {
      return [
        {
          id: 'WS-892014',
          transactionId: 'TXN-WS-892014',
          type: 'Weekly Schedule',
          weekId: 'week-1',
          weekNumber: 'Week 1',
          themeTitle: 'Space & Robotics Odyssey',
          dateRange: 'June 15 – June 19, 2026',
          camperName: 'Lucas Watson',
          amount: '$395.00',
          paymentStatus: 'Paid in Full',
          status: 'Confirmed',
          bookingDate: 'May 12, 2026'
        }
      ];
    }
    return [];
  }

  function getActiveUserPayments() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    if (session && session.loggedIn) {
      const activeUser = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (activeUser && activeUser.payments && Array.isArray(activeUser.payments)) {
        return activeUser.payments;
      }
    }

    // Check global campsphere_payments matching user email or general
    try {
      const globalPay = JSON.parse(localStorage.getItem('campsphere_payments') || 'null');
      if (globalPay && Array.isArray(globalPay) && globalPay.length > 0) {
        if (session && session.loggedIn && session.email) {
          const userSpecific = globalPay.filter(p => p.userEmail && p.userEmail.toLowerCase() === session.email.toLowerCase());
          if (userSpecific.length > 0) return userSpecific;
        }
        if (!session || !session.loggedIn || session.email === 'parent@campsphere.com') {
          return globalPay;
        }
      }
    } catch (e) {}

    // Fallback default sample for initial logged-in user view
    if (!session || !session.loggedIn || session.email === 'parent@campsphere.com') {
      return [
        {
          id: 'INV-2026-001',
          transactionId: 'INV-2026-001',
          enrollmentId: 'CS-849201',
          bookingId: 'CS-849201',
          userName: 'Sarah Watson',
          userEmail: 'parent@campsphere.com',
          guardianPhone: '(555) 019-2834',
          camperName: 'Emma Watson',
          camperAge: 8,
          programName: 'Junior STEM & Robotics',
          programType: 'Program',
          category: 'STEM Lab',
          programImage: 'assets/images/junior_robotics_python_coding.jpeg',
          selectedDate: 'June 15 – June 19, 2026',
          selectedTime: '8:30 AM – 4:00 PM',
          scheduleDetails: 'Program Enrollment: Junior STEM & Robotics (June 15 – June 19, 2026)',
          amount: '$395.00',
          amountNumeric: 395,
          paymentDate: 'May 10, 2026',
          paymentTime: '10:30 AM',
          paymentMethod: 'Visa •••• 4242',
          paymentStatus: 'Paid in Full',
          statusBadge: 'Paid in Full',
          nextPaymentDate: 'None (Paid in Full)'
        },
        {
          id: 'INV-2026-002',
          transactionId: 'INV-2026-002',
          enrollmentId: 'CS-729104',
          bookingId: 'CS-729104',
          userName: 'Sarah Watson',
          userEmail: 'parent@campsphere.com',
          guardianPhone: '(555) 019-2834',
          camperName: 'Lucas Watson',
          camperAge: 11,
          programName: 'Summer Sports Adventure',
          programType: 'Program',
          category: 'Sports & Athletics',
          programImage: 'assets/images/all_star_sports_athletics.jpeg',
          selectedDate: 'June 22 – June 26, 2026',
          selectedTime: '8:30 AM – 4:00 PM',
          scheduleDetails: 'Program Enrollment: Summer Sports Adventure (June 22 – June 26, 2026)',
          amount: '$360.00',
          amountNumeric: 360,
          paymentDate: 'May 12, 2026',
          paymentTime: '02:15 PM',
          paymentMethod: 'Visa •••• 4242',
          paymentStatus: 'Paid in Full',
          statusBadge: 'Paid in Full',
          nextPaymentDate: 'None (Paid in Full)'
        },
        {
          id: 'INV-2026-003',
          transactionId: 'INV-2026-003',
          enrollmentId: 'CS-510293',
          bookingId: 'CS-510293',
          userName: 'Sarah Watson',
          userEmail: 'parent@campsphere.com',
          guardianPhone: '(555) 019-2834',
          camperName: 'Emma Watson',
          camperAge: 8,
          programName: 'Splash & Swim Safari',
          programType: 'Program',
          category: 'Aquatics',
          programImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80',
          selectedDate: 'July 06 – July 10, 2026',
          selectedTime: '8:30 AM – 4:00 PM',
          scheduleDetails: 'Program Enrollment: Splash & Swim Safari (July 06 – July 10, 2026)',
          amount: '$350.00',
          amountNumeric: 350,
          paymentDate: 'May 18, 2026',
          paymentTime: '11:45 AM',
          paymentMethod: 'Visa •••• 4242',
          paymentStatus: 'Paid in Full',
          statusBadge: 'Paid in Full',
          nextPaymentDate: 'None (Paid in Full)'
        }
      ];
    }
    return [];
  }

  // Dynamic Data Renderer for Dashboard, Enrollments, Children, Schedules and Payments
  function renderDashboardDynamicData() {
    const children = getActiveUserCampers();
    const enrollments = getActiveUserEnrollments();
    const dailySchedules = getActiveUserDailySchedules();
    const weeklySchedules = getActiveUserWeeklySchedules();
    const payments = getActiveUserPayments();

    // 1. Dashboard Overview KPIs & Badges
    const kpiEnrollments = document.getElementById('kpiActiveEnrollments');
    if (kpiEnrollments) kpiEnrollments.textContent = enrollments.length;

    const kpiCampers = document.getElementById('kpiRegisteredCampers');
    if (kpiCampers) kpiCampers.textContent = children.length;

    const kpiCampersSub = document.getElementById('kpiCampersSubtitle');
    if (kpiCampersSub) {
      const camperNames = children.map(c => c.name.split(' ')[0]).join(' & ') || 'No Campers Registered';
      kpiCampersSub.innerHTML = `<i class="bi bi-person-heart text-danger me-1"></i> ${camperNames}`;
    }

    const campersBadge = document.getElementById('dashboardActiveCampersBadge');
    if (campersBadge) campersBadge.textContent = `${children.length} Camper${children.length === 1 ? '' : 's'}`;

    const sessionsBadge = document.getElementById('dashboardActiveSessionsBadge');
    if (sessionsBadge) sessionsBadge.textContent = `${enrollments.length} Enrolled`;

    // 2. Dashboard Campers List
    const campersList = document.getElementById('dashboardCampersList');
    if (campersList) {
      if (children.length > 0) {
        const checklistWidget = campersList.querySelector('.p-3.bg-light.rounded-3.border.mt-1')?.outerHTML || '';
        let html = '';
        children.forEach(c => {
          const allergyBadge = c.allergies && c.allergies.toLowerCase() !== 'none' && c.allergies.toLowerCase() !== 'none reported'
            ? `<span class="badge bg-danger-light text-danger"><i class="bi bi-shield-exclamation me-1"></i> ${c.allergies.split('(')[0].trim()}</span>`
            : `<span class="badge bg-success-light text-success"><i class="bi bi-check2-circle me-1"></i> No Allergies</span>`;

          html += `
            <div class="camper-mini-card p-3 border rounded-3 d-flex align-items-center justify-content-between shadow-xs">
              <div class="d-flex align-items-center gap-3">
                <div class="position-relative flex-shrink-0">
                  <img src="${c.avatar || 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=120&auto=format&fit=crop&q=80'}" alt="${c.name}" class="rounded-circle shadow-sm" style="width: 52px; height: 52px; object-fit: cover;">
                  <span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white border-2" style="width: 14px; height: 14px;" title="Active Camper"></span>
                </div>
                <div>
                  <h6 class="fw-bold text-navy mb-1">${c.name}</h6>
                  <div class="d-flex align-items-center flex-wrap gap-2 text-muted small mb-1">
                    <span>Age ${c.age || 8} • ${c.grade || 'Grade School'}</span>
                    <span>•</span>
                    ${allergyBadge}
                  </div>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-primary-light text-primary"><i class="bi bi-stars me-1"></i> ${c.activeCamp || 'Summer Camp'}</span>
                  </div>
                </div>
              </div>
              <a href="child-details.html" class="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ms-2" style="width: 36px; height: 36px;" title="View Profile"><i class="bi bi-chevron-right"></i></a>
            </div>
          `;
        });
        campersList.innerHTML = html + (checklistWidget ? checklistWidget : '');
      } else {
        campersList.innerHTML = `
          <div class="p-4 text-center">
            <i class="bi bi-people text-muted fs-2 d-block mb-2"></i>
            <h6 class="fw-bold text-navy mb-1">No Campers Added Yet</h6>
            <p class="text-muted small mb-3">Add your children to begin enrolling in Summer 2026 programs.</p>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addChildModal">
              <i class="bi bi-person-plus me-1"></i> Add Camper Profile
            </button>
          </div>
        `;
      }
    }

    // 3. Dashboard Sessions Table Body
    const sessionsTableBody = document.getElementById('dashboardSessionsTableBody');
    const enrollmentsContainer = document.getElementById('dashboardEnrollmentsContainer');
    if (sessionsTableBody) {
      if (enrollments.length > 0) {
        let rows = '';
        enrollments.forEach(en => {
          let progImg = en.programImage;
          if (!progImg && window.CAMPSPHERE_PROGRAMS && en.programId && window.CAMPSPHERE_PROGRAMS[en.programId]) {
            progImg = window.CAMPSPHERE_PROGRAMS[en.programId].images[0];
          }
          if (!progImg) progImg = 'assets/images/junior_robotics_python_coding.jpeg';
          const resolvedImg = progImg.startsWith('http') || progImg.startsWith('../') ? progImg : '../' + progImg;
          const progCat = en.programCategory || en.track || 'Specialty Camp';
          const enrollDate = en.enrollmentDate || en.dateCreated || 'Summer 2026';
          const txId = en.transactionId || en.id || ('CS-' + Math.floor(100000 + Math.random() * 900000));
          const payStatus = en.paymentStatus || en.paidStatus || 'Paid in Full';
          const enrollStatus = en.enrollmentStatus || en.status || 'Confirmed';

          rows += `
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <img src="${resolvedImg}" alt="${en.programName || 'Program'}" class="rounded-3 shadow-xs flex-shrink-0" style="width: 46px; height: 46px; object-fit: cover;">
                  <div>
                    <strong class="text-navy d-block mb-1" style="font-size: 0.875rem;">${en.programName || 'Specialty Camp'}</strong>
                    <span class="badge bg-primary-light text-primary" style="font-size: 0.7rem;">${progCat}</span>
                  </div>
                </div>
              </td>
              <td>
                <strong class="text-navy d-block">${en.childName || 'Camper'}</strong>
                <small class="text-muted">Age ${en.childAge || 8}</small>
              </td>
              <td>
                <div class="small fw-semibold text-navy"><i class="bi bi-calendar-check text-primary me-1"></i> ${en.sessionDate || 'Summer 2026'}</div>
                <small class="text-muted d-block">Enrolled: ${enrollDate}</small>
              </td>
              <td>
                <strong class="text-navy d-block">${en.amount || '$395.00'}</strong>
                <span class="badge bg-success-light text-success" style="font-size: 0.7rem;"><i class="bi bi-check-circle-fill me-1"></i> ${payStatus}</span>
              </td>
              <td>
                <span class="status-badge status-badge-confirmed d-inline-block mb-1"><i class="bi bi-check-circle-fill me-1"></i> ${enrollStatus}</span>
                <small class="text-muted d-block font-monospace" style="font-size: 0.7rem;">ID: ${txId}</small>
              </td>
              <td>
                <a href="enrollment-details.html?id=${en.id}" class="btn btn-sm btn-outline-primary py-1 px-2 text-nowrap">View Details</a>
              </td>
            </tr>
          `;
        });
        sessionsTableBody.innerHTML = rows;
      } else if (enrollmentsContainer) {
        enrollmentsContainer.innerHTML = `
          <div class="p-5 text-center">
            <div class="mb-3 mx-auto" style="width: 60px; height: 60px; border-radius: 50%; background: #EEF2F6; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-journal-plus text-primary fs-3"></i>
            </div>
            <h6 class="fw-bold text-navy mb-1">No Active Enrollments Yet</h6>
            <p class="text-muted small mb-3">Reserve your camper's spot in our Summer 2026 specialty tracks.</p>
            <a href="../enrollment.html" class="btn btn-primary btn-sm px-4 py-2 fw-bold">
              <i class="bi bi-plus-circle me-1"></i> Enroll in a Camp Program
            </a>
          </div>
        `;
      }
    }

    // 3b. Daily Schedules Table (parent/dashboard.html & parent/daily-schedule.html)
    const dailyTableBody = document.getElementById('dashboardDailySchedulesTableBody') || document.getElementById('portalDailySchedulesTableBody');
    const dailyContainer = document.getElementById('dashboardDailySchedulesContainer') || document.getElementById('portalDailySchedulesContainer');
    if (dailyTableBody) {
      if (dailySchedules.length > 0) {
        let rows = '';
        dailySchedules.forEach(ds => {
          const txId = ds.transactionId || ds.id || ('TXN-DS-' + Math.floor(100000 + Math.random() * 900000));
          const bookingDate = ds.bookingDate || 'Summer 2026';
          const payStatus = ds.paymentStatus || 'Paid in Full';
          const status = ds.status || 'Confirmed';
          const title = ds.scheduleTitle || ds.title || 'Daily Explorer Pass';
          const date = ds.activityDate || ds.date || 'June 16, 2026';
          const time = ds.timeSlot || '8:30 AM – 4:00 PM';
          const amount = ds.amount || '$85.00';
          const camper = ds.camperName || ds.childName || 'Camper';

          rows += `
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-accent-light text-accent p-2 rounded-circle"><i class="bi bi-clock-history fs-6"></i></span>
                  <div>
                    <strong class="text-navy d-block">${title}</strong>
                    <span class="badge bg-light text-muted border" style="font-size: 0.7rem;">Daily Single-Day Pass</span>
                  </div>
                </div>
              </td>
              <td>
                <strong class="text-navy d-block">${camper}</strong>
                <small class="text-muted">Single-Day Camper</small>
              </td>
              <td>
                <div class="small fw-bold text-navy"><i class="bi bi-calendar2-day text-primary me-1"></i> ${date}</div>
                <small class="text-muted d-block">${time}</small>
              </td>
              <td>
                <strong class="text-navy d-block">${amount}</strong>
                <span class="badge bg-success-light text-success" style="font-size: 0.7rem;"><i class="bi bi-check-circle-fill me-1"></i> ${payStatus}</span>
              </td>
              <td>
                <span class="status-badge status-badge-confirmed d-inline-block"><i class="bi bi-check-circle-fill me-1"></i> ${status}</span>
              </td>
              <td>
                <span class="font-monospace text-primary fw-bold small">${txId}</span>
                <small class="text-muted d-block" style="font-size: 0.7rem;">Booked: ${bookingDate}</small>
              </td>
            </tr>
          `;
        });
        dailyTableBody.innerHTML = rows;
      } else if (dailyContainer) {
        dailyContainer.innerHTML = `
          <div class="p-4 text-center">
            <div class="mb-2 mx-auto" style="width: 48px; height: 48px; border-radius: 50%; background: #FFF3E0; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-clock-history text-accent fs-4"></i>
            </div>
            <h6 class="fw-bold text-navy mb-1">No Daily Schedule Bookings Yet</h6>
            <p class="text-muted small mb-3">Book flexible single-day passes for any day of Summer 2026.</p>
            <a href="../payment-daily.html" class="btn btn-accent btn-sm px-3 py-1 fw-bold">
              <i class="bi bi-plus-circle me-1"></i> Book a Daily Schedule Pass
            </a>
          </div>
        `;
      }
    }

    // 3c. Weekly Schedules Table (parent/dashboard.html & parent/weekly-schedule.html)
    const weeklyTableBody = document.getElementById('dashboardWeeklySchedulesTableBody') || document.getElementById('portalWeeklySchedulesTableBody');
    const weeklyContainer = document.getElementById('dashboardWeeklySchedulesContainer') || document.getElementById('portalWeeklySchedulesContainer');
    if (weeklyTableBody) {
      if (weeklySchedules.length > 0) {
        let rows = '';
        weeklySchedules.forEach(ws => {
          const txId = ws.transactionId || ws.id || ('TXN-WS-' + Math.floor(100000 + Math.random() * 900000));
          const bookingDate = ws.bookingDate || 'Summer 2026';
          const payStatus = ws.paymentStatus || 'Paid in Full';
          const status = ws.status || 'Confirmed';
          const weekBadge = ws.weekNumber || ws.weekId || 'Week 1';
          const theme = ws.themeTitle || ws.title || 'Weekly Camp Session';
          const dateRange = ws.dateRange || ws.dates || 'June 15 – June 19, 2026';
          const amount = ws.amount || '$395.00';
          const camper = ws.camperName || ws.childName || 'Camper';

          rows += `
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-success-light text-success p-2 rounded-circle"><i class="bi bi-calendar-week fs-6"></i></span>
                  <div>
                    <span class="badge bg-primary text-white mb-1" style="font-size: 0.68rem;">${weekBadge}</span>
                    <strong class="text-navy d-block">${theme}</strong>
                  </div>
                </div>
              </td>
              <td>
                <strong class="text-navy d-block">${camper}</strong>
                <small class="text-muted">Full-Week Cohort</small>
              </td>
              <td>
                <div class="small fw-bold text-navy"><i class="bi bi-calendar-range text-success me-1"></i> ${dateRange}</div>
                <small class="text-muted d-block">Mon–Fri (Full Day)</small>
              </td>
              <td>
                <strong class="text-navy d-block">${amount}</strong>
                <span class="badge bg-success-light text-success" style="font-size: 0.7rem;"><i class="bi bi-check-circle-fill me-1"></i> ${payStatus}</span>
              </td>
              <td>
                <span class="status-badge status-badge-confirmed d-inline-block"><i class="bi bi-check-circle-fill me-1"></i> ${status}</span>
              </td>
              <td>
                <span class="font-monospace text-success fw-bold small">${txId}</span>
                <small class="text-muted d-block" style="font-size: 0.7rem;">Booked: ${bookingDate}</small>
              </td>
            </tr>
          `;
        });
        weeklyTableBody.innerHTML = rows;
      } else if (weeklyContainer) {
        weeklyContainer.innerHTML = `
          <div class="p-4 text-center">
            <div class="mb-2 mx-auto" style="width: 48px; height: 48px; border-radius: 50%; background: #E8F5E9; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-calendar-week text-success fs-4"></i>
            </div>
            <h6 class="fw-bold text-navy mb-1">No Weekly Schedule Bookings Yet</h6>
            <p class="text-muted small mb-3">Reserve 5-day cohort weeks for full summer immersion.</p>
            <a href="../payment-weekly.html" class="btn btn-success btn-sm px-3 py-1 fw-bold">
              <i class="bi bi-plus-circle me-1"></i> Book a Weekly Schedule Cohort
            </a>
          </div>
        `;
      }
    }

    // 4. Enrollments Page Table (parent/enrollments.html)
    const enrollmentsTable = document.getElementById('parentEnrollmentsTable');
    if (enrollmentsTable) {
      const tbody = enrollmentsTable.querySelector('tbody');
      if (tbody) {
        if (enrollments.length > 0) {
          let rows = '';
          enrollments.forEach(en => {
            let progImg = en.programImage;
            if (!progImg && window.CAMPSPHERE_PROGRAMS && en.programId && window.CAMPSPHERE_PROGRAMS[en.programId]) {
              progImg = window.CAMPSPHERE_PROGRAMS[en.programId].images[0];
            }
            if (!progImg) progImg = 'assets/images/junior_robotics_python_coding.jpeg';
            const resolvedImg = progImg.startsWith('http') || progImg.startsWith('../') ? progImg : '../' + progImg;
            const progCat = en.programCategory || en.track || 'Specialty Camp';
            const enrollDate = en.enrollmentDate || en.dateCreated || 'Summer 2026';
            const txId = en.transactionId || en.id || ('CS-' + Math.floor(100000 + Math.random() * 900000));
            const payStatus = en.paymentStatus || en.paidStatus || 'Paid in Full';
            const enrollStatus = en.enrollmentStatus || en.status || 'Confirmed';

            rows += `
              <tr class="enrollment-row" data-status="${enrollStatus.toLowerCase()}" data-child="${(en.childName || '').toLowerCase()}">
                <td>
                  <strong class="text-primary font-monospace">${txId}</strong>
                  <small class="text-muted d-block">${enrollDate}</small>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="${resolvedImg}" alt="${en.programName || 'Program'}" class="rounded-3 shadow-xs flex-shrink-0" style="width: 44px; height: 44px; object-fit: cover;">
                    <div>
                      <strong class="text-navy d-block mb-1">${en.programName || 'Specialty Camp'}</strong>
                      <span class="badge bg-primary-light text-primary" style="font-size: 0.7rem;">${progCat}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <strong>${en.childName || 'Camper'}</strong>
                  <small class="text-muted d-block">Age ${en.childAge || 8}</small>
                </td>
                <td><i class="bi bi-calendar-event text-muted me-1"></i> ${en.sessionDate || 'Summer 2026'}</td>
                <td>
                  <strong class="text-navy d-block">${en.amount || '$395.00'}</strong>
                  <span class="badge bg-success-light text-success" style="font-size: 0.7rem;"><i class="bi bi-check-circle-fill me-1"></i> ${payStatus}</span>
                </td>
                <td><span class="status-badge status-badge-confirmed"><i class="bi bi-check-circle-fill"></i> ${enrollStatus}</span></td>
                <td>
                  <div class="d-flex gap-1">
                    <a href="enrollment-details.html?id=${en.id}" class="btn btn-sm btn-outline-primary py-1 px-2" title="View Details"><i class="bi bi-eye"></i> Details</a>
                    <a href="receipts.html" class="btn btn-sm btn-outline-secondary py-1 px-2" title="Receipt"><i class="bi bi-receipt"></i></a>
                  </div>
                </td>
              </tr>
            `;
          });
          tbody.innerHTML = rows;
        } else {
          tbody.innerHTML = `
            <tr>
              <td colspan="7" class="text-center py-5">
                <div class="text-muted mb-2"><i class="bi bi-calendar-x fs-2"></i></div>
                <h6 class="fw-bold text-navy mb-1">No Active Enrollments Found</h6>
                <p class="text-muted small mb-3">You haven't enrolled any campers in Summer 2026 programs yet.</p>
                <a href="../enrollment.html" class="btn btn-primary btn-sm px-4">
                  <i class="bi bi-plus-circle me-1"></i> Start Online Enrollment
                </a>
              </td>
            </tr>
          `;
        }
      }
      const totalBadge = document.getElementById('enrollmentsTotalBadge');
      if (totalBadge) totalBadge.textContent = `${enrollments.length} Confirmed Booking${enrollments.length === 1 ? '' : 's'}`;
    }

    // 5. Children Cards Grid (parent/children.html)
    const childrenContainer = document.getElementById('childrenCardsContainer');
    if (childrenContainer) {
      if (children.length > 0) {
        let cardsHtml = '';
        children.forEach(c => {
          const allergyBadge = c.allergies && c.allergies.toLowerCase() !== 'none' && c.allergies.toLowerCase() !== 'none reported'
            ? `<strong class="text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i> ${c.allergies}</strong>`
            : `<strong class="text-success"><i class="bi bi-check-circle-fill me-1"></i> No Known Allergies</strong>`;

          cardsHtml += `
            <div class="col-lg-6">
              <div class="card-camp p-4 shadow-sm h-100">
                <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <img src="${c.avatar || 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&auto=format&fit=crop&q=80'}" alt="${c.name}" class="rounded-circle shadow-sm" style="width: 72px; height: 72px; object-fit: cover;">
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="fw-bold text-navy mb-0">${c.name}</h5>
                      <span class="badge bg-primary text-white">${c.status || 'Active Camper'}</span>
                    </div>
                    <small class="text-muted">ID: ${c.id || 'CH-101'} • Age ${c.age || 8} • Born: ${c.dob || '2018-04-12'}</small>
                  </div>
                </div>
                <div class="row g-2 small mb-3">
                  <div class="col-6"><span class="text-muted">Active Program:</span> <strong class="d-block text-navy">${c.activeCamp || 'Summer Camp'}</strong></div>
                  <div class="col-6"><span class="text-muted">Session Dates:</span> <strong class="d-block text-navy">${c.sessionDate || 'June 15 – 19, 2026'}</strong></div>
                  <div class="col-6"><span class="text-muted">Grade Fall '26:</span> <strong class="d-block text-navy">${c.grade || '3rd Grade'}</strong></div>
                  <div class="col-6"><span class="text-muted">Medical Alerts:</span> <span class="d-block">${allergyBadge}</span></div>
                </div>
                <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                  <span class="text-muted small"><i class="bi bi-shield-check text-success me-1"></i> Verified Safety Profile</span>
                  <a href="child-details.html?id=${c.id}" class="btn btn-sm btn-outline-primary">View Full Profile</a>
                </div>
              </div>
            </div>
          `;
        });
        childrenContainer.innerHTML = cardsHtml;
      } else {
        childrenContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="text-muted mb-2"><i class="bi bi-people fs-1"></i></div>
            <h5 class="fw-bold text-navy">No Camper Profiles Yet</h5>
            <p class="text-muted small mb-3">Add your children to begin booking summer camp sessions.</p>
            <button class="btn btn-primary btn-sm px-4" data-bs-toggle="modal" data-bs-target="#addChildModal">
              <i class="bi bi-person-plus me-1"></i> Add Camper Profile
            </button>
          </div>
        `;
      }
    }

    // 6. Enrollment Details Page (parent/enrollment-details.html)
    const detailProg = document.getElementById('detailProgramName');
    if (detailProg && enrollments.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedId = urlParams.get('id');
      
      let matchedEnrollment = null;
      if (requestedId) {
        matchedEnrollment = enrollments.find(e => e.id === requestedId || e.transactionId === requestedId);
      }
      if (!matchedEnrollment) {
        matchedEnrollment = JSON.parse(localStorage.getItem('campsphere_latest_enrollment') || 'null') || enrollments[0];
      }

      if (matchedEnrollment) {
        if (matchedEnrollment.programName) detailProg.textContent = matchedEnrollment.programName;
        
        let progImg = matchedEnrollment.programImage;
        if (!progImg && window.CAMPSPHERE_PROGRAMS && matchedEnrollment.programId && window.CAMPSPHERE_PROGRAMS[matchedEnrollment.programId]) {
          progImg = window.CAMPSPHERE_PROGRAMS[matchedEnrollment.programId].images[0];
        }
        if (!progImg) progImg = 'assets/images/junior_robotics_python_coding.jpeg';
        const resolvedImg = progImg.startsWith('http') || progImg.startsWith('../') ? progImg : '../' + progImg;

        const detailImg = document.getElementById('detailProgramImage');
        if (detailImg) {
          detailImg.src = resolvedImg;
          detailImg.onerror = function() {
            this.onerror = null;
            this.src = '../assets/images/junior_robotics_python_coding.jpeg';
          };
        }

        const detailCat = document.getElementById('detailCategoryBadge');
        if (detailCat) detailCat.textContent = matchedEnrollment.programCategory || matchedEnrollment.track || 'Specialty Camp';

        const detailBooking = document.getElementById('detailBookingId');
        if (detailBooking) detailBooking.textContent = matchedEnrollment.transactionId || matchedEnrollment.id || 'CS-849201';

        const detailEnrollDate = document.getElementById('detailEnrollDate');
        if (detailEnrollDate) detailEnrollDate.textContent = `Enrolled on ${matchedEnrollment.enrollmentDate || matchedEnrollment.dateCreated || 'May 10, 2026'}`;

        const detailCamper = document.getElementById('detailCamperName');
        if (detailCamper && matchedEnrollment.childName) detailCamper.textContent = `${matchedEnrollment.childName} (Age ${matchedEnrollment.childAge || 8})`;
        
        const detailSession = document.getElementById('detailSessionDate');
        if (detailSession && matchedEnrollment.sessionDate) detailSession.textContent = matchedEnrollment.sessionDate;
        
        const detailLoc = document.getElementById('detailLocation');
        if (detailLoc && matchedEnrollment.location) detailLoc.textContent = matchedEnrollment.location;
        
        const detailCouns = document.getElementById('detailCounselor');
        if (detailCouns && matchedEnrollment.counselor) detailCouns.textContent = matchedEnrollment.counselor;
        
        const detailTot = document.getElementById('detailTotalPaid');
        if (detailTot && matchedEnrollment.amount) detailTot.textContent = matchedEnrollment.amount;
        
        const detailPin = document.getElementById('detailPickupPin');
        if (detailPin && matchedEnrollment.pickupPin) detailPin.textContent = matchedEnrollment.pickupPin;
      }
    }

    // 7. Payments Page Table & Summary KPIs (parent/payments.html)
    const paymentsTableBody = document.getElementById('paymentsHistoryTableBody');
    if (paymentsTableBody) {
      if (payments.length > 0) {
        let rows = '';
        let totalTuitionNum = 0;

        payments.forEach(p => {
          const txId = p.transactionId || p.id || ('INV-2026-' + Math.floor(100 + Math.random() * 900));
          const date = p.paymentDate || 'Summer 2026';
          const time = p.paymentTime || '';
          const progName = p.programName || 'Camp Program';
          const progType = p.programType || 'Program';
          const camper = p.camperName || 'Camper';
          const dates = p.selectedDate || 'Summer 2026';
          const method = p.paymentMethod || 'Visa •••• 4242';
          const amount = p.amount || '$395.00';
          const status = p.paymentStatus || 'Paid';
          const nextPay = p.nextPaymentDate || 'None (Paid in Full)';

          let typeBadge = '<span class="badge bg-primary-light text-primary border me-1" style="font-size: 0.68rem;"><i class="bi bi-grid-fill me-1"></i> Program</span>';
          if (progType === 'Daily Schedule') {
            typeBadge = '<span class="badge bg-accent-light text-accent border me-1" style="font-size: 0.68rem;"><i class="bi bi-clock-history me-1"></i> Daily Schedule</span>';
          } else if (progType === 'Weekly Schedule') {
            typeBadge = '<span class="badge bg-success-light text-success border me-1" style="font-size: 0.68rem;"><i class="bi bi-calendar-week me-1"></i> Weekly Schedule</span>';
          }

          const numVal = typeof p.amountNumeric === 'number' ? p.amountNumeric : parseFloat(String(amount).replace(/[^0-9.]/g, '')) || 0;
          if (status.toLowerCase().includes('paid')) {
            totalTuitionNum += numVal;
          }

          rows += `
            <tr>
              <td>
                <strong class="text-primary font-monospace">${txId}</strong>
                <small class="text-muted d-block" style="font-size: 0.72rem;">${date}${time ? ' • ' + time : ''}</small>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center mb-1">
                    ${typeBadge}
                    <strong class="text-navy">${progName}</strong>
                  </div>
                  <small class="text-muted"><i class="bi bi-person me-1"></i>${camper} • <i class="bi bi-calendar-event me-1"></i>${dates}</small>
                </div>
              </td>
              <td>
                <span class="text-navy fw-semibold">${date}</span>
                <small class="text-muted d-block" style="font-size: 0.72rem;">${time || 'Recorded'}</small>
              </td>
              <td>
                <span class="text-navy small"><i class="bi bi-credit-card me-1 text-primary"></i> ${method}</span>
              </td>
              <td>
                <strong class="text-navy">${amount}</strong>
              </td>
              <td>
                <span class="status-badge status-badge-paid"><i class="bi bi-check-circle-fill me-1"></i> ${status}</span>
              </td>
              <td>
                <small class="text-muted">${nextPay}</small>
              </td>
              <td class="text-end">
                <div class="d-flex justify-content-end gap-1">
                  <a href="payment-details.html?id=${encodeURIComponent(txId)}" class="btn btn-sm btn-outline-primary py-1 px-2" title="View Transaction Details">
                    <i class="bi bi-eye me-1"></i> View
                  </a>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2 btn-download-invoice" data-tx-id="${txId}" title="Download Official Invoice">
                    <i class="bi bi-download"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        });
        paymentsTableBody.innerHTML = rows;

        // Update Summary KPIs
        const totalPaidKpi = document.getElementById('kpiTotalTuitionPaid');
        if (totalPaidKpi) totalPaidKpi.textContent = `$${totalTuitionNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const txCountKpi = document.getElementById('kpiTransactionsCount');
        if (txCountKpi) txCountKpi.textContent = `${payments.length} Transaction${payments.length === 1 ? '' : 's'}`;
      } else {
        paymentsTableBody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center py-5">
              <div class="text-muted mb-2"><i class="bi bi-receipt-cutoff fs-2"></i></div>
              <h6 class="fw-bold text-navy mb-1">No Payment History Found</h6>
              <p class="text-muted small mb-3">Your completed payments for programs, daily passes, and weekly schedules will appear here.</p>
              <a href="../programs.html" class="btn btn-primary btn-sm px-3">
                <i class="bi bi-grid-fill me-1"></i> Explore Programs & Schedules
              </a>
            </td>
          </tr>
        `;
        const totalPaidKpi = document.getElementById('kpiTotalTuitionPaid');
        if (totalPaidKpi) totalPaidKpi.textContent = '$0.00';
        const txCountKpi = document.getElementById('kpiTransactionsCount');
        if (txCountKpi) txCountKpi.textContent = '0 Transactions';
      }
    }

    // 8. Payment Details & Official Invoice View (parent/payment-details.html)
    const invoiceContainer = document.getElementById('invoiceContainer');
    if (invoiceContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const invoiceId = urlParams.get('id');
      
      let matched = null;
      if (invoiceId) {
        matched = payments.find(p => (p.transactionId && p.transactionId.toLowerCase() === invoiceId.toLowerCase()) || (p.id && p.id.toLowerCase() === invoiceId.toLowerCase()));
      }
      if (!matched && payments.length > 0) {
        matched = payments[0];
      }

      if (matched) {
        const txId = matched.transactionId || matched.id || 'INV-2026-001';
        const date = matched.paymentDate || 'May 10, 2026';
        const time = matched.paymentTime || '10:30 AM';
        const progName = matched.programName || 'Junior STEM & Robotics';
        const progType = matched.programType || 'Program';
        const camper = matched.camperName || 'Emma Watson';
        const camperAge = matched.camperAge || 8;
        const parentName = matched.userName || 'Sarah Watson';
        const parentEmail = matched.userEmail || 'sarah.watson@example.com';
        const parentPhone = matched.guardianPhone || '(555) 019-2834';
        const dates = matched.selectedDate || 'June 15 – June 19, 2026';
        const method = matched.paymentMethod || 'Visa •••• 4242';
        const amount = matched.amount || '$395.00';
        const status = matched.paymentStatus || 'Paid in Full';

        // Update Header
        const headerTitle = document.getElementById('invoiceHeaderTitle');
        if (headerTitle) headerTitle.textContent = `Invoice: ${txId}`;
        const headerDate = document.getElementById('invoiceHeaderDate');
        if (headerDate) headerDate.textContent = `Payment Received: ${date} at ${time}`;

        const printBtn = document.getElementById('invoicePrintBtn');
        if (printBtn) printBtn.setAttribute('data-receipt-id', txId);

        // Update Card Meta
        const numText = document.getElementById('invoiceNumberText');
        if (numText) numText.textContent = txId;
        const dateText = document.getElementById('invoiceDateText');
        if (dateText) dateText.textContent = `${date} at ${time}`;
        const methodText = document.getElementById('invoiceMethodText');
        if (methodText) methodText.innerHTML = `<i class="bi bi-credit-card me-1"></i> ${method}`;

        const parentNameEl = document.getElementById('invoiceParentName');
        if (parentNameEl) parentNameEl.textContent = parentName;
        const parentAddrEl = document.getElementById('invoiceParentAddress');
        if (parentAddrEl) parentAddrEl.innerHTML = `Lake Tahoe Area, CA<br>Phone: ${parentPhone} • Email: ${parentEmail}`;

        const camperInfoEl = document.getElementById('invoiceCamperInfo');
        if (camperInfoEl) camperInfoEl.textContent = `${camper} (Age ${camperAge})`;
        const progDetailsEl = document.getElementById('invoiceProgramDetails');
        if (progDetailsEl) progDetailsEl.innerHTML = `Type: <strong>${progType}</strong> - ${progName}<br>Period: ${dates}`;

        const mainTitle = document.getElementById('itemMainTitle');
        if (mainTitle) mainTitle.textContent = `${progType}: ${progName}`;
        const mainDesc = document.getElementById('itemMainDesc');
        if (mainDesc) mainDesc.textContent = `Enrolled Camper: ${camper} | Summer 2026 Season`;
        const sessionPeriod = document.getElementById('itemSessionPeriod');
        if (sessionPeriod) sessionPeriod.textContent = dates;
        const mainPrice = document.getElementById('itemMainPrice');
        if (mainPrice) mainPrice.textContent = amount;

        const lunchPeriod = document.getElementById('itemLunchPeriod');
        if (lunchPeriod) lunchPeriod.textContent = dates;
        const kitPeriod = document.getElementById('itemKitPeriod');
        if (kitPeriod) kitPeriod.textContent = dates;

        const subtotal = document.getElementById('invoiceSubtotal');
        if (subtotal) subtotal.textContent = amount;
        const totalPaid = document.getElementById('invoiceTotalPaid');
        if (totalPaid) totalPaid.textContent = amount;
      }
    }
  }

  renderDashboardDynamicData();

  // Invoice Print and Download Handlers
  document.addEventListener('click', (e) => {
    const dlBtn = e.target.closest('.btn-download-invoice, .btn-download-receipt');
    if (dlBtn) {
      e.preventDefault();
      const txId = dlBtn.getAttribute('data-tx-id') || dlBtn.getAttribute('data-receipt-id') || 'INV-2026-001';
      if (typeof notify === 'function') {
        notify(`Preparing official PDF invoice receipt for ${txId}...`, 'info', 'Invoice Ready');
      } else if (window.showCampToast) {
        window.showCampToast(`Preparing official PDF invoice receipt for ${txId}...`, 'info', 'Invoice Ready');
      }
      setTimeout(() => {
        window.print();
      }, 300);
    }
  });

  // ==========================================================================
  // 3. Child Management (Add Child, Delete Child, Edit Medical Notes)
  // ==========================================================================
  
  // 3.1 Add Child Modal Form Handler
  const addChildForm = document.getElementById('addChildModalForm') || document.getElementById('addChildForm');
  if (addChildForm) {
    addChildForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('newChildName') || addChildForm.querySelector('input[name="childName"]');
      const dobInput = document.getElementById('newChildDob') || addChildForm.querySelector('input[name="childDob"]');
      const gradeInput = document.getElementById('newChildGrade') || addChildForm.querySelector('select[name="childGrade"]');
      const allergiesInput = document.getElementById('newChildAllergies') || addChildForm.querySelector('textarea[name="childAllergies"]');
      const programSelect = document.getElementById('newChildProgram') || addChildForm.querySelector('select[name="childProgram"]');

      const name = nameInput ? nameInput.value.trim() : 'New Camper';
      const dob = dobInput ? dobInput.value : '2017-06-15';
      const grade = gradeInput ? gradeInput.value : '2nd Grade';
      const allergies = allergiesInput && allergiesInput.value.trim() ? allergiesInput.value.trim() : 'None reported';
      const activeCamp = programSelect ? programSelect.value : 'Junior STEM & Robotics';

      // Estimate age
      let age = 8;
      if (dob) {
        const birthYear = new Date(dob).getFullYear();
        if (!isNaN(birthYear)) age = Math.max(4, 2026 - birthYear);
      }

      const defaultAvatars = [
        'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=160&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=160&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
      ];
      const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

      const newChild = {
        id: 'CH-' + Math.floor(100 + Math.random() * 900),
        name,
        dob,
        age,
        grade,
        allergies,
        medications: 'None',
        dietary: 'Standard Chef Lunch',
        emergencyContact: 'Sarah Watson (Mother) - (555) 019-2834',
        doctor: 'Dr. Robert Chen ((555) 234-5678)',
        authorizedPickups: 'Sarah Watson (Mother), David Watson (Father)',
        avatar: randomAvatar,
        activeCamp,
        sessionDate: 'July 13 – July 17, 2026',
        status: 'Active Camper'
      };

      const children = JSON.parse(localStorage.getItem('campsphere_children') || '[]');
      children.push(newChild);
      localStorage.setItem('campsphere_children', JSON.stringify(children));

      notify(`${name} has been successfully registered to your family portal!`, 'success', 'Camper Registered');

      // Close modal
      const modalEl = document.getElementById('addChildModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }

      addChildForm.reset();
      updateCamperBadges();

      // Refresh list if on children.html
      setTimeout(() => {
        if (window.location.pathname.includes('children.html') || window.location.pathname.includes('dashboard.html')) {
          location.reload();
        }
      }, 1000);
    });
  }

  // 3.2 Delete / Remove Child Button Handlers
  document.querySelectorAll('.btn-delete-child').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const childCard = this.closest('.card-camp') || this.closest('.col-lg-6') || this.closest('tr');
      const childName = this.getAttribute('data-child-name') || 'Camper';

      if (confirm(`Are you sure you want to remove ${childName}'s profile from your account?`)) {
        if (childCard) {
          childCard.style.transition = 'all 0.3s ease';
          childCard.style.opacity = '0';
          childCard.style.transform = 'scale(0.9)';
          setTimeout(() => {
            childCard.remove();
            notify(`${childName}'s profile has been removed.`, 'warning', 'Camper Removed');
            updateCamperBadges();
          }, 300);
        }
      }
    });
  });

  // 3.3 Child Details Medical & Pickup Form Updaters
  const medicalForm = document.getElementById('childMedicalForm');
  if (medicalForm) {
    medicalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      notify('Medical information and dietary allergies saved securely.', 'success', 'Health Profile Updated');
    });
  }

  const pickupForm = document.getElementById('authorizedPickupForm');
  if (pickupForm) {
    pickupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      notify('Authorized dismissal and pickup guardians updated.', 'success', 'Pickups Updated');
    });
  }

  // ==========================================================================
  // 4. Enrollments Management (Filtering, Cancellation, Session Switching)
  // ==========================================================================
  
  // 4.1 Filter by Status & Child
  const statusFilterSelect = document.getElementById('enrollmentStatusFilter');
  const childFilterSelect = document.getElementById('enrollmentChildFilter');
  const enrollmentRows = document.querySelectorAll('.enrollment-row');

  function filterEnrollments() {
    const statusVal = statusFilterSelect ? statusFilterSelect.value.toLowerCase() : 'all';
    const childVal = childFilterSelect ? childFilterSelect.value.toLowerCase() : 'all';

    enrollmentRows.forEach(row => {
      const rowStatus = (row.getAttribute('data-status') || '').toLowerCase();
      const rowChild = (row.getAttribute('data-child') || '').toLowerCase();

      const matchesStatus = statusVal === 'all' || rowStatus.includes(statusVal);
      const matchesChild = childVal === 'all' || rowChild.includes(childVal);

      if (matchesStatus && matchesChild) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (statusFilterSelect) statusFilterSelect.addEventListener('change', filterEnrollments);
  if (childFilterSelect) childFilterSelect.addEventListener('change', filterEnrollments);

  // Status Filter Pill Buttons
  document.querySelectorAll('.enrollment-filter-pill').forEach(pill => {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.enrollment-filter-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      const filterType = this.getAttribute('data-filter') || 'all';
      enrollmentRows.forEach(row => {
        const rowStatus = (row.getAttribute('data-status') || '').toLowerCase();
        if (filterType === 'all' || rowStatus.includes(filterType.toLowerCase())) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 4.2 Live Table Search Filtering
  document.querySelectorAll('.table-search-input').forEach(input => {
    input.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      const targetTableId = this.getAttribute('data-target-table');
      const table = targetTableId ? document.getElementById(targetTableId) : this.closest('.card-camp')?.querySelector('table');
      if (table) {
        table.querySelectorAll('tbody tr').forEach(tr => {
          const text = tr.textContent.toLowerCase();
          tr.style.display = text.includes(q) ? '' : 'none';
        });
      }
    });
  });

  // 4.3 Cancel Enrollment Action
  document.querySelectorAll('.btn-cancel-enrollment').forEach(btn => {
    btn.addEventListener('click', function () {
      const enrollId = this.getAttribute('data-enroll-id') || 'Camp Session';
      if (confirm(`Are you sure you want to cancel enrollment ${enrollId}? 100% refundable up to 14 days before camp.`)) {
        const parentCard = this.closest('.enrollment-row') || this.closest('.card-camp') || this.closest('tr');
        if (parentCard) {
          const badge = parentCard.querySelector('.badge');
          if (badge) {
            badge.className = 'badge bg-secondary text-white';
            badge.textContent = 'Cancelled (Refund Processing)';
          }
          this.setAttribute('disabled', 'true');
          this.textContent = 'Cancelled';
          notify(`Enrollment ${enrollId} cancellation request processed. Full refund credited in 3-5 days.`, 'info', 'Enrollment Cancelled');
        }
      }
    });
  });

  // 4.3 Session Switch Request
  const sessionSwitchForm = document.getElementById('sessionSwitchForm');
  if (sessionSwitchForm) {
    sessionSwitchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newSession = document.getElementById('newSessionDateSelect')?.value || 'June 29 – July 3, 2026';
      notify(`Session transfer request submitted to Camp Registrar for ${newSession}. Confirmation sent via email.`, 'success', 'Session Switch Requested');

      const modalEl = document.getElementById('switchSessionModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }
    });
  }

  // ==========================================================================
  // 5. Weekly Schedule Interactivity (Day Tabs & Camper Switcher)
  // ==========================================================================
  
  // 5.1 Camper Schedule Switcher (Emma vs Lucas)
  document.querySelectorAll('.schedule-camper-tab').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.schedule-camper-tab').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline-secondary');
      });
      this.classList.remove('btn-outline-secondary');
      this.classList.add('active', 'btn-primary');

      const targetId = this.getAttribute('data-target');
      if (targetId) {
        document.querySelectorAll('#emmaScheduleCard, #lucasScheduleCard').forEach(card => {
          card.style.display = 'none';
        });
        const targetEl = document.querySelector(targetId);
        if (targetEl) targetEl.style.display = 'block';
      }
    });
  });

  const scheduleDayBtns = document.querySelectorAll('.schedule-day-tab-btn');
  const scheduleDayPanels = document.querySelectorAll('.schedule-day-panel');

  scheduleDayBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      scheduleDayBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const targetDay = this.getAttribute('data-day');
      scheduleDayPanels.forEach(panel => {
        if (panel.getAttribute('data-day') === targetDay || targetDay === 'all') {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 6. Payments, Invoices & Balance Settlement
  // ==========================================================================
  
  // 6.1 Pay Outstanding Balance Modal Form
  const payBalanceForm = document.getElementById('payBalanceModalForm') || document.getElementById('payBalanceForm');
  if (payBalanceForm) {
    payBalanceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountInput = document.getElementById('payAmountInput');
      const amount = amountInput ? amountInput.value : '$0.00';

      notify(`Payment of ${amount} processed successfully via Visa ****4829. Thank you!`, 'success', 'Payment Successful');

      // Update KPI balances
      document.querySelectorAll('.kpi-balance-val').forEach(el => {
        el.textContent = '$0.00';
      });

      const modalEl = document.getElementById('payBalanceModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }
    });
  }

  // 6.2 Add New Payment Card Modal Form
  const addCardForm = document.getElementById('addPaymentCardForm');
  if (addCardForm) {
    addCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cardNum = document.getElementById('newCardNumber')?.value || '4111222233334829';
      const last4 = cardNum.slice(-4) || '4829';

      notify(`Card ending in •••• ${last4} added to your account payment methods.`, 'success', 'Payment Method Added');

      const modalEl = document.getElementById('addCardModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }
      addCardForm.reset();
    });
  }

  // 6.3 Receipt & Statement Print/Download
  document.querySelectorAll('.btn-download-receipt, .btn-print-invoice, .btn-download-voucher').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc-name') || 'Camp Receipt';
      notify(`Preparing ${docName}. Generating printable PDF document...`, 'info', 'Document Download');
      setTimeout(() => {
        window.print();
      }, 1000);
    });
  });

  // ==========================================================================
  // 7. Live Multi-Thread Counselor & Staff Messaging
  // ==========================================================================
  const chatForm = document.getElementById('chatMessageForm');
  const chatMessagesContainer = document.getElementById('chatMessagesContainer');
  const chatInput = document.getElementById('chatMessageInput');
  const contactTabs = document.querySelectorAll('.chat-contact-item');
  const chatRecipientName = document.getElementById('chatRecipientName');
  const chatRecipientRole = document.getElementById('chatRecipientRole');
  const chatRecipientAvatar = document.getElementById('chatRecipientAvatar');

  const staffMockReplies = {
    counselor_jessica: {
      name: 'Counselor Jessica Vance',
      role: 'Head of STEM & Robotics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      replies: [
        "Emma did amazing today! She built her line-tracking rover and helped her team calibrate optical sensors.",
        "Yes, we have indoor air-conditioned robot arenas ready for Friday's showcase at 2:30 PM.",
        "Got it! I will make sure Emma keeps her water bottle full and checks in after lunch."
      ]
    },
    counselor_marcus: {
      name: 'Coach Marcus Hayes',
      role: 'Athletics & Camp Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      replies: [
        "Lucas had a fantastic morning on the soccer pitch! Scored 2 goals in the mini-tournament.",
        "Shin guards and camp jerseys are provided. Cleats or running sneakers are perfect for turf.",
        "Thanks for the heads up, Sarah! We will ensure he stays well hydrated before the afternoon relay."
      ]
    },
    nurse_adams: {
      name: 'Nurse Rachel Adams, RN',
      role: 'Camp Medical Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      replies: [
        "Hello Sarah! We have Emma's EpiPen logged in the air-conditioned nurse pavilion fridge with her action plan.",
        "All our kitchen and lunch staff are 100% briefed on her peanut allergy protocol. She will sit with her cohort at the nut-free table.",
        "Everything looks in order. Feel free to call our direct medical line anytime during camp hours."
      ]
    }
  };

  let activeContactKey = 'counselor_jessica';

  contactTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      contactTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const contactKey = this.getAttribute('data-contact') || 'counselor_jessica';
      activeContactKey = contactKey;
      const staff = staffMockReplies[contactKey] || staffMockReplies.counselor_jessica;

      if (chatRecipientName) chatRecipientName.textContent = staff.name;
      if (chatRecipientRole) chatRecipientRole.textContent = staff.role;
      if (chatRecipientAvatar) chatRecipientAvatar.src = staff.avatar;

      // Render welcome history
      if (chatMessagesContainer) {
        chatMessagesContainer.innerHTML = `
          <div class="text-center my-3"><small class="badge bg-light text-muted">Today's Camp Conversation</small></div>
          <div class="d-flex justify-content-start mb-3">
            <img src="${staff.avatar}" class="rounded-circle me-2 shadow-xs" style="width: 38px; height: 38px; object-fit: cover;">
            <div class="bg-light p-3 rounded-3 border" style="max-width: 75%; border-bottom-left-radius: 4px !important;">
              <div class="fw-bold small text-primary mb-1">${staff.name}</div>
              <p class="mb-1">Hello Sarah! How can I assist you with your camper today?</p>
              <div class="text-start small text-muted">8:45 AM</div>
            </div>
          </div>
        `;
      }
    });
  });

  if (chatForm && chatMessagesContainer && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const myMessageHtml = `
        <div class="d-flex justify-content-end mb-3">
          <div class="bg-primary text-white p-3 rounded-3 shadow-xs" style="max-width: 75%; border-bottom-right-radius: 4px !important;">
            <p class="mb-1">${text}</p>
            <div class="text-end small opacity-75">${now} <i class="bi bi-check-all ms-1"></i></div>
          </div>
        </div>
      `;

      chatMessagesContainer.insertAdjacentHTML('beforeend', myMessageHtml);
      chatInput.value = '';
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

      // Realistic automated reply from selected staff member
      setTimeout(() => {
        const staff = staffMockReplies[activeContactKey] || staffMockReplies.counselor_jessica;
        const randomReply = staff.replies[Math.floor(Math.random() * staff.replies.length)];

        const replyHtml = `
          <div class="d-flex justify-content-start mb-3">
            <img src="${staff.avatar}" class="rounded-circle me-2 shadow-xs" style="width: 38px; height: 38px; object-fit: cover;">
            <div class="bg-light p-3 rounded-3 border shadow-xs" style="max-width: 75%; border-bottom-left-radius: 4px !important;">
              <div class="fw-bold small text-primary mb-1">${staff.name}</div>
              <p class="mb-1">${randomReply}</p>
              <div class="text-start small text-muted">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', replyHtml);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        notify(`New reply from ${staff.name}`, 'info', 'Message Received');
      }, 1200);
    });
  }

  // ==========================================================================
  // 8. Profile, Active User Sync & Security PIN Management
  // ==========================================================================
  
  function getActiveUser() {
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem('campsphere_user_session') || 'null');
    } catch (e) {
      session = null;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
    } catch (e) {
      users = [];
    }

    let user = null;
    if (session && session.loggedIn) {
      user = users.find(u => u.id === session.id || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (!user) {
        user = {
          id: session.id || 'usr_session',
          firstName: session.firstName || (session.name ? session.name.split(' ')[0] : 'Parent'),
          lastName: session.lastName || (session.name && session.name.split(' ').length > 1 ? session.name.split(' ').slice(1).join(' ') : ''),
          name: session.name || 'Parent User',
          email: session.email || 'parent@campsphere.com',
          phone: session.phone || '(555) 019-2834',
          password: 'password123',
          address: '1204 Pine Vista Drive, Tahoe City, CA 96145',
          pickupPin: '8492',
          avatar: session.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80'
        };
      }
    } else {
      user = users.find(u => u.email === 'parent@campsphere.com') || {
        id: 'usr_demo_parent',
        firstName: 'Sarah',
        lastName: 'Watson',
        name: 'Sarah Watson',
        email: 'parent@campsphere.com',
        phone: '(555) 019-2834',
        password: 'parent12345',
        address: '4288 Meadow Pine Way, South Lake Tahoe, CA 96150',
        pickupPin: '8492',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80'
      };
    }
    return user;
  }

  function syncActiveUserToDashboard() {
    const user = getActiveUser();
    if (!user) return;

    const firstName = user.firstName || (user.name ? user.name.split(' ')[0] : 'Parent');
    const lastName = user.lastName || (user.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '');
    const fullName = user.name || `${firstName} ${lastName}`.trim();
    const email = user.email || 'parent@campsphere.com';
    const phone = user.phone || '(555) 019-2834';
    const avatar = user.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80';
    const pickupPin = user.pickupPin || '8492';

    // Update displays
    document.querySelectorAll('.user-display-name').forEach(el => el.textContent = fullName);
    document.querySelectorAll('.user-display-firstname').forEach(el => el.textContent = firstName);
    document.querySelectorAll('.user-display-email').forEach(el => el.textContent = email);
    document.querySelectorAll('.user-display-phone').forEach(el => el.textContent = phone);

    // Sidebar footer
    const sidebarAvatar = document.querySelector('.dashboard-sidebar .sidebar-footer img');
    if (sidebarAvatar) sidebarAvatar.src = avatar;
    const sidebarName = document.querySelector('.dashboard-sidebar .sidebar-footer strong');
    if (sidebarName) sidebarName.textContent = fullName;
    const sidebarEmail = document.querySelector('.dashboard-sidebar .sidebar-footer small');
    if (sidebarEmail) sidebarEmail.textContent = email;

    // Welcome hero banner
    const welcomeHeroName = document.querySelector('.dashboard-welcome-card .user-display-name');
    if (welcomeHeroName) welcomeHeroName.textContent = firstName;

    // PIN Display
    const pinDisplay = document.getElementById('pickupPinDisplay');
    if (pinDisplay) pinDisplay.textContent = pickupPin;

    // Profile form prefill
    const fnInput = document.getElementById('profileFirstName');
    const lnInput = document.getElementById('profileLastName');
    const emInput = document.getElementById('profileEmail');
    const phInput = document.getElementById('profilePhone');
    const addrInput = document.getElementById('profileAddress');

    if (fnInput && !fnInput.dataset.modified) fnInput.value = firstName;
    if (lnInput && !lnInput.dataset.modified) lnInput.value = lastName;
    if (emInput && !emInput.dataset.modified) emInput.value = email;
    if (phInput && !phInput.dataset.modified) phInput.value = phone;
    if (addrInput && !addrInput.dataset.modified && user.address) addrInput.value = user.address;
  }

  syncActiveUserToDashboard();

  // 8.1 Family / Guardian Profile Form
  const profileForm = document.getElementById('profileGuardianForm') || document.getElementById('familyProfileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fn = document.getElementById('profileFirstName')?.value.trim() || 'Sarah';
      const ln = document.getElementById('profileLastName')?.value.trim() || 'Watson';
      const em = document.getElementById('profileEmail')?.value.trim().toLowerCase() || 'parent@campsphere.com';
      const ph = document.getElementById('profilePhone')?.value.trim() || '(555) 019-2834';
      const addr = document.getElementById('profileAddress')?.value.trim() || '1204 Pine Vista Drive, Tahoe City, CA 96145';

      let users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
      let session = JSON.parse(localStorage.getItem('campsphere_user_session') || '{}');
      const activeId = localStorage.getItem('campsphere_active_user_id') || session.id;

      let matchedIndex = users.findIndex(u => u.id === activeId || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (matchedIndex === -1) {
        const newUser = {
          id: activeId || 'usr_' + Date.now(),
          firstName: fn,
          lastName: ln,
          name: `${fn} ${ln}`,
          email: em,
          phone: ph,
          address: addr,
          pickupPin: '8492',
          avatar: session.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80'
        };
        users.push(newUser);
      } else {
        users[matchedIndex].firstName = fn;
        users[matchedIndex].lastName = ln;
        users[matchedIndex].name = `${fn} ${ln}`;
        users[matchedIndex].email = em;
        users[matchedIndex].phone = ph;
        users[matchedIndex].address = addr;
      }
      localStorage.setItem('campsphere_registered_users', JSON.stringify(users));

      // Update session
      session.name = `${fn} ${ln}`;
      session.firstName = fn;
      session.lastName = ln;
      session.email = em;
      session.phone = ph;
      localStorage.setItem('campsphere_user_session', JSON.stringify(session));

      syncActiveUserToDashboard();
      notify('Guardian contact information and address updated successfully.', 'success', 'Profile Saved');
    });
  }

  // 8.2 Security & 4-Digit Camper Pickup PIN
  const pickupPinForm = document.getElementById('pickupPinForm');
  if (pickupPinForm) {
    pickupPinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pinInput = document.getElementById('camperPickupPinInput');
      const pin = pinInput ? pinInput.value.trim() : '';

      if (pin.length !== 4 || isNaN(pin)) {
        notify('Please enter a valid 4-digit numeric PIN.', 'warning', 'Invalid PIN');
        return;
      }

      let users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
      let session = JSON.parse(localStorage.getItem('campsphere_user_session') || '{}');
      const activeId = localStorage.getItem('campsphere_active_user_id') || session.id;

      let matchedUser = users.find(u => u.id === activeId || (u.email && session.email && u.email.toLowerCase() === session.email.toLowerCase()));
      if (matchedUser) {
        matchedUser.pickupPin = pin;
        localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
      }

      syncActiveUserToDashboard();
      notify(`Curbside camper pickup PIN updated to ${pin}. Show this PIN to counselors at dismissal.`, 'success', 'PIN Updated');
    });
  }

  // 8.3 Password Change Form
  const passwordChangeForm = document.getElementById('passwordChangeForm');
  if (passwordChangeForm) {
    passwordChangeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPass = document.getElementById('currentPasswordInput')?.value || '';
      const newPass = document.getElementById('newPasswordInput')?.value || '';
      const confirmPass = document.getElementById('confirmPasswordInput')?.value || '';

      const user = getActiveUser();

      if (user && user.password && currentPass && currentPass !== user.password) {
        notify('Current password does not match our records.', 'danger', 'Incorrect Password');
        return;
      }

      if (newPass.length < 6) {
        notify('New password must be at least 6 characters long.', 'danger', 'Weak Password');
        return;
      }

      if (newPass !== confirmPass) {
        notify('New password and confirm password do not match.', 'danger', 'Password Error');
        return;
      }

      let users = JSON.parse(localStorage.getItem('campsphere_registered_users') || '[]');
      let matchedUser = users.find(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
      if (matchedUser) {
        matchedUser.password = newPass;
        localStorage.setItem('campsphere_registered_users', JSON.stringify(users));
      }

      notify('Your account password has been updated securely.', 'success', 'Password Changed');
      passwordChangeForm.reset();
    });
  }

  // 8.4 Notification & 2FA Toggle Auto-Save
  document.querySelectorAll('.settings-toggle-switch').forEach(toggle => {
    toggle.addEventListener('change', function () {
      const settingName = this.getAttribute('data-setting-name') || 'Notification';
      const isEnabled = this.checked;
      notify(`${settingName} has been ${isEnabled ? 'enabled' : 'disabled'}.`, 'info', 'Preference Saved');
    });
  });
});
