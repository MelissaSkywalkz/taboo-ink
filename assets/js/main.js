const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = nav ? nav.querySelectorAll('a') : [];
const body = document.body;

const closeMenu = () => {
  nav.classList.remove('is-open');
  body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('nav-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
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
          const isActive = link.getAttribute('href') === `#${id}`;
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
