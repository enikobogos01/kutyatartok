var swiper1;
var swiper2;

// New event handler for dynamically loading products
async function fetchAndDisplayProducts(containerId, maxProducts = null) {
    const url = '../../Backend/Controller/productController.php';

    try {
        const response = await fetch(url);
        const products = await response.json();

        const cardContainer = document.getElementById(containerId);
        cardContainer.innerHTML = '';

        // Limit the number of products to load based on the maxProducts parameter
        const productsToDisplay = maxProducts ? products.slice(0, maxProducts) : products;

        productsToDisplay.forEach(product => {
            const card = createProductCard(product, containerId);
            cardContainer.appendChild(card);
        });

        // Initialize Swiper if not already done
        if (containerId === 'swiper-wrapper-1' && !swiper1) {
            swiper1 = new Swiper('.swiper-container-1', {
                slidesPerView: 1,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.swiper-button-next-1',
                    prevEl: '.swiper-button-prev-1',
                },
                pagination: {
                    el: '.swiper-pagination-1',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                },
            });
        } else if (containerId === 'swiper-wrapper-2' && !swiper2) {
            swiper2 = new Swiper('.swiper-container-2', {
                slidesPerView: 1,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.swiper-button-next-2',
                    prevEl: '.swiper-button-prev-2',
                },
                pagination: {
                    el: '.swiper-pagination-2',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                },
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function createProductCard(product, containerId) {
    // Create a product card
    const card = document.createElement('div');
    card.className = 'swiper-slide';
    card.innerHTML = `
    <img src="${product.image_path}" class="img-fluid rounded" alt="${product.name}">
    <div class="card-body">
        <div>
            <p class="text-center">${product.name}</p>
            <p class="text-end">Ár: ${product.price} Ft</p>
        </div>
        <div class="button">
            <button type="button submit" class="btn btn-primary">Megtekintem</button>
        </div>
    </div>`;

    const viewButton = card.querySelector('.btn-primary');

    viewButton.addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'productInfo.html';
    });

    return card;
}

// Load products when the page is loaded, showing only 8 products
window.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayProducts('swiper-wrapper-1', 8); // Latest products
    fetchAndDisplayProducts('swiper-wrapper-2', 8); // Most popular products
});

document.querySelectorAll('.position-relative').forEach(function (element) {
    const textElement = element.querySelector('.text-white');

    element.addEventListener('mouseenter', function() {
        textElement.style.opacity = '1';
    });

    element.addEventListener('mouseleave', function() {
        textElement.style.opacity = '0';
    });
});