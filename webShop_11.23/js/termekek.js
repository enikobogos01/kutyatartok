document.addEventListener("DOMContentLoaded", function () {
    console.log('DOMContentLoaded event fired.');

    fetch('fetchProducts.php')
        .then(response => response.json())
        .then(products => {
            console.log('Products fetched successfully:', products);

            products.forEach(product => {
                const card = createProductCard(product);
                document.getElementById('cardContainer').appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function createProductCard(product) {
    console.log('Creating product card for:', product.name);

    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4 mb-2';

    card.innerHTML = `
        <div class="card termekCard">
            <img src="${product.image_path}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <b><h6 class="card-title text-center">${product.name}</h6></b>
                <p class="card-text text-end">Ár: ${product.price} Ft</p>
            </div>
        </div>
    `;

    // Add a click event listener to the card
    card.onclick = function () {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'termekNagy.html';
    };

    return card;
}
