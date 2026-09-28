/* =========================================================
   ESCAPE ROUTE
   A tiny grid-based maze: move one square at a time from the
   start (P) to the exit (E), avoiding hazard squares (H) and
   walls (#).
   ========================================================= */

const escapeMaps = [
  [
    "P..#...",
    ".#.#.H.",
    "...#...",
    ".H...#.",
    "...#...",
    "#...#..",
    "...#..E"
  ],
  [
    "P...#..",
    ".##.#..",
    "...H...",
    ".#...#.",
    ".#H....",
    "...##..",
    "...#..E"
  ],
  [
    "P.#....",
    "...#H..",
    ".H.....",
    "..###..",
    ".......",
    ".#..#..",
    "...#..E"
  ]
];

let escapeState = {
  map: [],
  player: { r: 0, c: 0 },
  exit: { r: 0, c: 0 },
  moves: 0,
  safety: 100,
  finished: false
};

// Inject this game's skeleton markup into its panel.
$("game-escape").innerHTML = `
  <div class="game-intro">
    <h3>🚪 Escape Route</h3>
    <p>Guide yourself out of the building, avoiding hazards along the way.</p>
  </div>

  <div class="escape-stats">
    <span>Moves: <strong id="escapeMoves">0</strong></span>
    <span>Safety: <strong id="escapeSafety">100</strong></span>
  </div>

  <div id="escapeBoard" class="escape-board"></div>

  <p id="escapeMessage" class="game-status"></p>

  <button id="restartEscapeButton" class="secondary-btn">New Map</button>
`;

// Pick a random map and locate the player start (P) and exit (E) squares.
function startEscape() {
  const raw = escapeMaps[Math.floor(Math.random() * escapeMaps.length)];

  escapeState.map = raw.map(row => row.split(""));
  escapeState.moves = 0;
  escapeState.safety = 100;
  escapeState.finished = false;

  for (let r = 0; r < escapeState.map.length; r++) {
    for (let c = 0; c < escapeState.map[r].length; c++) {
      if (escapeState.map[r][c] === "P") escapeState.player = { r, c };
      if (escapeState.map[r][c] === "E") escapeState.exit = { r, c };
    }
  }

  $("escapeMessage").textContent = "Move one square at a time toward the exit.";
  renderEscape();
}

// Draw the grid as clickable cells, with the player, hazards, walls and exit shown as emoji.
function renderEscape() {
  const board = $("escapeBoard");

  board.innerHTML = escapeState.map.map((row, r) =>
    row.map((cell, c) => {
      let content = "";

      if (escapeState.player.r === r && escapeState.player.c === c) {
        content = "🧍";
      } else if (cell === "E") {
        content = "🚪";
      } else if (cell === "H") {
        content = "🔥";
      } else if (cell === "#") {
        content = "⬛";
      }

      const classes = [
        "escape-cell",
        cell === "#" ? "wall" : "",
        cell === "H" ? "hazard" : "",
        cell === "E" ? "exit" : "",
        escapeState.player.r === r && escapeState.player.c === c ? "player" : ""
      ].join(" ");

      return `<button class="${classes}" data-cell="${r}-${c}" ${cell === "#" ? "disabled" : ""}>${content}</button>`;
    }).join("")
  ).join("");

  $("escapeMoves").textContent = escapeState.moves;
  $("escapeSafety").textContent = escapeState.safety;

  document.querySelectorAll("[data-cell]").forEach(button => {
    button.addEventListener("click", () => {
      const [r, c] = button.dataset.cell.split("-").map(Number);
      moveEscape(r, c);
    });
  });
}

// Attempt to move onto the clicked cell; only orthogonally-adjacent moves are allowed.
function moveEscape(r, c) {
  if (escapeState.finished) return;

  const dr = Math.abs(r - escapeState.player.r);
  const dc = Math.abs(c - escapeState.player.c);

  if (dr + dc !== 1) {
    $("escapeMessage").textContent = "Move one square at a time.";
    return;
  }

  const cell = escapeState.map[r][c];
  if (cell === "#") return;

  escapeState.player = { r, c };
  escapeState.moves++;

  if (cell === "H") {
    escapeState.safety -= 30;
    $("escapeMessage").textContent = "You stepped into a hazard. Find another route.";
  } else {
    $("escapeMessage").textContent = "Keep moving toward the exit.";
  }

  if (escapeState.safety <= 0) {
    escapeState.finished = true;
    $("escapeMessage").textContent = "You ran out of safety. Start a new map and try another route.";
  }

  if (r === escapeState.exit.r && c === escapeState.exit.c) {
    escapeState.finished = true;
    $("escapeMessage").textContent = `You reached the exit in ${escapeState.moves} moves.`;
    state.games++;
    addXP(20);
  }

  renderEscape();
}

$("restartEscapeButton").addEventListener("click", startEscape);
startEscape();
