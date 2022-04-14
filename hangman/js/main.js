$(document).ready(() => {
  const words = ["ROCK", "PAPER", "SCISSORS"];
  const mysteryWord = words[Math.floor(Math.random() * words.length)];
  const MAX_TRIES = 6;

  const applauseSound = new Audio("sounds/applause3.wav");
  const bombSound = new Audio("sounds/bomb_x.wav");
  const bounceSound = new Audio("sounds/beep-03.mp3");

  let fails = 0;
  let matches = 0;

  for (let i = 0; i < mysteryWord.length; i++) {
    $("table.mysteryWord tr").append($(`<td></td>`));
  }

  function displayTheLetters(letter) {
    let i = mysteryWord.indexOf(letter, 0);
    while (i > -1) {
      matches++;
      $(`table.mysteryWord td:nth-child(${i + 1})`).text(letter);
      i = mysteryWord.indexOf(letter, i + 1);
    }
  }

  function displayNextImage() {
    fails++;
    $("img.hangmanImage").attr("src", `images/${fails}.jpg`);
  }

  function endTheGame(music, message) {
    music.play();
    setTimeout(() => {
      $(alert(message));
      location.reload();
    }, 1000);
  }

  function checkTheGuess(guess) {
    if (mysteryWord.includes(guess)) {
      displayTheLetters(guess);
      if (matches === mysteryWord.length) {
        endTheGame(applauseSound, "Congratulations! You win!");
      }
    } else {
      displayNextImage();
      if (fails === MAX_TRIES) {
        endTheGame(bombSound, "Better luck next time...");
      }
    }
  }

  function checkTheAlphabet(alphabet) {
    if (alphabet.hasClass("selected")) {
      bounceSound.play();
    } else {
      alphabet.addClass("selected");
      checkTheGuess(alphabet.text());
    }
  }

  $("table.alphabets td").on("click", (e) => {
    checkTheAlphabet($(e.currentTarget));
  });

  function findTheAlphabet(guessCharCode) {
    const charCodeForA = 65;
    return $(
      `table.alphabets tr:nth-child(
        ${Math.floor((guessCharCode - charCodeForA) / 10) + 1}
      ) > td:nth-child(${((guessCharCode - charCodeForA) % 10) + 1})`
    );
  }

  function updateTheAlphabet(guess) {
    const guessCharCode = guess.charCodeAt(0);
    const alphabet = findTheAlphabet(guessCharCode);
    checkTheAlphabet(alphabet);
  }

  $(document).on("keypress", (e) => {
    const guess = e.key.toUpperCase().charAt(0);
    if (guess >= "A" && guess <= "Z") {
      updateTheAlphabet(guess);
    }
  });
});
