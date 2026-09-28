/* =========================================================
   DECISION GAME
   A short branching scenario game: each choice shifts four
   meters (safety, time, resources, risk); the ending message
   depends on how well those meters ended up.
   ========================================================= */

const decisionScenarios = [
  {
    title: "Earthquake Indoors",
    icon: "🌎",
    category: "Earthquake",
    situation: "Strong shaking begins while you are inside a building. Objects are falling from shelves and several people start moving toward the exit.",
    context: "The shaking is still happening. You need to decide what to prioritise immediately.",
    choices: [
      { text: "Run for the exit immediately.", safety: -10, time: 5, resources: 0, risk: 15,
        feedback: "Moving during strong shaking exposes you to falling objects, glass and other hazards." },
      { text: "Drop, cover and hold on.", safety: 15, time: 0, resources: 0, risk: -10,
        feedback: "You prioritised immediate protection from falling debris while the shaking continues." },
      { text: "Stand beside a window to see what is happening.", safety: -15, time: 5, resources: 0, risk: 20,
        feedback: "Glass and nearby objects can become dangerous during strong shaking." }
    ]
  },
  {
    title: "House Fire",
    icon: "🔥",
    category: "Fire",
    situation: "A smoke alarm sounds. You can see smoke in the hallway, but there appears to be another exit on the opposite side of the building.",
    context: "You have only a short time to act. Valuable belongings are nearby.",
    choices: [
      { text: "Take the safe alternative exit now.", safety: 15, time: 10, resources: 0, risk: -15,
        feedback: "You prioritised getting away from the fire rather than collecting belongings." },
      { text: "Collect your valuables before leaving.", safety: -8, time: -15, resources: 5, risk: 20,
        feedback: "Collecting possessions delays evacuation while smoke and fire conditions can worsen." },
      { text: "Use the elevator because it is faster.", safety: -20, time: 5, resources: 0, risk: 25,
        feedback: "Elevators can become dangerous during fires and power failures." }
    ]
  },
  {
    title: "Flash Flood",
    icon: "🌊",
    category: "Flood",
    situation: "You are travelling when water begins covering the road ahead. It looks shallow, but the current is moving across the road.",
    context: "Your destination is still ahead, but higher ground is available by turning around.",
    choices: [
      { text: "Drive through because the water looks shallow.", safety: -15, time: 10, resources: -5, risk: 25,
        feedback: "Floodwater can hide damaged roads and strong currents. A vehicle can lose traction or be swept away." },
      { text: "Turn around and move toward higher ground.", safety: 15, time: -5, resources: 0, risk: -15,
        feedback: "You accepted a delay in order to reduce exposure to dangerous floodwater." },
      { text: "Stop under a low bridge and wait.", safety: -10, time: -5, resources: 0, risk: 20,
        feedback: "Low areas can become dangerous as floodwater rises." }
    ]
  },
  {
    title: "Lightning Outdoors",
    icon: "⚡",
    category: "Lightning",
    situation: "You hear thunder while taking part in an outdoor activity. There is an enclosed building nearby.",
    context: "The activity can continue later, but moving to shelter will interrupt it now.",
    choices: [
      { text: "Move into the substantial building.", safety: 15, time: -5, resources: 0, risk: -20,
        feedback: "You traded some activity time for much lower exposure to lightning." },
      { text: "Stand beneath an isolated tree.", safety: -10, time: 5, resources: 0, risk: 20,
        feedback: "An isolated tree is not a safe substitute for substantial shelter." },
      { text: "Finish the activity quickly in the open.", safety: -15, time: 10, resources: 0, risk: 15,
        feedback: "Trying to finish quickly keeps you exposed while lightning is nearby." }
    ]
  },
  {
    title: "Severe Storm and Power Loss",
    icon: "⛈️",
    category: "Severe Storm",
    situation: "A severe storm is underway. The power has failed and several loose outdoor objects can be seen moving in strong wind.",
    context: "You have a flashlight indoors. The loose objects could potentially damage the property.",
    choices: [
      { text: "Stay inside, away from windows, and use the flashlight.", safety: 15, time: 5, resources: -5, risk: -15,
        feedback: "You kept yourself away from wind and debris while using a safer light source." },
      { text: "Go outside to retrieve the loose objects.", safety: -15, time: 10, resources: 10, risk: 20,
        feedback: "Protecting property is less important than avoiding dangerous wind and debris." },
      { text: "Use candles throughout the house.", safety: -10, time: 5, resources: 0, risk: 15,
        feedback: "Open flames introduce a fire risk during a power outage." }
    ]
  }
];

