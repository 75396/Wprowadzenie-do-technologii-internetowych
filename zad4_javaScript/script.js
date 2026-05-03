function zmianaStylu() {
  styl = document.getElementById("stylStrony");

  if (styl.getAttribute("href") === "red.css") {
    styl.setAttribute("href", "green.css");
  } else {
    styl.setAttribute("href", "red.css");
  }
}

function ukryjProjekty() {
  sekcja = document.getElementById("projekty");
  sekcja.classList.toggle("ukryte");
}
