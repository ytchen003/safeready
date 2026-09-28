/* =========================================================
   REACTION DRILL
   Wait-for-the-signal reaction time game, styled around
   "reacting quickly and safely" during an emergency.
   ========================================================= */

let reactionState = "idle"; // "idle" | "waiting" | "go"
let reactionStart = 0;
let reactionTimer = null;
let reactionRound = 0;
let reactionBest = Number(localStorage.getItem("safeReadyReactionBest") || 0);

// Inject this game's skeleton markup into its panel.
$("game-reaction").innerHTML = `
  <div class="game-intro">
    <h3>⚡ Reaction Drill</h3>
    <p>Wait for the safe signal, then react as fast as you can.</p>
  </div>

  <div id="reactionArena" class="reaction-arena">
    <div id="reactionSymbol" class="reaction-symbol">⏳</div>
    <p id="reactionStatus">Press start when ready.</p>
  </div>

  <div class="reaction-controls">
    <button id="reactionButton" class="primary-btn large-btn">Start</button>
    <div class="reaction-best"><span>Best time</span><strong id="reactionBest">—</strong></div>
  </div>
`;

$("reactionBest").textContent = reactionBest ? reactionBest + " ms" : "—";
$("reactionButton").addEventListener("click", reactionClick);

// The single button drives all three phases: start waiting, (maybe) too-early, then react.
function reactionClick() {
  if (reactionState === "idle") {
    reactionState = "waiting";
    $("reactionButton").textContent = "Wait...";
    $("reactionStatus").textContent = "Wait for the safe signal...";
    $("reactionSymbol").textContent = "⏳";
    $("reactionArena").classList.remove("go");

    const delay = 1000 + Math.random() * 2500;

    reactionTimer = setTimeout(() => {
      reactionState = "go";
      reactionStart = performance.now();

      $("reactionSymbol").textContent = "🟢";
      $("reactionStatus").textContent = "GO! React now!";
      $("reactionButton").textContent = "REACT";
      $("reactionArena").classList.add("go");
    }, delay);

    return;
  }

  if (reactionState === "waiting") {
    // Clicked before the signal appeared.
    clearTimeout(reactionTimer);
    reactionState = "idle";
    $("reactionSymbol").textContent = "❌";
    $("reactionStatus").textContent = "Too early. Try again.";
    $("reactionButton").textContent = "Start";
    return;
  }

  if (reactionState === "go") {
    const time = Math.round(performance.now() - reactionStart);
    reactionRound++;

    if (!reactionBest || time < reactionBest) {
      reactionBest = time;
      localStorage.setItem("safeReadyReactionBest", reactionBest);
      $("reactionBest").textContent = reactionBest + " ms";
    }

    $("reactionSymbol").textContent = "⚡";
    $("reactionStatus").textContent = `${time} ms reaction time. Round ${reactionRound} complete.`;
    $("reactionButton").textContent = "Try Again";
    $("reactionArena").classList.remove("go");

    reactionState = "idle";
    addXP(5);
  }
}
