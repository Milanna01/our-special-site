const screens = document.querySelectorAll('.screen');
const home = document.querySelector('#home');
const song = document.querySelector('#song');
const vinyl = document.querySelector('#vinyl');

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === id);
  });

  if (song) {
    song.pause();
    if (id !== 'music') {
      song.currentTime = 0;
    }
  }

  if (vinyl) {
    vinyl.classList.remove('playing');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.open);
  });
});

document.querySelectorAll('[data-back]').forEach((button) => {
  button.addEventListener('click', () => {
    showScreen('home');
  });
});

// Письмо открывается при нажатии на конверт
const envelope = document.querySelector('#envelope');
const letter = document.querySelector('#letter');

if (envelope && letter) {
  envelope.addEventListener('click', () => {
    envelope.hidden = true;
    letter.hidden = false;
  });
}

// Пластинка вращается во время музыки
if (song && vinyl) {
  song.addEventListener('play', () => {
    vinyl.classList.add('playing');
  });

  song.addEventListener('pause', () => {
    vinyl.classList.remove('playing');
  });

  song.addEventListener('ended', () => {
    vinyl.classList.remove('playing');
  });
}