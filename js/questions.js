/* Yes/No flow: Yes advances, No restarts. The "No" button dodges the cursor. */
(function () {
  const { show } = window.__memsaab;

  document.querySelectorAll('.choice').forEach(btn => {
    if (btn.classList.contains('no')) {
      btn.addEventListener('mouseenter', () => {
        const screen = btn.closest('.screen');
        if (!screen) return;
        const rect = screen.getBoundingClientRect();
        const dx = (Math.random() - 0.5) * 0.6 * rect.width;
        const dy = (Math.random() - 0.5) * 0.4 * rect.height;
        btn.style.transform = `translate(${dx}px, ${dy}px) rotate(${(Math.random()-0.5)*10}deg)`;
      });
    }

    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'next') {
        const target = btn.dataset.target;
        if (target === 'finale') {
          show('finale');
          if (window.__memsaab.startStars) window.__memsaab.startStars();
          if (window.__memsaab.renderLetter) window.__memsaab.renderLetter();
        } else {
          show(target);
        }
      } else if (action === 'restart') {
        document.querySelectorAll('.choice.no').forEach(b => b.style.transform = '');
        window.__memsaab.runLoader();
      }
    });
  });
})();
