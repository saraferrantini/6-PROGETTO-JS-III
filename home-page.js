// ☑️HOME PAGE
// 0) Con get prendiamo tutti i dati dalla pagina back-office
// 1) con cui si vanno a generare le card dei prodotti
// 2) se clicchiamo su delete la card sparisce

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTNjNjRjNTllYzAwMTk5MGQ2ZTMiLCJpYXQiOjE3MDkyODIyNDYsImV4cCI6MTcxMDQ5MTg0Nn0.J7mwekq6mY_xr10JEIvH-TC3eFBvSv96e3pNecBvqp8";
const url = "https://striveschool-api.herokuapp.com/api/product/";

// array vuoto che andiamo a riempire con il contenuto delle card
let allProducts = [];
// andiamo a prendere il contenitore delle card
const raccoglitore = document.getElementById("raccoglitore");

window.onload = async () => {
  // chiamando la fetch
  await getData();
};

// FETCH
const getData = async () => {
  try {
    let respons = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTNjNjRjNTllYzAwMTk5MGQ2ZTMiLCJpYXQiOjE3MDkyODIyNDYsImV4cCI6MTcxMDQ5MTg0Nn0.J7mwekq6mY_xr10JEIvH-TC3eFBvSv96e3pNecBvqp8",
      },
    });
    raccoglitore.innerHTML = "";
    allProducts = await respons.json();
    createCards(allProducts);
  } catch (error) {
    console.log(error);
  }
};

// gli passiamo dentro il contenuto dell'array
const createCards = (allProducts) => {
  let cardsHTML = ""; // Creare una variabile per accumulare il markup HTML delle carte
  allProducts.forEach((product) => {
    cardsHTML += ` 
          <div class="col mb-4 "> 
              <div class="card h-100"> 
                  <img src="${product.imageUrl}" class="card-img-top" alt="..."> 
                  <div class="card-body"> 
                      <h2 class="card-title">${product.name}</h2> 
                      <p>Brand: ${product.brand}</p> 
                      <p class="card-text">Description: ${product.description}</p> 
                      <span class="badge badge-success">${product.price}€</span> 
                      <div class="btn-group" role="group" aria-label="Basic example"> 
                          <a href='backoffice.html?id=${product._id}' class='btn bg-success text-white'> Edit </a> 
                          <button type="button" class="btn btn-danger" onclick='deleteProduct("${product._id}")'>Delete</button> 
                          <button type="button" class="btn bg-secondary text-white" onclick='deleteProduct("${product._id}")'>Modifica</button> 
                          <button type="button" class="btn bg-dark-subtle" onclick='deleteProduct("${product._id}")'>Scopri di più</button> 
                      </div> 
                  </div> 
              </div> 
          </div>`;
  });

  raccoglitore.innerHTML = cardsHTML;
};

// bottoni delite per cancellare la card
const deleteProduct = async (idToDelete) => {
  try {
    let respons = await fetch(url + "/" + idToDelete, {
      method: "DELETE",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTNjNjRjNTllYzAwMTk5MGQ2ZTMiLCJpYXQiOjE3MDkyODIyNDYsImV4cCI6MTcxMDQ5MTg0Nn0.J7mwekq6mY_xr10JEIvH-TC3eFBvSv96e3pNecBvqp8",
        "Content-Type": "application/json",
      }),
    });

    console.log(respons);
    if (respons.ok) {
      await getData();
    }
  } catch (error) {
    console.log(error);
  }
};
