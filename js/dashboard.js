/* =============================================================
   dashboard.js — GameCodex
   ============================================================= */

const MY_SPECS = {
  CPU:     "AMD Ryzen 5 5600",
  AIO: "Deepcool LM360 ARGB AIO Cooler",
  Motherboard: "ASUS TUF Gaming B550m-Plus",
  GPU:     "MSI NVIDIA GTX 1660 Super",
  RAM:     "Corsair 16GB DDR4 3200MHz",
  Storage: "Kingston KC3000 1TB Gen4 NVMe SSD",
  Power_supply: "Corsair CX550M 550W 80+ Bronze",
  Monitor1: "Viewsonic VX2479 24\" 1080p 180Hz",
  Monitor2: "MSI MP225 22\" 1080p 100Hz",
  Monitor_arm: "Kaloc KC-DS200",
  Case: "Revenger Air Tank BTF Full Tower Case",
  Case_Fans: "Asiahorse Nayota pro ARGB 120mm (x7)",
  Keyboard: "Gravaster Mercury K1 Lite",
  Controller: "Fantech Shooter II",
};

const BANNER_IMAGE = "images/banner.webp";

/* ── RENDER STATS ────────────────────────────────────────────── */
function renderStats() {
  const currentYear = new Date().getFullYear();
  const thisYear    = GAME_DATA.filter(g => g.year === currentYear).length;
  const yearMap     = getYearMap();
  const activeYear  = Object.keys(yearMap).sort((a,b) => yearMap[b]-yearMap[a])[0] || '—';

  document.getElementById('statTotal').textContent      = GAME_DATA.length;
  document.getElementById('statYear').textContent       = thisYear;
  document.getElementById('statYearLabel').textContent  = `In ${currentYear}`;
  document.getElementById('statFranchises').textContent = getFranchiseCount();
  document.getElementById('statActiveYear').textContent = activeYear;
}

/* ── RENDER CHART ────────────────────────────────────────────── */
function renderChart() {
  const container = document.getElementById('chartBars');
  const yearMap   = getYearMap();
  const ys = Object.keys(yearMap).map(Number);
  if (ys.length === 0) {
    container.innerHTML = `<div class="empty-state" style="width:100%"><p>ADD GAMES TO games-data.js TO SEE YOUR CHART</p></div>`;
    return;
  }
  // Continuous axis: years with no games show as empty ticks instead of being silently skipped.
  const lo = Math.min(...ys), hi = Math.max(...ys), max = Math.max(...Object.values(yearMap));
  let html = '';
  for (let y = lo; y <= hi; y++) {
    const c = yearMap[y] || 0;
    html += `<div class="chart-col${c ? '' : ' empty'}" role="listitem" aria-label="${y}: ${c} game${c === 1 ? '' : 's'}" style="--i:${y - lo}">
      <span class="bar-val">${c || ''}</span>
      <div class="chart-bar" style="--h:${c ? Math.max(8, c / max * 110) : 3}px"></div>
      <span class="chart-year" data-s="'${String(y).slice(2)}">${y}</span></div>`;
  }
  container.setAttribute('role', 'list');
  container.setAttribute('aria-label', 'Games played per year');
  container.innerHTML = html;
}

