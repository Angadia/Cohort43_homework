$(document).ready(() => {
  const mysteryWord = "STRANGER";

  for (let i = 0; i < mysteryWord.length; i++) {
    $("table.mysteryWord tr").append($(`<td></td>`));
  }

  function checkTheGuess(guess) {
    let i = mysteryWord.indexOf(guess, 0);
    console.log(guess, i);
    while (i > -1) {
      $(`table.mysteryWord td:nth-child(${i+1})`).text(guess);
      i = mysteryWord.indexOf(guess, i + 1);
    }
  }

  $("table.alphabets td").on("click", (e) => {
    const currentTarget = $(e.currentTarget);
    currentTarget.addClass("selected");
    checkTheGuess(currentTarget.text());
  });
});
