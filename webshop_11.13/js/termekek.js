// Function to render product cards
function renderProductCards(products) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear existing cards

    // Loop through the JSON data and create product cards
    products.forEach((product) => {
        const card = createProductCard(product);
        cardContainer.appendChild(card);
    });
}

// Fetch and parse the JSON data (replace '../termekek.json' with your JSON file)
fetch('../termekek.json')
    .then((response) => response.json())
    .then((data) => {
        // Call the function to render product cards with the loaded data
        renderProductCards(data);
    })
    .catch((error) => {
        console.error('Error loading JSON:', error);
    });

const filterButtons = document.querySelectorAll('.filter-btn');
const cardContainer = document.getElementById('cardContainer');
let products = []; // Array to store products

// Fetch and parse JSON data (replace '../termekek.json' with your JSON file)
fetch('../termekek.json')
    .then((response) => response.json())
    .then((data) => {
        // Add the loaded JSON data to the products array
        products = data;

        // Call the renderProductCards function with the loaded products
        renderProductCards(products);
    })
    .catch((error) => {
        console.error('Error loading JSON:', error);
    });

// Function to filter products by category
function filterProducts(category) {
    console.log('Selected category:', category);
    if (category === "osszes") {
        renderProductCards(products); // Display all products
    } else {
        const filteredProducts = products.filter((product) => {
            const normalizedCategory = product.kategoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalizedCategory === category;
        });
        console.log('Filtered products:', filteredProducts);
        renderProductCards(filteredProducts);
    }
}

// Event listeners for filter buttons
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        filterProducts(category);
    });
});

// Variable for sorting
let currentSort = null;

// Event listener for sorting buttons
const sortButtons = document.querySelectorAll('.sort-btn');
sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const sortType = button.dataset.sort;
        sortProducts(sortType);
    });
});

// Function to sort products by price or name
function sortProducts(sortType) {
    if (sortType === currentSort) {
        products.reverse(); // Reverse the order if the same sorting type is selected
    } else {
        switch (sortType) {
            case 'price-asc':
                products.sort((a, b) => a.ar - b.ar);
                break;
            case 'price-desc':
                products.sort((a, b) => b.ar - a.ar);
                break;
            case 'name-asc':
                products.sort((a, b) => a.nev.localeCompare(b.nev));
                break;
            case 'name-desc':
                products.sort((a, b) => b.nev.localeCompare(a.nev));
                break;
            default:
                break;
        }
        currentSort = sortType;
    }
    renderProductCards(products);
}

// Initialize price slider
const priceSlider = document.getElementById('priceSlider');
const priceRange = document.getElementById('priceRange');
const filterByPriceButton = document.getElementById('filterByPrice');

noUiSlider.create(priceSlider, {
    start: [0, 5000], // Initial lower and upper bounds
    connect: true,
    range: {
        'min': 0, // Minimum price
        'max': 4000 // Maximum price
    }
});

// Event handler for slider value update
priceSlider.noUiSlider.on('update', (values, handle) => {
    const lowerValue = parseInt(values[0]);
    const upperValue = parseInt(values[1]);
    priceRange.textContent = `${lowerValue} Ft - ${upperValue} Ft`;

    // Azonnal szűrjük a termékeket az értékváltozás után
    filterProductsByPrice(lowerValue, upperValue);
});


// Function to filter products by price
function filterProductsByPrice(lowerPrice, upperPrice) {
    const filteredProducts = products.filter((product) => {
        const productPrice = parseInt(product.ar);
        return productPrice >= lowerPrice && productPrice <= upperPrice;
    });
    renderProductCards(filteredProducts);
}

// Function to redirect to termek.html with the "nyakorvek" category filter
function redirectToNyakorv() {
    // Set the filter to "nyakorvek"
    filterProducts("nyakorv");

    // Redirect to termek.html
    window.location.href = 'termekek.html';
}

function clearFilters() {
    // Visszaállítjuk az ár szűrőt az alapértelmezett értékeire
    priceSlider.noUiSlider.set([0, 4000]);

    // Visszaállítjuk az összes termék megjelenítését
    renderProductCards(products);
}
