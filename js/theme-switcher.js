/**
 * Theme Color Switcher
 * 5 Modern Professional Color Themes
 */

(function() {
  'use strict';

  // Available themes — refined, professional palette (no flashy colors)
  const themes = [
    { name: 'blue',    label: 'Indigo',    primary: '#3730A3', secondary: '#312E81' },
    { name: 'teal',    label: 'Deep Teal', primary: '#0F766E', secondary: '#115E59' },
    { name: 'emerald', label: 'Forest',    primary: '#166534', secondary: '#14532D' },
    { name: 'rose',    label: 'Wine',      primary: '#9F1239', secondary: '#881337' },
    { name: 'purple',  label: 'Plum',      primary: '#6B21A8', secondary: '#581C87' },
    { name: 'orange',  label: 'Bronze',    primary: '#B45309', secondary: '#92400E' }
  ];

  // Get saved theme or default to 'orange'
  function getSavedTheme() {
    return localStorage.getItem('portfolio-theme') || 'orange';
  }

  // Save theme to localStorage
  function saveTheme(themeName) {
    localStorage.setItem('portfolio-theme', themeName);
  }

  // Apply theme to document
  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);

    // Update active button state
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      }
    });

    // Save to localStorage
    saveTheme(themeName);

    // Dispatch custom event for other scripts to listen
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
  }

  // Create theme switcher UI
  function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `
      <span class="theme-switcher-label">Theme</span>
      ${themes.map(theme => `
        <button
          class="theme-btn ${theme.name === getSavedTheme() ? 'active' : ''}"
          data-theme="${theme.name}"
          data-tooltip="${theme.label}"
          aria-label="Switch to ${theme.label} theme"
        ></button>
      `).join('')}
    `;

    document.body.appendChild(switcher);

    // Add click handlers
    switcher.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const themeName = this.getAttribute('data-theme');
        applyTheme(themeName);

        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }

  // Initialize
  function init() {
    // Apply saved theme immediately (before DOM is fully loaded)
    const savedTheme = getSavedTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Create UI when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createThemeSwitcher);
    } else {
      createThemeSwitcher();
    }
  }

  // Run initialization
  init();

})();
