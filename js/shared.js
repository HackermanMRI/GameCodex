/* =============================================================
   shared.js — GameCodex
   ---------------------------------------------------------------
   Pure utility layer. No localStorage. No user input.
   All data comes from GAME_DATA in games-data.js.
   GAME_DATA is now a flat array — no nested franchise wrapper.
   ============================================================= */

const MONTH_ORDER = {
  January:1, February:2, March:3, April:4, May:5, June:6,
  July:7, August:8, September:9, October:10, November:11, December:12
};

/**
 * getFlatGames()
 * Returns GAME_DATA as-is with sortKey injected.
 * sortKey = year*100 + monthIndex (used only for top-rated tiebreak).
 */
function getFlatGames() {
  return GAME_DATA.map(g => ({
    ...g,
    sortKey: g.year * 100 + (MONTH_ORDER[g.month] || 0)
  }));
}

/**
 * getTopRated(n)
 * Returns top N games sorted by rating desc.
 * Ties broken by most recent sortKey.
 */
function getTopRated(n = 5) {
  return [...getFlatGames()]
    .sort((a, b) => b.rating - a.rating || b.sortKey - a.sortKey)
    .slice(0, n);
}

/**
 * getLatest(n)
 * Returns last N games in ARRAY ORDER — bottom of array = most recent.
 * No date sorting. Order is exactly as written in games-data.js.
 */
function getLatest(n = 10) {
  return [...GAME_DATA].slice(0, n);
}

/**
 * getYearMap()
 * Returns { "2021": 3, "2022": 5, ... } — games completed per year.
 */
function getYearMap() {
  const map = {};
  GAME_DATA.forEach(g => {
    map[g.year] = (map[g.year] || 0) + 1;
  });
  return map;
}

/**
 * getFranchiseCount()
 * Counts unique franchiseId values across all games.
 */
function getFranchiseCount() {
  return new Set(GAME_DATA.map(g => g.franchiseId)).size;
}

/**
 * setActiveNav(pageId)
 * Highlights the nav link whose data-page matches pageId.
 */
function setActiveNav(pageId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) link.classList.add('active');
  });
}
