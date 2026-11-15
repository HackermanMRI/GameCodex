/* =============================================================
   games.js — GameCodex
   ---------------------------------------------------------------
   Flat tile grid. No grouping. No collapsing.
   Order = exactly as written in games-data.js.
   ============================================================= */

function renderGameList() {
  const container = document.getElementById('gameListContainer');

  if (!GAME_DATA || GAME_DATA.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="icon">🎮</span>
        <p>ADD GAMES TO js/games-data.js TO START YOUR ARCHIVE</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="tile-grid">
      ${getLatest(GAME_DATA.length).map(g => gameTile(g)).join('')}
    </div>`;
}

/* ── GAME TILE (HTML builder) ────────────────────────────────── */
function gameTile(g) {
  const imgHtml = g.image
    ? `<img src="${esc(g.image)}" alt="${esc(g.name)}" class="tile-img" loading="lazy" decoding="async">`
    : `<div class="tile-img-placeholder">🎮</div>`;

  const noteHtml = g.note
    ? `<div class="tile-note">"${esc(g.note)}"</div>`
    : '';


  return `
    <div class="game-tile">
      <div class="tile-img-wrap">
        ${imgHtml}
        <div class="tile-img-overlay"></div>
        <div class="tile-rating-badge">${g.rating}/10</div>
      </div>
      <div class="tile-body">
        <div class="tile-name">${esc(g.name)}</div>
        <div class="tile-franchise">${esc(g.franchiseName)}</div>
        ${ratingMeter(g.rating)}
        <div class="tile-meta">${g.month ? g.month + ' ' : ''}${g.year}</div>
        ${noteHtml}
      </div>
    </div>`;
}

/* ── INIT ────────────────────────────────────────────────────── */
setActiveNav('games');
renderGameList();
