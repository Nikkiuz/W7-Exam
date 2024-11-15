const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o"
    }
  })
  .then(response => {
    if (response.ok) {
    return response.json()
    } else {
        throw new Error("Errore nel recupero del prodotto")
    }
  })
  .then(product => {
    const productDetail = document.getElementById("card-container");
    const productCard = `
      <div class="col-12 mb-4 mt-4">
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Marca:</strong> ${product.brand}</p>
            <p class="card-text"><strong>Prezzo:</strong> €${product.price}</p>
            <p class="card-text"><strong>ID:</strong>${product._id}</p>
            <a href="Back.html?productId=${product._id}" class="btn btn-warning">Modifica Prodotto</a>
          </div>
        </div>
      </div>
    `
    productDetail.innerHTML = productCard;
  })
  .catch(error => {
    console.error("Errore nel recupero del prodotto:", error);
    alert("Si è verificato un errore nel recupero dei dettagli del prodotto.");
  })
} else {
  alert("ID prodotto non trovato.");
}