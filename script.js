const film = document.querySelector('#logo-film');
const stage = document.querySelector('.stage');
const button = document.querySelector('.playback');
const label = button.querySelector('.playback-label');
const icon = button.querySelector('.playback-icon');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
film.controls = false;
button.hidden = false;
function updateButton() {
  label.textContent = film.paused ? 'Odtwórz animację' : 'Wstrzymaj animację';
  icon.textContent = film.paused ? '▶' : 'Ⅱ';
}
function showStillFrame() {
  film.pause();
  if (Number.isFinite(film.duration)) film.currentTime = Math.max(0, film.duration - 0.05);
}
if (reducedMotion.matches) { film.autoplay = false; film.pause(); }
film.addEventListener('loadedmetadata', () => { if (reducedMotion.matches) showStillFrame(); });
film.addEventListener('loadeddata', () => stage.classList.add('has-video'));
if (film.readyState >= 2) stage.classList.add('has-video');
if (film.readyState >= 1 && reducedMotion.matches) showStillFrame();
film.addEventListener('play', updateButton);
film.addEventListener('pause', updateButton);
film.addEventListener('error', () => {
  stage.classList.remove('has-video'); stage.classList.add('video-error'); button.hidden = true;
});
button.addEventListener('click', async () => {
  if (film.paused) { try { await film.play(); } catch { updateButton(); } }
  else film.pause();
});
reducedMotion.addEventListener('change', event => { if (event.matches) showStillFrame(); });
updateButton();
