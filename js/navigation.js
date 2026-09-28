/* =========================================================
   NAVIGATION
   Switching between the five top-level screens (dashboard,
   guides, quiz, kit, games) and the dark/light theme toggle.
   ========================================================= */

// Show one <section class="screen"> and highlight the matching nav button.
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Any element with data-screen="..." (top nav, hero buttons) triggers a screen change.
document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

// Dark/light theme toggle, remembered across visits.
$("themeButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  $("themeButton").textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";

  localStorage.setItem(
    "safeReadyTheme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Restore the saved theme on load.
if (localStorage.getItem("safeReadyTheme") === "dark") {
  document.body.classList.add("dark");
  $("themeButton").textContent = "☀️";
}
