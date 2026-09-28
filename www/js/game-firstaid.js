/* =========================================================
   FIRST-AID RUSH
   Put the steps of a first-aid response into the correct
   order, across several scenarios, before running out of
   lives (3) or time (25s per scenario).
   ========================================================= */

const firstAidScenarios = [
  {
    type: "Minor Burn",
    scenario: "Someone has a minor burn on their hand from a hot surface.",
    steps: [
      "Make sure the situation is safe.",
      "Cool the burn with cool running water.",
      "Remove nearby jewellery or restrictive items.",
      "Seek medical help if the burn is serious."
    ]
  },
  {
    type: "Severe Bleeding",
    scenario: "A person has severe external bleeding from an injury.",
    steps: [
      "Make sure the scene is safe.",
      "Apply firm direct pressure.",
      "Call emergency services for severe bleeding.",
      "Continue pressure while waiting for help."
    ]
  },
  {
    type: "Unresponsive Person",
    scenario: "You find someone who appears unresponsive.",
    steps: [
      "Make sure the scene is safe.",
      "Check responsiveness and breathing.",
      "Call emergency services or get emergency help.",
      "Follow dispatcher or trained first-aid instructions."
    ]
  },
  {
    type: "Minor Cut",
    scenario: "Someone has a small cut that is bleeding lightly.",
    steps: [
      "Make sure the scene is safe.",
      "Use appropriate protection if available.",
      "Apply clean material and gentle pressure.",
      "Monitor the wound and seek help if needed."
    ]
  },
  {
    type: "Serious Injury",
    scenario: "Someone has a serious injury after an accident.",
    steps: [
      "Make sure the scene is safe.",
      "Assess the person's responsiveness and breathing.",
      "Call emergency services.",
      "Provide appropriate basic care while waiting for help."
    ]
  }
];

let firstAidState = {
  round: 0,
  lives: 3,
  time: 25,
  selected: [],
  active: false,
  timer: null
};

// Inject this game's skeleton markup into its panel.
$("game-firstaid").innerHTML = `
  <div class="game-intro">
    <h3>🩹 First-Aid Rush</h3>
    <p>Put each first-aid response in the correct order before you run out of lives or time.</p>
  </div>

  <button id="startFirstAidButton" class="primary-btn">Start</button>

  <div id="firstAidArea" class="hidden">
    <div class="firstaid-top">
      <span>Situation <span id="firstAidRound"></span></span>
      <span>Lives: <strong id="firstAidLives">3</strong></span>
      <span>Time: <strong id="firstAidTime">25</strong>s</span>
    </div>

    <h4 id="firstAidType"></h4>
    <p id="firstAidScenario"></p>

    <div id="firstAidChoices" class="firstaid-choice-list"></div>

    <div class="firstaid-sequence-label">Your order:</div>
    <div id="firstAidSequence" class="firstaid-sequence"></div>

    <button id="submitFirstAidButton" class="primary-btn">Submit Order</button>

    <div id="firstAidFeedback" class="feedback hidden"></div>
  </div>

  <div id="firstAidResult" class="result-card hidden">
    <div class="result-icon">🩹</div>
    <h3>Session Complete</h3>
    <p id="firstAidResultText"></p>
    <button id="restartFirstAidButton" class="primary-btn">Play Again</button>
  </div>
`;

// Reset all round/session state and begin the 25-second countdown for round 1.
function startFirstAid() {
  if (firstAidState.timer) clearInterval(firstAidState.timer);

  firstAidState.round = 0;
  firstAidState.lives = 3;
  firstAidState.time = 25;
  firstAidState.selected = [];
  firstAidState.active = true;

  $("firstAidArea").classList.remove("hidden");
  $("firstAidResult").classList.add("hidden");

  loadFirstAidRound();

  firstAidState.timer = setInterval(() => {
    firstAidState.time--;
    $("firstAidTime").textContent = firstAidState.time;

    if (firstAidState.time <= 0) {
      loseFirstAidLife("Time ran out.");
    }
  }, 1000);
}

// Load the current scenario, with its steps shown in shuffled order.
function loadFirstAidRound() {
  const scenario = firstAidScenarios[firstAidState.round];

  firstAidState.selected = [];

  $("firstAidRound").textContent = `${firstAidState.round + 1} / ${firstAidScenarios.length}`;
  $("firstAidLives").textContent = firstAidState.lives;
  $("firstAidTime").textContent = firstAidState.time;
  $("firstAidType").textContent = scenario.type;
  $("firstAidScenario").textContent = scenario.scenario;

  const shuffled = shuffle(scenario.steps.map((text, index) => ({ text, index })));

  $("firstAidChoices").innerHTML = shuffled.map((step) => `
    <button class="firstaid-choice" data-firstaid="${step.index}">
      ${step.text}
    </button>
  `).join("");

  $("firstAidSequence").innerHTML = "";
  $("firstAidFeedback").classList.add("hidden");

  document.querySelectorAll("[data-firstaid]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.firstaid);
      selectFirstAid(index, button);
    });
  });
}

// Add one step to the player's chosen sequence (each step can only be used once).
function selectFirstAid(index, button) {
  if (!firstAidState.active) return;
  if (firstAidState.selected.includes(index)) return;

  firstAidState.selected.push(index);
  button.classList.add("used");

  const step = document.createElement("span");
  step.className = "sequence-item";
  step.textContent = `${firstAidState.selected.length}. ${button.textContent.trim()}`;

  $("firstAidSequence").appendChild(step);
}

// Compare the player's chosen order against the scenario's correct order.
function checkFirstAid() {
  if (!firstAidState.active) return;

  const correctOrder = firstAidScenarios[firstAidState.round].steps.map((_, i) => i);

  if (
    firstAidState.selected.length === correctOrder.length &&
    firstAidState.selected.every((value, index) => value === correctOrder[index])
  ) {
    $("firstAidFeedback").textContent = "Correct order. Moving to the next situation.";
    $("firstAidFeedback").classList.remove("hidden");
    addXP(8);

    setTimeout(() => {
      firstAidState.round++;

      if (firstAidState.round >= firstAidScenarios.length) {
        finishFirstAid();
      } else {
        loadFirstAidRound();
      }
    }, 650);
  } else {
    loseFirstAidLife("That sequence needs another look.");
  }
}

// Lose a life, reset the current attempt, and end the session if out of lives.
function loseFirstAidLife(message) {
  firstAidState.lives--;

  $("firstAidLives").textContent = firstAidState.lives;
  $("firstAidFeedback").textContent = message;
  $("firstAidFeedback").classList.remove("hidden");

  firstAidState.selected = [];
  $("firstAidSequence").innerHTML = "";

  document.querySelectorAll(".firstaid-choice").forEach(button => {
    button.classList.remove("used");
  });

  if (firstAidState.lives <= 0) {
    finishFirstAid();
  }
}

// Stop the timer and show how many scenarios were completed.
function finishFirstAid() {
  if (!firstAidState.active) return;

  firstAidState.active = false;
  clearInterval(firstAidState.timer);
  firstAidState.timer = null;

  $("firstAidArea").classList.add("hidden");
  $("firstAidResult").classList.remove("hidden");

  const completed = Math.min(firstAidState.round, firstAidScenarios.length);
  $("firstAidResultText").textContent =
    `You completed ${completed} of ${firstAidScenarios.length} first-aid situations.`;

  state.games++;
  addXP(completed * 6);
}

$("startFirstAidButton").addEventListener("click", startFirstAid);
$("restartFirstAidButton").addEventListener("click", startFirstAid);
$("submitFirstAidButton").addEventListener("click", checkFirstAid);
