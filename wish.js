const openEnvelopeButton = document.getElementById("open-envelope");
const loveSong = document.getElementById("love-song");
const introScreen = document.getElementById("intro-screen");
const letterScene = document.getElementById("letter-scene");
const letterText = document.getElementById("letter-text");
const letterEnding = document.querySelector(".letter-ending");

const blowButton = document.getElementById("blow-candles");
const candles = document.querySelector(".candles");

loveSong.volume = 0.01;

const letter = `Думаю, всего самого лучшего тебе и так пожелают: любви, побольше денег и здоровья. Но я не хочу ничего банального, я захотела удивить действительно прекрасного человека (скринь, ибо таких слов ты от меня ещё не слышала, скорее всего, в свою сторону АХХАХАХА).

Я всегда наблюдаю за тем, какой сильной ты кажешься, как всегда первой прибегаешь кому-то на помощь и поддерживаешь своих друзей. Поэтому мне захотелось сделать что-то уже для тебя, показать, что и для тебя хочется стараться, пытаться удивлять тебя.

Я очень старалась над этим сайтом для тебя, хоть код всё ещё грязный АХХАХАХА. Просто мне хотелось бы, чтобы ты знала, что как бы часто мы ни ругались, как бы много ни дулись друг на друга, я всё равно буду любить тебя и стараться измениться, если тебе что-то не нравится. Ведь если бы человек не был мне дорог, я бы так не старалась.

Я очень рада, что мы каким-то образом познакомились, а в итоге так сблизились и привязались друг к другу. Просто мне хочется, чтобы ты знала, какой ты прекрасный и сильный человек. И тебе совершенно не обязательно всегда быть успешной, весёлой или сильной. Ты можешь уставать, грустить, сомневаться в себе и расстраиваться — это никак не изменит мою любовь к тебе и того, как сильно тебя любят твои друзья.

И ещё мне очень хочется, чтобы ты почаще думала о себе и не забывала о собственных желаниях, а не только о других. Я очень хочу, чтобы у тебя всё получалось, чтобы твои мечты и желания исполнялись. И я с радостью буду слушать, как ты рассказываешь мне о них, о своих планах и успехах, и радоваться вместе с тобой каждому твоему достижению, но и поддерживать тебя, когда у тебя что-то не получается. Быть рядом не только в счастливые моменты, но и в трудные. Мне правда хочется, чтобы ты была счастлива и чтобы у тебя было как можно больше поводов улыбаться. 🥹💗

Мне очень нравится проводить с тобой время, слушать тебя и просто болтать обо всём подряд. Я всегда жду твоих сообщений, потому что они правда поднимают мне настроение, и даже обычный ответ от тебя может заставить меня улыбнуться АХХАХАХА. Я очень рада, что мы познакомились и стали настолько близки друг другу.

И я правда надеюсь, что ты тоже чувствуешь, как сильно тебя любят, потому что ты заслуживаешь всего этого тепла не меньше других. Мне очень хочется радовать тебя, видеть твою улыбку (твои хахаха в чате) и делать для тебя что-то приятное, даже если это всего лишь маленькие вещи. 🥹💗

Ладно, думаю, я уже выдавила из себя всё добро, которое во мне было АХХАХАХАХА, так что пользуйся моментом, не каждый день такое услышишь от меня 💗`;

let typingTimer = null;
let hasOpened = false;

openEnvelopeButton.addEventListener("click", async () => {
  if (hasOpened) return;

  hasOpened = true;
  introScreen.style.display = "none";
  letterScene.hidden = false;

  window.scrollTo(0, 0);
  startTyping();

  try {
    await loveSong.play();
  } catch (error) {
    console.log("Музыку не удалось запустить:", error);
  }
});

function startTyping() {
  let index = 0;
  letterText.textContent = "";
  letterEnding.classList.remove("show");

  if (typingTimer !== null) {
    clearTimeout(typingTimer);
  }

  function typeNextCharacter() {
    if (index >= letter.length) {
      typingTimer = setTimeout(() => {
        letterEnding.classList.add("show");
      }, 1000);

      return;
    }

    letterText.textContent += letter[index];
    index++;

    typingTimer = setTimeout(typeNextCharacter, 12);
  }

  typeNextCharacter();
}

// Кнопка задувания свечей
blowButton.addEventListener("click", () => {
  candles.classList.add("blown-out");
  blowButton.textContent = "Реально загадала? Мило хахах💗";
  blowButton.disabled = true;
});

const finalSecretButton = document.getElementById("final-secret-button");
const finalSecretPopup = document.getElementById("final-secret-popup");
const finalSecretClose = document.getElementById("final-secret-close");

finalSecretButton.addEventListener("click", () => {
  finalSecretPopup.classList.add("open");
});

finalSecretClose.addEventListener("click", () => {
  finalSecretPopup.classList.remove("open");
});

finalSecretPopup.addEventListener("click", (event) => {
  if (event.target === finalSecretPopup) {
    finalSecretPopup.classList.remove("open");
  }
});