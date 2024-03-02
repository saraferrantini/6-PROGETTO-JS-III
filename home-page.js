// ☑️HOME PAGE
// 0) Con get prendiamo tutti i dati dalla pagina back-office
// 1) con cui si vanno a generare le card dei prodotti
// 2) se clicchiamo sul bottone "modalità edit" compaiono due bottoni:edit(ci rimanda alla modifica del form) e uno delete(per cancellare la card)
// 3) se clicchiamo sul bottone scopri di più si apre la card di dettaglio del prodotto

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

//☑️FETCH
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
          <div class="col-lg-4 col-md-3 col-sm-4 col-6 mb-4"> 
              <div class="card h-100"> 
                  <img src="${product.imageUrl}" class="card-img-top" alt="..."> 
                  <div class="card-body"> 
                      <h2 class="card-title">${product.name}</h2> 
                      <p>Brand: ${product.brand}</p> 
                      <p class="card-text">Description: ${product.description}</p> 
                      <span class="badge badge-success">${product.price}€</span> 
                      <div class="btn-group" role="group" aria-label="Basic example"> 
                          <a href='back-office.html?imageUrl=${product.imageUrl}&name=${product.name}&brand=${product.brand}&description${product.description}&price${product.price}' class='btn bg-success text-white edit-btn' style="display: none;"> Edit </a> 
                          <button type="button" class="btn btn-danger delete-btn" onclick='deleteProduct("${product._id}")' style="display: none;">Delete</button> 
                          <button type="button" class="btn bg-dark-subtle" onclick='scopriPiu("${product._id}")'>Scopri di più</button> 
                      </div> 
                  </div> 
              </div> 
          </div>`;
  });

  // Inserire il markup HTML delle carte nel contenitore delle carte
  document.getElementById("raccoglitore").innerHTML = cardsHTML;
};

// ☑️BOTTONE DELITE PER CANCELLARE LA CARD
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

// ☑️NASCONDI I BOTTONI EDIT-DELITE e fai in modo che siano visibili quando si clicca su "modalità edit"
document.addEventListener("DOMContentLoaded", function () {
  const modalButton = document.getElementById("modalButton");
  const cardsContainer = document.getElementById("raccoglitore");

  modalButton.addEventListener("click", function () {
    // Mostra o nascondi i bottoni di edit e delete quando si clicca sul pulsante "Modalità edit"
    const editButtons = cardsContainer.querySelectorAll(".edit-btn");
    const deleteButtons = cardsContainer.querySelectorAll(".delete-btn");

    editButtons.forEach(function (button) {
      button.style.display = button.style.display === "none" ? "inline-block" : "none";
    });

    deleteButtons.forEach(function (button) {
      button.style.display = button.style.display === "none" ? "inline-block" : "none";
    });
  });
});

// ☑️CARD DI DETTAGLIO-SCOPRI DI PIU'
const scopriPiu = async (productId) => {
  const product = allProducts.find((p) => p._id === productId);
  if (product) {
    const detailCardHTML = `
        <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="productDetailModalLabel">${product.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img src="${product.imageUrl}" class="card-img-top" alt="...">
                <p>Brand: ${product.brand}</p>
                <p>Description: ${product.description}</p>
                <p>Price: ${product.price}€</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
    document.body.insertAdjacentHTML("beforeend", detailCardHTML);
    const modal = document.getElementById("productDetailModal");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
    const backdrop = document.createElement("div");
    backdrop.classList.add("modal-backdrop", "fade", "show");
    document.body.appendChild(backdrop);

    // Chiudi il modal quando si clicca sul pulsante di chiusura o sullo sfondo
    const closeModal = () => {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      backdrop.remove();
      document.getElementById("productDetailModal").remove();
    };
    modal.querySelector(".close").addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
  }
};
