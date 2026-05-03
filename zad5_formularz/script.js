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
  if (sekcja.style.display === "none") { 
    sekcja.style.display = "block"; } 
  else { 
    sekcja.style.display = "none"; 
  } 
}

function wyslijWiadomosc() {
  imie = document.getElementById("imie").value.trim();
  nazwisko = document.getElementById("nazwisko").value.trim();
  email = document.getElementById("email").value.trim();
  wiadomosc = document.getElementById("wiadomosc").value.trim();
  bledyDiv = document.getElementById("bledy");

  let bledy = [];

  //1. Pola wymagane
  if (imie === "") bledy.push("Imię jest wymagane.");
  if (nazwisko === "") bledy.push("Nazwisko jest wymagane.");
  if (email === "") bledy.push("E-mail jest wymagany.");
  if (wiadomosc === "") bledy.push("Wiadomość jest wymagana.");

  //2. Poprawny email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== "" && !emailRegex.test(email)) {
    bledy.push("Podaj poprawny adres e-mail.");
  }

  //3. Imię i nazwisko – bez cyfr
  bezCyfr = /^[A-Za-zÀ-ž\s-]+$/;

  if (imie !== "" && !bezCyfr.test(imie)) {
    bledy.push("Imię nie może zawierać cyfr.");
  }

  if (nazwisko !== "" && !bezCyfr.test(nazwisko)) {
    bledy.push("Nazwisko nie może zawierać cyfr.");
  }

  // 4. Wyświetlanie błędów
  if (bledy.length > 0) {
    bledyDiv.innerHTML = bledy.join("<br>");
  } else {
    bledyDiv.style.color = "green";
    bledyDiv.innerHTML = "Wiadomość została wysłana poprawnie!";
  }
}
