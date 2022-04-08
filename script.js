const musicContainer = document.querySelector(".music-container");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const storage = document.querySelector("#storage");
const history = document.querySelector("#history");
var historyLen = document.querySelector("#historyList").childElementCount;
//const playButton = document.querySelectorAll(".playButton");
const historyList = document.querySelector("#historyList");
const volume = document.querySelector(".volume");
const addSong = document.querySelector(".please");
const addingPage = document.querySelector("#addingPage");
const newSong = document.querySelector("#newSong");
const songImg = document.querySelector("#songImg");
const songFile = document.querySelector("#songFile");
const addForm = document.querySelector("#addForm");

const songs = [
  "costa",
  "war",
  "inertia status",
  "help_urself",
  "violet water",
  "Fleeting Frozen Heart",
  "Absolute Territory",
  "FLAP LIPS",
  "Gravehop187",
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  play.querySelector("i.fas").classList.add("fa-play");
  play.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;
  historyLen++;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
  loadHistory();
}

function nextSong() {
  songIndex++;
  historyLen++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
  loadHistory();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//function playStorage() {
// for (let i = 0; i < songs.length; i++) {}
//}

function loadStorage() {
  for (let i = 0; i < songs.length; i++) {
    storage.innerHTML +=
      `<div id="` +
      `${songs[i]}` +
      `" class="imgHolder"><label for="storedImg" class="labels">` +
      `${songs[i]}` +
      `</label><img id="storedImg" src="images` +
      `\\${songs[i]}.jpg` +
      `"></img></div>`;
  }
}

function deleteChild() {
  var e = historyList;

  var child = e.firstElementChild;

  e.removeChild(child);
  child = e.firstElementChild;
}

function loadHistory() {
  historyList.innerHTML +=
    `<li id="historyImg2"><div class="hisHolder"><img id="historyImg" src="images` +
    `\\${songs[songIndex]}.jpg` +
    `"></img></div></li>`;
  if (historyLen > 5) {
    //console.log(even);
    //even.style.display = "none";
    deleteChild();
  }
}

function submitNewSong() {
  songs.push(newSong.value);

  storage.innerHTML += `<img src="` + +`"></img>`;
}

//function execution

loadStorage();
loadHistory();
addingPage.style.display = "none";

//playStorage();

//event listeners

play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

addSong.addEventListener("click", () => {
  if (addingPage.style.display === "none") {
    addingPage.style.display = "block";
  } else {
    addingPage.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      prevSong();
      break;
    case "ArrowRight":
      nextSong();
      break;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

/*playButton.addEventListener("click", () => {
  const isPlaying = playButton.classList.contains("fa-play");

  if (isPlaying) {
    alert("wow");
  } else {
    alert("nay");
  }
});*/

addForm.addEventListener("submit", submitNewSong);
