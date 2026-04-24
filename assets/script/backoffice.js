const product = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWViNTU5MWJkNmE5NTAwMTVmNzk4MmIiLCJpYXQiOjE3NzcwMzA1NDYsImV4cCI6MTc3ODI0MDE0Nn0.kiLQr5R33LPplW8iCQZzMa_Qcwvapojjotvj62zFxVg";
const authorization = `Bearer ${token}`;

// recupero gli elementi dall'HTML

const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

// funzione per creare nuovo prodotto

const createProductObject = () => {
  return {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: Number(priceInput.value),
  };
};

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // non invia con campi vuoti
  if (
    !nameInput.value ||
    !descriptionInput.value ||
    !brandInput.value ||
    !imageUrlInput.value ||
    !priceInput.value
  ) {
    alert("Non sono stati compilati tutti i campi!");
    return;
  }

  // collego API

  const newProduct = createProductObject();

  fetch(product, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto creato!");
        productForm.reset();
      } else {
        throw new Error(
          "Si è verificato un errore nella creazione del prodotto",
        );
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Errore!");
    });
});
