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
      ${GAME_DATA.map(g => gameTile(g)).join('')}
    </div>`;
}

/* ── GAME TILE (HTML builder) ────────────────────────────────── */
function gameTile(g) {
  const imgHtml = g.image
    ? `<img src="${g.image}" alt="${g.name}" class="tile-img">`
    : `<div class="tile-img-placeholder">🎮</div>`;

  const noteHtml = g.note
    ? `<div class="tile-note">"${g.note}"</div>`
    : '';

  // Star display — filled vs empty based on rating out of 10
  const stars = Array.from({length: 10}, (_, i) =>
    `<span class="tile-star ${i < g.rating ? 'filled' : ''}">${i < g.rating ? '★' : '☆'}</span>`
  ).join('');

  return `
    <div class="game-tile">
      <div class="tile-img-wrap">
        ${imgHtml}
        <div class="tile-img-overlay"></div>
        <div class="tile-rating-badge">${g.rating}/10</div>
      </div>
      <div class="tile-body">
        <div class="tile-name">${g.name}</div>
        <div class="tile-franchise">${g.franchiseName || ''}</div>
        <div class="tile-stars">${stars}</div>
        <div class="tile-meta">${g.month ? g.month + ' ' : ''}${g.year}</div>
        ${noteHtml}
      </div>
    </div>`;
}

/* ── INIT ────────────────────────────────────────────────────── */
setActiveNav('games');
renderGameList();
