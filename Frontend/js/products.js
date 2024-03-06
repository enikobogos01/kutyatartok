let currentSortOption = 'default';
let currentCategoryFilter = 'all';
let currentPriceRange = [0, 7000];

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const { sort, filter } = this.dataset;

            if (sort !== undefined) {
                currentSortOption = sort;
            }
            if (filter !== undefined) {
                currentCategoryFilter = filter;
            }

            // Nem szükséges újra deklarálni a priceRange változót, használja a globális állapotot
            document.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Közvetlenül hívja a globális állapotot használó fetchAndDisplayProducts funkciót
            fetchAndDisplayProducts();
        });
    });

    initializePriceSlider();
    fetchAndDisplayProducts();
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
        currentPriceRange = values.map(Number); // Frissíti az árszűrő aktuális értékeit
        // Itt már nem használjuk a 'default' és a 'currentFilter' változót közvetlenül
        fetchAndDisplayProducts(); // Az aktuális állapotok alapján hívjuk meg a funkciót
    });
   
}

async function fetchAndDisplayProducts() {
    const url = `http://localhost/kutyatartok/Backend/Controller/productController.php?sort=${currentSortOption}&filter=${currentCategoryFilter}&minPrice=${currentPriceRange[0]}&maxPrice=${currentPriceRange[1]}`;

    try {
        const response = await fetch(url);
        const products = await response.json();
        console.log(products); // Ellenőrzés céljából
        if (Array.isArray(products)) { // Ellenőrizzük, hogy tömb-e
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = '';
            products.forEach(product => cardContainer.appendChild(createProductCard(product)));
        } else {
            console.error('A válasz nem tömb.');
        }
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
                <p class="card-text">Ár: ${formatCurrency(product.price)}</p> <!-- Itt eltávolítottuk a " Ft" részt -->
            </div>
        </div>
    `;

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


