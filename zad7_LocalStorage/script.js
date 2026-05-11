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

document.addEventListener("DOMContentLoaded", pobierzDane);

function pobierzDane() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {

      //umiejętnosci
      const ulUmiejetnosci = document.getElementById("umiejetnosci");
      data.umiejetnosci.forEach(el => {
        const li = document.createElement("li");
        li.textContent = el;
        ulUmiejetnosci.appendChild(li);
      });

      //projekty
      const ulProjekty = document.getElementById("listaProjektow");
      data.projekty.forEach(el => {
        const li = document.createElement("li");
        li.textContent = el;
        ulProjekty.appendChild(li);
      });

    })
    .catch(err => console.error("Błąd JSON:", err));
}

const listaNotatek = document.getElementById("listaNotatek");
window.addEventListener("DOMContentLoaded", wczytajNotatki);

function zapiszNotatke() {
    const input = document.getElementById("notatkaInput");
    if (input.value === "") {
        return;
    }
  
    //Pobranie zapisanych notatek
    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];
    //Dodanie nowej notatki
    notatki.push(input.value);
    //Zapis do localStorage
    localStorage.setItem("notatki", JSON.stringify(notatki));
    //Dodanie do listy na stronie
    dodajNotatkeDoListy(input.value);
    //Wyczyszczenie inputa
    input.value = "";
}

function dodajNotatkeDoListy(tresc) {
    const li = document.createElement("li");
    li.textContent = tresc + " ";
    //Przycisk usuń
    const btnUsun = document.createElement("button");
    btnUsun.textContent = "Usuń";
  
    btnUsun.onclick = function () {
        li.remove();
        usunNotatke(tresc);
    };
  
    li.appendChild(btnUsun);
    listaNotatek.appendChild(li);
}

function wczytajNotatki() {
    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];
    notatki.forEach(notatka => {
        dodajNotatkeDoListy(notatka);
    });
}

function usunNotatke(tresc) {
    let notatki = JSON.parse(localStorage.getItem("notatki")) || [];
    notatki = notatki.filter(notatka => notatka !== tresc);
    localStorage.setItem("notatki", JSON.stringify(notatki));
}