const decisionState = {
  current: 0,
  safety: 50,
  time: 50,
  resources: 50,
  risk: 20,
  chosen: false,
  finished: false
};

// Inject the skeleton markup for this game into its (initially empty) panel.
$("game-decision").innerHTML = `
  <div class="game-intro">
    <h3>🧭 Decision Game</h3>
    <p>Make quick decisions during unfolding emergency scenarios and manage safety, time, resources and risk.</p>
  </div>

  <div class="decision-meters">
    <div class="meter-row">
      <span>Safety</span>
      <div class="progress-track"><div id="safetyMeter" class="progress-fill meter-safety"></div></div>
      <strong id="safetyValue">50</strong>
    </div>
    <div class="meter-row">
      <span>Time</span>
      <div class="progress-track"><div id="timeMeter" class="progress-fill meter-time"></div></div>
      <strong id="timeValue">50</strong>
    </div>
    <div class="meter-row">
      <span>Resources</span>
      <div class="progress-track"><div id="resourcesMeter" class="progress-fill meter-resources"></div></div>
      <strong id="resourcesValue">50</strong>
    </div>
    <div class="meter-row">
      <span>Risk</span>
      <div class="progress-track"><div id="riskMeter" class="progress-fill meter-risk"></div></div>
      <strong id="riskValue">20</strong>
    </div>
  </div>

  <div id="decisionGameArea">
    <div class="scenario-header">
      <span id="decisionRound" class="badge"></span>
      <span id="decisionCategory" class="badge"></span>
    </div>

    <div class="scenario-card">
      <div id="decisionIcon" class="topic-icon"></div>
      <h4 id="decisionTitle"></h4>
      <p id="decisionSituation"></p>
      <p id="decisionContext" class="scenario-context"></p>
    </div>

    <div id="decisionChoices" class="decision-choice-list"></div>

    <div id="decisionFeedback" class="feedback hidden"></div>

    <div class="decision-actions">
      <button id="nextDecisionButton" class="primary-btn hidden">Next Scenario</button>
      <button id="restartDecisionButton" class="tool-btn">Restart</button>
    </div>
  </div>

  <div id="decisionResult" class="result-card hidden">
    <div class="result-icon">🧭</div>
    <h3 id="decisionResultTitle"></h3>
    <p id="decisionResultText"></p>
    <div id="decisionFinalStats" class="final-stats-grid"></div>
    <button id="decisionPlayAgain" class="primary-btn">Play Again</button>
  </div>
`;

function startDecisionGame() {
  decisionState.current = 0;
  decisionState.safety = 50;
  decisionState.time = 50;
  decisionState.resources = 50;
  decisionState.risk = 20;
  decisionState.chosen = false;
  decisionState.finished = false;

  $("decisionGameArea").classList.remove("hidden");
  $("decisionResult").classList.add("hidden");

  renderDecision();
}