/* ── TOP RATED PODIUM ────────────────────────────────────────── */
/*
  Podium layout (left to right in DOM):
  index 0 → rank 2  (silver, left)
  index 1 → rank 1  (gold,   center + elevated)
  index 2 → rank 3  (bronze, right)
  index 3 → rank 4  (dim,    far left)
  index 4 → rank 5  (dim,    far right)

  Visual order via CSS order property:
  rank4  rank2  rank1  rank3  rank5
*/
function renderTopRated() {
  const container = document.getElementById('topRatedPodium');
  const games     = getTopRated(5);

  if (games.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>NO GAMES YET</p></div>`;
    return;
  }

  /* Layout data (order / scale / y-offset / opacity) now lives in
     dashboard.css under the .podium-rank-N classes. Inline styles
     always beat media queries, which is exactly what broke the
     mobile layout before — CSS classes let each breakpoint restyle
     the ranks freely. Only per-rank COLORS stay here in JS. */
  const rankMeta = [
    { rank: 1, label: '🥇', glowColor: 'rgba(255,215,0,0.6)',   borderColor: '#ffd700' },
    { rank: 2, label: '🥈', glowColor: 'rgba(192,192,192,0.4)', borderColor: '#c0c0c0' },
    { rank: 3, label: '🥉', glowColor: 'rgba(205,127,50,0.4)',  borderColor: '#cd7f32' },
    { rank: 4, label: '4',  glowColor: 'rgba(0,245,255,0.15)',  borderColor: 'rgba(0,245,255,0.2)' },
    { rank: 5, label: '5',  glowColor: 'rgba(0,245,255,0.15)',  borderColor: 'rgba(0,245,255,0.2)' },
  ];

  container.innerHTML = games.map((g, i) => {
    const meta   = rankMeta[i];
    const imgSrc = g.image || '';

    return `
      <div class="podium-card podium-rank-${meta.rank}">
        <div class="podium-rank-badge" style="border-color:${meta.borderColor};color:${meta.borderColor};">
          ${meta.label}
        </div>
        <div class="podium-img-wrap" style="box-shadow:0 0 30px ${meta.glowColor}, 0 0 60px ${meta.glowColor};border-color:${meta.borderColor};">
          ${imgSrc
            ? `<img src="${esc(imgSrc)}" alt="${esc(g.name)}">`
            : `<div class="podium-img-placeholder">🎮</div>`}
        </div>
        <div class="podium-info">
          <div class="podium-name">${esc(g.name)}</div>
          <div class="podium-rating" style="color:${meta.borderColor};text-shadow:0 0 10px ${meta.glowColor};">
            ${g.rating}/10
          </div>
          <div class="podium-year">${g.month ? g.month + ' ' : ''}${g.year}</div>
        </div>
      </div>`;
  }).join('');
}

/* ── LATEST CAROUSEL ─────────────────────────────────────────── */
/*
  Conveyor belt carousel.
  - Cards rendered in a track that shifts left every 3s.
  - Center card = active (bigger, full opacity).
  - Uses CSS transform on the track to slide cards.
  - Loops infinitely by resetting position when end is reached.
*/
let carouselIndex  = 0;
let carouselTimer  = null;
let carouselGames  = [];
let carouselHover  = false;
let carouselPaused = matchMedia('(prefers-reduced-motion: reduce)').matches; // no autoplay for reduced-motion users

function renderLatestCarousel() {
  const container = document.getElementById('latestCarousel');
  carouselGames   = getLatest(10);

  if (carouselGames.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>NO GAMES YET</p></div>`;
    return;
  }

  // Build track with all cards
  const track = document.createElement('div');
  track.className = 'carousel-track';
  track.id        = 'carouselTrack';

  track.innerHTML = carouselGames.map((g, i) => `
    <div class="carousel-card" data-index="${i}">
      <div class="carousel-img-wrap">
        ${g.image
          ? `<img src="${esc(g.image)}" alt="${esc(g.name)}">`
          : `<div class="carousel-img-placeholder">🎮</div>`}
      </div>
      <div class="carousel-info">
        <div class="carousel-name">${esc(g.name)}</div>
        <div class="carousel-rating">${g.rating}/10</div>
        <div class="carousel-year">${g.month ? g.month + ' ' : ''}${g.year}</div>
        ${g.note ? `<div class="carousel-note">"${esc(g.note)}"</div>` : ''}
      </div>
    </div>
  `).join('');

  container.innerHTML = '';
  container.appendChild(track);

  carouselIndex = 0;
  updateCarousel();

  // Clear any existing timer before starting a new one
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(advanceCarousel, 6000);
  initCarouselControls(container);
}

function advanceCarousel() { if (!carouselPaused && !carouselHover) goCarousel(carouselIndex + 1); }
function goCarousel(i) { carouselIndex = (i + carouselGames.length) % carouselGames.length; updateCarousel(); }

