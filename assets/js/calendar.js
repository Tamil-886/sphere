/**
 * CampSphere - Interactive Summer Camp Calendar
 * assets/js/calendar.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const calendarContainer = document.getElementById('campCalendarRoot');
  if (!calendarContainer) return;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  let currentYear = 2026;
  let currentMonth = 5; // June 2026 (0-indexed)

  const campEvents = [
    { day: 1, month: 5, year: 2026, title: 'Camp Orientation & Open House', category: 'General', time: '10:00 AM - 1:00 PM', color: 'primary', age: 'All Ages', desc: 'Meet camp counselors, take a campus tour, and pick up welcome kits.' },
    { day: 8, month: 5, year: 2026, title: 'Summer Sports League Kickoff', category: 'Sports', time: '8:30 AM - 3:30 PM', color: 'accent', age: 'Ages 7-12', desc: 'Soccer, basketball tournaments, and relay games.' },
    { day: 15, month: 5, year: 2026, title: 'Junior Robotics & Coding Camp', category: 'STEM', time: '9:00 AM - 3:00 PM', color: 'secondary', age: 'Ages 8-14', desc: 'Hands-on LEGO robotics building and Python basics.' },
    { day: 18, month: 5, year: 2026, title: 'Splash & Swim Water Safari', category: 'Aquatics', time: '1:00 PM - 4:00 PM', color: 'info', age: 'Ages 5-10', desc: 'Supervised pool races, water polo drills, and water safety.' },
    { day: 22, month: 5, year: 2026, title: 'Nature Explorers Survival Camp', category: 'Nature', time: '8:30 AM - 4:00 PM', color: 'success', age: 'Ages 7-14', desc: 'Wilderness navigation, shelter building, and botanical identification.' },
    { day: 29, month: 5, year: 2026, title: 'Little Picassos Art Studio', category: 'Arts', time: '9:30 AM - 2:30 PM', color: 'warning', age: 'Ages 4-8', desc: 'Clay pottery sculpting, acrylic canvas painting, and tie-dye craft.' },
    { day: 6, month: 6, year: 2026, title: 'Musical Theater & Dance Showcase', category: 'Arts', time: '9:00 AM - 3:30 PM', color: 'warning', age: 'Ages 6-13', desc: 'Broadway vocal coaching and choreography rehearsal.' },
    { day: 13, month: 6, year: 2026, title: 'Wilderness High-Ropes Challenge', category: 'Adventure', time: '8:00 AM - 5:00 PM', color: 'accent', age: 'Ages 11-16', desc: 'Zipline adventures, rock climbing wall, and team trust courses.' }
  ];

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `
      <div class="card-camp shadow-sm">
        <div class="card-camp-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h4 class="mb-0 fw-bold">${monthNames[month]} ${year}</h4>
            <small class="text-muted">Summer 2026 Season Schedule</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-primary" id="calPrevMonthBtn"><i class="bi bi-chevron-left"></i> Prev</button>
            <button class="btn btn-sm btn-primary" id="calTodayBtn">Today</button>
            <button class="btn btn-sm btn-outline-primary" id="calNextMonthBtn">Next <i class="bi bi-chevron-right"></i></button>
          </div>
        </div>
        <div class="card-camp-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered mb-0 text-center" style="table-layout: fixed;">
              <thead class="bg-light-blue">
                <tr>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Sun</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Mon</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Tue</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Wed</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Thu</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Fri</th>
                  <th class="py-3 text-muted fw-bold" style="width: 14.28%;">Sat</th>
                </tr>
              </thead>
              <tbody>
    `;

    let dayCount = 1;
    for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          html += '<td class="bg-light text-muted p-2" style="height: 110px; opacity: 0.3;"></td>';
        } else if (dayCount > daysInMonth) {
          html += '<td class="bg-light text-muted p-2" style="height: 110px; opacity: 0.3;"></td>';
        } else {
          const matchingEvents = campEvents.filter(e => e.day === dayCount && e.month === month && e.year === year);
          const isToday = (dayCount === 15 && month === 5 && year === 2026);

          html += `
            <td class="p-2 align-top text-start position-relative ${isToday ? 'bg-primary-light' : ''}" style="height: 110px;">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold ${isToday ? 'badge bg-primary text-white rounded-circle p-1' : 'text-dark'}">${dayCount}</span>
              </div>
              <div class="calendar-event-pills d-flex flex-column gap-1">
          `;

          matchingEvents.forEach((ev, idx) => {
            html += `
              <div class="badge bg-${ev.color} text-truncate text-start p-1 cursor-pointer w-100 cal-event-pill" 
                   data-event-idx="${idx}" 
                   data-title="${ev.title}"
                   data-cat="${ev.category}"
                   data-time="${ev.time}"
                   data-age="${ev.age}"
                   data-desc="${ev.desc}"
                   style="cursor: pointer; font-size: 0.72rem;">
                <i class="bi bi-clock me-1"></i> ${ev.title}
              </div>
            `;
          });

          html += `
              </div>
            </td>
          `;
          dayCount++;
        }
      }
      html += '</tr>';
      if (dayCount > daysInMonth) break;
    }

    html += `
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    calendarContainer.innerHTML = html;

    // Attach button events
    document.getElementById('calPrevMonthBtn')?.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('calNextMonthBtn')?.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('calTodayBtn')?.addEventListener('click', () => {
      currentMonth = 5;
      currentYear = 2026;
      renderCalendar(currentMonth, currentYear);
    });

    // Event pill clicks to show modal / toast details
    document.querySelectorAll('.cal-event-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const title = pill.getAttribute('data-title');
        const cat = pill.getAttribute('data-cat');
        const time = pill.getAttribute('data-time');
        const age = pill.getAttribute('data-age');
        const desc = pill.getAttribute('data-desc');

        const modalHtml = `
          <div class="modal fade" id="eventDetailModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title fw-bold"><i class="bi bi-calendar-check text-primary me-2"></i> ${title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <span class="badge bg-primary-light text-primary">${cat}</span>
                    <span class="badge bg-secondary-light text-secondary">${age}</span>
                    <span class="badge bg-accent-light text-accent"><i class="bi bi-clock me-1"></i> ${time}</span>
                  </div>
                  <p class="text-muted mb-3">${desc}</p>
                  <div class="alert alert-info py-2 small mb-0">
                    <i class="bi bi-info-circle me-1"></i> Space is limited to 20 campers per cohort. Pre-registration required.
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                  <a href="enrollment.html" class="btn btn-sm btn-primary">Enroll in this Camp</a>
                </div>
              </div>
            </div>
          </div>
        `;

        // Remove previous modal if exists
        document.getElementById('eventDetailModal')?.remove();
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        if (typeof bootstrap !== 'undefined') {
          const modalInstance = new bootstrap.Modal(document.getElementById('eventDetailModal'));
          modalInstance.show();
        }
      });
    });
  }

  renderCalendar(currentMonth, currentYear);
});
