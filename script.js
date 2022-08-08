const Imag = document.querySelector("img");
const Title = document.getElementById("title");
const Artist = document.getElementById("artist");

const Music = document.querySelector("audio");
const Prev = document.getElementById("prev");
const Play = document.getElementById("play");
const Next = document.getElementById("next");

const progressContainer = document.getElementById("progress-container");
const Progress = document.getElementById("progress");

const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

// Music

const Songs = [
  {
    name: "altogether",
    displayName: "Altogether Alone",
    artist: "Hirth Martinez",
  },
  {
    name: "khala",
    displayName: "Khala My Friend",
    artist: "Amanaz",
  },
  {
    name: "onlyafool",
    displayName: "Only A Fool Would Say That",
    artist: "Steely Dan",
  },
];

// Check if Playing

let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  Play.classList.replace("fa-play", "fa-pause");
  Play.setAttribute("title", "Pause");
  Music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  Play.classList.replace("fa-pause", "fa-play");
  Play.setAttribute("title", "Play");
  Music.pause();
}

// Play or Pause Event Listener

Play.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM

function loadSong(song) {
  Title.textContent = song.displayName;
  Artist.textContent = song.artist;
  Music.src = `music/${song.name}.mp3`;
  Imag.src = `img/${song.name}.jpg`;
}

// Current Song

let songIndex = 0;

// Previous Song

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = Songs.length - 1;
  }
  loadSong(Songs[songIndex]);
  playSong();
}

// Next Song

function nextSong() {
  songIndex++;
  if (songIndex > Songs.length - 1) {
    songIndex = 0;
  }
  loadSong(Songs[songIndex]);
  playSong();
}

// On Load - Select First Song

loadSong(Songs[songIndex]);

// Update Progress Bar & Time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progress Bar Width

    const progressPercent = (currentTime / duration) * 100;
    Progress.style.width = `${progressPercent}%`;

    // Calculate display for duration

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculation display for current time

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = Music;
  const percentage = (clickX / width) * duration;

  Music.currentTime = percentage;

}

// Event Listeners

Prev.addEventListener("click", prevSong);
Next.addEventListener("click", nextSong);

Music.addEventListener("timeupdate", updateProgressBar);

progressContainer.addEventListener("click", setProgressBar);

Music.addEventListener('ended', nextSong);
