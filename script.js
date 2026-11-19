/* ===== 7SISTERSTOUR.COM — OPTIMIZED INTERACTIVE SCRIPT ===== */

const WA_NUMBER = '916000785570';

function openWhatsApp(message) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('DOMContentLoaded', () => {
  /* ── THEME TOGGLE (LIGHT DEFAULT FOR HIGH-TRUST TRAVEL FEEL) ── */
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('7st_theme') || 'light';

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('7st_theme', theme);
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  applyTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ── NAVBAR SCROLL & MOBILE MENU ── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 24);
    backToTop?.classList.toggle('visible', y > 420);
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── SERVICES DROPDOWN (KEYBOARD & CLICK SUPPORT) ── */
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    trigger?.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) return;
      if (trigger.tagName === 'BUTTON') {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  /* ── HERO SLIDER ── */
  const slides = document.querySelectorAll('.hero-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;

  if (slides.length > 1) {
    function showSlide(n) {
      slides[currentSlide]?.classList.remove('active');
      slideDots[currentSlide]?.classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide]?.classList.add('active');
      slideDots[currentSlide]?.classList.add('active');
    }

    let slideTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
    slideDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        clearInterval(slideTimer);
        slideTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
      });
    });
  }

  /* ── QUICK WHATSAPP TRIP FINDER BAR ── */
  const quickPlannerForm = document.getElementById('quickPlannerForm');
  quickPlannerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = document.getElementById('qpDestination')?.value || 'Northeast India';
    const service = document.getElementById('qpService')?.value || 'Tour Package';
    const dates = document.getElementById('qpDate')?.value?.trim() || 'Flexible dates';

    const msg =
      `*Quick Trip Quote Request — 7SistersTour.com*\n\n` +
      `*Destination:* ${dest}\n` +
      `*Service / Trip Type:* ${service}\n` +
      `*Preferred Dates:* ${dates}\n\n` +
      `Hi, please share the best itinerary and pricing on WhatsApp. Thank you!`;

    openWhatsApp(msg);
  });

  /* ── SERVICES CATEGORY FILTER ── */
  const svcFilters = document.querySelectorAll('.svc-filter-btn');
  const svcCards = document.querySelectorAll('.service-card[data-category]');

  svcFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      svcFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      svcCards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('hidden-item', !match);
      });
    });
  });

  /* ── GALLERY FILTER & LIGHTBOX (HOME + GALLERY PAGE) ── */
  const galFilters = document.querySelectorAll('.gal-filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  galFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      galFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const cats = (item.dataset.category || '').split(' ');
        const match = cat === 'all' || cats.includes(cat);
        item.classList.toggle('hidden-item', !match);
      });
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let visibleGallery = [];
  let activeLightboxIdx = 0;

  function updateLightbox() {
    const current = visibleGallery[activeLightboxIdx];
    if (!current || !lightboxImg) return;
    const img = current.querySelector('img');
    const title = current.dataset.caption || img?.alt || 'Northeast India Tour';
    lightboxImg.src = img?.src || '';
    lightboxImg.alt = title;
    if (lightboxCaption) {
      lightboxCaption.textContent = `${title} (${activeLightboxIdx + 1} / ${visibleGallery.length})`;
    }
  }

  function openLightboxFor(item) {
    visibleGallery = galleryItems.filter(el => !el.classList.contains('hidden-item'));
    activeLightboxIdx = Math.max(0, visibleGallery.indexOf(item));
    updateLightbox();
    lightbox?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightboxFor(item));
  });

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!visibleGallery.length) return;
    activeLightboxIdx = (activeLightboxIdx - 1 + visibleGallery.length) % visibleGallery.length;
    updateLightbox();
  });
  document.getElementById('lightboxNext')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!visibleGallery.length) return;
    activeLightboxIdx = (activeLightboxIdx + 1) % visibleGallery.length;
    updateLightbox();
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ── INTERACTIVE MAP DESTINATION SWITCHER ── */
  const mapTabs = document.querySelectorAll('.map-tab');
  const mapFrame = document.getElementById('mapFrame');
  const mapRouteTitle = document.getElementById('mapRouteTitle');
  const mapRouteDesc = document.getElementById('mapRouteDesc');
  const mapExternalLink = document.getElementById('mapExternalLink');
  const mapWaBtn = document.getElementById('mapWaBtn');

  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const query = tab.dataset.query;
      const zoom = tab.dataset.zoom || '10';
      const title = tab.dataset.title || '';
      const desc = tab.dataset.desc || '';

      if (mapFrame && query) {
        mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
        mapFrame.title = `Map of ${title}`;
      }
      if (mapRouteTitle) mapRouteTitle.textContent = title;
      if (mapRouteDesc) mapRouteDesc.textContent = desc;
      if (mapExternalLink && query) {
        mapExternalLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      }
      if (mapWaBtn) {
        mapWaBtn.onclick = () => {
          openWhatsApp(`*Route & Tour Inquiry — 7SistersTour.com*\n\nHi, I want to plan a trip covering *${title}*.\nPlease share itinerary, car options & best rates.`);
        };
      }
    });
  });

  /* ── FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.faq-q');
    qBtn?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        qBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── BLOG SEARCH & TAG FILTER ── */
  const blogSearch = document.getElementById('blogSearch');
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card[data-cat]');
  let activeBlogCat = 'all';

  function filterBlog() {
    const q = (blogSearch?.value || '').trim().toLowerCase();
    blogCards.forEach(card => {
      const cat = card.dataset.cat || '';
      const text = card.textContent.toLowerCase();
      const matchCat = activeBlogCat === 'all' || cat === activeBlogCat;
      const matchSearch = !q || text.includes(q);
      card.classList.toggle('hidden-item', !(matchCat && matchSearch));
    });
  }

  blogSearch?.addEventListener('input', filterBlog);
  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeBlogCat = btn.dataset.filter;
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterBlog();
    });
  });

  /* ── BOOKING MODAL & CHIPS ── */
  const bookingModal = document.getElementById('bookingModal');
  const insuranceToggle = document.getElementById('insuranceToggle');

  document.querySelectorAll('.traveler-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.traveler-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  document.querySelectorAll('.vehicle-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.vehicle-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  insuranceToggle?.addEventListener('click', () => {
    insuranceToggle.classList.toggle('on');
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) window.closeBookingModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      window.closeBookingModal?.();
    } else if (lightbox?.classList.contains('open')) {
      if (e.key === 'ArrowRight') document.getElementById('lightboxNext')?.click();
      if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev')?.click();
    }
  });

  /* ── BOOKING FORM SUBMIT → WHATSAPP ── */
  const bookingForm = document.getElementById('bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceLabel = bookingForm.dataset.serviceLabel || 'Travel Service';
    const serviceType = bookingForm.dataset.serviceType || 'tour';
    const name = document.getElementById('bookName')?.value?.trim();
    const phone = document.getElementById('bookPhone')?.value?.trim();
    const city = document.getElementById('bookAddress')?.value?.trim();
    const dates = document.getElementById('travelDates')?.value?.trim();
    const pax = document.getElementById('bookPax')?.value?.trim();
    const companyName = document.getElementById('companyName')?.value?.trim();
    const travelerType = document.querySelector('.traveler-opt.selected')?.dataset.type || 'Not specified';
    const vehicleType = document.querySelector('.vehicle-opt.selected')?.dataset.vehicle || 'Not specified';
    const insurance = insuranceToggle?.classList.contains('on') ? 'Yes' : 'No';

    let msg = `*New WhatsApp Booking — 7SistersTour.com*\n\n`;
    msg += `*Service:* ${serviceLabel}\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Phone:* ${phone}\n`;
    if (city) msg += `*City / Pickup:* ${city}\n`;
    if (pax) msg += `*No. of Travelers:* ${pax}\n`;

    if (serviceType === 'corporate') {
      if (companyName) msg += `*Company:* ${companyName}\n`;
      msg += `*Preferred Vehicle:* ${vehicleType}\n`;
    } else if (serviceType === 'room') {
      msg += `*Traveler Group:* ${travelerType}\n`;
    } else {
      msg += `*Traveler Group:* ${travelerType}\n`;
      msg += `*Preferred Vehicle:* ${vehicleType}\n`;
    }

    if (dates) msg += `*Travel Dates:* ${dates}\n`;
    msg += `*Travel Insurance:* ${insurance}\n`;
    msg += `\nPlease share availability, itinerary & best quote. Thank you!`;

    openWhatsApp(msg);
    window.closeBookingModal();
  });

  /* ── CONTACT FORM SUBMIT → WHATSAPP ── */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value?.trim();
    const phone = document.getElementById('contactPhone')?.value?.trim();
    const service = document.getElementById('contactService')?.value || '';
    const dates = document.getElementById('contactDates')?.value?.trim() || '';
    const message = document.getElementById('contactMessage')?.value?.trim();

    let msg = `*Contact Inquiry — 7SistersTour.com*\n\n*Name:* ${name}\n*Phone:* ${phone}`;
    if (service) msg += `\n*Service Interested:* ${service}`;
    if (dates) msg += `\n*Travel Dates:* ${dates}`;
    msg += `\n*Message:* ${message}`;

    openWhatsApp(msg);
    contactForm.reset();
  });

  /* ── SCROLL REVEAL (SAFE & FAST) ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
});

/* ===== GLOBAL WHATSAPP BOOKING HELPERS ===== */
window.openPackageBooking = function (packageName, duration, price) {
  const msg =
    `*Tour Package Booking — 7SistersTour.com*\n\n` +
    `*Package:* ${packageName}\n` +
    `*Duration:* ${duration}\n` +
    `*Starting Price:* ₹${price} /person\n\n` +
    `Hi, I want to book this package via WhatsApp. Please share:\n` +
    `• Day-wise itinerary\n` +
    `• Available dates & hotel options\n` +
    `• Best price for my group\n\nThank you!`;
  openWhatsApp(msg);
};

