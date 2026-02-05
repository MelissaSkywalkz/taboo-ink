const initMiniRebel = () => {
  const modal = document.getElementById('mr-modal');
  const modalTitle = document.getElementById('mr-modal-title');
  const modalPrice = document.getElementById('mr-modal-price');
  const modalColor = document.getElementById('mr-modal-color');
  const modalCta = document.getElementById('mr-modal-cta');
  const modalImage = document.getElementById('mr-modal-image');
  const modalDescription = document.getElementById('mr-modal-description');
  const modalFit = document.getElementById('mr-modal-fit');
  const modalMaterial = document.getElementById('mr-modal-material');
  const modalStory = document.getElementById('mr-modal-story');
  const modalCare = document.getElementById('mr-modal-care');
  const modalShipping = document.getElementById('mr-modal-shipping');
  const modalRelated = document.getElementById('mr-modal-related');
  const productField = document.getElementById('mr-product-field');
  const selectedProduct = document.getElementById('mr-selected-product');
  const interestForm = document.getElementById('mr-interest-form');
  const formSuccess = document.getElementById('mr-form-success');
  const resetButton = document.getElementById('mr-reset');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lastFocusedElement = null;
  let modalListenersInitialized = false;

  const updateSelectedProduct = (name) => {
    const label = selectedProduct ? selectedProduct.querySelector('span') : null;
    if (label) {
      label.textContent = name || 'Ingen ännu';
    }
    if (productField) {
      productField.value = name || '';
    }
  };

  const productDetails = {
    'Mini Rebel Tee – Barn (Cream)': {
      image: 'assets/img/mini-rebel/product-1.svg',
      fit: 'Barn, normal passform',
      material: '100% bomull',
      story: 'En liten rebell med stort hjärta i varm cream.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Matchande set', 'Vuxen', 'Cream'],
    },
    'Mini Rebel Tee – Barn (Black)': {
      image: 'assets/img/mini-rebel/product-2.svg',
      fit: 'Barn, normal passform',
      material: '100% bomull',
      story: 'Rebel black med klassisk tattoo-känsla.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Matchande set', 'Vuxen', 'Black'],
    },
    'Mini Rebel Tee – Vuxen (Cream)': {
      image: 'assets/img/mini-rebel/product-3.svg',
      fit: 'Unisex, normal passform',
      material: '100% bomull',
      story: 'Cream med mjuk finish för stora berättelser.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Matchande set', 'Barn', 'Cream'],
    },
    'Mini Rebel Tee – Vuxen (Black)': {
      image: 'assets/img/mini-rebel/product-4.svg',
      fit: 'Unisex, normal passform',
      material: '100% bomull',
      story: 'Rebel black för en tydlig, trygg statement.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Matchande set', 'Barn', 'Black'],
    },
    'Matchande set – Barn + Vuxen (Cream)': {
      image: 'assets/img/mini-rebel/product-1.svg',
      fit: 'Barn + Vuxen, normal passform',
      material: '100% bomull',
      story: 'Ett matchande set för stora & små rebels.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Barn', 'Vuxen', 'Cream'],
    },
    'Matchande set – Barn + Vuxen (Black)': {
      image: 'assets/img/mini-rebel/product-2.svg',
      fit: 'Barn + Vuxen, normal passform',
      material: '100% bomull',
      story: 'Rebel black set för matchning direkt.',
      care: 'Tvätta ut och in på 30°, låg värme.',
      shipping: 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.',
      related: ['Barn', 'Vuxen', 'Black'],
    },
  };

  const openModal = (card) => {
    if (!modal || !card) {
      return;
    }
    lastFocusedElement = document.activeElement;
    const name = card.dataset.product || 'Mini Rebel Tee';
    const price = card.dataset.price || '299 kr';
    const color = card.dataset.color || 'Cream';
    const details = productDetails[name] || {};

    modalTitle.textContent = name;
    modalPrice.textContent = price;
    modalColor.value = color;
    if (modalImage) {
      modalImage.src = details.image || card.querySelector('img')?.getAttribute('src') || 'assets/img/mini-rebel/product-1.svg';
      modalImage.alt = `Produktbild för ${name}`;
    }
    if (modalDescription) {
      modalDescription.textContent = details.story || 'Mjuk t-shirt i varm cream eller rebel black. En liten berättelse att bära tillsammans.';
    }
    if (modalFit) {
      modalFit.textContent = details.fit || 'Normal passform';
    }
    if (modalMaterial) {
      modalMaterial.textContent = details.material || '100% bomull';
    }
    if (modalStory) {
      modalStory.textContent = details.story || 'En liten rebell med stort hjärta. Inspirerad av klassisk flash.';
    }
    if (modalCare) {
      modalCare.textContent = details.care || 'Tvätta ut och in på 30°, låg värme. Undvik torktumlare.';
    }
    if (modalShipping) {
      modalShipping.textContent = details.shipping || 'Trycks on-demand i EU. Leverans 5–8 arbetsdagar.';
    }
    if (modalRelated) {
      const related = details.related || ['Matcha set', 'Barn', 'Vuxen'];
      modalRelated.innerHTML = related.map((item) => `<span class="mr-modal__related-card">${item}</span>`).join('');
    }
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mr-modal-open');

    const focusTarget = modal.querySelector('button, select, input, [href]');
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closeModal = () => {
    if (!modal) {
      return;
    }
    modal.classList.remove('is-open');
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mr-modal-open');
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const trapFocus = (event) => {
    if (!modal || modal.hidden || event.key !== 'Tab') {
      return;
    }
    const focusable = modal.querySelectorAll('button, select, input, [href], textarea');
    if (!focusable.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleInterest = (name) => {
    updateSelectedProduct(name);
    closeModal();
    const formSection = document.getElementById('intresse');
    if (formSection) {
      formSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    const formInput = interestForm ? interestForm.querySelector('input[name="name"]') : null;
    if (formInput) {
      if (prefersReducedMotion) {
        formInput.focus();
      } else {
        setTimeout(() => formInput.focus(), 400);
      }
    }
  };

  const cards = document.querySelectorAll('.mr-card');
  const filterButtons = document.querySelectorAll('.mr-chip');
  const sortSelect = document.getElementById('mr-sort-select');
  const productGrid = document.getElementById('mr-product-grid');
  const collectionCta = document.querySelector('.mr-hero__actions a[href="#kollektion"]');
  const gridCards = productGrid ? productGrid.querySelectorAll('.mr-card') : [];
  const cardData = Array.from(gridCards).map((card, index) => ({
    card,
    index,
    category: card.dataset.category || 'all',
    price: Number((card.dataset.price || '').replace(/[^\d]/g, '')) || 0,
  }));
  let activeFilter = 'all';

  cards.forEach((card) => {
    const openBtn = card.querySelector('[data-modal-open]');
    const interestBtn = card.querySelector('[data-interest]');
    const meta = card.querySelector('[data-card-meta]');
    if (meta) {
      const color = card.dataset.color || '';
      const category = card.dataset.category || '';
      const categoryLabel = {
        barn: 'Barn',
        vuxen: 'Vuxen',
        set: 'Set',
      }[category] || '';
      const parts = [];
      if (color) {
        parts.push(`Färg: ${color}`);
      }
      if (categoryLabel) {
        parts.push(categoryLabel);
      }
      meta.textContent = parts.join(' • ');
    }
    if (openBtn) {
      openBtn.addEventListener('click', () => openModal(card));
    }
    if (interestBtn) {
      interestBtn.addEventListener('click', () => {
        const name = card.dataset.product || '';
        handleInterest(name);
      });
    }
  });

  const applyFilterAndSort = () => {
    if (!productGrid) {
      return;
    }
    const sortValue = sortSelect ? sortSelect.value : 'popular';
    const filtered = cardData.filter((item) => activeFilter === 'all' || item.category === activeFilter);
    const sorted = [...filtered].sort((a, b) => {
      if (sortValue === 'price-asc') {
        return a.price - b.price;
      }
      return a.index - b.index;
    });
    sorted.forEach((item) => productGrid.appendChild(item.card));
    cardData.forEach((item) => {
      item.card.style.display = filtered.includes(item) ? 'grid' : 'none';
    });
  };

  const setFilterState = (activeButton) => {
    filterButtons.forEach((chip) => {
      chip.classList.toggle('is-active', chip === activeButton);
      chip.setAttribute('aria-pressed', chip === activeButton ? 'true' : 'false');
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setFilterState(button);
      activeFilter = button.dataset.filter || 'all';
      applyFilterAndSort();
    });

    button.addEventListener('keydown', (event) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) {
        return;
      }
      const group = button.closest('.mr-filter');
      if (!group) {
        return;
      }
      const groupButtons = Array.from(group.querySelectorAll('.mr-chip'));
      const currentIndex = groupButtons.indexOf(button);
      if (currentIndex === -1) {
        return;
      }
      event.preventDefault();
      let nextIndex = currentIndex;
      if (event.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % groupButtons.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + groupButtons.length) % groupButtons.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = groupButtons.length - 1;
      }
      groupButtons[nextIndex].focus();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilterAndSort);
  }

  const initialActive = Array.from(filterButtons).find((chip) => chip.classList.contains('is-active')) || filterButtons[0];
  if (initialActive) {
    setFilterState(initialActive);
    activeFilter = initialActive.dataset.filter || 'all';
  }

  applyFilterAndSort();

  if (collectionCta && productGrid) {
    collectionCta.addEventListener('click', (event) => {
      event.preventDefault();
      productGrid.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      const firstCard = productGrid.querySelector('.mr-card');
      if (firstCard) {
        firstCard.setAttribute('tabindex', '-1');
        if (prefersReducedMotion) {
          firstCard.focus();
        } else {
          setTimeout(() => firstCard.focus(), 300);
        }
      }
    });
  }

  const initModalListeners = () => {
    if (!modal || modalListenersInitialized) {
      return;
    }
    modalListenersInitialized = true;

    modal.addEventListener('click', (event) => {
      const closeTrigger = event.target.closest('[data-modal-close]');
      if (closeTrigger) {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.target.closest('.mr-modal__content')) {
        return;
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });

    modal.addEventListener('keydown', trapFocus);
  };

  initModalListeners();

  if (modalCta) {
    modalCta.addEventListener('click', () => {
      handleInterest(modalTitle.textContent);
    });
  }

  const stored = window.localStorage.getItem('mini-rebel-interest');
  if (stored && formSuccess && interestForm) {
    interestForm.hidden = true;
    formSuccess.hidden = false;
  }

  if (interestForm) {
    interestForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(interestForm);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        comment: formData.get('comment'),
        product: formData.get('produkt'),
      };
      window.localStorage.setItem('mini-rebel-interest', JSON.stringify(payload));
      interestForm.hidden = true;
      if (formSuccess) {
        formSuccess.hidden = false;
      }
    });
  }

  if (resetButton && interestForm && formSuccess) {
    resetButton.addEventListener('click', () => {
      window.localStorage.removeItem('mini-rebel-interest');
      formSuccess.hidden = true;
      interestForm.reset();
      updateSelectedProduct('');
      interestForm.hidden = false;
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMiniRebel);
} else {
  initMiniRebel();
}
