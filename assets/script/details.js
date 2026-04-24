const product = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWViNTU5MWJkNmE5NTAwMTVmNzk4MmIiLCJpYXQiOjE3NzcwMzA1NDYsImV4cCI6MTc3ODI0MDE0Nn0.kiLQr5R33LPplW8iCQZzMa_Qcwvapojjotvj62zFxVg";
const authorization = `Bearer ${token}`;

// recupero gli elementi HTML

const detailsContainer = document.getElementById("details-container");

// prendo l'ID dall'url per ogni card che si apre nel dettaglio così quando arrivo in Back se ho l'id modifico sennò creo

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

// GET per ogni singolo prodotto

const getsingleProduct = () => {
  fetch(product + id, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel caricamento del prodotto");
      }
    })
    .then((singleProduct) => {
      console.log(singleProduct);
      detailsContainer.innerHTML = `
         <div class="card shadow-sm">
      <img src="${singleProduct.imageUrl}" class="card-img-top" />
      <div class="card-body">
      <h2>${singleProduct.name}</h2>
      <p class="text-muted">${singleProduct.brand}</p>
      <p>${singleProduct.description}</p>
      <h4 class="fw-bold">${singleProduct.price}€</h4>
      <a href="./backoffice.html?id=${singleProduct._id}" class="btn btn-dark mt-3">
          Modifica prodotto
        </a>
      </div>
    </div>`;
    })
    .catch((err) => {
      console.log(err);
      alert("Errore nel caricamento degli elementi di dettaglio");
    });
};

getsingleProduct();
