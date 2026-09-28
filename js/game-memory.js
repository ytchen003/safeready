/* =========================================================
   MEMORY MATCH
   Classic flip-two-cards memory game using emergency-kit icons.
   ========================================================= */

const memorySymbols = ["💧", "🔦", "🩹", "📱", "🔋", "🥫", "🧯", "📻"];

let memoryCards = [];
let firstCard = null;
let secondCard = null;
let memoryLocked = false;
let memoryMatches = 0;
let memoryTimer = null;
let memoryCompleted = false;

// Inject this game's skeleton markup into its panel.
$("game-memory").innerHTML = `
  <div class="game-intro">
    <h3>🧠 Memory Match</h3>
    <p>Match pairs of emergency-kit icons as quickly as you can.</p>
  </div>
  <p id="memoryStatus" class="game-status"></p>
  <div id="memoryGrid" class="memory-grid"></div>
  <button id="resetMemoryButton" class="secondary-btn">Restart</button>
`;

// Shuffle a fresh deck of 8 matched pairs and reset round state.
function startMemory() {
  if (memoryTimer) {
    clearTimeout(memoryTimer);
    memoryTimer = null;
  }

  firstCard = null;
  secondCard = null;
  memoryLocked = false;
  memoryMatches = 0;
  memoryCompleted = false;

  const deck = shuffle([...memorySymbols, ...memorySymbols]);

  memoryCards = deck.map((symbol, index) => ({
    id: index,
    symbol,
    revealed: false,
    matched: false
  }));

  renderMemory();
  $("memoryStatus").textContent = "Find all 8 pairs.";
}

// Draw the 4x4 grid of face-down/face-up/matched cards.
function renderMemory() {
  $("memoryGrid").innerHTML = memoryCards.map(card => `
      <button class="memory-card ${card.revealed || card.matched ? "revealed" : ""} ${card.matched ? "matched" : ""}"
        data-memory="${card.id}">
        ${card.revealed || card.matched ? card.symbol : "?"}
      </button>
    `).join("");

  document.querySelectorAll("[data-memory]").forEach(button => {
    button.addEventListener("click", () => memoryClick(Number(button.dataset.memory)));
  });
}

// Flip a card; on the second flip of a pair, check for a match.
function memoryClick(id) {
  if (memoryLocked) return;

  const card = memoryCards[id];
  if (!card || card.revealed || card.matched) return;

  card.revealed = true;

  if (!firstCard) {
    firstCard = card;
    renderMemory();
    return;
  }

  secondCard = card;
  memoryLocked = true;
  renderMemory();

  if (firstCard.symbol === secondCard.symbol) {
    firstCard.matched = true;
    secondCard.matched = true;
    memoryMatches++;
    firstCard = null;
    secondCard = null;
    memoryLocked = false;

    $("memoryStatus").textContent = `Matched ${memoryMatches} of 8 pairs.`;
    renderMemory();

    if (memoryMatches === 8 && !memoryCompleted) {
      memoryCompleted = true;
      $("memoryStatus").textContent = "Complete! Press Restart to play again.";
      state.games++;
      addXP(25);
    }
  } else {
    // No match: flip both back after a short pause.
    memoryTimer = setTimeout(() => {
      firstCard.revealed = false;
      secondCard.revealed = false;
      firstCard = null;
      secondCard = null;
      memoryLocked = false;
      memoryTimer = null;
      renderMemory();
    }, 750);
  }
}

$("resetMemoryButton").addEventListener("click", startMemory);
startMemory();