/* Coverflow: each card gets a signed circular offset d from the active one. Cards >3 away fade out,
   so the wrap-around jump (last -> first) happens while invisible — no more 2000px rewind sweep. */
function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track || !track.children.length) return;
  const cards = [...track.children], n = cards.length;
  const step = cards[0].offsetWidth + 24;
  cards.forEach((c, i) => {
    let d = ((i - carouselIndex) % n + n) % n; if (d > n / 2) d -= n;
    const a = Math.abs(d);
    c.style.setProperty('--x', d * step + 'px');
    c.classList.toggle('active', d === 0); c.classList.toggle('near', a === 1);
    c.classList.toggle('far', a >= 2); c.classList.toggle('gone', a > 3);
    if (d === 0) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
  });
}

function initCarouselControls(container) {
  const box = container.parentElement; box.querySelector('.car-ctrl')?.remove();
  const bar = document.createElement('div'); bar.className = 'car-ctrl';
  bar.innerHTML = `<button type="button" data-a="prev" aria-label="Previous game">‹</button><button type="button" data-a="pause" aria-label="${carouselPaused ? 'Resume' : 'Pause'} auto-advance">${carouselPaused ? '▶' : '❚❚'}</button><button type="button" data-a="next" aria-label="Next game">›</button>`;
  box.appendChild(bar);
  bar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'prev') goCarousel(carouselIndex - 1);
    else if (b.dataset.a === 'next') goCarousel(carouselIndex + 1);
    else { carouselPaused = !carouselPaused; b.textContent = carouselPaused ? '▶' : '❚❚'; b.setAttribute('aria-label', (carouselPaused ? 'Resume' : 'Pause') + ' auto-advance'); }
  });
  container.tabIndex = 0; container.setAttribute('role', 'region');
  container.setAttribute('aria-roledescription', 'carousel'); container.setAttribute('aria-label', 'Recently played games');
  container.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') goCarousel(carouselIndex - 1); if (e.key === 'ArrowRight') goCarousel(carouselIndex + 1); });
  ['mouseenter', 'focusin'].forEach(t => container.addEventListener(t, () => carouselHover = true));
  ['mouseleave', 'focusout'].forEach(t => container.addEventListener(t, () => carouselHover = false));
  let sx = null;
  container.addEventListener('pointerdown', e => sx = e.clientX);
  container.addEventListener('pointerup', e => { if (sx !== null && Math.abs(e.clientX - sx) > 40) goCarousel(carouselIndex + (e.clientX < sx ? 1 : -1)); sx = null; });
  container.addEventListener('click', e => { const c = e.target.closest('.carousel-card'); if (c && !c.classList.contains('active')) goCarousel(+c.dataset.index); });
}

/* ── RENDER SPECS ────────────────────────────────────────────── */
function renderSpecs() {
  const grid = document.getElementById('specsGrid');
  grid.innerHTML = Object.entries(MY_SPECS).map(([key, val]) => `
    <div class="spec-item">
      <span class="spec-key">${esc(key.replace(/_/g, ' ').replace(/([a-z])(\d)/i, '$1 $2'))}</span>
      <span class="spec-val">${esc(val) || '—'}</span>
    </div>
  `).join('');
}

/* ── RENDER BANNER ───────────────────────────────────────────── */
function renderBanner() {
  const banner = document.getElementById('heroBanner');
  if (BANNER_IMAGE) {
    banner.style.backgroundImage    = `url('${BANNER_IMAGE}')`;
    banner.style.backgroundSize     = 'cover';
    banner.style.backgroundPosition = 'center';
  }
}

/* ── INIT ────────────────────────────────────────────────────── */
setActiveNav('dashboard');
renderBanner();
renderStats();
renderChart();
renderTopRated();
renderLatestCarousel();
renderSpecs();

// Recalculate carousel offset if window is resized
window.addEventListener('resize', updateCarousel);