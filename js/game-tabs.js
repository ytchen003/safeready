/* =========================================================
   GAME TABS
   Switches which of the six game panels is visible on the
   Games screen.
   ========================================================= */

document.querySelectorAll(".game-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".game-tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".game-panel").forEach(p => p.classList.remove("active"));

    button.classList.add("active");
    $("game-" + button.dataset.game).classList.add("active");
  });
});
