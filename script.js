// Totally Normal Troll Page — JS (external so it runs reliably)
const $ = (id) => document.getElementById(id);

const meterFill = $("meterFill");
const meterText = $("meterText");
const year = $("year");
const modal = $("modal");
const modalText = $("modalText");

year.textContent = new Date().getFullYear();

let troll = 7;
let drift = 0;

const messages = [
  "You have been selected for a free upgrade to: ✨ nothing ✨",
  "We detected 0 problems. So we added some.",
  "Warning: Your aura is set to \"Maximum\".",
  "Congratulations! You pressed the button. That’s… something.",
  "System status: Unbothered. Moisturized. In my lane."
];

function setTroll(val) {
  troll = Math.max(0, Math.min(100, val));
  meterFill.style.width = troll + "%";
  meterText.textContent = "Troll level: " + troll + "%";
  $("title").textContent = troll >= 60 ? "Definitely Normal Page" : "Totally Normal Page";
  document.body.style.setProperty("--wobble", (troll / 100).toFixed(2));
}

function openModal(text) {
  modalText.textContent = text;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("show"));
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => { modal.hidden = true; }, 180);
}

// Main button: increases troll level and shows a modal
$("bigButton").addEventListener("click", () => {
  setTroll(troll + 13);
  const msg = messages[Math.floor(Math.random() * messages.length)];
  openModal(msg);
  blip();
});

// Tiny button: harmless but annoying
$("tinyButton").addEventListener("mouseenter", () => {
  drift = (drift + 1) % 4;
  $("tinyButton").style.transform = `translate(${drift * 10}px, ${drift * -7}px) rotate(${drift * 8}deg)`;
});

// Do NOT Press: shake + toasts
$("panic").addEventListener("click", () => {
  setTroll(troll + 25);
  openModal("🚨 Too late. The Troll Protocol has been activated.");
  document.body.classList.add("shake");
  spawnToasts(6);
  setTimeout(() => document.body.classList.remove("shake"), 900);
});

$("reset").addEventListener("click", () => {
  setTroll(7);
  spawnToasts(2, "Reset complete. Reality restored.");
});

$("terms").addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Terms: 1) Don’t panic. 2) Seriously. 3) That’s it.");
});

$("ok").addEventListener("click", () => {
  closeModal();
  spawnToasts(1, "Thank you for acknowledging the vibes.");
});

$("nope").addEventListener("click", () => {
  setTroll(troll + 9);
  closeModal();
  spawnToasts(2, "Denied. Increasing troll level anyway.");
});

// Close modal on background click / Escape
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.hidden && e.key === "Escape") closeModal();
});

// Gentle drift
setInterval(() => {
  if (troll > 15) setTroll(troll + (Math.random() < 0.35 ? 1 : -1));
}, 1400);

function spawnToasts(n, forcedText) {
  for (let i = 0; i < n; i++) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = forcedText || randomToast();
    t.style.left = Math.round(10 + Math.random() * 80) + "vw";
    t.style.bottom = Math.round(10 + Math.random() * 20) + "vh";
    t.style.animationDelay = (Math.random() * 0.15) + "s";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
}

function randomToast() {
  const opts = [
    "✅ Verified: you’re being trolled",
    "🧠 Tip: hydrate",
    "💾 Saving progress… (not really)",
    "📡 Signal acquired",
    "🧻 Paper hands detected",
    "🧃 Juice level: optimal"
  ];
  return opts[Math.floor(Math.random() * opts.length)];
}

function blip() {
  document.body.classList.add("blip");
  setTimeout(() => document.body.classList.remove("blip"), 120);
}

// init
setTroll(7);
