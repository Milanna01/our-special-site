const songs = [
  {
    title: "That’s What I Like",
    artist: "Bruno Mars",
    initials: "BM",
    cover: "images/song1.jpg",
    file: "music/song1.mp3"
  },
  {
    title: "How Do You Sleep?",
    artist: "Sam Smith",
    initials: "SS",
    cover: "images/song2.jpg",
    file: "music/song2.mp3"
  },
  {
    title: "eight",
    artist: "IU",
    initials: "IU",
    cover: "images/song3.jpg",
    file: "music/song3.mp3"
  },
  {
    title: "Feel It Still",
    artist: "Portugal. The Man",
    initials: "PT",
    cover: "images/song4.jpg",
    file: "music/song4.mp3"
  },
  {
    title: "Earrings",
    artist: "Malcolm Todd",
    initials: "MT",
    cover: "images/song5.jpg",
    file: "music/song5.mp3"
  },
  {
    title: "Little Miss",
    artist: "GIRLSET",
    initials: "GS",
    cover: "images/song6.jpg",
    file: "music/song6.mp3"
  }
];




const audio = window.parent.document.getElementById("global-audio");
const vinyl = document.getElementById("vinyl");
const playButton = document.getElementById("play-button");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songList = document.getElementById("song-list");
const volumeSlider = document.getElementById("volume-slider");
const volumeValue = document.getElementById("volume-value");

// Начальная громкость — 50%
const savedVolume = sessionStorage.getItem("musicVolume");
audio.volume = savedVolume !== null ? Number(savedVolume) : 0.5;

volumeSlider.value = audio.volume * 100;
volumeValue.textContent = `${Math.round(audio.volume * 100)}%`;

// Меняем громкость при движении ползунка
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
  volumeValue.textContent = `${volumeSlider.value}%`;

  sessionStorage.setItem("musicVolume", audio.volume);
});

let currentSong = 0;

// Создаём список песен
songs.forEach((song, index) => {
  const button = document.createElement("button");
  button.className = "song-item";
  button.type = "button";

  button.innerHTML = `
  <span class="song-number">${String(index + 1).padStart(2, "0")}</span>
  <img class="song-cover" src="${song.cover}" alt="Обложка ${song.title}">
  <span class="song-info">
    <span class="song-name">${song.title}</span>
    <span class="song-artist">${song.artist}</span>
  </span>
`;

  button.addEventListener("click", () => {
    selectSong(index, true);
  });

  songList.appendChild(button);
});

// Выбираем песню
function selectSong(index, autoplay = false) {
  currentSong = index;

  sessionStorage.setItem("currentSong", currentSong);

  const songUrl = new URL(songs[index].file, window.parent.location.href).href;

  if (audio.src !== songUrl) {
    audio.pause();
    audio.src = songUrl;
  }

  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;

  document.querySelectorAll(".song-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  if (autoplay) {
    playSong();
  } else {
    if (audio.paused) {
      vinyl.classList.remove("playing");
      playButton.textContent = "▶";
    }
  }
} // Закрываем функцию selectSong

// Воспроизведение
async function playSong() {
  try {
    await audio.play();
  } catch (error) {
    console.error("Не удалось воспроизвести песню:", error);
    vinyl.classList.remove("playing");
    playButton.textContent = "▶";
  }
}

// Кнопка Play / Pause
playButton.addEventListener("click", () => {
  if (audio.paused) {
    if (!audio.src) {
      selectSong(currentSong);
    }
    playSong();
  } else {
    audio.pause();
  }
});

// Синхронизируем анимацию с музыкой
audio.addEventListener("loadedmetadata", () => {
  if (!audio.paused) {
    vinyl.classList.add("playing");
    playButton.textContent = "Ⅱ";
  }
});

audio.addEventListener("pause", () => {
  vinyl.classList.remove("playing");
  playButton.textContent = "▶";
});

audio.addEventListener("play", () => {
  vinyl.classList.add("playing");
  playButton.textContent = "Ⅱ";
});

function syncPlayerState() {
  if (!audio.paused) {
    vinyl.classList.add("playing");
    playButton.textContent = "Ⅱ";
  } else {
    vinyl.classList.remove("playing");
    playButton.textContent = "▶";
  }
}

syncPlayerState();

window.addEventListener("pageshow", syncPlayerState);

// Когда песня заканчивается — включаем следующую
audio.addEventListener("ended", () => {
  const nextSong = (currentSong + 1) % songs.length;
  selectSong(nextSong, true);
});

// Восстанавливаем отображение выбранной песни
const savedSong = Number(sessionStorage.getItem("currentSong"));

if (
  Number.isInteger(savedSong) &&
  savedSong >= 0 &&
  savedSong < songs.length
) {
  currentSong = savedSong;
}

selectSong(currentSong);