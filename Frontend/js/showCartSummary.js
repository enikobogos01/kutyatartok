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

    updateElementWithAmount("subtotal", calculateSubtotal());
    updateElementWithAmount("shippingCost", calculateShippingCost());
    updateElementWithAmount("total", calculateTotal(() => {
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
        var quantity = parseInt(quantities[i].textContent);
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        // Részösszeg kiszámítása egyes termékekre
        subtotal += itemPrice * quantity;
    }
    return subtotal;
}

function calculateShippingCost(){
    var shippingCost = 1000;
    return shippingCost;
}

function calculateTotal(callback) {
    var subtotal = calculateSubtotal();
    var shippingCost = calculateShippingCost();
    var total = (subtotal + shippingCost) * 1.27;

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
            console.log(response);
        }
    };

    var data = JSON.stringify({ total: total });
    xhr.send(data);
}

function sendOrderToServer() {
    console.log("total: " + parseFloat(document.getElementById("total").innerHTML));
    var order = {
        status : "Feldolgozás alatt",
        total : parseFloat(document.getElementById("total").innerHTML),
        userId : sessionStorage.getItem('userId'),
        paymentStatus : "Fizetve",
        paymentMethod : "Bankkártya",
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../../Backend/Model/orderToDataBase.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };

    var data = JSON.stringify(order);
    xhr.send(data);
}