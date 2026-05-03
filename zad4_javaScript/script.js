function zmianaStylu() {
  styl = document.getElementById("stylStrony");

  if (styl.getAttribute("href") === "red.css") {
    styl.setAttribute("href", "green.css");
  } else {
    styl.setAttribute("href", "red.css");
  }
}
