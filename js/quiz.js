/* =========================================================
   QUIZ
   Question bank
   ========================================================= */

const questions = [
  { topic: "earthquake", difficulty: "easy",
    q: "What is the recommended immediate action during strong earthquake shaking indoors?",
    answers: ["Run outside immediately", "Drop, cover and hold on", "Stand beside a window", "Use the elevator"],
    correct: 1,
    explanation: "Drop, cover and hold on helps protect you from falling objects and debris." },
  { topic: "earthquake", difficulty: "easy",
    q: "Which location is generally safer during earthquake shaking indoors?",
    answers: ["Beside a large window", "Under a sturdy table", "On a balcony", "Near a tall shelf"],
    correct: 1,
    explanation: "A sturdy table can provide protection from falling objects." },
  { topic: "earthquake", difficulty: "medium",
    q: "Why should you avoid running outside while an earthquake is still shaking?",
    answers: ["It makes the earthquake stronger", "You may be struck by falling debris", "Doors automatically lock", "Outdoor air becomes unsafe"],
    correct: 1,
    explanation: "Moving during shaking can expose you to falling objects, glass and structural hazards." },
  { topic: "earthquake", difficulty: "medium",
    q: "After a major earthquake, which hazard should you continue to expect?",
    answers: ["Aftershocks", "Guaranteed flooding", "Immediate snowfall", "No further movement"],
    correct: 0,
    explanation: "Aftershocks can occur after the main earthquake." },
  { topic: "earthquake", difficulty: "hard",
    q: "While driving during an earthquake, what is generally safest?",
    answers: ["Speed through the shaking", "Stop somewhere clear and remain in the vehicle", "Park under a bridge", "Drive toward power lines"],
    correct: 1,
    explanation: "Pull over somewhere clear and remain in the vehicle until the shaking stops." },
  { topic: "earthquake", difficulty: "hard",
    q: "Which combination presents the greatest immediate earthquake hazard?",
    answers: ["Sturdy table and shoes", "Windows, unsecured shelves and falling objects", "Water bottles and blankets", "A flashlight and radio"],
    correct: 1,
    explanation: "Glass and unsecured heavy objects can create serious injury hazards." },

  { topic: "fire", difficulty: "easy",
    q: "What should you do when a building fire requires evacuation?",
    answers: ["Collect valuables first", "Leave using a safe exit", "Use the elevator", "Hide in a cupboard"],
    correct: 1,
    explanation: "Leave immediately using a safe exit." },
  { topic: "fire", difficulty: "easy",
    q: "Why should you stay low when moving through smoke?",
    answers: ["Smoke tends to collect higher up", "The floor is always cool", "It makes you invisible", "It stops the fire"],
    correct: 0,
    explanation: "Smoke can accumulate higher in a room, so staying lower can reduce smoke exposure." },
  { topic: "fire", difficulty: "medium",
    q: "What should you NOT use during a building fire?",
    answers: ["Stairs", "A safe exit", "An elevator", "An emergency exit"],
    correct: 2,
    explanation: "Elevators can become dangerous during fires and power failures." },
  { topic: "fire", difficulty: "medium",
    q: "If smoke is blocking your usual exit, what should you do?",
    answers: ["Move toward another safe exit", "Run through thick smoke", "Wait beside the fire", "Use an elevator"],
    correct: 0,
    explanation: "Use an alternative safe exit if the normal route is blocked." },
  { topic: "fire", difficulty: "hard",
    q: "If you are trapped by a fire, which action can help reduce smoke entering your room?",
    answers: ["Open every door", "Close doors between you and the fire", "Stand beside the fire", "Turn off all lights and stay silent"],
    correct: 1,
    explanation: "Closing doors can help slow the spread of fire and smoke." },
  { topic: "fire", difficulty: "hard",
    q: "Why is going back inside for possessions dangerous?",
    answers: ["The building may be unstable and smoke can spread", "Possessions become heavier", "Fire alarms stop working", "It makes firefighters leave"],
    correct: 0,
    explanation: "Fire conditions can deteriorate quickly and damaged structures may be unsafe." },

  { topic: "flood", difficulty: "easy",
    q: "What direction should you move when flooding threatens?",
    answers: ["Toward lower ground", "Toward higher ground", "Toward a river", "Into moving water"],
    correct: 1,
    explanation: "Move to higher ground and follow evacuation instructions." },
  { topic: "flood", difficulty: "easy",
    q: "Should you drive through moving floodwater?",
    answers: ["Yes, if the water looks shallow", "Yes, with hazard lights", "No", "Only at night"],
    correct: 2,
    explanation: "Floodwater can hide deep water, damaged roads and strong currents." },
  { topic: "flood", difficulty: "medium",
    q: "Why can apparently shallow floodwater still be dangerous?",
    answers: ["It can hide road damage and strong currents", "It is always freezing", "It contains no oxygen", "It causes earthquakes"],
    correct: 0,
    explanation: "Water can conceal hazards and moving water can be powerful." },
  { topic: "flood", difficulty: "medium",
    q: "What should you do if authorities issue an evacuation order for flooding?",
    answers: ["Ignore it until water arrives", "Follow the evacuation instructions", "Drive through flooded roads", "Stay in a basement"],
    correct: 1,
    explanation: "Follow official evacuation instructions promptly." },
  { topic: "flood", difficulty: "hard",
    q: "Which location is particularly dangerous during rapidly rising floodwater?",
    answers: ["Higher ground", "A low underpass", "An elevated building", "A designated shelter"],
    correct: 1,
    explanation: "Low areas such as underpasses can rapidly fill with water." },
  { topic: "flood", difficulty: "hard",
    q: "After a flood, why should you avoid damaged electrical equipment?",
    answers: ["It may still be energized", "It becomes louder", "It attracts rain", "It always contains fuel"],
    correct: 0,
    explanation: "Water and damaged electrical systems can create electrocution hazards." },

  { topic: "lightning", difficulty: "easy",
    q: "What does hearing thunder tell you?",
    answers: ["Lightning is close enough to be a risk", "The storm is over", "You are completely safe outdoors", "Rain cannot occur"],
    correct: 0,
    explanation: "If you can hear thunder, lightning is close enough to pose a danger." },
  { topic: "lightning", difficulty: "easy",
    q: "Where should you go during a thunderstorm?",
    answers: ["Under an isolated tree", "Into a substantial building", "Into an open field", "Beside a tall pole"],
    correct: 1,
    explanation: "A substantial building is a safer shelter." },
  { topic: "lightning", difficulty: "medium",
    q: "Which outdoor shelter is unsafe during lightning?",
    answers: ["Substantial building", "Enclosed vehicle", "Isolated tree", "Both building and vehicle"],
    correct: 2,
    explanation: "An isolated tree does not provide safe lightning shelter." },
  { topic: "lightning", difficulty: "medium",
    q: "When should outdoor activities resume after a thunderstorm?",
    answers: ["Immediately after the first lightning flash", "After the storm has passed and conditions are safe", "When rain becomes light", "When thunder gets louder"],
    correct: 1,
    explanation: "Wait until the storm has passed and it is safe to return outdoors." },
  { topic: "lightning", difficulty: "hard",
    q: "Why should you avoid isolated tall objects during lightning?",
    answers: ["They can be prominent strike targets", "They attract rain only", "They block all wind", "They increase temperature"],
    correct: 0,
    explanation: "Tall isolated objects can be vulnerable to lightning strikes." },
  { topic: "lightning", difficulty: "hard",
    q: "Which plan is safest when thunder begins during an outdoor activity?",
    answers: ["Finish quickly", "Move to substantial shelter", "Stand under a tree", "Spread out across an open field"],
    correct: 1,
    explanation: "Move to substantial shelter rather than trying to finish the activity." },

  { topic: "storm", difficulty: "easy",
    q: "What should you do with loose outdoor objects before severe winds?",
    answers: ["Leave them outside", "Secure them", "Put them on the roof", "Place them near windows"],
    correct: 1,
    explanation: "Loose objects can become dangerous debris." },
  { topic: "storm", difficulty: "easy",
    q: "Where should you stay during severe winds?",
    answers: ["Outside", "Near windows", "Inside in a protected area", "On a balcony"],
    correct: 2,
    explanation: "Stay inside and away from windows." },
  { topic: "storm", difficulty: "medium",
    q: "What is a good alternative to candles during a power outage?",
    answers: ["Flashlights", "Open flames beside curtains", "Outdoor fires", "Fireworks"],
    correct: 0,
    explanation: "Flashlights provide light without the open-flame fire risk." },
  { topic: "storm", difficulty: "medium",
    q: "What should you do if you see a downed power line?",
    answers: ["Touch it to test it", "Stay away", "Move it with wood", "Walk underneath it"],
    correct: 1,
    explanation: "Downed power lines can remain energized and should be avoided." },
  { topic: "storm", difficulty: "hard",
    q: "Why should you avoid retrieving outdoor items during severe winds?",
    answers: ["Wind can turn objects into dangerous debris", "The items will disappear", "The rain will stop", "It makes power return"],
    correct: 0,
    explanation: "Strong winds can make even ordinary objects dangerous." },
  { topic: "storm", difficulty: "hard",
    q: "After a severe storm, which action is appropriate?",
    answers: ["Explore damaged buildings", "Avoid hazards and monitor official information", "Touch damaged electrical equipment", "Remove power lines yourself"],
    correct: 1,
    explanation: "Avoid hazards and follow official information about when and where it is safe to move." },

  { topic: "firstaid", difficulty: "easy",
    q: "What should you do before helping an injured person?",
    answers: ["Make sure the scene is safe", "Immediately run into traffic", "Ignore hazards", "Move every injured person immediately"],
    correct: 0,
    explanation: "Protect yourself and make sure the scene is safe before providing help." },
  { topic: "firstaid", difficulty: "easy",
    q: "What should be used to cool a minor burn?",
    answers: ["Cool running water", "Ice directly on the skin", "Butter", "Hot water"],
    correct: 0,
    explanation: "Cool running water is appropriate for a minor burn." },
  { topic: "firstaid", difficulty: "medium",
    q: "What is an important first action for severe external bleeding?",
    answers: ["Apply firm direct pressure", "Wash the wound for an hour", "Remove every dressing repeatedly", "Ignore it"],
    correct: 0,
    explanation: "Firm direct pressure helps control severe bleeding." },
  { topic: "firstaid", difficulty: "medium",
    q: "When should emergency services be contacted?",
    answers: ["Only for tiny scratches", "When serious injury or illness is suspected", "Never", "Only after one week"],
    correct: 1,
    explanation: "Serious injury or illness requires emergency assistance." },
  { topic: "firstaid", difficulty: "hard",
    q: "Why should you check the scene before giving first aid?",
    answers: ["To avoid becoming another casualty", "To delay treatment", "To find valuables", "To make the patient wait"],
    correct: 0,
    explanation: "An unsafe scene can put the rescuer in danger too." },
  { topic: "firstaid", difficulty: "hard",
    q: "Which action is inappropriate for a minor burn?",
    answers: ["Cool running water", "Removing nearby restrictive jewellery", "Applying ice directly", "Seeking help for serious burns"],
    correct: 2,
    explanation: "Ice directly on a burn can cause additional tissue damage." }
];

