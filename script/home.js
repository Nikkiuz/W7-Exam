const loadButton = document.getElementById('load')
const productContainer = document.getElementById('products-row')

loadButton.addEventListener('click', () => {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o" 
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Errore nel recupero dei prodotti.")
        }
    })
    .then(products => {
        productContainer.innerHTML = ''
        console.log(products)
        products.forEach(product => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                            <button class="btn btn-primary modify-btn" data-id="${product._id}">Modifica</button>
                        </div>
                    </div>
                </div>
            `
            productContainer.innerHTML += card;
        })

        document.querySelectorAll(".modify-btn").forEach(button => {
            button.addEventListener("click", function () {
                const productId = button.getAttribute("data-id")
                window.location.href = `Back.html?productId=${productId}`
            })
        })
    })
    .catch(error => console.error("Errore:", error))
});