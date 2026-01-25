// nincaleb landing — JS
const $ = (id) => document.getElementById(id);

const year = $("year");
const modal = $("modal");
const modalText = $("modalText");
const statusText = $("statusText");
const statusPill = $("statusPill");
const embedWrap = $("embedWrap");
const parentHint = $("parentHint");

year.textContent = new Date().getFullYear();

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

function setStatus(on){
  if(on){
    statusText.textContent = "Embed on";
    statusPill.querySelector(".dot").className = "dot ok";
  }else{
    statusText.textContent = "Embed off";
    statusPill.querySelector(".dot").className = "dot warn";
  }
}

function buildTwitchUrls(){
  const parent = window.location.hostname || "localhost";
  if(parentHint) parentHint.textContent = "parent=" + parent;

  const player = `https://player.twitch.tv/?channel=nincaleb&parent=${encodeURIComponent(parent)}&autoplay=false`;
  const chat = `https://www.twitch.tv/embed/nincaleb/chat?parent=${encodeURIComponent(parent)}&darkpopout`;
  return { player, chat };
}

let embedOn = false;

const toggle = $("toggleEmbed");
if(toggle){
  toggle.addEventListener("click", () => {
    embedOn = !embedOn;

    if(embedOn){
      const { player, chat } = buildTwitchUrls();

      if(!window.location.hostname){
        openModal("The Twitch embed usually won’t load from a local file. Host this page on a domain (Cloudflare Pages / GitHub Pages), then try again.");
      }

      $("twitchPlayer").src = player;
      $("twitchChat").src = chat;
      embedWrap.hidden = false;
      setStatus(true);
      toggle.textContent = "Hide live (embed)";
    }else{
      $("twitchPlayer").src = "";
      $("twitchChat").src = "";
      embedWrap.hidden = true;
      setStatus(false);
      toggle.textContent = "Watch live (embed)";
    }
  });
}

const copyDiscord = $("copyDiscord");
if(copyDiscord){
  copyDiscord.addEventListener("click", async () => {
    const text = "nincaleb";
    try{
      await navigator.clipboard.writeText(text);
      openModal("Copied Discord username: " + text);
    }catch{
      openModal("Couldn’t auto-copy. Discord: " + text);
    }
  });
}

const copyLinks = $("copyLinks");
if(copyLinks){
  copyLinks.addEventListener("click", async () => {
    const links = [
      "Twitch: https://twitch.tv/nincaleb",
      "YouTube: https://youtube.com/nincalebfn",
      "GitHub: https://github.com/nincaleb",
      "Steam: https://steamcommunity.com/id/nincaleb"
    ].join("\n");

    try{
      await navigator.clipboard.writeText(links);
      openModal("Copied all links.");
    }catch{
      openModal("Couldn’t auto-copy.\n\n" + links);
    }
  });
}

const troll = $("troll");
if(troll){
  troll.addEventListener("click", () => {
    openModal("You clicked the totally normal button. Nothing happens. (That’s the joke.)");
  });
}

if(parentHint) parentHint.textContent = window.location.hostname ? ("parent=" + window.location.hostname) : "parent=(host to enable)";
if(statusText) setStatus(false);