/* ---------- Setup screen: topic + difficulty pickers ---------- */

// "All Topics" plus every individual topic, used to build the topic buttons.
const allTopics = [
  ["all", "All Topics"],
  ...topicInfo.map(([id, title]) => [id, title])
];

$("topicChoices").innerHTML = allTopics.map(([id, title]) => `
    <button class="choice-btn ${id === "all" ? "selected" : ""}" data-topic="${id}">
      ${title}
    </button>
  `).join("");

document.querySelectorAll("[data-topic]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-topic]").forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    state.quiz.topic = button.dataset.topic;
  });
});

// Difficulty buttons already exist in the HTML; just wire up selection.
document.querySelectorAll("[data-difficulty]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-difficulty]").forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    state.quiz.difficulty = button.dataset.difficulty;
  });
});

$("startQuizButton").addEventListener("click", startQuiz);

/* ---------- Quiz flow ---------- */

// Build a fresh question set (up to 8) matching the chosen topic/difficulty.
function startQuiz() {
  let pool = questions.filter(q =>
    (state.quiz.topic === "all" || q.topic === state.quiz.topic) &&
    q.difficulty === state.quiz.difficulty
  );

  pool = shuffle(pool).slice(0, Math.min(8, pool.length));

  state.quiz.questions = pool;
  state.quiz.index = 0;
  state.quiz.score = 0;
  state.quiz.answered = false;
  state.quiz.skipped = [];

  $("quizSetup").classList.add("hidden");
  $("quizResult").classList.add("hidden");
  $("quizScreen").classList.remove("hidden");

  renderQuestion();
}

