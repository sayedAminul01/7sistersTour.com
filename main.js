/* ===== 7 SISTERS TOUR — MAIN JAVASCRIPT ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader?.classList.add('hidden'), 2000);

  /* ── THEME TOGGLE ── */
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    const icon = t === 'dark' ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = icon;
    if (mobileThemeToggle) mobileThemeToggle.textContent = icon + ' Toggle Theme';
    localStorage.setItem('theme', t);
    theme = t;
  }
  applyTheme(theme);
  themeToggle?.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
  mobileThemeToggle?.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

  /* ── NAVBAR ── */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
    const btt = document.getElementById('back-to-top');
    btt?.classList.toggle('visible', window.scrollY > 400);
  });

  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(s => {
      if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + s.id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  /* ── HERO SLIDER ── */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;

  function goToSlide(idx) {
    heroSlides[currentSlide]?.classList.remove('active');
    slideDots[currentSlide]?.classList.remove('active');
    currentSlide = (idx + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide]?.classList.add('active');
    slideDots[currentSlide]?.classList.add('active');
  }

  if (heroSlides.length) {
    heroSlides[0].classList.add('active');
    slideDots[0]?.classList.add('active');
    const slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    slideDots.forEach((dot, i) => dot.addEventListener('click', () => {
      clearInterval(slideInterval); goToSlide(i);
    }));
  }

  /* ── TESTIMONIALS SLIDER ── */
  const testiTrack = document.getElementById('testiTrack');
  const testiDots = document.querySelectorAll('.testi-dot');
  let currentTesti = 0;

  function goToTesti(idx) {
    const total = testiDots.length;
    currentTesti = (idx + total) % total;
    if (testiTrack) testiTrack.style.transform = `translateX(-${currentTesti * 100}%)`;
    testiDots.forEach((d, i) => d.classList.toggle('active', i === currentTesti));
  }

  testiDots.forEach((d, i) => d.addEventListener('click', () => goToTesti(i)));
  if (testiDots.length) {
    goToTesti(0);
    setInterval(() => goToTesti(currentTesti + 1), 4500);
  }

  /* ── GALLERY TABS ── */
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryPanels = document.querySelectorAll('.gallery-panel');
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      galleryTabs.forEach(t => t.classList.remove('active'));
      galleryPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('gallery-' + target)?.classList.add('active');
    });
  });

  /* ── LIGHTBOX ── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      if (lightbox && lightboxImg && src) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
      }
    });
  });
  document.getElementById('lightboxClose')?.addEventListener('click', () => lightbox?.classList.remove('open'));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  /* ── FAQ ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── BOOKING MODAL ── */
  let selectedService = '';
  let selectedTravelers = [];
  let selectedVehicle = '';
  let insuranceOn = false;

  const modal = document.getElementById('bookingModal');
  const corpModal = document.getElementById('corpModal');

  // Open regular booking modal
  window.openBooking = function(service) {
    selectedService = service || 'Travel Package';
    selectedTravelers = [];
    selectedVehicle = '';
    insuranceOn = false;
    document.getElementById('modalTitle').textContent = 'Book: ' + selectedService;

    // Reset selections
    document.querySelectorAll('.traveler-opt').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.vehicle-opt').forEach(el => el.classList.remove('selected'));
    const insEl = document.getElementById('insuranceToggle');
    if (insEl) { insEl.classList.remove('on'); insuranceOn = false; }

    modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.openCorpBooking = function() {
    corpModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal(m) {
    m?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('closeModal')?.addEventListener('click', () => closeModal(modal));
  document.getElementById('closeCorpModal')?.addEventListener('click', () => closeModal(corpModal));
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
  corpModal?.addEventListener('click', e => { if (e.target === corpModal) closeModal(corpModal); });

  // Traveler type selection
  document.querySelectorAll('.traveler-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const type = opt.dataset.type;
      if (opt.classList.contains('selected')) {
        if (!selectedTravelers.includes(type)) selectedTravelers.push(type);
      } else {
        selectedTravelers = selectedTravelers.filter(t => t !== type);
      }
    });
  });

  // Vehicle selection
  document.querySelectorAll('.vehicle-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.vehicle-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedVehicle = opt.dataset.vehicle;
    });
  });

  // Insurance toggle
  const insEl = document.getElementById('insuranceToggle');
  insEl?.addEventListener('click', () => {
    insuranceOn = !insuranceOn;
    insEl.classList.toggle('on', insuranceOn);
  });

  // Submit booking to WhatsApp
  document.getElementById('bookingForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('bName').value.trim();
    const phone = document.getElementById('bPhone').value.trim();
    const address = document.getElementById('bAddress').value.trim();
    const count = document.getElementById('bCount').value.trim();
    const note = document.getElementById('bNote').value.trim();

    if (!name || !phone) { alert('Please fill in your name and phone number.'); return; }

    const wa = '917002XXXXXX'; // Replace with actual WhatsApp number
    const travelersStr = selectedTravelers.length ? selectedTravelers.join(', ') : 'Not specified';
    const vehicleStr = selectedVehicle || 'Not specified';
    const insuranceStr = insuranceOn ? '✅ Yes, interested in travel insurance' : '❌ No insurance needed';

    const msg = `🏔️ *7 SISTERS TOUR — BOOKING REQUEST*

📋 *Service:* ${selectedService}
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}
👥 *Travelers:* ${count} (${travelersStr})
🚗 *Vehicle:* ${vehicleStr}
🛡️ *Insurance:* ${insuranceStr}
📝 *Notes:* ${note || 'None'}

Please confirm availability. Thank you! 🙏`;

    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal(modal);
  });

  // Corporate booking submit
  document.getElementById('corpForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const company = document.getElementById('cCompany').value.trim();
    const contact = document.getElementById('cContact').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const pax = document.getElementById('cPax').value.trim();
    const route = document.getElementById('cRoute').value.trim();
    const dates = document.getElementById('cDates').value.trim();
    const vehicle = document.getElementById('cVehicle').value;
    const notes = document.getElementById('cNotes').value.trim();

    if (!company || !contact || !phone) { alert('Please fill required fields.'); return; }

    const wa = '917002XXXXXX'; // Replace with actual WhatsApp number
    const msg = `🏢 *7 SISTERS TOUR — CORPORATE BOOKING REQUEST*

🏢 *Company:* ${company}
👤 *Contact Person:* ${contact}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
👥 *No. of Passengers:* ${pax}
🗺️ *Route/Destination:* ${route}
📅 *Travel Dates:* ${dates}
🚗 *Vehicle Preference:* ${vehicle}
📝 *Special Requirements:* ${notes || 'None'}

Please provide a corporate quote. Thank you!`;

    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal(corpModal);
  });

  // WhatsApp contact form
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('ctName').value.trim();
    const phone = document.getElementById('ctPhone').value.trim();
    const msg = document.getElementById('ctMsg').value.trim();
    if (!name || !phone || !msg) { alert('Please fill all fields.'); return; }
    const wa = '917002XXXXXX';
    const text = `Hello 7 Sisters Tour! 👋\n\n*Name:* ${name}\n*Phone:* ${phone}\n\n*Message:*\n${msg}`;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
    e.target.reset();
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── BACK TO TOP ── */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const counterObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateCounters(); counterObs.disconnect(); }
    }, { threshold: 0.3 });
    counterObs.observe(heroSection);
  }

});