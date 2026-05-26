// ===== 7 SISTERS TOURS — MAIN JAVASCRIPT =====

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle?.querySelector('i');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const slideDots = document.querySelectorAll('.slide-dot');

function showSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  slideDots.forEach(d => d.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  slideDots[currentSlide]?.classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Manual slide control
slideDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  });
});

// Testimonial Slider
let currentTesti = 0;
const testiTrack = document.querySelector('.testi-track');
const testiCards = document.querySelectorAll('.testi-card');
const testiDots = document.querySelectorAll('.testi-dot');

function showTesti(n) {
  testiDots.forEach(d => d.classList.remove('active'));
  currentTesti = (n + testiCards.length) % testiCards.length;
  if (testiTrack) testiTrack.style.transform = `translateX(-${currentTesti * 100}%)`;
  testiDots[currentTesti]?.classList.add('active');
}

function nextTesti() {
  showTesti(currentTesti + 1);
}

// Auto slide testimonials every 6 seconds
let testiInterval = setInterval(nextTesti, 6000);

testiDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showTesti(i);
    clearInterval(testiInterval);
    testiInterval = setInterval(nextTesti, 6000);
  });
});

// Gallery Tabs
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryPanels = document.querySelectorAll('.gallery-panel');

galleryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    galleryTabs.forEach(t => t.classList.remove('active'));
    galleryPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(target);
    panel?.classList.add('active');
    
    if (target === 'videos') {
      const firstVideo = panel?.querySelector('iframe');
      if (firstVideo) {
        const src = firstVideo.src;
        if (!src.includes('autoplay')) {
          firstVideo.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
        }
      }
    }
  });
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.gallery-item img');
let currentImageIndex = 0;
let galleryImagesArray = [];

galleryItems.forEach((item, index) => {
  galleryImagesArray.push(item.src);
  item.addEventListener('click', () => {
    currentImageIndex = index;
    lightbox?.classList.add('open');
    if (lightboxImg) lightboxImg.src = item.src;
    startLightboxSlideshow();
  });
});

let lightboxInterval;
function startLightboxSlideshow() {
  clearInterval(lightboxInterval);
  lightboxInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImagesArray.length;
    if (lightboxImg) lightboxImg.src = galleryImagesArray[currentImageIndex];
  }, 3000);
}

function closeLightbox() {
  lightbox?.classList.remove('open');
  clearInterval(lightboxInterval);
}

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-q');
  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Booking Modal
let currentBookingType = '';
const bookingModal = document.getElementById('bookingModal');
const modalTitle = document.getElementById('modalTitle');
const travelersGroup = document.getElementById('travelersGroup');
const vehicleGroup = document.getElementById('vehicleGroup');
const corporateFields = document.getElementById('corporateFields');

function openBookingModal(type) {
  currentBookingType = type;
  bookingModal?.classList.add('open');
  
  const titles = {
    room: 'Book Your Room',
    car: 'Book Your Car',
    tour: 'Book Tour Package',
    corporate: 'Corporate Car Rental'
  };
  
  if (modalTitle) modalTitle.textContent = titles[type] || 'Book Service';
  
  // Show/hide fields based on type
  if (type === 'corporate') {
    travelersGroup.style.display = 'none';
    vehicleGroup.style.display = 'block';
    corporateFields.style.display = 'block';
  } else if (type === 'room') {
    travelersGroup.style.display = 'block';
    vehicleGroup.style.display = 'none';
    corporateFields.style.display = 'none';
  } else {
    travelersGroup.style.display = 'block';
    vehicleGroup.style.display = 'block';
    corporateFields.style.display = 'none';
  }
}

function closeBookingModal() {
  bookingModal?.classList.remove('open');
  document.getElementById('bookingForm')?.reset();
  document.querySelectorAll('.traveler-opt, .vehicle-opt').forEach(el => el.classList.remove('selected'));
  document.getElementById('insuranceToggle')?.classList.remove('on');
}

bookingModal?.addEventListener('click', (e) => {
  if (e.target === bookingModal) closeBookingModal();
});

// Traveler Type Selection
document.querySelectorAll('.traveler-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.traveler-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// Vehicle Selection
document.querySelectorAll('.vehicle-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.vehicle-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// Insurance Toggle
const insuranceToggle = document.getElementById('insuranceToggle');
insuranceToggle?.addEventListener('click', () => {
  insuranceToggle.classList.toggle('on');
});

// Booking Form Submit
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('bookName')?.value;
  const phone = document.getElementById('bookPhone')?.value;
  const address = document.getElementById('bookAddress')?.value;
  const dates = document.getElementById('travelDates')?.value;
  const companyName = document.getElementById('companyName')?.value;
  
  const travelerType = document.querySelector('.traveler-opt.selected')?.dataset.type || 'Not specified';
  const vehicleType = document.querySelector('.vehicle-opt.selected')?.dataset.vehicle || 'Not specified';
  const insurance = insuranceToggle?.classList.contains('on') ? 'Yes' : 'No';
  
  let message = `*New Booking Request*\n\n`;
  message += `*Service:* ${currentBookingType.toUpperCase()}\n`;
  message += `*Name:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Address:* ${address}\n`;
  
  if (currentBookingType === 'corporate') {
    message += `*Company:* ${companyName}\n`;
    message += `*Vehicle:* ${vehicleType}\n`;
  } else if (currentBookingType === 'room') {
    message += `*Travelers:* ${travelerType}\n`;
  } else {
    message += `*Travelers:* ${travelerType}\n`;
    message += `*Vehicle:* ${vehicleType}\n`;
  }
  
  if (dates) message += `*Travel Dates:* ${dates}\n`;
  message += `*Travel Insurance:* ${insurance}\n`;
  message += `\nPlease confirm availability and pricing.`;
  
  const whatsappURL = `https://wa.me/916000785570?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
  closeBookingModal();
});

// Contact Form Submit
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('contactName')?.value;
  const phone = document.getElementById('contactPhone')?.value;
  const email = document.getElementById('contactEmail')?.value;
  const service = document.getElementById('contactService')?.value;
  const message = document.getElementById('contactMessage')?.value;
  
  let whatsappMsg = `*Contact Form Submission*\n\n*Name:* ${name}\n*Phone:* ${phone}`;
  if (email) whatsappMsg += `\n*Email:* ${email}`;
  if (service) whatsappMsg += `\n*Service Interested:* ${service}`;
  whatsappMsg += `\n*Message:* ${message}`;
  
  const whatsappURL = `https://wa.me/916000785570?text=${encodeURIComponent(whatsappMsg)}`;
  window.open(whatsappURL, '_blank');
  e.target.reset();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop?.classList.add('visible');
  else backToTop?.classList.remove('visible');
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPos = target.offsetTop - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  });
});

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1500);
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
});

// Package Booking Function
function openPackageBooking(packageName, price) {
  const message = `*Tour Package Inquiry*\n\n*Package:* ${packageName}\n*Price:* ₹${price} per person\n\nHi, I'm interested in booking this package. Please share more details about:\n- Available dates\n- Itinerary\n- Group discounts\n- Payment terms\n\nThank you!`;
  const whatsappURL = `https://wa.me/916000785570?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}