// Draw the current question and its answer buttons.
function renderQuestion() {
  const quiz = state.quiz;
  const question = quiz.questions[quiz.index];

  if (!question) {
    finishQuiz();
    return;
  }

  quiz.answered = false;

  $("quizTopicLabel").textContent =
    topicInfo.find(t => t[0] === question.topic)?.[1] || "Emergency";

  $("questionNumber").textContent =
    `Question ${quiz.index + 1} of ${quiz.questions.length}`;

  $("questionDifficulty").textContent = question.difficulty.toUpperCase();
  $("questionText").textContent = question.q;
  $("quizScore").textContent = quiz.score;

  $("quizProgress").style.width =
    `${(quiz.index / quiz.questions.length) * 100}%`;

  $("answerChoices").innerHTML = question.answers.map((answer, index) => `
    <button class="answer-btn" data-answer="${index}">${answer}</button>
  `).join("");

  $("quizFeedback").classList.add("hidden");
  $("nextQuestionButton").classList.add("hidden");

  document.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer)));
  });
}

// Lock in an answer, mark buttons correct/wrong, award XP and update streak.
function answerQuestion(answerIndex) {
  if (state.quiz.answered) return;

  state.quiz.answered = true;
  const question = state.quiz.questions[state.quiz.index];
  const buttons = document.querySelectorAll("[data-answer]");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("correct");
    if (index === answerIndex && index !== question.correct) button.classList.add("wrong");
  });

  if (answerIndex === question.correct) {
    state.quiz.score++;
    state.streak++;
    addXP(10);
    $("quizFeedback").innerHTML = `<strong>Correct.</strong> ${question.explanation}`;
  } else {
    state.streak = 0;
    saveState();
    $("quizFeedback").innerHTML = `<strong>Not quite.</strong> ${question.explanation}`;
  }

  $("quizScore").textContent = state.quiz.score;
  $("quizFeedback").classList.remove("hidden");
  $("nextQuestionButton").classList.remove("hidden");
}

