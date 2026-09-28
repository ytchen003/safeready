/* =========================================================
   STATE
   Central app state (XP, streak, best score, games played)
   plus localStorage persistence and the dashboard stat display.
   ========================================================= */

const state = {
  xp: Number(localStorage.getItem("safeReadyXP") || 0),
  streak: Number(localStorage.getItem("safeReadyStreak") || 0),
  bestScore: Number(localStorage.getItem("safeReadyBest") || 0),
  games: Number(localStorage.getItem("safeReadyGames") || 0),

  // Running totals kept for potential future stats; not shown directly yet.
  correct: 0,
  total: 0,

  // Live quiz-session state, reset every time a quiz starts.
  quiz: {
    topic: "all",
    difficulty: "easy",
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    skipped: []
  }
};

// Persist the durable stats (XP, streak, best score, games played).
function saveState() {
  localStorage.setItem("safeReadyXP", state.xp);
  localStorage.setItem("safeReadyStreak", state.streak);
  localStorage.setItem("safeReadyBest", state.bestScore);
  localStorage.setItem("safeReadyGames", state.games);
}

// Add experience points, save, and refresh every stat display on screen.
function addXP(amount) {
  state.xp += amount;
  saveState();
  updateStats();
}

// Push the current state values into the dashboard/header UI.
function updateStats() {
  $("xpValue").textContent = state.xp;
  $("dashboardXp").textContent = state.xp + " XP";
  $("streakValue").textContent = state.streak;
  $("bestScoreValue").textContent = state.bestScore + "%";
  $("gamesValue").textContent = state.games;
}
