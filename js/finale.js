/* Finale: shooting heart-shaped stars on canvas + the letter on the scroll */
(function () {
  let starsRunning = false;

  function startStars() {
    if (starsRunning) return;
    starsRunning = true;

    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth * dpr;
      H = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    resize();
    window.addEventListener('resize', resize);

    const twinkles = [];
    for (let i = 0; i < 90; i++) {
      twinkles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random(),
        s: 0.005 + Math.random() * 0.02,
      });
    }

    const hearts = [];
    function spawnHeart() {
      const fromLeft = Math.random() < 0.5;
      hearts.push({
        x: fromLeft ? -40 * dpr : W + 40 * dpr,
        y: Math.random() * H * 0.6,
        vx: (fromLeft ? 1 : -1) * (8 + Math.random() * 6) * dpr,
        vy: (3 + Math.random() * 3) * dpr,
        size: (10 + Math.random() * 14) * dpr,
        hue: 340 + Math.random() * 30,
        trail: [],
      });
    }

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(-16, -8, -10, -18, 0, -10);
      ctx.bezierCurveTo(10, -18, 16, -8, 0, 6);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function frame() {
      if (!starsRunning) return;

      ctx.fillStyle = 'rgba(8, 2, 6, 0.25)';
      ctx.fillRect(0, 0, W, H);

      twinkles.forEach(s => {
        s.a += s.s * (Math.random() < 0.02 ? -1 : 1);
        if (s.a < 0) s.a = 0;
        if (s.a > 1) s.a = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 220, ${s.a * 0.8})`;
        ctx.fill();
      });

      if (Math.random() < 0.04) spawnHeart();

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.trail.push({ x: h.x, y: h.y });
        if (h.trail.length > 20) h.trail.shift();

        for (let j = 0; j < h.trail.length; j++) {
          const p = h.trail[j];
          const alpha = (j / h.trail.length) * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (h.size * 0.15) * (j / h.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${h.hue}, 90%, 70%, ${alpha})`;
          ctx.fill();
        }

        drawHeart(h.x, h.y, h.size, `hsl(${h.hue}, 92%, 68%)`);
        drawHeart(h.x, h.y, h.size * 0.5, `rgba(255,255,255,0.9)`);

        h.x += h.vx;
        h.y += h.vy;
        h.vy += 0.05 * dpr;

        if (h.x < -100 * dpr || h.x > W + 100 * dpr || h.y > H + 100 * dpr) {
          hearts.splice(i, 1);
        }
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function renderLetter() {
    const target = document.getElementById('letterBody');
    if (target.dataset.rendered) return;
    target.dataset.rendered = '1';

    target.innerHTML = `
<p class="salutation">Dear Lopa (Aj/wain, or more fondly Girl/friend),</p>

<p>Your most consequential decree—the renewal of my Relationship Subscription for yet another glorious month—has been duly received, processed, and engraved upon the marble pillars of my heart with a permanence that no Terms-of-Service amendment could ever revoke. I am, dear madam, simultaneously elated, humbled, and rendered momentarily speechless (a condition, as you well know, of staggering rarity in my person).</p>

<p>To suggest that I merely "miss" you would be, once again, a grotesque understatement—a lexicographical travesty unworthy of either of us. What I experience, in the ungentle interim between our meetings, is nothing short of an existential lacuna, an ineffable void that your absence excavates within the topography of my otherwise tolerable quotidian existence. The hours stretch with the interminable languor of a parliamentary filibuster; the minutes conduct themselves with the sluggish dignity of bureaucrats nearing retirement.</p>

<p>And yet, with this most magnanimous renewal, you have—through some divine clerical error in your favour—elected to keep me, your incorrigible Bhin/di, on the active roster of your affections. For this, I extend my most profound, most theatrical, most embarrassingly heartfelt gratitude. The premium tier you grant me—unlimited bites at inopportune moments, perpetual access to your shoulder, exclusive licensing rights to call you Memsaab—remains, by some cosmic miscalculation, criminally underpriced.</p>

<p>I cannot wait, dear madam, to be in the same room as you again. To furnish the aforementioned arms for their prescribed therapeutic deployment. To bicker about nothing of consequence and laugh about everything of none. To watch you do that thing you do, the one you don't realise you do, that I notice every single time, and that I shall continue noticing until the cosmos elects to switch the lights off on us both.</p>

<p>Thank you, my love, for renewing my subscription. I promise to remain a feature-rich, occasionally buggy, but devotedly loyal product—one whose only true purpose is to keep making you laugh, keep showing up, and keep being yours.</p>

<p class="signoff">With profound affection, considerable longing, and an acceptance of all mild threats,</p>
<p class="signoff">Your boy/friend,</p>
<p class="signature">Uttakarsh (Bhin/di)</p>
    `;
  }

  window.__memsaab.startStars = startStars;
  window.__memsaab.renderLetter = renderLetter;
})();