window.openBookingModal = function (type, customTitle) {
  const modal = document.getElementById('bookingModal');
  const form = document.getElementById('bookingForm');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const travelersGroup = document.getElementById('travelersGroup');
  const vehicleGroup = document.getElementById('vehicleGroup');
  const corporateFields = document.getElementById('corporateFields');
  const directWaLink = document.getElementById('modalDirectWa');

  const serviceMeta = {
    room: { title: 'Book Rooms & Homestays', sub: 'Verified hotels & cozy stays across Northeast India' },
    car: { title: 'Book Car / Taxi Rental', sub: 'Airport pickup & mountain-ready cabs with local drivers' },
    tour: { title: 'Book Custom Tour Package', sub: 'All-inclusive itineraries across all 7 Sisters states' },
    corporate: { title: 'Corporate Car Rental', sub: 'Executive fleet for business travel & corporate events' },
    couple: { title: 'Book Couple / Honeymoon Trip', sub: 'Romantic stays, private cab & scenic Northeast viewpoints', presetTraveler: 'Couples' },
    group: { title: 'Book Group Trip', sub: 'Friends, college & family groups with Tempo Traveller & group rates', presetTraveler: 'Friends / Group' },
    solo: { title: 'Book Solo Trip', sub: 'Safe, guided & budget-friendly solo Northeast adventures', presetTraveler: 'Solo' },
    mizoram: { title: 'Book Mizoram Trip', sub: 'Aizawl, Reiek, Vantawng Falls & Tam Dil with ILP assistance' }
  };

  const info = serviceMeta[type] || { title: customTitle || 'Book Travel Service', sub: 'Share your details to continue instantly on WhatsApp' };
  const finalTitle = customTitle || info.title;

  if (!modal) {
    openWhatsApp(`*Service Booking — 7SistersTour.com*\n\nHi, I want to book *${finalTitle}*. Please share details and pricing.`);
    return;
  }

  if (form) {
    form.dataset.serviceType = type;
    form.dataset.serviceLabel = finalTitle;
  }
  if (modalTitle) modalTitle.textContent = finalTitle;
  if (modalSub) modalSub.textContent = info.sub;

  if (directWaLink) {
    directWaLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi 7 Sisters Tour, I want to enquire about ${finalTitle}.`)}`;
  }

  // Toggle conditional groups
  if (travelersGroup) travelersGroup.style.display = type === 'corporate' ? 'none' : 'block';
  if (vehicleGroup) vehicleGroup.style.display = type === 'room' ? 'none' : 'block';
  if (corporateFields) corporateFields.style.display = type === 'corporate' ? 'block' : 'none';

  // Reset and pre-select smart traveler chip
  document.querySelectorAll('.traveler-opt, .vehicle-opt').forEach(el => el.classList.remove('selected'));
  if (info.presetTraveler) {
    const match = document.querySelector(`.traveler-opt[data-type="${info.presetTraveler}"]`);
    match?.classList.add('selected');
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeBookingModal = function () {
  const modal = document.getElementById('bookingModal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('bookingForm')?.reset();
  document.querySelectorAll('.traveler-opt, .vehicle-opt').forEach(el => el.classList.remove('selected'));
  document.getElementById('insuranceToggle')?.classList.remove('on');
};
