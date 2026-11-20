const welcome = document.querySelector("#welcome");
const invitation = document.querySelector("#invitation");
const heartButton = document.querySelector("#heart-button");
const enterButton = document.querySelector("#enter-button");
const joinNames = document.querySelector(".name-join");
const joinCaption = document.querySelector("#join-caption");
const musicStatus = document.querySelector("#music-status");
const cardMusicStatus = document.querySelector("#card-music-status");
const musicButton = document.querySelector("#music-button");
const backButton = document.querySelector("#back-button");
const uruliAudio = document.querySelector("#uruli-audio");
const biyaAudio = document.querySelector("#biya-audio");
let activeAudio = null;

function setMusicStatus(message) {
  musicStatus.textContent = message;
  cardMusicStatus.textContent = message;
}

function updateMusicButton() {
  const isPlaying = activeAudio && !activeAudio.paused;
  musicButton.setAttribute("aria-label", isPlaying ? "গীত বন্ধ কৰক" : "গীত বজাওক");
  musicButton.querySelector("span").textContent = isPlaying ? "গীত চলি আছে" : "গীত বজাওক";
}

async function playTrack(audio, label) {
  if (activeAudio && activeAudio !== audio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
  activeAudio = audio;
  try {
    await audio.play();
    setMusicStatus(`${label} গীতটি বাজি আছে`);
  } catch {
    setMusicStatus("গীতটি বজাব পৰা নগ’ল। পুনৰ চেষ্টা কৰিবলৈ গীতৰ বুটাম টিপক।");
  }
  updateMusicButton();
}

function openInvitation() {
  if (welcome.hidden) return;
  welcome.hidden = true;
  invitation.hidden = false;
  playTrack(biyaAudio, "বিয়ানাম");
  invitation.scrollIntoView({ behavior: "smooth", block: "start" });
}

heartButton.addEventListener("click", () => {
  if (joinNames.classList.contains("connected")) return;
  joinNames.classList.add("connected");
  joinCaption.textContent = "মৰমৰ বন্ধনটি সম্পূৰ্ণ হ’ল";
  heartButton.setAttribute("aria-label", "মৰমৰ বন্ধন সম্পূৰ্ণ");
  enterButton.hidden = false;
  playTrack(uruliAudio, "উৰুলি");
});

enterButton.addEventListener("click", openInvitation);
uruliAudio.addEventListener("ended", openInvitation);
backButton.addEventListener("click", () => {
  invitation.hidden = true;
  welcome.hidden = false;
  joinNames.classList.remove("connected");
  joinCaption.textContent = "হৃদয়ত স্পৰ্শ কৰক";
  heartButton.setAttribute("aria-label", "মিণ্টু আৰু সবিতাৰ মৰমৰ বন্ধন আৰম্ভ কৰক");
  enterButton.hidden = true;
  uruliAudio.currentTime = 0;
  playTrack(uruliAudio, "উৰুলি");
  welcome.scrollIntoView({ behavior: "smooth", block: "start" });
});

musicButton.addEventListener("click", async () => {
  if (!activeAudio) {
    await playTrack(biyaAudio, "বিয়ানাম");
    return;
  }
  if (activeAudio.paused) {
    await playTrack(activeAudio, activeAudio === uruliAudio ? "উৰুলি" : "বিয়ানাম");
    return;
  }
  activeAudio.pause();
  setMusicStatus("গীত বন্ধ কৰা হৈছে");
  updateMusicButton();
});

for (const audio of [uruliAudio, biyaAudio]) {
  audio.addEventListener("play", updateMusicButton);
  audio.addEventListener("pause", updateMusicButton);
  audio.addEventListener("error", () => {
    setMusicStatus("গীতৰ ফাইলটো পোৱা নগ’ল।");
    updateMusicButton();
  });
}

window.addEventListener("load", () => playTrack(uruliAudio, "উৰুলি"), { once: true });

const petals = document.querySelector(".petals");
for (let index = 0; index < 14; index += 1) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = index % 2 === 0 ? "✿" : "❋";
  petal.style.left = `${(index * 37 + 9) % 100}%`;
  petal.style.animationDelay = `${(index % 7) * -2.3}s`;
  petal.style.animationDuration = `${14 + (index % 5) * 2}s`;
  petal.style.fontSize = `${.7 + (index % 4) * .18}rem`;
  petals.append(petal);
}
