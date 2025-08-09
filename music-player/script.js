const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const seekSlider = document.getElementById("seek-slider");
const currentTime = document.getElementById("current-time");
const durationTime = document.getElementById("duration");

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = formatTime(audio.duration);
  seekSlider.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  seekSlider.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
});

function seekAudio() {
  audio.currentTime = seekSlider.value;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
