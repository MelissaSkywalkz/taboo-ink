const initMiniRebel = () => {
  const modal = document.getElementById('mr-modal');
  const modalTitle = document.getElementById('mr-modal-title');
  const modalPrice = document.getElementById('mr-modal-price');
  const modalColor = document.getElementById('mr-modal-color');
  const modalCta = document.getElementById('mr-modal-cta');
  const productField = document.getElementById('mr-product-field');
  const selectedProduct = document.getElementById('mr-selected-product');
  const interestForm = document.getElementById('mr-interest-form');
  const formSuccess = document.getElementById('mr-form-success');
  const resetButton = document.getElementById('mr-reset');

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

  const safelyHide = (el) => {
    if (!el) {
      return;
    }
    const focused = el.querySelector(':focus');
    if (focused) {
      focused.blur();
    }
    if ('inert' in el) {
      el.inert = true;
    }
    el.setAttribute('aria-hidden', 'true');
    el.hidden = true;
  };

  const safelyShow = (el) => {
    if (!el) {
      return;
    }
    if ('inert' in el) {
      el.inert = false;
    }
    el.hidden = false;
    el.setAttribute('aria-hidden', 'false');
  };

  const openModal = (card) => {
    if (!modal || !card) {
      return;
    }
    lastFocusedElement = document.activeElement;
    const name = card.dataset.product || 'Mini Rebel Tee';
    const price = card.dataset.price || '299 kr';
    const color = card.dataset.color || 'Cream';

    modalTitle.textContent = name;
    modalPrice.textContent = price;
    modalColor.value = color;
    safelyShow(modal);
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
    safelyHide(modal);
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
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    const formInput = interestForm ? interestForm.querySelector('input[name="name"]') : null;
    if (formInput) {
      setTimeout(() => formInput.focus(), 400);
    }
  };

  const cards = document.querySelectorAll('.mr-card');
  const filterButtons = document.querySelectorAll('.mr-chip');
  const sortSelect = document.getElementById('mr-sort-select');
  const productGrid = document.getElementById('mr-product-grid');
  const cardData = Array.from(cards).map((card, index) => ({
    card,
    index,
    category: card.dataset.category || 'all',
    price: Number((card.dataset.price || '').replace(/[^\d]/g, '')) || 0,
  }));
  let activeFilter = 'all';

  cards.forEach((card) => {
    const openBtn = card.querySelector('[data-modal-open]');
    const interestBtn = card.querySelector('[data-interest]');
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

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((chip) => chip.classList.remove('is-active'));
      button.classList.add('is-active');
      activeFilter = button.dataset.filter || 'all';
      applyFilterAndSort();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilterAndSort);
  }

  applyFilterAndSort();

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
