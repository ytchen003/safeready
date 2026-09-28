/* =========================================================
   KIT CHALLENGE
   A 30-second drag-and-drop (or tap, on touch devices) game:
   pack the essential items into the backpack and leave the
   decoys behind. All the markup already exists in index.html
   under the "Emergency Kit" screen.
   ========================================================= */

// Pool of items for the challenge: some belong in a kit, some don't.
const kitChallengePool = [
  { name: "Flashlight", icon: "🔦", kit: true },
  { name: "Water bottle", icon: "💧", kit: true },
  { name: "First-aid kit", icon: "🩹", kit: true },
  { name: "Power bank", icon: "🔋", kit: true },
  { name: "Emergency radio", icon: "📻", kit: true },
  { name: "Whistle", icon: "📯", kit: true },
  { name: "Fireworks", icon: "🎆", kit: false },
  { name: "Glass vase", icon: "🏺", kit: false },
  { name: "Ice cream", icon: "🍦", kit: false },
  { name: "Game console", icon: "🎮", kit: false }
];

const KIT_CHALLENGE_TARGET = 4; // correct items needed to complete a round
const KIT_CHALLENGE_TIME = 30;  // seconds per round

const kitChallengeState = {
  items: [],
  packedCount: 0,
  score: 0,
  time: KIT_CHALLENGE_TIME,
  timer: null,
  active: false
};

// Pick enough kit items to reach the target, add a few decoys, and shuffle.
function buildKitChallengeRound() {
  const kitOnly = shuffle(kitChallengePool.filter(item => item.kit));
  const decoysOnly = shuffle(kitChallengePool.filter(item => !item.kit));

  const chosenKit = kitOnly.slice(0, KIT_CHALLENGE_TARGET);
  const chosenDecoys = decoysOnly.slice(0, 4);

  return shuffle([...chosenKit, ...chosenDecoys]).map((item, index) => ({
    ...item,
    id: index,
    packed: false
  }));
}

// Start (or restart) a round.
function startKitChallenge() {
  if (kitChallengeState.timer) clearInterval(kitChallengeState.timer);

  kitChallengeState.items = buildKitChallengeRound();
  kitChallengeState.packedCount = 0;
  kitChallengeState.score = 0;
  kitChallengeState.time = KIT_CHALLENGE_TIME;
  kitChallengeState.active = true;

  $("kitChallengeResult").classList.add("hidden");
  $("kitChallengeArea").classList.remove("hidden");
  $("kitChallengeFeedback").classList.add("hidden");
  $("kitChallengeStatus").textContent = "Packing…";

  updateKitChallengeStats();
  renderKitChallengeItems();
  renderKitBackpackContents();

  kitChallengeState.timer = setInterval(() => {
    kitChallengeState.time--;
    $("kitChallengeTime").textContent = kitChallengeState.time;

    if (kitChallengeState.time <= 0) {
      finishKitChallenge();
    }
  }, 1000);
}

// Refresh the score / timer / packed-count readouts.
function updateKitChallengeStats() {
  $("kitChallengeTime").textContent = kitChallengeState.time;
  $("kitChallengeScore").textContent = kitChallengeState.score;
  $("kitChallengePacked").textContent =
    `${kitChallengeState.packedCount} / ${KIT_CHALLENGE_TARGET}`;
}

// Draw the pool of draggable/tappable item buttons.
function renderKitChallengeItems() {
  $("kitChallengeItems").innerHTML = kitChallengeState.items.map(item => `
    <button
      class="challenge-item ${item.packed ? "packed" : ""}"
      data-kit-challenge-item="${item.id}"
      draggable="${!item.packed}"
      ${item.packed ? "disabled" : ""}
    >
      <span>${item.icon}</span> ${item.name}
    </button>
  `).join("");

  document.querySelectorAll("[data-kit-challenge-item]").forEach(button => {
    const id = Number(button.dataset.kitChallengeItem);

    // Desktop drag-and-drop.
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", String(id));
    });

    // Tap-to-pack fallback for touch devices (and a quick way to play on desktop).
    button.addEventListener("click", () => attemptPackItem(id));
  });
}

// Show the items currently inside the backpack as small labels.
function renderKitBackpackContents() {
  const packed = kitChallengeState.items.filter(item => item.packed);

  $("kitBackpackContents").innerHTML = packed.map(item => `
    <span class="packed-item">${item.icon} ${item.name}</span>
  `).join("");
}

// Try to pack one item: correct items go in the backpack, wrong ones shake.
function attemptPackItem(id) {
  if (!kitChallengeState.active) return;

  const item = kitChallengeState.items.find(i => i.id === id);
  if (!item || item.packed) return;

  if (item.kit) {
    item.packed = true;
    kitChallengeState.packedCount++;
    kitChallengeState.score += 5;

    $("kitChallengeFeedback").textContent = `Packed: ${item.name}.`;
    renderKitChallengeItems();
    renderKitBackpackContents();
  } else {
    const button = document.querySelector(`[data-kit-challenge-item="${id}"]`);

    if (button) {
      button.classList.add("wrong");
      setTimeout(() => button.classList.remove("wrong"), 300);
    }

    $("kitChallengeFeedback").textContent =
      `${item.name} isn't an essential emergency item — left it out.`;
  }

  $("kitChallengeFeedback").classList.remove("hidden");
  updateKitChallengeStats();

  if (kitChallengeState.packedCount >= KIT_CHALLENGE_TARGET) {
    finishKitChallenge();
  }
}

// End the round, either from success or from the timer running out.
function finishKitChallenge() {
  if (!kitChallengeState.active) return;

  kitChallengeState.active = false;
  clearInterval(kitChallengeState.timer);
  kitChallengeState.timer = null;

  const success = kitChallengeState.packedCount >= KIT_CHALLENGE_TARGET;

  $("kitChallengeArea").classList.add("hidden");
  $("kitChallengeResult").classList.remove("hidden");

  $("kitChallengeResultTitle").textContent = success
    ? "Backpack ready!"
    : "Time's up";

  $("kitChallengeResultText").textContent = success
    ? `You packed ${kitChallengeState.packedCount} essential items with ${kitChallengeState.time}s to spare.`
    : `You packed ${kitChallengeState.packedCount} of ${KIT_CHALLENGE_TARGET} essential items before time ran out.`;

  state.games++;
  addXP(kitChallengeState.score);
  saveState();
}

/* ---------- Backpack drop-zone wiring (runs once) ---------- */

$("kitBackpack").addEventListener("dragover", (event) => {
  event.preventDefault();
  $("kitBackpack").classList.add("drag-over");
});

$("kitBackpack").addEventListener("dragleave", () => {
  $("kitBackpack").classList.remove("drag-over");
});

$("kitBackpack").addEventListener("drop", (event) => {
  event.preventDefault();
  $("kitBackpack").classList.remove("drag-over");

  const id = Number(event.dataTransfer.getData("text/plain"));
  attemptPackItem(id);
});

$("startKitChallengeButton").addEventListener("click", startKitChallenge);
$("restartKitChallengeButton").addEventListener("click", startKitChallenge);
