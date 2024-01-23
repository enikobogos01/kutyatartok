document.addEventListener("DOMContentLoaded", () => {
    // Event handler for dropdown item clicks
    const handleDropdownItemClick = (event) => {
        event.preventDefault();
        const { sort, filter } = event.currentTarget.dataset;
        fetchAndDisplayProducts(sort, filter);
    };

    // Add click event listeners to dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', handleDropdownItemClick);
    });

    // Fetch and display products on page load
    fetchAndDisplayProducts();
});

// Function to fetch and display products based on sorting and filtering options
async function fetchAndDisplayProducts(sortBy = 'default', filterBy = 'all') {
    const url = `fetchProducts.php?sort=${sortBy}&filter=${filterBy}`;

    try {
        const response = await fetch(url);
        const products = await response.json();

        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';

        // Create and append product cards to the container
        products.forEach(product => {
            const card = createProductCard(product);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to create a product card HTML element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4 mb-2';

    card.innerHTML = `
        <div class="card productCard">
            <img src="${product.image_path}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <b><h6 class="card-title text-center">${product.name}</h6></b>
                <p class="card-text text-end">Ár: ${product.price} Ft</p>
            </div>
        </div>
    `;

    // Add a click event listener to navigate to the productInfo page
    card.addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'productInfo.html';
    });

    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    // Price slider container element
    const priceSortContainer = document.getElementById('priceSort');

    // Create a new div element for the price slider
    const priceSliderDiv = document.createElement('div');
    priceSliderDiv.id = 'priceSlider';
    priceSortContainer.appendChild(priceSliderDiv);

    // Create the priceRange paragraph element
    const priceRange = document.createElement('p');
    priceRange.id = 'priceRange';
    priceRange.classList.add('text-center');
    priceSortContainer.appendChild(priceRange);

    // Initialize the price slider
    const priceSlider = document.getElementById('priceSlider');

    noUiSlider.create(priceSlider, {
        start: [0, 7000], // Initial values
        connect: true,
        range: {
            'min': 0,
            'max': 7000
        },
        step: 100 // Step size of 100
    });

    // Update the price range when the slider values change
    priceSlider.noUiSlider.on('update', function (values, handle) {
        priceRange.innerText = `${formatCurrency(values[0])} - ${formatCurrency(values[1])}`;
    });

    // React to the start event
    priceSlider.noUiSlider.on('start', function (values, handle) {
        // Handle the start event
        console.log('Start Event:', values, handle);

        // Send XMLHttpRequest to the server for price filtering
        fetchAndDisplayProducts('default', 'all', values);
    });

    // React to the change event
    priceSlider.noUiSlider.on('change', function (values, handle) {
        // Handle the change event
        console.log('Change Event:', values, handle);

        // Send XMLHttpRequest to the server for price filtering
        fetchAndDisplayProducts('default', 'all', values);
    });

    // Helper function to format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('hu-HU', {
            style: 'currency',
            currency: 'HUF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Function to fetch and display products with price filtering
    async function fetchAndDisplayProducts(sortBy = 'default', filterBy = 'all', priceRange = [0, 7000]) {
        const url = `fetchProducts.php?sort=${sortBy}&filter=${filterBy}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

        try {
            const response = await fetch(url);
            const products = await response.json();

            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = '';

            // Create and append product cards to the container
            products.forEach(product => {
                const card = createProductCard(product);
                cardContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
});