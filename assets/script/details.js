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
      <div class="row g-5 align-items-center">
      <div class="col-12 col-lg-6">
      <img 
        src="${singleProduct.imageUrl}" 
        class="img-fluid rounded-4 details-img"
      />
    </div>      
     <div class="col-12 col-lg-6">
      <p class="text-uppercase small text-muted mb-2">
        ${singleProduct.brand}
      </p>
     <h1 class="fw-bold mb-3">
        ${singleProduct.name}
      </h1>
      <p class="mb-4">
        ${singleProduct.description}
      </p>
      <h3 class="fw-bold mb-4">
        ${singleProduct.price}€
      </h3>
      <a href="./backoffice.html?id=${singleProduct._id}" 
         class="btn btn-dark px-4 py-2 rounded-pill">
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
