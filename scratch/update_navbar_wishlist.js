const fs = require('fs');
const path = require('path');

const publicFiles = [
  'index.html',
  'home-2.html',
  'about.html',
  'programs.html',
  'program-details.html',
  'wishlist.html',
  'age-groups.html',
  'schedule.html',
  'calendar.html',
  'camp-match.html',
  'safety.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'faq.html',
  'contact.html',
  'enrollment.html',
  'enrollment-success.html',
  '404.html',
  'coming-soon.html',
  'maintenance.html'
];

const wishlistBtnHtml = `<a href="wishlist.html" class="nav-wishlist-btn" aria-label="View Wishlist" title="Saved Wishlist">
            <i class="bi bi-heart"></i> <span class="wishlist-label">Wishlist</span> <span class="wishlist-nav-count badge bg-danger text-white">0</span>
          </a>`;

publicFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Check if nav-wishlist-btn is already present
  if (!content.includes('nav-wishlist-btn') && content.includes('theme-toggle-btn')) {
    // Insert before theme-toggle-btn inside the navbar right side div
    content = content.replace(/(<button\s+type="button"\s+class="theme-toggle-btn")/i, `${wishlistBtnHtml}\n          $1`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Added wishlist button to navbar in: ${file}`);
  } else {
    console.log(`Already has wishlist or skipped: ${file}`);
  }
});
