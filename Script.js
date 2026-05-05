// 1. NAVBAR — scroll effect & active link
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
/** Updates navbar style when user scrolls past 60px */
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/** Highlights the nav link matching the section currently in view */
function updateActiveNavLink() {
  let currentSection = '';

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Attach scroll listeners
window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', updateActiveNavLink);

// Run once on load
handleNavbarScroll();
updateActiveNavLink();

// 2. HAMBURGER MENU (Mobile)
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
var mobileLinks = document.querySelectorAll('.mobile-link');

// Toggle the menu open or closed when button is clicked
hamburger.addEventListener('click', function () {
  // Check if menu is currently open
  if (mobileMenu.classList.contains('open')) {
    // It's open — close it
    mobileMenu.classList.remove('open');
    hamburger.textContent = '☰'; // show menu icon
  } else {
    // It's closed — open it
    mobileMenu.classList.add('open');
    hamburger.textContent = '✕'; // show close icon
  }
});

// Close the menu when any link inside is clicked
mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// 3. SMOOTH SCROLL for all anchor links

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 4. SKILL BARS — animate on scroll into view

var skillFills = document.querySelectorAll('.skill-fill');

/**
 * Uses IntersectionObserver to animate skill bars
 * when the about section scrolls into view
 */
var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      skillFills.forEach(function (bar) {
        var targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
      });
      // Stop observing once animated
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

var aboutSection = document.getElementById('about');
if (aboutSection) {
  skillObserver.observe(aboutSection);
}
// 5. SCROLL REVEAL — fade sections into view

var revealElements = document.querySelectorAll(
  '.project-card, .contact-card, .timeline-item, .work-item, .exp-card'
);

// Set initial styles for reveal elements
revealElements.forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

/** Observes elements and reveals them with a stagger delay */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, index) {
    if (entry.isIntersecting) {
      // Stagger delay based on element index within its parent
      var siblings = entry.target.parentElement.children;
      var siblingIndex = Array.prototype.indexOf.call(siblings, entry.target);
      var delay = siblingIndex * 80;

      setTimeout(function () {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});

// 7. BACK TO TOP — smooth scroll

var backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 8. DYNAMIC YEAR in footer copyright

var yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
  var currentYear = new Date().getFullYear();
  yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
}
