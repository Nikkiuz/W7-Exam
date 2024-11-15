const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const confirmation = confirm("Sei sicuro di voler creare/modificare questo prodotto?")
    if (!confirmation) {
        return
    }

    const productId = document.getElementById("productForm").getAttribute("data-id")
    const productData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: parseFloat(document.getElementById("price").value)
    }

    let requestMethod = "POST"
    let apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

    if (productId) {
        apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`
        requestMethod = "PUT"
    }

    fetch(apiUrl, {
        method: requestMethod,
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.ok) {
            alert('Prodotto creato/modificato con successo!')
            document.getElementById("productForm").reset()
            document.getElementById("productForm").removeAttribute("data-id")
        } else {
            alert("Errore")
        }
    })
    .catch(error => {
        console.error("Errore:", error)
        alert("Si è verificato un errore")
    })
})

const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get("productId")

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
            throw new Error("Errore nel caricamento del prodotto")
        }
    })
    .then(product => {
        document.getElementById("name").value = product.name
        document.getElementById("description").value = product.description
        document.getElementById("brand").value = product.brand
        document.getElementById("imageUrl").value = product.imageUrl
        document.getElementById("price").value = product.price
        document.getElementById("productForm").setAttribute("data-id", productId)
        document.getElementById("deleteButton").style.display = "block"
    })
    .catch(error => console.error("Errore nel recupero del prodotto", error))
}


document.getElementById("deleteButton").addEventListener("click", function() {
    const productId = document.getElementById("productForm").getAttribute("data-id")
    if (productId && confirm("Sei sicuro di voler eliminare questo prodotto?")) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDA4NjhhZDEyOTAwMTU4NzZiYjAiLCJpYXQiOjE3MzE2NTc4NjIsImV4cCI6MTczMjg2NzQ2Mn0.yUJnuzj1z4LWUFNs5M3xsZG8AUxLupnaVzzFpUjSB0o"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Prodotto eliminato con successo!")
                window.location.href = "./Home.html"
            } else {
                alert("Errore nell'eliminazione del prodotto.")
            }
        })
        .catch(error => {
            console.error("Errore:", error)
            alert("Errore nell'eliminazione del prodotto.")
        })
    }
})

document.getElementById("resetButton").addEventListener("click", function () {
    if (confirm("Sei sicuro di voler resettare il form?")) {
        document.getElementById("productForm").reset()
        document.getElementById("productForm").removeAttribute("data-id")
    }
})