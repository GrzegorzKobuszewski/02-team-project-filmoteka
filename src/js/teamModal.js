const team_open = document.getElementById('team_open');
const team_box = document.getElementById('team_box');
const team_close = document.getElementById('team_close');

team_open.addEventListener('click', () => {
  team_box.classList.remove('is-hidden');
});

document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    team_box.classList.add('is-hidden');
  }
});

team_close.addEventListener('click', () => {
  team_box.classList.add('is-hidden');
});
