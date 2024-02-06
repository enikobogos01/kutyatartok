document.addEventListener("DOMContentLoaded", function () {
    showCartSummary();
});

function showCartSummary() {
    var cartSummary = JSON.parse(localStorage.getItem("cart")) || [];
    var cartSummaryElement = document.getElementById("cartSummary");

    cartSummaryElement.innerHTML = "";

    cartSummary.forEach(function (product, index) {
        var itemPrice = product.price * product.quantity;
        var div = document.createElement("div");
        div.innerHTML = `<div class="row">
                            <div class="col-lg-8 col-sm-12">
                                <div class="row text-center align-middle d-flex">
                                    <div class="col-sm-6 col-md-3 align-self-center">
                                        <img class="productImage" src="${product.image}" alt="">
                                    </div>
                                    <div class="col-sm-6 col-md-3 align-self-center">
                                        <p class="productName">${product.name} ${(product.size).toUpperCase()}</p>
                                    </div>
                                    <div class="col-sm-6 col-md-3 align-self-center">
                                        <input class="quantity" type="number" value="${product.quantity}" min="0" onchange="removeFromCartSummary(${index}, this.value)">
                                    </div>
                                    <div class="col-sm-6 col-md-3 align-self-center">
                                        <p class="price">${product.price} Ft</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        cartSummaryElement.appendChild(div);
    });
    calculateSubtotal();
}

function removeFromCartSummary(index, newQuantity) {
    var cartSummary = JSON.parse(localStorage.getItem("cart")) || [];

    // index validálás
    if (index >= 0 && index < cartSummary.length) {
        // quantity frissítése
        cartSummary[index].quantity = parseInt(newQuantity);

        // item törlése, ha a quantity-ja 0
        if (cartSummary[index].quantity === 0) {
            cartSummary.splice(index, 1);
        }

        // cart frissítése localStorage-ban
        localStorage.setItem("cart", JSON.stringify(cartSummary));

        // A cartSummary frissítése
        showCartSummary();
    }
}

function calculateSubtotal() {
    var subtotalElement = document.getElementById("subtotal");
    var quantities = document.getElementsByClassName("quantity");
    var prices = document.getElementsByClassName("price");
    var subtotal = 0;

    for (var i = 0; i < prices.length; i++) {
        // Extract quantity and price from their respective elements
        var quantity = parseInt(quantities[i].value);
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        // Calculate the subtotal for each item
        subtotal += itemPrice * quantity;
    }

    subtotalElement.innerHTML = subtotal.toFixed(0) + " Ft";
}
