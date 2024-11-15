//fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
//headers: {
//    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o"
//    }
//    })

const myUrl = 'https://striveschool-api.herokuapp.com/api/product/,'
const apikey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o'

document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault()
    const productData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: parseFloat(document.getElementById("price").value) 
    }
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Authorization": "apikey",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.ok) {
            alert("Prodotto creato con successo!");
            document.getElementById("productForm").reset()
        } else {
            alert("Errore nella creazione del prodotto.")
        }
    })
    .catch(error => {
        console.error("Errore:", error)
        alert("Si è verificato un errore.")
    })
})