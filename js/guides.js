/* =========================================================
   GUIDES
   Emergency guide content, the dashboard topic cards, the
   full guide cards, and the "Read Guide" modal.
   ========================================================= */

// Full guide content: each guide has several titled sections of bullet points.
const guides = [
  {
    id: "earthquake",
    title: "Earthquake",
    icon: "🌎",
    summary: "Protect yourself from falling objects and structural hazards.",
    sections: [
      ["Before", [
        "Secure tall furniture, shelves and heavy objects.",
        "Keep a flashlight, shoes, water and essential supplies accessible.",
        "Identify safe places such as beneath a sturdy table.",
        "Know how to shut off utilities if necessary."
      ]],
      ["During", [
        "Drop, cover and hold on.",
        "Stay away from windows, glass and unsecured objects.",
        "If indoors, generally stay inside until the shaking stops.",
        "If outdoors, move away from buildings, trees and power lines.",
        "If driving, pull over somewhere clear and stay in the vehicle until shaking stops."
      ]],
      ["After", [
        "Expect aftershocks.",
        "Check yourself and others for injuries.",
        "Watch for broken glass, damaged structures, fire and utility hazards.",
        "Use emergency communication channels and avoid unnecessary travel."
      ]]
    ]
  },
  {
    id: "fire",
    title: "Fire",
    icon: "🔥",
    summary: "Get out quickly and avoid smoke exposure.",
    sections: [
      ["Before", [
        "Test smoke alarms regularly.",
        "Plan at least two ways out of important rooms.",
        "Keep exits clear.",
        "Practise a household evacuation plan."
      ]],
      ["During", [
        "Alert others and activate the alarm if appropriate.",
        "Leave immediately using a safe exit.",
        "Stay low if smoke is present.",
        "Never use an elevator during a building fire.",
        "Do not go back inside for belongings."
      ]],
      ["If trapped", [
        "Close doors between you and the fire if possible.",
        "Call emergency services and communicate your location.",
        "Block smoke from entering around doors if possible.",
        "Signal from a safe window if appropriate."
      ]]
    ]
  },
  {
    id: "flood",
    title: "Flood",
    icon: "🌊",
    summary: "Move away from rising water and never underestimate floodwater.",
    sections: [
      ["Before", [
        "Know whether your area is prone to flooding.",
        "Keep important documents protected.",
        "Prepare water, food, lighting and communication supplies.",
        "Know higher ground and evacuation routes."
      ]],
      ["During", [
        "Move to higher ground when flooding threatens.",
        "Follow official evacuation instructions.",
        "Never walk or drive through moving floodwater.",
        "Avoid bridges and roads covered by water.",
        "Stay away from electrical equipment in wet areas."
      ]],
      ["After", [
        "Return only when authorities say it is safe.",
        "Avoid contaminated water.",
        "Watch for structural damage and electrical hazards.",
        "Document damage if safe to do so."
      ]]
    ]
  },
  {
    id: "lightning",
    title: "Lightning",
    icon: "⚡",
    summary: "Thunder means lightning is close enough to be dangerous.",
    sections: [
      ["Before", [
        "Check weather forecasts before outdoor activities.",
        "Know where substantial buildings or enclosed vehicles are located."
      ]],
      ["During", [
        "Move into a substantial building or enclosed vehicle.",
        "Do not shelter beneath an isolated tree.",
        "Stay away from windows and plumbing indoors.",
        "Wait until the storm has passed before returning outdoors."
      ]],
      ["Remember", [
        "If you can hear thunder, lightning is close enough to pose a risk.",
        "Outdoor activities should be postponed when thunderstorms approach."
      ]]
    ]
  },
  {
    id: "storm",
    title: "Severe Storm",
    icon: "⛈️",
    summary: "Reduce exposure to wind, debris and power hazards.",
    sections: [
      ["Before", [
        "Secure loose outdoor objects.",
        "Charge phones and backup batteries.",
        "Keep flashlights available.",
        "Monitor official weather information."
      ]],
      ["During", [
        "Stay indoors and away from windows.",
        "Move to a more protected interior area when severe winds threaten.",
        "Do not go outside to retrieve loose objects.",
        "Treat downed power lines as dangerous."
      ]],
      ["After", [
        "Avoid damaged structures.",
        "Use flashlights rather than open flames where possible.",
        "Report hazards through appropriate emergency channels."
      ]]
    ]
  },
  {
    id: "firstaid",
    title: "First Aid",
    icon: "🩹",
    summary: "Protect yourself, assess the situation and provide appropriate basic care.",
    sections: [
      ["First", [
        "Make sure the scene is safe before helping.",
        "Check responsiveness and breathing.",
        "Call emergency services when serious injury or illness is suspected.",
        "Use appropriate protective barriers where available."
      ]],
      ["Minor burns", [
        "Cool the burn with cool running water.",
        "Remove nearby jewellery or restrictive items before swelling develops.",
        "Do not apply ice directly to a burn.",
        "Seek medical attention for serious or extensive burns."
      ]],
      ["Bleeding", [
        "Apply firm direct pressure with clean material.",
        "Maintain pressure and seek emergency help for severe bleeding.",
        "Do not repeatedly remove dressings just to inspect the wound."
      ]]
    ]
  }
];

// Short (id, title, icon) list reused by the dashboard cards, quiz topic
// picker, and quiz question labelling.
const topicInfo = [
  ["earthquake", "Earthquake", "🌎"],
  ["fire", "Fire", "🔥"],
  ["flood", "Flood", "🌊"],
  ["lightning", "Lightning", "⚡"],
  ["storm", "Severe Storm", "⛈️"],
  ["firstaid", "First Aid", "🩹"]
];

// Render the dashboard's clickable topic cards.
$("topicCards").innerHTML = topicInfo.map(([id, title, icon]) => `
    <article class="topic-card" data-guide="${id}">
      <div class="topic-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${guides.find(g => g.id === id).summary}</p>
    </article>
  `).join("");

// Render the full guide cards on the Guides screen.
$("guideGrid").innerHTML = guides.map((guide) => `
    <article class="guide-card">
      <div class="topic-icon">${guide.icon}</div>
      <h3>${guide.title}</h3>
      <p>${guide.summary}</p>
      <button class="secondary-btn guide-open" data-guide="${guide.id}">Read Guide</button>
    </article>
  `).join("");

// Both the dashboard topic cards and the guide cards open the same modal.
document.querySelectorAll("[data-guide]").forEach((element) => {
  element.addEventListener("click", () => openGuide(element.dataset.guide));
});

// Fill and show the guide modal for a given guide id.
function openGuide(id) {
  const guide = guides.find((g) => g.id === id);
  if (!guide) return;

  $("modalBody").innerHTML = `
    <div class="topic-icon">${guide.icon}</div>
    <h2>${guide.title}</h2>
    <p>${guide.summary}</p>
    ${guide.sections.map(([title, items]) => `
      <h3>${title}</h3>
      <ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>
    `).join("")}
  `;

  $("guideModal").classList.remove("hidden");
}

// Close on the × button or by clicking the dimmed backdrop.
$("closeModalButton").addEventListener("click", () => {
  $("guideModal").classList.add("hidden");
});

$("guideModal").addEventListener("click", (event) => {
  if (event.target === $("guideModal")) {
    $("guideModal").classList.add("hidden");
  }
});
