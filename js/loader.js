/* Cupid loader: cupid flies in, shoots arrow, heart pops with petal burst */
(function () {
  const { show } = window.__memsaab;

  function spawnBurst(burst) {
    const N = 18;
    for (let i = 0; i < N; i++) {
      const pet = document.createElement('div');
      pet.className = 'pet';
      const angle = (Math.PI * 2 * i) / N + Math.random() * 0.3;
      const dist = 120 + Math.random() * 80;
      pet.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      pet.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      pet.style.setProperty('--rot', (Math.random() * 360) + 'deg');
      pet.style.background = ['#ff3a6d', '#ff7aa2', '#ffb0c6', '#a8123c'][i % 4];
      burst.appendChild(pet);
    }
    burst.classList.add('go');
  }

  function runLoader() {
    show('loader');
    const cupid = document.getElementById('cupid');
    const arrow = document.getElementById('cupidArrow');
    const heart = document.getElementById('heartTarget');
    const burst = document.getElementById('burst');

    cupid.classList.remove('fly');
    arrow.classList.remove('shoot');
    heart.classList.remove('popped');
    burst.classList.remove('go');
    burst.innerHTML = '';
    cupid.style.opacity = '';
    cupid.style.transform = '';
    void cupid.offsetWidth;

    cupid.classList.add('fly');

    setTimeout(() => arrow.classList.add('shoot'), 2400);

    setTimeout(() => {
      heart.classList.add('popped');
      spawnBurst(burst);
      cupid.style.transition = 'opacity .4s ease, transform .4s ease';
      cupid.style.opacity = '0';
      cupid.style.transform = 'translate(-50%, -50%) scale(0.6)';
    }, 2900);

    setTimeout(() => show('q1'), 3900);
  }

  window.__memsaab.runLoader = runLoader;
  runLoader();
})();
