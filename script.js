// nincaleb mail portal — JS (pseudo-embed)
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

function setStatus(opened){
  if(opened){
    statusText.textContent = "Portal ready";
    statusDot.className = "dot ok";
  }else{
    statusText.textContent = "Portal closed";
    statusDot.className = "dot warn";
  }
}

const EMAIL_URL = "https://app.sage.party/email";

$("toggleEmailEmbed").addEventListener("click", () => {
  // "Feels embedded": reveal the portal panel, then launch the real site in a new tab.
  wrap.hidden = false;
  setStatus(true);

  const win = window.open(EMAIL_URL, "_blank", "noopener,noreferrer");
  if(!win){
    openModal("Popup blocked. Click “Open in new tab” instead (or allow popups for this site).");
  }else{
    openModal("Opened SAGE Email in a new tab. Keep this page open as your portal.");
  }
});

const copyEmailUrl = $("copyEmailUrl");
if(copyEmailUrl){
  copyEmailUrl.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(EMAIL_URL);
      openModal("Copied: " + EMAIL_URL);
    }catch{
      openModal("Couldn’t auto-copy. URL: " + EMAIL_URL);
    }
  });
}

$("copyDiscord").addEventListener("click", async () => {
  const text = "nincaleb";
  try{
    await navigator.clipboard.writeText(text);
    openModal("Copied Discord username: " + text);
  }catch{
    openModal("Couldn’t auto-copy. Discord: " + text);
  }
});

// default state
wrap.hidden = true;
setStatus(false);
