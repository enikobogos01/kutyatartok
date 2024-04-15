document.addEventListener("DOMContentLoaded", function () {
    showCartSummary();
});

function showCartSummary() {
    var cartSummary = JSON.parse(localStorage.getItem("cart")) || [];
    var cartSummaryElement = document.getElementById("cartSummary");

    cartSummaryElement.innerHTML = "";

    cartSummary.forEach(function (product) {
        var div = document.createElement("div");
        div.innerHTML = `<div class="row">
                            <div>
                                <div class="row text-center align-middle d-flex">
                                    <div class="col-6 col-lg-3 align-self-center">
                                        <img class="productImage" src="${product.image}" alt="">
                                    </div>
                                    <div class="col-6 col-lg-3 align-self-center">
                                        <p class="productName">${product.name} ${(product.size).toUpperCase()}</p>
                                    </div>
                                    <div class="col-6 col-lg-3 align-self-center d-flex justify-content-center">
                                        <p  class="quantity">${product.quantity} db</p>
                                    </div>
                                    <div class="col-6 col-lg-3 align-self-center">
                                        <p class="price">${product.price} Ft</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>`;
        cartSummaryElement.appendChild(div);
    });

    //calculateSubtotal();
    updateElementWithAmount("subtotal", calculateSubtotal());
    updateElementWithAmount("shippingCost", calculateShippingCost());
    updateElementWithAmount("total", calculateTotal(() => {
        // Callback to send the total to the server after it's calculated
        sendTotalToServer();
    }));
}

function updateElementWithAmount(elementId, amount){
    var element = document.getElementById(elementId);
    element.innerHTML = amount.toFixed(0) + " Ft";
}

function calculateSubtotal() {
    var quantities = document.getElementsByClassName("quantity");
    var prices = document.getElementsByClassName("price");
    var subtotal = 0;

    for (var i = 0; i < prices.length; i++) {
        // Extract quantity and price from their respective elements
        var quantity = parseInt(quantities[i].textContent);
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        // Calculate the subtotal for each item
        subtotal += itemPrice * quantity;
    }
    return subtotal;
}

// Lehet nem kell a későbbiekben
function calculateShippingCost(){
    var shippingCost = 1000;
    return shippingCost;
}

function calculateTotal(callback) {
    var subtotal = calculateSubtotal();  // Calculate subtotal first
    var shippingCost = calculateShippingCost();  // Initialize shippingCost
    // "subtotal * 0.27" = áfa kiszámolása
    var total = (subtotal + shippingCost) * 1.27;  // Calculate total

    // Execute the callback with the calculated total
    if (callback && typeof callback === 'function') {
        callback(total);
    }

    return total;
}

function sendTotalToServer() {
    // * 100 azért kell mert Stripe az adott összeget mindig elosztja 100-al
    var total = calculateTotal() * 100;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../../Backend/Controller/Payment/processTotalForStripePayment.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response); // You can handle the server response here if needed
        }
    };

    var data = JSON.stringify({ total: total });
    xhr.send(data);
}