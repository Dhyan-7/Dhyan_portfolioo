/* ============================================
   DHYAN A — Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Loading Screen ──
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1200);
    });
    // Fallback in case load event already fired
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2500);
  }

  // ── Custom Cursor ──
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX - 4 + 'px';
      cursorDot.style.top = mouseY - 4 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX - 20 + 'px';
      cursorRing.style.top = ringY - 20 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .cert-card, .activity-card, .stat-box, .contact-item, .timeline-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Mobile Menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function setActiveLink(links) {
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  setActiveLink(navLinks);
  setActiveLink(mobileLinks);

  // ── Smooth Page Transitions ──
  const pageLinks = document.querySelectorAll('a[href$=".html"]');
  const transition = document.querySelector('.page-transition');

  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
        e.preventDefault();
        if (transition) {
          transition.style.transformOrigin = 'bottom';
          transition.style.transform = 'scaleY(1)';
          transition.style.transition = 'transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        } else {
          window.location.href = href;
        }
      }
    });
  });

  // Page enter animation
  if (transition) {
    transition.style.transformOrigin = 'top';
    transition.style.transform = 'scaleY(1)';
    setTimeout(() => {
      transition.style.transition = 'transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
      transition.style.transform = 'scaleY(0)';
    }, 100);
  }

  // ── Parallax Effect ──
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ── Magnetic Button Effect ──
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
  if (window.innerWidth > 768) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const value = target.getAttribute('data-count');
        const suffix = target.getAttribute('data-suffix') || '';
        const prefix = target.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = value / 60;
        const isDecimal = value.includes('.');

        function updateCounter() {
          current += parseFloat(increment);
          if (current < parseFloat(value)) {
            target.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = prefix + value + suffix;
          }
        }
        updateCounter();
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ── Typing Effect ──
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1500);
  }

  // ── Certificate Modal ──
  const modal = document.querySelector('.modal-overlay');
  const modalImg = document.querySelector('.modal-content img');
  const modalClose = document.querySelector('.modal-close');
  const certViewBtns = document.querySelectorAll('.cert-view-btn');

  if (modal && modalClose) {
    certViewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const imgSrc = btn.getAttribute('data-cert');
        if (imgSrc && modalImg) {
          modalImg.src = imgSrc;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Contact Form ──
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name')?.value;
      const email = contactForm.querySelector('#email')?.value;
      const message = contactForm.querySelector('#message')?.value;

      if (name && email && message) {
        const mailtoLink = `mailto:dhyan.colours@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
        window.location.href = mailtoLink;
      }
    });
  }

  // ── Marquee Duplication ──
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items;
  }
});
