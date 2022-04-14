$(document).ready(() => {
  const mysteryWord = "STRANGER";
  const MAX_TRIES = 6;

  let fails = 0;
  let matches = 0;

  const applauseSound = new Audio("sounds/applause3.wav");
  const bombSound = new Audio("sounds/bomb_x.wav");

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

  $("table.alphabets td").on("click", (e) => {
    const currentTarget = $(e.currentTarget);
    currentTarget.addClass("selected");
    checkTheGuess(currentTarget.text());
  });
});
