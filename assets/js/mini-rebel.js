const initMiniRebel = () => {
  if (!document.body || document.body.dataset.site !== 'mini-rebel') {
    return;
  }
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
  const formSuccessMeta = document.getElementById('mr-form-success-meta');
  const resetButton = document.getElementById('mr-reset');
  const backToCollection = document.getElementById('mr-back-to-collection');
  const formError = document.getElementById('mr-form-error');
  const formPanel = document.querySelector('.mr-club__form');
  const nameError = document.getElementById('mr-name-error');
  const emailError = document.getElementById('mr-email-error');
  const inertTargets = [
    document.querySelector('main'),
    document.querySelector('.mr-header__inner'),
    document.querySelector('.mr-footer'),
  ].filter(Boolean);
  const navToggle = document.querySelector('.mr-nav-toggle');
  const navDrawer = document.getElementById('mr-nav-drawer');
  const navDrawerPanel = navDrawer ? navDrawer.querySelector('.mr-nav-drawer__panel') : null;
  const navDrawerLinks = navDrawer ? navDrawer.querySelectorAll('a') : [];
  const navDrawerCloseButtons = navDrawer ? navDrawer.querySelectorAll('[data-drawer-close]') : [];
  const navToggleLabel = navToggle ? navToggle.querySelector('[data-nav-toggle-label]') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocusedElement = null;
  let modalListenersInitialized = false;
  let highlightTimeout = null;
  let lastFocusedNav = null;
  let navDrawerCloseTimeout = null;

  const mailtoAddress = 'info@tabooinkstockholm.com';

  const getFocusableElements = (root) => {
    if (!root) {
      return [];
    }
    return Array.from(root.querySelectorAll(focusableSelector)).filter((element) => !element.hasAttribute('disabled'));
  };

  const setInertState = (isInert) => {
    inertTargets.forEach((element) => {
      element.inert = isInert;
    });
  };

  const openNavDrawer = () => {
    if (!navDrawer || !navToggle) {
      return;
    }
    if (navDrawerCloseTimeout) {
      window.clearTimeout(navDrawerCloseTimeout);
      navDrawerCloseTimeout = null;
    }
    lastFocusedNav = document.activeElement;
    navDrawer.hidden = false;
    navDrawer.classList.add('is-open');
    navDrawer.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('is-open');
    if (navToggleLabel) {
      navToggleLabel.textContent = 'Stäng meny';
    }
    document.body.classList.add('mr-nav-open');
    setInertState(true);
    const focusTarget = navDrawerLinks[0] || navDrawerPanel;
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closeNavDrawer = () => {
    if (!navDrawer || !navToggle) {
      return;
    }
    navDrawer.classList.remove('is-open');
    navDrawer.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-open');
    if (navToggleLabel) {
      navToggleLabel.textContent = 'Öppna meny';
    }
    document.body.classList.remove('mr-nav-open');
    setInertState(false);
    if (lastFocusedNav && typeof lastFocusedNav.focus === 'function') {
      lastFocusedNav.focus();
    }
    navDrawerCloseTimeout = window.setTimeout(() => {
      navDrawer.hidden = true;
      navDrawerCloseTimeout = null;
    }, prefersReducedMotion ? 0 : 220);
  };

  const trapDrawerFocus = (event) => {
    if (!navDrawer || navDrawer.hidden || event.key !== 'Tab') {
      return;
    }
    const focusable = getFocusableElements(navDrawerPanel);
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

  if (formSuccess) {
    formSuccess.hidden = true;
    formSuccess.setAttribute('aria-hidden', 'true');
    formSuccess.classList.add('is-hidden');
  }

  const updateSelectedProduct = (name) => {
    const label = selectedProduct ? selectedProduct.querySelector('span') : null;
    if (label) {
      label.textContent = name || 'Ingen ännu';
    }
    if (productField) {
      productField.value = name || '';
    }
  };

  if (productField) {
    productField.addEventListener('change', () => {
      updateSelectedProduct(productField.value);
    });
  }

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      if (navDrawer.classList.contains('is-open')) {
        closeNavDrawer();
      } else {
        openNavDrawer();
      }
    });

    navDrawerCloseButtons.forEach((button) => {
      button.addEventListener('click', closeNavDrawer);
    });

    navDrawerLinks.forEach((link) => {
      link.addEventListener('click', closeNavDrawer);
    });

    navDrawer.addEventListener('click', (event) => {
      if (event.target.closest('.mr-nav-drawer__panel')) {
        return;
      }
      closeNavDrawer();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navDrawer && !navDrawer.hidden) {
        closeNavDrawer();
      }
    });

    navDrawer.addEventListener('keydown', trapDrawerFocus);
  }

  const productDetails = {
    'Mini Rebel Wear – Barn (Studio Cream)': {
      image: './assets/img/mini-rebel/products/product-5.png',
      fit: 'Barn, normal passform',
      material: '100% bomull',
      story: 'Mjuk jersey med klassisk tattoo flash, tryckt on-demand i EU.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
    'Mini Rebel Wear – Barn (Rebel Black)': {
      image: './assets/img/mini-rebel/products/product-6.png',
      fit: 'Barn, normal passform',
      material: '100% bomull',
      story: 'Rebel Black med tydlig kontrast och mjuk känsla mot huden.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
    'Mini Rebel Wear – Vuxen (Studio Cream)': {
      image: './assets/img/mini-rebel/products/product-7.png',
      fit: 'Unisex, normal passform',
      material: '100% bomull',
      story: 'Studio Cream för vuxna. Samma motiv som mini, mer luft och vardagslugn.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
    'Mini Rebel Wear – Vuxen (Rebel Black)': {
      image: './assets/img/mini-rebel/products/product-1.png',
      fit: 'Unisex, normal passform',
      material: '100% bomull',
      story: 'Rebel Black med diskret statement, unisex och lätt att bära.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
    'Matchande set – Barn + Vuxen (Studio Cream)': {
      image: './assets/img/mini-rebel/products/product-2.png',
      fit: 'Barn + Vuxen, normal passform',
      material: '100% bomull',
      story: 'Två plagg, samma motiv. Matcha utan att kännas tillrättalagd.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
    'Matchande set – Barn + Vuxen (Rebel Black)': {
      image: './assets/img/mini-rebel/products/product-3.png',
      fit: 'Barn + Vuxen, normal passform',
      material: '100% bomull',
      story: 'Rebel Black i dubbel upplaga för familjer som vill synas lagom.',
      care: 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.',
      shipping: 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.',
      related: ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'],
    },
  };

  const openModal = (card, trigger) => {
    if (!modal || !card) {
      return;
    }
    lastFocusedElement = trigger || document.activeElement || card;
    const name = card.dataset.product || 'Mini Rebel Wear';
    const price = card.dataset.price || '299 kr';
    const color = card.dataset.color || 'Studio Cream';
    const details = productDetails[name] || {};

    modalTitle.textContent = name;
    modalPrice.textContent = price;
    modalColor.value = color;
    if (modalImage) {
      modalImage.src = details.image || card.querySelector('img')?.getAttribute('src') || './assets/img/mini-rebel/products/5.png';
      modalImage.alt = `Produktbild för ${name}`;
      applyImageFallback(modalImage);
    }
    if (modalDescription) {
      modalDescription.textContent = details.story || 'Mjuk, enkel och rak. Ett plagg som funkar varje dag.';
    }
    if (modalFit) {
      modalFit.textContent = details.fit || 'Normal passform';
    }
    if (modalMaterial) {
      modalMaterial.textContent = details.material || '100% bomull';
    }
    if (modalStory) {
      modalStory.textContent = details.story || 'En liten rebell med stort hjärta. Inspirerad av klassisk tattoo flash, tryckt on-demand i EU.';
    }
    if (modalCare) {
      modalCare.textContent = details.care || 'Tvätta ut och in på 30 grader. Undvik torktumlare för längst livslängd.';
    }
    if (modalShipping) {
      modalShipping.textContent = details.shipping || 'Trycks on-demand i EU. Normal leverans 5–8 arbetsdagar.';
    }
    if (modalRelated) {
      const related = details.related || ['Barn, Vuxen, Set', 'Studio Cream, Rebel Black', 'Storleksguide'];
      modalRelated.innerHTML = related.map((item) => `<span class="mr-modal__related-card">${item}</span>`).join('');
    }
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mr-modal-open');
    // Prevent background interaction when modal is open.
    setInertState(true);

    const focusTarget = modal.querySelector('.mr-modal__close') || getFocusableElements(modal)[0];
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
    // Restore page interactivity after modal close.
    setInertState(false);
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const trapFocus = (event) => {
    if (!modal || modal.hidden || event.key !== 'Tab') {
      return;
    }
    const focusable = getFocusableElements(modal);
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
    const formSection = document.getElementById('mr-intresse');
    if (formSection) {
      formSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    if (formPanel) {
      formPanel.classList.add('is-highlight');
      if (highlightTimeout) {
        clearTimeout(highlightTimeout);
      }
      highlightTimeout = window.setTimeout(() => {
        formPanel.classList.remove('is-highlight');
      }, 1500);
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

  const cards = document.querySelectorAll('.mr-card--shop');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const sortSelect = document.getElementById('mr-sort-select');
  const productGrid = document.getElementById('mr-product-grid');
  const resultsCount = document.getElementById('mr-results-count');
  const collectionCta = document.querySelector('.mr-hero-actions a[href="#mr-collection"]');
  const gridCards = productGrid ? productGrid.querySelectorAll('.mr-card--shop') : [];
  const cardData = Array.from(gridCards).map((card, index) => ({
    card,
    index,
    category: card.dataset.category || 'all',
    price: Number((card.dataset.price || '').replace(/[^\d]/g, '')) || 0,
  }));
  let activeFilter = 'all';

  const updateCount = () => {
    if (!resultsCount) {
      return;
    }
    if (!productGrid) {
      return;
    }
    resultsCount.textContent = `Visar ${productGrid.querySelectorAll('.mr-card--shop:not([hidden])').length} produkter`;
  };

  cards.forEach((card) => {
    const openBtn = card.querySelector('[data-modal-open]');
    const interestBtn = card.querySelector('[data-interest]');
    const meta = card.querySelector('[data-card-meta]');
    if (card.classList.contains('mr-card--shop')) {
      // Make the whole card open the modal for a shop-first feel.
      card.classList.add('mr-card--interactive');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Se produkt ${card.dataset.product || 'Mini Rebel Wear'}`);
      card.addEventListener('click', (event) => {
        if (event.target.closest('button, a, input, select, textarea, label')) {
          return;
        }
        openModal(card, card);
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(card, card);
        }
      });
    }
    if (meta) {
      const category = card.dataset.category || '';
      const categoryLabel = {
        barn: 'Barn',
        vuxen: 'Vuxen',
        set: 'Set',
      }[category] || '';
      meta.textContent = categoryLabel;
    }
    if (openBtn) {
      openBtn.addEventListener('click', (event) => openModal(card, event.currentTarget));
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
      const isVisible = filtered.includes(item);
      item.card.hidden = !isVisible;
      item.card.setAttribute('aria-hidden', String(!isVisible));
      item.card.style.removeProperty('display');
    });
    updateCount();
  };

  const setFilterState = (activeButton) => {
    filterButtons.forEach((chip) => {
      chip.classList.toggle('is-active', chip === activeButton);
      chip.setAttribute('aria-pressed', chip === activeButton ? 'true' : 'false');
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      setFilterState(button);
      applyFilterAndSort();
      const filterRow = button.closest('.mr-filter');
      if (filterRow && filterRow.scrollWidth > filterRow.clientWidth) {
        button.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      }
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
    activeFilter = initialActive.dataset.filter || 'all';
    setFilterState(initialActive);
  }

  applyFilterAndSort();

  if (collectionCta && productGrid) {
    collectionCta.addEventListener('click', (event) => {
      event.preventDefault();
      productGrid.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      const firstCard = productGrid.querySelector('.mr-card--shop');
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
      closeModal();
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

  if (interestForm) {
    const setInlineError = (input, errorEl, message) => {
      if (!input) {
        return;
      }
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.classList.add('is-error');
        }
      } else {
        input.setAttribute('aria-invalid', 'false');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('is-error');
        }
      }
    };

    const validateName = (value) => (!value ? 'Fyll i ditt namn.' : '');
    const validateEmail = (value, valid) => {
      if (!value) {
        return 'Fyll i din e-postadress.';
      }
      if (!valid) {
        return 'Ange en giltig e-postadress.';
      }
      return '';
    };

    interestForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = interestForm.querySelector('input[name="name"]');
      const emailInput = interestForm.querySelector('input[name="email"]');
      const commentInput = interestForm.querySelector('textarea[name="comment"]');

      if (formError) {
        formError.hidden = true;
        formError.textContent = '';
      }

      const nameValue = nameInput ? nameInput.value.trim() : '';
      const emailValue = emailInput ? emailInput.value.trim() : '';
      const isEmailValid = emailInput ? emailInput.checkValidity() : false;

      setInlineError(nameInput, nameError, validateName(nameValue));
      setInlineError(emailInput, emailError, validateEmail(emailValue, isEmailValid));

      if (!nameValue || !emailValue || !isEmailValid) {
        if (formError) {
          if (!nameValue && !emailValue) {
            formError.textContent = 'Fyll i namn och e-postadress så öppnar vi ett mailutkast.';
          } else if (!nameValue) {
            formError.textContent = 'Fyll i ditt namn för att gå vidare.';
          } else if (!emailValue) {
            formError.textContent = 'Fyll i din e-postadress för att gå vidare.';
          } else {
            formError.textContent = 'Ange en giltig e-postadress för att gå vidare.';
          }
          formError.hidden = false;
        }
        return;
      }

      const formData = new FormData(interestForm);
      const payload = {
        name: nameValue,
        email: emailValue,
        comment: (commentInput ? commentInput.value.trim() : '') || '',
        product: formData.get('produkt'),
      };
      const subject = encodeURIComponent('Mini Rebel - Intresseanmälan');
      const bodyLines = [
        `Namn: ${payload.name}`,
        `E-post: ${payload.email}`,
        `Produkt: ${payload.product || 'Ej vald'}`,
      ];
      if (payload.comment) {
        bodyLines.push(`Kommentar: ${payload.comment}`);
      }
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:${mailtoAddress}?subject=${subject}&body=${body}`;

      interestForm.hidden = true;
      interestForm.setAttribute('aria-hidden', 'true');
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.setAttribute('aria-hidden', 'false');
        formSuccess.classList.remove('is-hidden');
      }
      if (formSuccessMeta) {
        const productLabel = payload.product || 'Ingen vald';
        formSuccessMeta.textContent = `Vald produkt: ${productLabel}. Bekräftelse skickas till ${payload.email}.`;
      }
    });

    const nameInput = interestForm.querySelector('input[name="name"]');
    const emailInput = interestForm.querySelector('input[name="email"]');
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        setInlineError(nameInput, nameError, validateName(nameInput.value.trim()));
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        setInlineError(emailInput, emailError, validateEmail(emailInput.value.trim(), emailInput.checkValidity()));
      });
    }
  }

  if (resetButton && interestForm && formSuccess) {
    resetButton.addEventListener('click', () => {
      formSuccess.hidden = true;
      formSuccess.setAttribute('aria-hidden', 'true');
      formSuccess.classList.add('is-hidden');
      interestForm.reset();
      updateSelectedProduct('');
      if (formSuccessMeta) {
        formSuccessMeta.textContent = '';
      }
      interestForm.hidden = false;
      interestForm.setAttribute('aria-hidden', 'false');
    });
  }

  if (backToCollection && productGrid) {
    backToCollection.addEventListener('click', () => {
      productGrid.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMiniRebel);
} else {
  initMiniRebel();
}
