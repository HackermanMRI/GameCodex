/* polish.js — reveal, count-up, tilt, liquid nav pill. Runs after page scripts. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const all = document.querySelectorAll('.hero-banner,.stats-row,.chart-section,.panel-section,.specs-section,.showcase-section,.game-tile');
  const countUp = el => el.querySelectorAll('.stat-num').forEach(n => {
    const to = parseInt(n.textContent, 10); if (isNaN(to) || to < 2) return;
    const t0 = performance.now();
    (function tick(t) { const p = Math.min(1, (t - t0) / 900); n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
  });
  if (!RM && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      if (e.target.matches('.stats-row')) countUp(e.target);
    }), { threshold: .1 });
    all.forEach((t, i) => { t.classList.add('reveal'); if (t.matches('.game-tile')) t.style.setProperty('--d', (i % 4) * 70 + 'ms'); io.observe(t); });
  } else document.querySelectorAll('.chart-section').forEach(t => t.classList.add('in'));
  if (!RM && fine) {
    const SEL = '.game-tile,.carousel-card.active';
    document.addEventListener('pointermove', e => {
      const t = e.target.closest && e.target.closest(SEL); if (!t) return;
      const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg'); t.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
      t.style.setProperty('--mx', x * 100 + '%'); t.style.setProperty('--my', y * 100 + '%');
    });
    document.addEventListener('pointerout', e => {
      const t = e.target.closest && e.target.closest(SEL);
      if (t && !t.contains(e.relatedTarget)) { t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); }
    });
  }
  const links = document.querySelector('.nav-links');
  if (links) {
    const pill = document.createElement('span'); pill.className = 'nav-pill'; pill.setAttribute('aria-hidden', 'true'); links.prepend(pill);
    const to = a => { if (!a) return; pill.style.width = a.offsetWidth + 'px'; pill.style.transform = `translateX(${a.offsetLeft}px)`; };
    const home = () => to(links.querySelector('.active'));
    links.querySelectorAll('.nav-link').forEach(a => { a.addEventListener('mouseenter', () => to(a)); a.addEventListener('focus', () => to(a)); });
    links.addEventListener('mouseleave', home); links.addEventListener('focusout', home);
    pill.style.transition = 'none'; home(); requestAnimationFrame(() => pill.style.transition = '');
    addEventListener('resize', home);
  }
})();
