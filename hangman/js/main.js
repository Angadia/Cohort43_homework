$(document).ready(() => {
  const mysteryWord = "STRANGER";
  let fails = 0;

  for (let i = 0; i < mysteryWord.length; i++) {
    $("table.mysteryWord tr").append($(`<td></td>`));
  }

  function checkTheGuess(guess) {
    if (mysteryWord.includes(guess)) {
      let i = mysteryWord.indexOf(guess, 0);
      while (i > -1) {
        $(`table.mysteryWord td:nth-child(${i + 1})`).text(guess);
        i = mysteryWord.indexOf(guess, i + 1);
      }
    } else {
      fails++;
      $("img.hangmanImage").attr("src", `images/${fails}.jpg`);
    }
  }

  $("table.alphabets td").on("click", (e) => {
    const currentTarget = $(e.currentTarget);
    currentTarget.addClass("selected");
    checkTheGuess(currentTarget.text());
  });
});
