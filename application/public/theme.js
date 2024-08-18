// Function to set the theme based on system preference or user preference
function setInitialTheme() {
  var initialTheme;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      document.body.setAttribute('data-bs-theme', savedTheme);
  } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      document.body.setAttribute('data-bs-theme', initialTheme);
      document.getElementById('liveToast').setAttribute('class', 'toast fade show')
  }
  updateThemeIcons(initialTheme);
}

// Toggle the theme and save the user's preference
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
}

// Update the visibility of the theme icons
function updateThemeIcons(color) {
  if (color === 'dark') {
      document.getElementById('theme-dark').style.display = 'block';
      document.getElementById('theme-light').style.display = 'none';
  } else {
      document.getElementById('theme-dark').style.display = 'none';
      document.getElementById('theme-light').style.display = 'block';
  }
}

// Apply the initial theme on page load
setInitialTheme();
