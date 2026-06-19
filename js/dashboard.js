/* =============================================================
   dashboard.js — GameCodex
   ============================================================= */

const MY_SPECS = {
  CPU:     "AMD Ryzen 5 5600",
  AIO: "Deepcool LM360 ARGB AIO Cooler",
  Motherboard: "ASUS TUF Gaming B550m-Plus",
  GPU:     "MSI NVIDIA GTX 1660 Super",
  RAM:     "Corsair 16GB DDR4 3200MHz",
  Storage: "Kingston KC3000 2TB Gen4 NVMe SSD",
  Power_supply: "Corsair CX550M 550W 80+ Bronze",
  Monitor1: "Viewsonic VX2479 24\" 1080p 180Hz",
  Monitor2: "MSI MP225 22\" 1080p 100Hz",
  Monitor_arm: "Kaloc KC-DS200",
  Case: "Revenger Air Tank BTF Full Tower Case",
  Case_Fans: "Asiahorse Nayota pro ARGB 120mm (x7)",
  Keyboard: "Gravaster Mercury K1 Lite",
  Controller: "Fantech Shooter II",
};

const BANNER_IMAGE = "images/banner.png";

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
  const years     = Object.keys(yearMap).sort();

  if (years.length === 0) {
    container.innerHTML = `<div class="empty-state" style="width:100%">
      <p>ADD GAMES TO games-data.js TO SEE YOUR CHART</p></div>`;
    return;
  }

  const max = Math.max(...Object.values(yearMap));
  container.innerHTML = years.map(year => `
    <div class="chart-col">
      <div class="chart-bar" style="height:${Math.max(8,(yearMap[year]/max)*130)}px">
        <div class="bar-tooltip">${yearMap[year]} game${yearMap[year]>1?'s':''}</div>
      </div>
      <span class="chart-year">${year}</span>
    </div>
  `).join('');
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

  const rankMeta = [
    { rank: 1, label: '🥇', glowColor: 'rgba(255,215,0,0.6)',   borderColor: '#ffd700', order: 3, scale: 1,    yOffset: '-20px', opacity: 1    },
    { rank: 2, label: '🥈', glowColor: 'rgba(192,192,192,0.4)', borderColor: '#c0c0c0', order: 2, scale: 0.88, yOffset: '0px',   opacity: 0.9  },
    { rank: 3, label: '🥉', glowColor: 'rgba(205,127,50,0.4)',  borderColor: '#cd7f32', order: 4, scale: 0.88, yOffset: '0px',   opacity: 0.9  },
    { rank: 4, label: '4',  glowColor: 'rgba(0,245,255,0.15)',  borderColor: 'rgba(0,245,255,0.2)', order: 1, scale: 0.75, yOffset: '10px', opacity: 0.6 },
    { rank: 5, label: '5',  glowColor: 'rgba(0,245,255,0.15)',  borderColor: 'rgba(0,245,255,0.2)', order: 5, scale: 0.75, yOffset: '10px', opacity: 0.6 },
  ];

  container.innerHTML = games.map((g, i) => {
    const meta   = rankMeta[i];
    const imgSrc = g.image || '';

    return `
      <div class="podium-card podium-rank-${meta.rank}"
           style="order:${meta.order};transform:scale(${meta.scale}) translateY(${meta.yOffset});opacity:${meta.opacity};">
        <div class="podium-rank-badge" style="border-color:${meta.borderColor};color:${meta.borderColor};">
          ${meta.label}
        </div>
        <div class="podium-img-wrap" style="box-shadow:0 0 30px ${meta.glowColor}, 0 0 60px ${meta.glowColor};border-color:${meta.borderColor};">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${g.name}">`
            : `<div class="podium-img-placeholder">🎮</div>`}
        </div>
        <div class="podium-info">
          <div class="podium-name">${g.name}</div>
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
          ? `<img src="${g.image}" alt="${g.name}">`
          : `<div class="carousel-img-placeholder">🎮</div>`}
      </div>
      <div class="carousel-info">
        <div class="carousel-name">${g.name}</div>
        <div class="carousel-rating">${g.rating}/10</div>
        <div class="carousel-year">${g.month ? g.month + ' ' : ''}${g.year}</div>
        ${g.note ? `<div class="carousel-note">"${g.note}"</div>` : ''}
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
}

function advanceCarousel() {
  carouselIndex = (carouselIndex + 1) % carouselGames.length;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const cards     = track.querySelectorAll('.carousel-card');
  const cardWidth = 200; // px — matches CSS
  const gap       = 24;  // px — matches CSS gap
  const step      = cardWidth + gap;

  // Center the active card in the viewport
  const containerWidth = track.parentElement.offsetWidth || 900;
  const offset = (containerWidth / 2) - (cardWidth / 2) - (carouselIndex * step);

  track.style.transform = `translateX(${offset}px)`;

  cards.forEach((card, i) => {
    const dist = Math.abs(i - carouselIndex);
    card.classList.remove('active', 'near', 'far');
    if      (dist === 0) card.classList.add('active');
    else if (dist === 1) card.classList.add('near');
    else                 card.classList.add('far');
  });
}

/* ── RENDER SPECS ────────────────────────────────────────────── */
function renderSpecs() {
  const grid = document.getElementById('specsGrid');
  grid.innerHTML = Object.entries(MY_SPECS).map(([key, val]) => `
    <div class="spec-item">
      <span class="spec-key">${key}</span>
      <span class="spec-val">${val || '—'}</span>
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
