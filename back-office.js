// ☑️BACK-OFFICE
// 0) verifica che se clicca sul bottone "salva" siano valorizzati tutti gli input
// 1) se non sono tutti valorizzati non andare avanti e dai un messaggio di errore all'utente
// 2) se sono tutti valorizzati vai avanti
// 3) aggiungiamo il bottone "reset" che se cliccato pulisce i campi input del form

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTNjNjRjNTllYzAwMTk5MGQ2ZTMiLCJpYXQiOjE3MDkyODIyNDYsImV4cCI6MTcxMDQ5MTg0Nn0.J7mwekq6mY_xr10JEIvH-TC3eFBvSv96e3pNecBvqp8";
const url = "https://striveschool-api.herokuapp.com/api/product/";

function valorizza() {
  // per ottenere la stringa di query dall'URL
  const queryString = window.location.search;

  const queryParams = new URLSearchParams(queryString);

  // Ottieni i valori dei parametri dalla stringa di query
  const imageUrl = queryParams.get("imageUrl");
  const name = queryParams.get("name");
  const description = queryParams.get("description");
  const brand = queryParams.get("brand");
  const price = queryParams.get("price");
  console.log(price);
  console.log(name);

  // Valorizza gli input con i valori dei parametri ottenuti
  document.getElementById("campo1").value = name;
  document.getElementById("campo2").value = description;
  document.getElementById("campo3").value = brand;
  document.getElementById("campo4").value = imageUrl;
  document.getElementById("campo5").value = price;
}

document.addEventListener("DOMContentLoaded", function () {
  valorizza();
  const form = document.getElementById("myForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito del submit del form
    postData();
  });
});

function inviaDatiAlServer() {
  const nome = document.getElementById("campo1").value;
  const descrizione = document.getElementById("campo2").value;
  const brand = document.getElementById("campo3").value;
  const imgUrl = document.getElementById("campo4").value;
  const prezzo = document.getElementById("campo5").value;

  const data = {
    name: nome,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };
}

function postData() {
  const name = document.getElementById("campo1").value;
  const descrizione = document.getElementById("campo2").value;
  const brand = document.getElementById("campo3").value;
  const imgUrl = document.getElementById("campo4").value;
  const prezzo = document.getElementById("campo5").value;

  const data = {
    name,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };

  // ☑️FETCH (specificare metodo Post)
  fetch(url, {
    // con il metodo dichiariamo l'intento di creare un NUOVO elemento nella collezione "/api/agenda" tramite metodo "POST"
    // method: "POST",
    method: "POST", // è come scrivere method: method,
    body: JSON.stringify(data), // è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
    // un header in particolare è importantissimo, il Content-Type, per specificare il formato di invio, altrimenti non verrà riconosciuto dal server
    // l'Authorization header serve in caso di API che richiedono autenticazione tramite una API Key
    headers: {
      // "Authorization" : "Bearer [YOUR API KEY]",  // metodo di autenticazione con API Key standard
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((newAppointment) => {
      // Aspettiamo il valore di newAppointment per estrarre un'informazione nuova generata dal server ad es. l'_id

      // in base a come siamo arrivati qui, per creazione o modifica, creeremo il messaggio più appropriato alla fine della richiesta
      if (newAppointment) {
        alert(" è stato modificato con successo ");
      } else {
        alert(" è stato creato correttamente");

        // pulizia dei campi solo in modalità CREAZIONE (POST)

        // approccio che utilizza la referenza al form per resettarlo col suo metodo specifico
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
}

// ☑️Per gestire il click sul pulsante reset
let bottoneReset = document.getElementById("resetButton");
bottoneReset.addEventListener("click", function () {
  let form = document.getElementById("myForm").reset();
});
