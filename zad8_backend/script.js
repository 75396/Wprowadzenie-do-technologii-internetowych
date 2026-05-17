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

  const imie = document.getElementById("imie").value.trim();
  const nazwisko = document.getElementById("nazwisko").value.trim();
  const email = document.getElementById("email").value.trim();
  const wiadomosc = document.getElementById("wiadomosc").value.trim();
  const bledyDiv = document.getElementById("bledy");

  let bledy = [];

  // 1. Pola wymagane
  if (imie === "") bledy.push("Imię jest wymagane.");
  if (nazwisko === "") bledy.push("Nazwisko jest wymagane.");
  if (email === "") bledy.push("E-mail jest wymagany.");
  if (wiadomosc === "") bledy.push("Wiadomość jest wymagana.");

  // 2. Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== "" && !emailRegex.test(email)) {
    bledy.push("Podaj poprawny adres e-mail.");
  }

  // 3. Bez cyfr
  const bezCyfr = /^[A-Za-zÀ-ž\s-]+$/;

  if (imie !== "" && !bezCyfr.test(imie)) {
    bledy.push("Imię nie może zawierać cyfr.");
  }

  if (nazwisko !== "" && !bezCyfr.test(nazwisko)) {
    bledy.push("Nazwisko nie może zawierać cyfr.");
  }

  // 4. STOP jeśli błędy
  if (bledy.length > 0) {
    bledyDiv.style.color = "red";
    bledyDiv.innerHTML = bledy.join("<br>");
    return;
  }

  // 5. Info
  bledyDiv.style.color = "black";
  bledyDiv.innerHTML = "Wysyłanie...";

  const url = "https://krnidniuuaivtxrlxfav.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtybmlkbml1dWFpdnR4cmx4ZmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzkxMDYsImV4cCI6MjA5NDU1NTEwNn0.WOXQ5-spk1h__MdEV3YnB15LsEezvnzAl-cuYow9JyA";

  const dane = {
    imie,
    nazwisko,
    email,
    wiadomosc
  };

  // 6. FETCH
  fetch(url + "/rest/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": "Bearer " + key,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(dane)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Błąd zapisu: " + res.status);
    }
    return res.text();
  })
  .then(() => {
    bledyDiv.style.color = "green";
    bledyDiv.innerHTML = "Wiadomość została wysłana";
  })
  .catch(err => {
    bledyDiv.style.color = "red";
    bledyDiv.innerHTML = "Błąd wysyłania";
    console.error(err);
  });
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
