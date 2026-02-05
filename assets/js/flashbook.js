const initFlashbook = () => {
  const tiles = Array.from(document.querySelectorAll('.mr-flash-tile'));
  const filterButtons = Array.from(document.querySelectorAll('[data-filter-group]'));
  const activeFilters = {
    tema: 'all',
    sweet: 'all',
    color: 'all',
  };

  const applyFilters = () => {
    tiles.forEach((tile) => {
      const matchesTema = activeFilters.tema === 'all' || tile.dataset.tema === activeFilters.tema;
      const matchesSweet = activeFilters.sweet === 'all' || tile.dataset.sweet === activeFilters.sweet;
      const matchesColor = activeFilters.color === 'all' || tile.dataset.color === activeFilters.color;
      tile.hidden = !(matchesTema && matchesSweet && matchesColor);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filter || 'all';
      if (!group) {
        return;
      }
      const groupButtons = filterButtons.filter((btn) => btn.dataset.filterGroup === group);
      groupButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      activeFilters[group] = value;
      applyFilters();
    });
  });

  applyFilters();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFlashbook);
} else {
  initFlashbook();
}
