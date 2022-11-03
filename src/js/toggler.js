import { refs } from './refs.js';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

loadTheme();
refs.input.addEventListener('change', changeTheme);

function changeTheme() {
  refs.body.classList.toggle(Theme.DARK);
  refs.body.classList.toggle(Theme.LIGHT);

  getCurrentTheme(refs.body.classList);
}

function getCurrentTheme(currentTheme) {
  localStorage.setItem('Theme', currentTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('Theme');
  if (savedTheme === Theme.DARK) {
    refs.body.classList.add(savedTheme);
    refs.input.checked = true;
  } else {
    refs.body.classList.add(Theme.LIGHT);
  }
}
