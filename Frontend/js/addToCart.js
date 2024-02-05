document.addEventListener("DOMContentLoaded", function () {
    var cartButton = document.getElementById("cartButton");

    cartButton.addEventListener("click", function () {
        // addToCart() függvény elinditása, ha a cartButtonra nyomunk
        addToCart();
    });
});

// kosárba rakandó termék datainak localStorage-ba töltése
function addToCart() {
    var productImage = document.getElementById("product-image");
    var productName = document.getElementById("product-name");
    var productPrice = document.getElementById("product-price");
    var productQuantity = document.getElementById("quantity");
    var productSize = document.getElementById("sizes");

    // productPrice és productQuantity számmá tevése, késöbbi műveletekhez
    var price = parseFloat(productPrice.innerHTML.replace(' Ft', '').replace(',', '.'));
    var quantity = parseInt(productQuantity.value);

    // product object létrehozása
    var product = {
        image: productImage.src,
        name: productName.innerHTML,
        price: price,
        quantity: quantity,
        size: productSize.value,
    };

    var sizesDropdownContainer = document.getElementById("sizes-container");

        // csak akkor fusson le ha van kiválasztva méret vagy nem lehet méretet kiválasztani
        if(product.size != "default" || sizesDropdownContainer.style.display != "block"){

            // ez arra kell, hogy olyan temékeknél, amiknél nem lehet méretet választani
            // ne jelenjen meg a neve melett zárojelben, hogy default
            if(product.size == "default"){
                product.size = "";
            }
            // ha a terméknek van tényleges mérete akkor ennek segítségével zárójelben fog megjeleni
            else{
                product.size = "(" + product.size + ")";
            }

            // megnézni, hogy a "cart" már létezik-e
            var cart = JSON.parse(localStorage.getItem("cart")) || [];

            // product cart-hoz adása
            cart.push(product);

            // a cart elmentése localStorage-ba
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(productName.innerHTML + " a kosárba került!");
        }
        else{
            alert("Válasszon méretet!");
        }
}