/* Shared screen registry + bg preloader */
const screens = {
  loader: document.getElementById('loader'),
  q1: document.getElementById('q1'),
  q2: document.getElementById('q2'),
  q3: document.getElementById('q3'),
  finale: document.getElementById('finale'),
};

function show(id) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[id].classList.add('active');
}

['q1', 'q2', 'q3'].forEach(id => {
  const el = screens[id];
  const url = el.dataset.bg;
  const img = new Image();
  img.onload = () => { el.style.backgroundImage = `url("${url}")`; };
  img.src = url;
});

window.__memsaab = { screens, show };
