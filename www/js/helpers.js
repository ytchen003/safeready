/* =========================================================
   HELPERS
   Small, generic utilities shared by every other script file.
   Must be loaded FIRST — everything else depends on $().
   ========================================================= */

// Shorthand for document.getElementById, used everywhere.
function $(id) {
  return document.getElementById(id);
}

// Fisher–Yates shuffle. Returns a new shuffled array
// and never mutates the one passed in.
function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Keeps a number inside the 0–100 range, used by meter/progress values.
function clamp(value) {
  return Math.max(0, Math.min(100, value));
}
