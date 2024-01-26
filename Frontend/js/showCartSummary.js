document.addEventListener("DOMContentLoaded", function () {
    showCartSummary();
});

function showCartSummary(){
    var cartSummary = JSON.parse(localStorage.getItem("cart")) || [];
    var cartSummaryElement = document.getElementById("cartSummary");

    cartSummaryElement.innerHTML = "";

    cartSummary.forEach(function (product) {
        var div = document.createElement("div");
        div.innerHTML = `<div class="col-3">
                            <img class="productImage" src="${product.image}" alt="">
                        </div>
                        <div class="col-3">
                            <p class="productName">${product.name} ${(product.size).toUpperCase()}</p>
                        </div>
                        <div class="col-3">
                            <p class="quantity">${product.quantity}</p>
                        </div>
                        <div class="col-3">
                            <p class="price">${product.price} Ft</p>
                        </div>`;
        cartSummaryElement.appendChild(div);
    });
}