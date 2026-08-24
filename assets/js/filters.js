/**
 * CampSphere - Filtering, Search & Wishlist Controller
 * assets/js/filters.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. Wishlist (Favorites) Management System
  // ========================================================================
  const WISHLIST_STORAGE_KEY = 'campsphere_wishlist';

  function getWishlist() {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(list) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function toggleWishlist(programId, programTitle = 'Camp Program') {
    if (!programId) return;
    let list = getWishlist();
    const index = list.indexOf(programId);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
      isAdded = false;
      if (window.showCampToast) {
        window.showCampToast(`"${programTitle}" was removed from your saved wishlist.`, 'info', 'Removed from Wishlist');
      }
    } else {
      list.push(programId);
      isAdded = true;
      if (window.showCampToast) {
        window.showCampToast(`"${programTitle}" has been saved to your wishlist!`, 'success', 'Added to Wishlist');
      }
    }

    saveWishlist(list);
    updateWishlistUI();

    // If currently filtering by wishlist, re-filter
    const activeCatBtn = document.querySelector('.filter-cat-btn.active');
    if (activeCatBtn && activeCatBtn.getAttribute('data-category') === 'wishlist') {
      filterPrograms();
    }
  }

  function removeFromWishlist(progId) {
    let list = getWishlist();
    const prog = (window.CAMPSPHERE_PROGRAMS && window.CAMPSPHERE_PROGRAMS[progId]) ? window.CAMPSPHERE_PROGRAMS[progId] : null;
    const title = prog ? prog.title : 'Program';
    const index = list.indexOf(progId);
    if (index > -1) {
      list.splice(index, 1);
      saveWishlist(list);
      updateWishlistUI();
      if (window.showCampToast) {
        window.showCampToast(`"${title}" was removed from your wishlist.`, 'info', 'Removed');
      }
    }
  }
  window.removeFromWishlist = removeFromWishlist;

  function clearAllWishlist() {
    if (confirm('Are you sure you want to clear all saved programs from your wishlist?')) {
      saveWishlist([]);
      updateWishlistUI();
      if (window.showCampToast) {
        window.showCampToast('Your wishlist has been cleared.', 'info', 'Wishlist Cleared');
      }
    }
  }
  window.clearAllWishlist = clearAllWishlist;

  function renderWishlistPage() {
    const gridContainer = document.getElementById('wishlistGridContainer');
    const emptyState = document.getElementById('wishlistEmptyState');
    const totalCountEl = document.getElementById('wishlistTotalCount');
    const clearBtn = document.getElementById('clearWishlistBtn');

    if (!gridContainer && !emptyState) return;

    const list = getWishlist();
    const count = list.length;

    if (totalCountEl) totalCountEl.textContent = count;

    if (count === 0) {
      if (gridContainer) gridContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'inline-block';

    if (gridContainer && window.CAMPSPHERE_PROGRAMS) {
      gridContainer.innerHTML = list.map(progId => {
        const prog = window.CAMPSPHERE_PROGRAMS[progId];
        if (!prog) return '';

        return `
          <div class="col-lg-4 col-md-6 program-card-item animate-fade-in" data-program-id="${prog.id}">
            <div class="program-card h-100">
              <div class="program-thumb position-relative">
                <img src="${prog.images && prog.images[0] ? prog.images[0] : 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600'}" alt="${prog.title}">
                <span class="badge-tag ${prog.badgeClass || 'badge-tag-primary'} program-badge">${prog.track || 'Camp'}</span>
                <span class="program-price-tag">$${prog.price} / wk</span>
              </div>
              <div class="program-body d-flex flex-column">
                <div class="program-meta mb-2">
                  <span><i class="bi bi-person-fill text-primary"></i> ${prog.age}</span>
                  <span><i class="bi bi-star-fill text-warning ms-2"></i> ${prog.rating || '4.9'}</span>
                </div>
                <h4 class="program-title"><a href="program-details.html?id=${prog.id}">${prog.title}</a></h4>
                <p class="program-desc flex-grow-1">${prog.desc}</p>
                <div class="d-flex gap-2 pt-3 border-top mt-auto">
                  <a href="program-details.html?id=${prog.id}" class="btn btn-outline-primary btn-sm flex-grow-1">
                    <i class="bi bi-eye me-1"></i> Details
                  </a>
                  <a href="enrollment.html?program=${prog.id}" class="btn btn-accent btn-sm flex-grow-1">
                    <i class="bi bi-check2-circle me-1"></i> Enroll
                  </a>
                  <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeFromWishlist('${prog.id}')" title="Remove from Wishlist" aria-label="Remove">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function updateWishlistUI() {
    const list = getWishlist();
    const count = list.length;

    // Update count badges
    document.querySelectorAll('.wishlist-count-badge, .wishlist-nav-count').forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.style.display = 'inline-block';
      }
    });

    // Update navbar wishlist button
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

    // Update program card wishlist buttons
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      const progId = btn.getAttribute('data-program-id');
      if (list.includes(progId)) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        btn.setAttribute('aria-label', 'Remove from Wishlist');
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i>';
        btn.setAttribute('aria-label', 'Add to Wishlist');
      }
    });

    // Update detail page wishlist buttons
    document.querySelectorAll('.btn-wishlist-detail').forEach(btn => {
      const progId = btn.getAttribute('data-program-id') || 'prog-1';
      if (list.includes(progId)) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        btn.setAttribute('title', 'Saved in Wishlist');
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i>';
        btn.setAttribute('title', 'Save to Wishlist');
      }
    });

    // Render wishlist page if on wishlist.html
    renderWishlistPage();
  }

  // Delegate click for wishlist buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-wishlist, .btn-wishlist-detail');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const progId = btn.getAttribute('data-program-id') || 'prog-1';
      const card = btn.closest('.program-card-item');
      const title = btn.getAttribute('data-program-title') || 
                    card?.querySelector('.program-title')?.textContent || 
                    document.querySelector('h1')?.textContent || 
                    'Camp Program';
      toggleWishlist(progId, title.trim());
    }
  });

  // Initial wishlist sync
  updateWishlistUI();

  // ========================================================================
  // 2. Programs Grid Filtering & Live Count
  // ========================================================================
  const programCards = document.querySelectorAll('.program-card-item');
  const categoryFilterBtns = document.querySelectorAll('.filter-cat-btn');
  const ageSelect = document.getElementById('filterAgeSelect');
  const searchInput = document.getElementById('programSearchInput');
  const sortSelect = document.getElementById('programSortSelect');
  const noResultsMsg = document.getElementById('noProgramsFound');
  const noProgramsSubtext = document.getElementById('noProgramsSubtext');
  const programCountEl = document.getElementById('programCountDisplay');

  function filterPrograms() {
    if (!programCards.length) return;

    const activeCatBtn = document.querySelector('.filter-cat-btn.active');
    const selectedCategory = activeCatBtn ? activeCatBtn.getAttribute('data-category') : 'all';
    const selectedAge = ageSelect ? ageSelect.value : 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const wishlist = getWishlist();

    let visibleCount = 0;

    programCards.forEach(card => {
      const cardId = card.getAttribute('data-program-id') || '';
      const cardCategory = card.getAttribute('data-category') || '';
      const cardAge = card.getAttribute('data-age') || '';
      const cardTitle = (card.querySelector('.program-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.program-desc')?.textContent || '').toLowerCase();

      let matchesCat = false;
      if (selectedCategory === 'all') {
        matchesCat = true;
      } else if (selectedCategory === 'wishlist') {
        matchesCat = wishlist.includes(cardId);
      } else {
        matchesCat = (cardCategory === selectedCategory);
      }

      const matchesAge = (selectedAge === 'all' || cardAge === selectedAge);
      const matchesSearch = (!searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery) || cardCategory.includes(searchQuery));

      if (matchesCat && matchesAge && matchesSearch) {
        card.style.display = 'block';
        card.classList.add('animate-fade-in');
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (programCountEl) {
      programCountEl.textContent = `${visibleCount} Programs Available`;
    }

    if (noResultsMsg) {
      if (visibleCount === 0) {
        noResultsMsg.style.display = 'block';
        if (selectedCategory === 'wishlist' && noProgramsSubtext) {
          noProgramsSubtext.textContent = 'You have not added any programs to your wishlist yet. Click the heart icon on any camp card to save it!';
        } else if (noProgramsSubtext) {
          noProgramsSubtext.textContent = 'Try adjusting your category filter, age selection, or search keywords.';
        }
      } else {
        noResultsMsg.style.display = 'none';
      }
    }
  }

  // Category filter button click
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      categoryFilterBtns.forEach(b => {
        b.classList.remove('active');
      });

      btn.classList.add('active');
      filterPrograms();
    });
  });

  if (ageSelect) ageSelect.addEventListener('change', filterPrograms);
  if (searchInput) searchInput.addEventListener('input', filterPrograms);

  // Clear Search Input Button
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterPrograms();
      searchInput.focus();
    });
  }

  // Reset Filters Link
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      if (ageSelect) ageSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'default';
      const allBtn = document.querySelector('.filter-cat-btn[data-category="all"]');
      if (allBtn) {
        categoryFilterBtns.forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
      }
      filterPrograms();
    });
  }

  // Grid / List View Mode Toggle
  const btnViewGrid = document.getElementById('btnViewGrid');
  const btnViewList = document.getElementById('btnViewList');
  const programsContainer = document.getElementById('programsContainer');

  if (btnViewGrid && btnViewList && programsContainer) {
    btnViewGrid.addEventListener('click', () => {
      btnViewGrid.classList.add('active');
      btnViewList.classList.remove('active');
      programsContainer.classList.remove('programs-list-mode');
      try { localStorage.setItem('campsphere_view_mode', 'grid'); } catch(e){}
    });

    btnViewList.addEventListener('click', () => {
      btnViewList.classList.add('active');
      btnViewGrid.classList.remove('active');
      programsContainer.classList.add('programs-list-mode');
      try { localStorage.setItem('campsphere_view_mode', 'list'); } catch(e){}
    });

    try {
      if (localStorage.getItem('campsphere_view_mode') === 'list') {
        btnViewList.click();
      }
    } catch(e){}
  }

  // URL Query Parameter Initial Filter (e.g. ?category=stem or ?filter=wishlist)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category') || (urlParams.get('filter') === 'wishlist' ? 'wishlist' : null);
    if (catParam) {
      const matchingBtn = document.querySelector(`.filter-cat-btn[data-category="${catParam}"]`);
      if (matchingBtn) matchingBtn.click();
    }
  } catch(e){}

  // Sorting
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const container = document.getElementById('programsContainer');
      if (!container) return;

      const cardsArray = Array.from(programCards);
      const val = sortSelect.value;

      cardsArray.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || 0);
        const priceB = parseFloat(b.getAttribute('data-price') || 0);
        const ratingA = parseFloat(a.getAttribute('data-rating') || 4.8);
        const ratingB = parseFloat(b.getAttribute('data-rating') || 4.8);
        const titleA = a.querySelector('.program-title')?.textContent || '';
        const titleB = b.querySelector('.program-title')?.textContent || '';

        if (val === 'price-low') return priceA - priceB;
        if (val === 'price-high') return priceB - priceA;
        if (val === 'rating-high') return ratingB - ratingA;
        if (val === 'name-asc') return titleA.localeCompare(titleB);
        return 0;
      });

      cardsArray.forEach(card => container.appendChild(card));
    });
  }

  // ========================================================================
  // 3. Blog Filtering & Search
  // ========================================================================
  function filterBlog() {
    const blogCards = document.querySelectorAll('.blog-card-item');
    if (!blogCards.length) return;

    const activeCatBtn = document.querySelector('.blog-cat-btn.active');
    const selectedCategory = activeCatBtn ? activeCatBtn.getAttribute('data-category') : 'all';
    const heroSearchInput = document.getElementById('blogHeroSearchInput');
    const sideSearchInput = document.getElementById('blogSearchInput');
    const searchQuery = (heroSearchInput ? heroSearchInput.value : (sideSearchInput ? sideSearchInput.value : '')).toLowerCase().trim();

    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardTitle = (card.querySelector('.blog-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.blog-body p')?.textContent || card.querySelector('p')?.textContent || '').toLowerCase();
      const cardMeta = (card.querySelector('.blog-meta')?.textContent || '').toLowerCase();

      const matchesCat = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = (!searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery) || cardMeta.includes(searchQuery) || cardCategory.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        card.style.setProperty('display', 'flex', 'important');
        visibleCount++;
      } else {
        card.style.setProperty('display', 'none', 'important');
      }
    });

    const noBlogFound = document.getElementById('noBlogFound');
    if (noBlogFound) {
      if (visibleCount === 0) {
        noBlogFound.classList.remove('d-none');
      } else {
        noBlogFound.classList.add('d-none');
      }
    }
  }

  window.filterBlog = filterBlog;

  window.setBlogSearch = function(term) {
    const heroSearch = document.getElementById('blogHeroSearchInput');
    const sideSearch = document.getElementById('blogSearchInput');
    if (heroSearch) heroSearch.value = term;
    if (sideSearch) sideSearch.value = term;
    
    // Reset category to "all" to allow global search
    const blogCatBtns = document.querySelectorAll('.blog-cat-btn');
    blogCatBtns.forEach(b => {
      if (b.getAttribute('data-category') === 'all') {
        b.classList.remove('btn-outline-primary');
        b.classList.add('active', 'btn-primary');
      } else {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline-primary');
      }
    });

    filterBlog();

    const grid = document.getElementById('blogGridContainer');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const blogCatBtns = document.querySelectorAll('.blog-cat-btn');
  blogCatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      blogCatBtns.forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline-primary');
      });
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('active', 'btn-primary');
      filterBlog();
    });
  });

  const heroSearch = document.getElementById('blogHeroSearchInput');
  const sideSearch = document.getElementById('blogSearchInput');
  const heroSearchBtn = document.getElementById('blogHeroSearchBtn');
  const sideSearchBtn = document.getElementById('blogSideSearchBtn');
  const resetBlogSearchBtn = document.getElementById('resetBlogSearchBtn');

  if (heroSearch) {
    heroSearch.addEventListener('input', (e) => {
      if (sideSearch) sideSearch.value = e.target.value;
      filterBlog();
    });
    heroSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterBlog();
        const grid = document.getElementById('blogGridContainer');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (sideSearch) {
    sideSearch.addEventListener('input', (e) => {
      if (heroSearch) heroSearch.value = e.target.value;
      filterBlog();
    });
    sideSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterBlog();
      }
    });
  }

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBlog();
      const grid = document.getElementById('blogGridContainer');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (sideSearchBtn) {
    sideSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBlog();
    });
  }

  if (resetBlogSearchBtn) {
    resetBlogSearchBtn.addEventListener('click', () => {
      if (heroSearch) heroSearch.value = '';
      if (sideSearch) sideSearch.value = '';
      window.setBlogSearch('');
    });
  }

  // ========================================================================
  // 4. Table Live Search (Parent & Admin Dashboards)
  // ========================================================================
  const tableSearchInputs = document.querySelectorAll('.table-search-input');
  tableSearchInputs.forEach(input => {
    const targetTableId = input.getAttribute('data-target-table');
    const table = document.getElementById(targetTableId);
    if (table) {
      input.addEventListener('input', () => {
        const term = input.value.toLowerCase().trim();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(term) ? '' : 'none';
        });
      });
    }
  });
});

