/* =========================================================
   KIT CHECKLIST
   The static checklist of recommended emergency-kit items,
   with checked state saved to localStorage and a progress bar.
   ========================================================= */

const kitItems = [
  ["Water", "At least several litres per person for emergencies.", "💧"],
  ["Non-perishable food", "Food that can be stored safely without refrigeration.", "🥫"],
  ["Flashlight", "Preferably with spare batteries.", "🔦"],
  ["First-aid supplies", "Basic wound and first-aid materials.", "🩹"],
  ["Phone power bank", "Useful during power outages.", "🔋"],
  ["Emergency radio", "Helps receive important updates.", "📻"],
  ["Whistle", "Can help attract attention.", "📯"],
  ["Blanket", "Useful for warmth and shelter.", "🧣"],
  ["Essential medication", "Keep necessary medicines accessible.", "💊"],
  ["Copies of documents", "Keep important information protected.", "📄"],
  ["Hand sanitiser", "Useful when clean water is limited.", "🧴"],
  ["Basic tools", "Useful for simple emergency tasks.", "🔧"]
];

const savedKit = JSON.parse(localStorage.getItem("safeReadyKit") || "[]");

// Render each item as a checkbox row, restoring any previously saved state.
$("kitGrid").innerHTML = kitItems.map(([name, description, icon], index) => `
    <label class="kit-item">
      <input type="checkbox" data-kit="${index}" ${savedKit.includes(index) ? "checked" : ""}>
      <span style="font-size:25px">${icon}</span>
      <div>
        <strong>${name}</strong>
        <span>${description}</span>
      </div>
    </label>
  `).join("");

document.querySelectorAll("[data-kit]").forEach(input => {
  input.addEventListener("change", updateKit);
});

// Save which items are checked and refresh the "prepared" progress bar.
function updateKit() {
  const checked = [...document.querySelectorAll("[data-kit]:checked")]
    .map(input => Number(input.dataset.kit));

  localStorage.setItem("safeReadyKit", JSON.stringify(checked));

  const percentage = Math.round((checked.length / kitItems.length) * 100);

  $("kitProgress").style.width = percentage + "%";
  $("kitProgressText").textContent = percentage + "%";
}

updateKit();
