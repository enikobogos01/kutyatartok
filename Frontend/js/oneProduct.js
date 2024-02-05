document.addEventListener("DOMContentLoaded", function () {
    // Fetch the selected product data from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Update HTML elements with product data
    document.getElementById('product-image').src = selectedProduct.image_path;
    document.getElementById('product-name').innerText = selectedProduct.name;
    document.getElementById('product-description').innerText = selectedProduct.desc;
    document.getElementById('product-price').innerText = `${selectedProduct.price}`;

    // Check the category and update the sizes container accordingly
    var sizesContainer = document.getElementById('sizeTable');
    var sizesDropdownContainer = document.getElementById('sizes-container');

    if (selectedProduct.category === 'collar' || selectedProduct.category === 'harness') {
        // Set the content to a Size Chart link with the appropriate image
        sizesContainer.innerHTML = `
            <a href="../../imgs/${selectedProduct.category}Size.jpg" target="_blank" class="size-chart-link fw-bold">
                <img src="../../imgs/ruler-2493.svg" alt="Size Chart Icon" class="icon"> Size Chart
            </a>
        `;

        // Add styles to the text and icon
        var style = document.createElement('style');
        style.innerHTML = `    
            .icon {
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
            .size-chart-link:hover{
                color: blue;
            }
        `;
        document.head.appendChild(style);

        // Display the sizes container
        sizesDropdownContainer.style.display = 'block';
    } else {
        // Remove the sizes container
        sizesContainer.parentNode.removeChild(sizesContainer);

        // Hide the sizes container
        sizesDropdownContainer.style.display = 'none';
    }

    if (selectedProduct.category == 'collar' || selectedProduct.category == 'harness') {
        var sizesDropdown = document.getElementById('sizes');
        var sizes = ["XS", "S", "M", "L", "XL"];

        for (var i = 0; i < sizes.length; i++) {
            var option = document.createElement('option');
            option.value = sizes[i].toLowerCase();
            option.text = sizes[i];
            sizesDropdown.add(option);
        }
    }

    if (selectedProduct) {
        document.getElementById('quantity').setAttribute('min', 1);
        document.getElementById('quantity').setAttribute('max', selectedProduct.quantity);
    }
});