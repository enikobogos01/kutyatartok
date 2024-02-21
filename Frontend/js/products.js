document.addEventListener("DOMContentLoaded", () => {
    // Eseménykezelő a legördülő menüpontok kattintásaira
    const handleDropdownItemClick = (event) => {
        event.preventDefault();
        const { sort, filter } = event.currentTarget.dataset;
        const priceSlider = document.getElementById('priceSlider').noUiSlider;
        const priceRange = priceSlider.get();
        // Aktív szűrő frissítése
        document.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
        fetchAndDisplayProducts(sort, filter, priceRange);
    };

    // Eseménykezelők hozzáadása a legördülő menüpontokhoz
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', handleDropdownItemClick);
    });

    // Termékek betöltése és megjelenítése az oldal betöltésekor
    fetchAndDisplayProducts();

    initializePriceSlider();
});

// Ár tartomány csúszka inicializálása és eseménykezelők beállítása
function initializePriceSlider() {
    const priceSortContainer = document.getElementById('priceSort');
    const priceSliderDiv = document.createElement('div');
    priceSliderDiv.id = 'priceSlider';
    priceSortContainer.appendChild(priceSliderDiv);

    const priceRange = document.createElement('p');
    priceRange.id = 'priceRange';
    priceRange.classList.add('text-center');
    priceSortContainer.appendChild(priceRange);

    noUiSlider.create(priceSliderDiv, {
        start: [0, 7000],
        connect: true,
        range: {
            'min': 0,
            'max': 7000
        },
        step: 100
    });

    priceSliderDiv.noUiSlider.on('update', function (values, handle) {
        priceRange.innerText = `${formatCurrency(values[0])} - ${formatCurrency(values[1])}`;
    });

    priceSliderDiv.noUiSlider.on('set', function (values, handle) {
        const currentFilter = document.querySelector('.dropdown-item.active')?.dataset.filter || 'all';
        fetchAndDisplayProducts('default', currentFilter, values);
    });
}

async function fetchAndDisplayProducts(sortBy = 'default', filterBy = 'all', priceRange = [0, 7000]) {
    const url = `../../Backend/Controller/productController.php?sort=${sortBy}&filter=${filterBy}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

    try {
        const response = await fetch(url);
        const products = await response.json();
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';
        products.forEach(product => {
            const card = createProductCard(product);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4';

    card.innerHTML = `
        <div class="card productCard">
            <img src="${product.image_path}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Ár: ${product.price} Ft</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'productInfo.html';
    });

    return card;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
