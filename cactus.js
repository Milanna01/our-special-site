document.addEventListener("DOMContentLoaded", () => {
  const cactus = document.getElementById("cactus-button");
  const pot = document.getElementById("pot-button");
  const flower = document.getElementById("flower");
  const bubble = document.getElementById("speech-bubble");
  const bloomButton = document.getElementById("bloom-button");

  const overlay = document.getElementById("letter-overlay");
  const closeButton = document.getElementById("letter-close");
  const doneButton = document.getElementById("letter-done");

  // Письмо скрыто при загрузке
  if (overlay) {
    overlay.hidden = true;
  }

  // Открыть письмо
  function openLetter() {
  if (!overlay) return;
  overlay.hidden = false;
  overlay.style.display = "";
}

  // Закрыть письмо
  function closeLetter() {
    if (!overlay) return;
    overlay.hidden = true;
    overlay.style.display = "none";
  }

  // Нажатие на горшочек открывает письмо
  if (pot) {
    pot.addEventListener("click", openLetter);
  }

  // Закрытие письма
  if (closeButton) {
    closeButton.addEventListener("click", closeLetter);
  }

  if (doneButton) {
    doneButton.addEventListener("click", closeLetter);
  }

  // Закрыть нажатием за пределами письма
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeLetter();
      }
    });
  }

  // Закрыть клавишей Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLetter();
    }
  });

  // Сообщения кактуса
  function showMessage(message) {
    if (!bubble) return;

    bubble.textContent = message;
    bubble.classList.remove("visible");
    void bubble.offsetWidth;
    bubble.classList.add("visible");

    clearTimeout(showMessage.timer);
    showMessage.timer = setTimeout(() => {
      bubble.classList.remove("visible");
    }, 2500);
  }
  function createHearts() {
  const cactus = document.getElementById("cactus-button");
  if (!cactus) return;

  const rect = cactus.getBoundingClientRect();
  const symbols = ["💗", "💕", "♡", "💖", "♥"];

  for (let i = 0; i < 9; i++) {
    const heart = document.createElement("span");

    heart.className = "flying-heart";
    heart.textContent = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;

    const angle = (Math.PI * 2 * i) / 9;
    const distance = 60 + Math.random() * 65;

    heart.style.setProperty(
      "--heart-x",
      `${Math.cos(angle) * distance}px`
    );

    heart.style.setProperty(
      "--heart-y",
      `${Math.sin(angle) * distance - 25}px`
    );

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1400);
  }
}
let cactusClickCount = 0;

if (cactus) {
  cactus.addEventListener("click", () => {
    cactusClickCount++;

    cactus.classList.remove("hopping");
    void cactus.offsetWidth;
    cactus.classList.add("hopping");
    createHearts();

    if (cactusClickCount === 5) {
      showMessage("ПОЗДРАВЛЯЮ! ТЫ ПОТРАТИЛА 5 НАЖАТИЙ, ЧТОБЫ УЗНАТЬ, КАК СИЛЬНО Я ТЕБЯ ОБОЖАЮ, КОТ 💗");
    } else {
      showMessage("Ты делаешь мой маленький мир ярче 💚");
    }
  });
}
  if (bloomButton) {
    bloomButton.addEventListener("click", () => {
      if (flower) {
        flower.classList.toggle("blooming");
      }

      showMessage("Этот цветочек — для тебя 🌸");
    });
  }
});