$(document).ready(() => {
  $("table.alphabets td").on("click", (e) => {
    const currentTarget = $(e.currentTarget);
    currentTarget.addClass("selected");
  });
});
