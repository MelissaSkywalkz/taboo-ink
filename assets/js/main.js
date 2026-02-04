const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = nav ? nav.querySelectorAll('a') : [];
const dropdownToggles = nav ? nav.querySelectorAll('.dropbtn') : [];
const dropdownItems = nav ? nav.querySelectorAll('.dropdown') : [];
const body = document.body;

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('#')) {
    return;
  }
  const normalized = href.split('#')[0];
  if (normalized === currentPath) {
    link.classList.add('is-active');
  }
});

const closeMenu = () => {
  nav.classList.remove('is-open');
  body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const closeDropdowns = () => {
  dropdownItems.forEach((item) => {
    item.classList.remove('is-open');
    const toggle = item.querySelector('.dropbtn');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('nav-open', isOpen);
    if (!isOpen) {
      closeDropdowns();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      }
      closeDropdowns();
    });
  });

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const item = toggle.closest('.dropdown');
      if (!item) {
        return;
      }
      const isOpen = item.classList.contains('is-open');
      closeDropdowns();
      if (!isOpen) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      closeDropdowns();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      if (nav.classList.contains('is-open')) {
        closeMenu();
      }
    }
  });
}

const sections = document.querySelectorAll('main section[id]');
const navObserver = 'IntersectionObserver' in window ? new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href') || '';
          if (!href.startsWith('#')) {
            return;
          }
          const isActive = href === `#${id}`;
          link.classList.toggle('is-active', isActive);
        });
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' },
) : null;

sections.forEach((section) => {
  if (navObserver) {
    navObserver.observe(section);
  }
});

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
) : null;

revealItems.forEach((item) => {
  if (revealObserver) {
    revealObserver.observe(item);
  } else {
    item.classList.add('is-visible');
  }
});

const mediaFrames = document.querySelectorAll('.media-frame img');
mediaFrames.forEach((image) => {
  const frame = image.closest('.media-frame');
  if (!frame) {
    return;
  }
  image.addEventListener('load', () => {
    frame.classList.add('has-image');
  });
  image.addEventListener('error', () => {
    frame.classList.remove('has-image');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;

      portfolioCards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? 'block' : 'none';
      });
    });
  });
}

const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach((toggle) => {
  const item = toggle.closest('.faq-item');
  const answer = item ? item.querySelector('.faq-answer') : null;
  if (!answer) {
    return;
  }
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const icon = toggle.querySelector('.faq-toggle__icon');
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    answer.hidden = isExpanded;
    if (icon) {
      icon.textContent = isExpanded ? '+' : '–';
    }
  });
});
