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
const deleteButton = document.getElementById("delete-button");
const resetButton = document.querySelector('button[type="reset"]');

// uguale a details perché se nell'URL ho l'ID modifico l'oggetto, altrmenti lo creo
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

// così richiamo method e url nel fetch
const method = id ? "PUT" : "POST";
const url = id ? product + id : product;

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

// form compilato con i dati che ho se devo modificare
const fillForm = () => {
  if (id) {
    fetch(product + id, {
      headers: {
        Authorization: authorization,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero del prodotto");
        }
      })
      .then((singleProduct) => {
        nameInput.value = singleProduct.name;
        descriptionInput.value = singleProduct.description;
        brandInput.value = singleProduct.brand;
        imageUrlInput.value = singleProduct.imageUrl;
        priceInput.value = singleProduct.price;
      })
      .catch((err) => {
        console.log(err);
        alert("Errore nel caricamento del prodotto da modificare");
      });
  }
};

fillForm();

if (id) {
  deleteButton.classList.remove("d-none");
}

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

  fetch(url, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(id ? "Prodotto modificato!" : "Prodotto creato!");
        productForm.reset();
      } else {
        throw new Error(
          "Si è verificato un errore nella creazione/modifica del prodotto",
        );
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Errore!");
    });
});

// conferma sul reset
resetButton.addEventListener("click", (e) => {
  const confirmReset = confirm("Sei sicura di voler resettare il form?");

  if (!confirmReset) {
    e.preventDefault();
  }
});

// per rimuovere

deleteButton.addEventListener("click", () => {
  const confirmDelete = confirm(
    "Sei sicura di voler eliminare questo prodotto?",
  );
  if (confirmDelete) {
    fetch(product + id, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Prodotto eliminato!");
          window.location.href = "./index.html";
        } else {
          throw new Error("Errore nell'eliminazione del prodotto");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Errore durante l'eliminazione");
      });
  }
});
