/* =========================================================
   EMERGENCY SORT
   Fast-paced true/false sorting game: decide whether each
   item belongs in an emergency kit before the clock runs out.
   ========================================================= */

const sortItems = [
  { name: "Flashlight", icon: "🔦", kit: true },
  { name: "Water", icon: "💧", kit: true },
  { name: "First-aid supplies", icon: "🩹", kit: true },
  { name: "Power bank", icon: "🔋", kit: true },
  { name: "Emergency radio", icon: "📻", kit: true },
  { name: "Blanket", icon: "🧣", kit: true },
  { name: "Fireworks", icon: "🎆", kit: false },
  { name: "Glass decoration", icon: "🏺", kit: false },
  { name: "Fresh ice cream", icon: "🍦", kit: false },
  { name: "Gaming console", icon: "🎮", kit: false }
];

let sortState = {
  items: [],
  index: 0,
  score: 0,
  time: 30,
  timer: null,
  active: false
};

// Inject this game's skeleton markup into its panel.
$("game-sort").innerHTML = `
  <div class="game-intro">
    <h3>🧰 Emergency Sort</h3>
    <p>Decide whether each item belongs in an emergency kit before time runs out.</p>
  </div>

  <button id="startSortButton" class="primary-btn">Start</button>

  <div id="sortGameArea" class="hidden">
    <div class="sort-top">
      <span>Round <span id="sortRound"></span></span>
      <span>Score: <strong id="sortScore">0</strong></span>
      <span>Time: <strong id="sortTime">30</strong>s</span>
    </div>

    <div id="sortItem" class="sort-item"></div>

    <div class="sort-actions">
      <button id="sortKitButton" class="primary-btn">Kit Item ✅</button>
      <button id="sortNoButton" class="secondary-btn">Not Needed ❌</button>
    </div>

    <div id="sortFeedback" class="feedback hidden"></div>
  </div>

  <div id="sortResult" class="result-card hidden">
    <div class="result-icon">🧰</div>
    <h3>Round Complete</h3>
    <p id="sortResultText"></p>
    <button id="restartSortButton" class="primary-btn">Play Again</button>
  </div>
`;

// Shuffle the item deck and start the 30-second countdown.
function startSort() {
  if (sortState.timer) clearInterval(sortState.timer);

  sortState.items = shuffle([...sortItems]);
  sortState.index = 0;
  sortState.score = 0;
  sortState.time = 30;
  sortState.active = true;

  $("sortGameArea").classList.remove("hidden");
  $("sortResult").classList.add("hidden");

  $("sortKitButton").disabled = false;
  $("sortNoButton").disabled = false;

  renderSortItem();

  sortState.timer = setInterval(() => {
    sortState.time--;
    $("sortTime").textContent = sortState.time;

    if (sortState.time <= 0) {
      finishSort();
    }
  }, 1000);
}

// Show the current item to sort.
function renderSortItem() {
  const item = sortState.items[sortState.index];

  if (!item) {
    finishSort();
    return;
  }

  $("sortRound").textContent = `${sortState.index + 1} / ${sortState.items.length}`;
  $("sortScore").textContent = sortState.score;
  $("sortItem").textContent = `${item.icon} ${item.name}`;
  $("sortFeedback").classList.add("hidden");
}

// Check the player's kit / not-needed call against the item's actual answer.
function answerSort(putInKit) {
  if (!sortState.active) return;

  const item = sortState.items[sortState.index];
  const correct = item.kit === putInKit;

  if (correct) {
    sortState.score++;
    addXP(2);
    $("sortFeedback").textContent = "Correct sorting decision.";
  } else {
    $("sortFeedback").textContent = item.kit
      ? "This would be useful in an emergency kit."
      : "This is not a priority emergency-kit item.";
  }

  $("sortFeedback").classList.remove("hidden");

  sortState.index++;

  setTimeout(() => {
    if (sortState.active) renderSortItem();
  }, 350);
}

// Stop the timer and show the final score.
function finishSort() {
  if (!sortState.active) return;

  sortState.active = false;
  clearInterval(sortState.timer);
  sortState.timer = null;

  $("sortKitButton").disabled = true;
  $("sortNoButton").disabled = true;

  $("sortGameArea").classList.add("hidden");
  $("sortResult").classList.remove("hidden");

  const total = sortItems.length;
  $("sortResultText").textContent =
    `You correctly sorted ${sortState.score} of ${total} items.`;

  state.games++;
  addXP(sortState.score * 2);
}

$("startSortButton").addEventListener("click", startSort);
$("restartSortButton").addEventListener("click", startSort);
$("sortKitButton").addEventListener("click", () => answerSort(true));
$("sortNoButton").addEventListener("click", () => answerSort(false));
