document.addEventListener("DOMContentLoaded", function () {
    showCartSummary();
});

function showCartSummary(){
    var cartSummary = JSON.parse(localStorage.getItem("cart")) || [];
    var cartSummaryElement = document.getElementById("cartSummary");

    cartSummaryElement.innerHTML = "";

    cartSummary.forEach(function (product) {
        var div = document.createElement("div");
        div.innerHTML = `<div class="row">
                            <div class="col-8">
                                <div class="row text-center align-middle d-flex">
                                    <div class="col-3 align-self-center">
                                        <img class="productImage" src="${product.image}" alt="">
                                    </div>
                                    <div class="col-3 align-self-center">
                                        <p class="productName">${product.name} ${(product.size).toUpperCase()}</p>
                                    </div>
                                    <div class="col-3 align-self-center">
                                        <input class="quantity" type="number" value="${product.quantity}" min="0">
                                    </div>
                                    <div class="col-3 align-self-center">
                                        <p class="price">${product.price} Ft</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        cartSummaryElement.appendChild(div);
    });
}