// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// ========== Theme Toggle ==========
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'light') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Back to top button
  backToTop.classList.toggle('visible', scrollY > 500);

  // Active nav link
  updateActiveNav();
});

// ========== Mobile Nav Toggle ==========
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========== Active Navigation ==========
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// ========== Back to Top ==========
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Scroll Animations ==========
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .edu-card, .cert-card, .stat-card, .contact-card, .contact-form, .about-content'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ========== Typing Effect for Hero ==========
function initTypingEffect() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;

  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid var(--accent)';

  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else {
      // Remove cursor after typing is done
      setTimeout(() => {
        tagline.style.borderRight = 'none';
      }, 1000);
    }
  }

  setTimeout(type, 800);
}

// ========== Smooth Stagger for Skill Tags ==========
function initSkillStagger() {
  const categories = document.querySelectorAll('.skill-category');
  categories.forEach(cat => {
    const tags = cat.querySelectorAll('.skill-tag');
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 0.05}s`;
    });
  });
}

// ========== Contact Form → MongoDB ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    try {
      const res = await fetch('http://localhost:5050/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');

      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #28c840, #00d2ff)';
      contactForm.reset();
    } catch {
      btn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
      btn.style.background = 'linear-gradient(135deg, #ff4444, #ff6b6b)';
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initTypingEffect();
  initSkillStagger();
  updateActiveNav();
});
