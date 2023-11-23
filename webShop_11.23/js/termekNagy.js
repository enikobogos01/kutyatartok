document.addEventListener("DOMContentLoaded", function () {
    // Fetch the selected product data from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Update the HTML elements with the product data
    document.getElementById('termek-kep').src = selectedProduct.image_path;
    document.getElementById('termek-cim').innerText = selectedProduct.name;
    document.getElementById('termek-leiras').innerText = selectedProduct.desc;
    document.getElementById('termek-arak').innerText = `Ár: ${selectedProduct.price} Ft`;

    // Check the category and remove sizes elements if necessary
    if (selectedProduct.category === 'jatek' || selectedProduct.category === 'poraz') {
        var sizesContainer = document.getElementById('sizes-container');
        sizesContainer.parentNode.removeChild(sizesContainer);
    } else {
        // Ha nem "jatek", akkor adjuk hozzá a méretek opcióit a legördülő menühöz
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
        document.getElementById('quantity').setAttribute('max', selectedProduct.quantity);
    }
});
