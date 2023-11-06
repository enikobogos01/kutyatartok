function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4 mb-2'; // Define column layout for laptop and phone

    card.innerHTML = `
        <div class="card termekCard">
            <img src="${product.kep}" class="card-img-top" alt="${product.nev}">
            <div class="card-body">
                <b><h6 class="card-title text-center">${product.nev}</h6></b>
                <p class="card-text text-end">Ár: ${product.ar} Ft</p>
            </div>
        </div>
    `;

    // Add a click event listener to the card
    card.onclick = function () {
        // Save the selected product data in localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'termekNagy.html'; // Redirect to the detailed product page
    };

    return card;
}