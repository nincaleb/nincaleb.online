// nincaleb mail portal — JS
const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();

const modal = $("modal");
const modalText = $("modalText");

function openModal(text){
  modalText.textContent = text;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("show"));
}
function closeModal(){
  modal.classList.remove("show");
  setTimeout(() => { modal.hidden = true; }, 180);
}

$("ok").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (!modal.hidden && e.key === "Escape") closeModal(); });

const statusText = $("emailStatusText");
const statusDot = $("emailStatus").querySelector(".dot");
const wrap = $("emailEmbedWrap");
const frame = $("emailFrame");

let on = false;

function setStatus(val){
  if(val){
    statusText.textContent = "Embed on";
    statusDot.className = "dot ok";
  }else{
    statusText.textContent = "Embed off";
    statusDot.className = "dot warn";
  }
}

$("toggleEmailEmbed").addEventListener("click", () => {
  on = !on;

  if(on){
    frame.src = "https://app.sage.party/email";
    wrap.hidden = false;
    setStatus(true);
    $("toggleEmailEmbed").textContent = "Hide email login (embed)";
    // If embedding is blocked, browsers often show a console error; we can't detect reliably, so we show a hint.
    openModal("If the embed doesn’t load (blank / blocked), use “Open in new tab”.");
  }else{
    frame.src = "";
    wrap.hidden = true;
    setStatus(false);
    $("toggleEmailEmbed").textContent = "Show email login (embed)";
  }
});

$("copyDiscord").addEventListener("click", async () => {
  const text = "nincaleb";
  try{
    await navigator.clipboard.writeText(text);
    openModal("Copied Discord username: " + text);
  }catch{
    openModal("Couldn’t auto-copy. Discord: " + text);
  }
});

setStatus(false);