$("nextQuestionButton").addEventListener("click", () => {
  state.quiz.index++;
  renderQuestion();
});

// Reveal a hint by naming one incorrect answer, without giving away the answer.
$("hintButton").addEventListener("click", () => {
  if (state.quiz.answered) return;

  const question = state.quiz.questions[state.quiz.index];
  const wrong = question.answers
    .map((answer, index) => ({ answer, index }))
    .filter(item => item.index !== question.correct);

  const remove = wrong[Math.floor(Math.random() * wrong.length)];

  $("quizFeedback").innerHTML =
    `💡 Hint: Think about which option avoids the greatest immediate danger. One less suitable choice is: <strong>${remove.answer}</strong>.`;
  $("quizFeedback").classList.remove("hidden");
});

// Push the current question to the end of the queue and move on.
$("skipButton").addEventListener("click", () => {
  if (state.quiz.answered || state.quiz.questions.length < 2) return;

  const current = state.quiz.questions.splice(state.quiz.index, 1)[0];
  state.quiz.questions.push(current);

  if (state.quiz.index >= state.quiz.questions.length) {
    state.quiz.index = 0;
  }

  renderQuestion();
});

// Compute the final percentage, update best score, and show the result card.
function finishQuiz() {
  const percentage = Math.round(
    (state.quiz.score / state.quiz.questions.length) * 100
  );

  state.bestScore = Math.max(state.bestScore, percentage);
  state.total += state.quiz.questions.length;
  saveState();
  updateStats();

  $("quizScreen").classList.add("hidden");
  $("quizResult").classList.remove("hidden");

  $("resultScore").textContent = `${percentage}%`;
  $("resultMessage").textContent =
    percentage >= 80
      ? "Strong preparedness knowledge. Keep practising through the games."
      : percentage >= 50
        ? "You have a useful foundation. Review the guides and practise again."
        : "Review the relevant guides and try another round.";
}

$("retryQuizButton").addEventListener("click", () => {
  $("quizResult").classList.add("hidden");
  $("quizSetup").classList.remove("hidden");
});