// Draw the current scenario and its three choice buttons.
function renderDecision() {
  const scenario = decisionScenarios[decisionState.current];

  $("decisionRound").textContent =
    `Scenario ${decisionState.current + 1} of ${decisionScenarios.length}`;
  $("decisionCategory").textContent = scenario.category;
  $("decisionIcon").textContent = scenario.icon;
  $("decisionTitle").textContent = scenario.title;
  $("decisionSituation").textContent = scenario.situation;
  $("decisionContext").textContent = scenario.context;

  updateDecisionMeters();

  $("decisionChoices").innerHTML = scenario.choices.map((choice, index) => `
    <button class="decision-choice" data-decision="${index}">
      ${choice.text}
    </button>
  `).join("");

  $("decisionFeedback").classList.add("hidden");
  $("nextDecisionButton").classList.add("hidden");
  decisionState.chosen = false;

  document.querySelectorAll("[data-decision]").forEach(button => {
    button.addEventListener("click", () => chooseDecision(Number(button.dataset.decision)));
  });
}

// Push the four meter values and numeric readouts into the DOM.
function updateDecisionMeters() {
  $("safetyValue").textContent = Math.round(decisionState.safety);
  $("timeValue").textContent = Math.round(decisionState.time);
  $("resourcesValue").textContent = Math.round(decisionState.resources);
  $("riskValue").textContent = Math.round(decisionState.risk);

  $("safetyMeter").style.width = decisionState.safety + "%";
  $("timeMeter").style.width = decisionState.time + "%";
  $("resourcesMeter").style.width = decisionState.resources + "%";
  $("riskMeter").style.width = decisionState.risk + "%";
}

// Apply a choice's effects to the four meters and show its consequence text.
function chooseDecision(index) {
  if (decisionState.chosen) return;

  decisionState.chosen = true;

  const choice = decisionScenarios[decisionState.current].choices[index];

  decisionState.safety = clamp(decisionState.safety + choice.safety);
  decisionState.time = clamp(decisionState.time + choice.time);
  decisionState.resources = clamp(decisionState.resources + choice.resources);
  decisionState.risk = clamp(decisionState.risk + choice.risk);

  document.querySelectorAll("[data-decision]").forEach(button => {
    button.disabled = true;
  });

  updateDecisionMeters();

  $("decisionFeedback").innerHTML = `<strong>Consequence:</strong> ${choice.feedback}`;
  $("decisionFeedback").classList.remove("hidden");
  $("nextDecisionButton").classList.remove("hidden");

  addXP(3);
}

$("nextDecisionButton").addEventListener("click", () => {
  if (!decisionState.chosen) return;

  if (decisionState.current < decisionScenarios.length - 1) {
    decisionState.current++;
    renderDecision();
  } else {
    finishDecisionGame();
  }
});

// Average the four meters (inverting risk) into one readiness score for the ending message.
function finishDecisionGame() {
  decisionState.finished = true;

  const readiness =
    (decisionState.safety +
      decisionState.time +
      decisionState.resources +
      (100 - decisionState.risk)) / 4;

  let title;
  let text;

  if (readiness >= 72) {
    title = "You kept the situation under control.";
    text = "Your decisions generally protected safety while managing time and resources.";
  } else if (readiness >= 48) {
    title = "You handled the emergencies, but some trade-offs were costly.";
    text = "Review the guides and try again to see how different choices affect the overall situation.";
  } else {
    title = "The situation became increasingly risky.";
    text = "Some decisions increased exposure to hazards. Review the guides and replay the scenarios.";
  }

  $("decisionGameArea").classList.add("hidden");
  $("decisionResult").classList.remove("hidden");
  $("decisionResultTitle").textContent = title;
  $("decisionResultText").textContent = text;

  $("decisionFinalStats").innerHTML = `
    <div><span>Safety</span><strong>${Math.round(decisionState.safety)}</strong></div>
    <div><span>Time</span><strong>${Math.round(decisionState.time)}</strong></div>
    <div><span>Resources</span><strong>${Math.round(decisionState.resources)}</strong></div>
    <div><span>Risk</span><strong>${Math.round(decisionState.risk)}</strong></div>
  `;

  state.games++;
  addXP(Math.round(20 + readiness / 5));
  saveState();
}

$("restartDecisionButton").addEventListener("click", startDecisionGame);
$("decisionPlayAgain").addEventListener("click", startDecisionGame);

// Start the first scenario as soon as this panel is ready.
startDecisionGame();
