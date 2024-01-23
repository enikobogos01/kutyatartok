document.addEventListener("DOMContentLoaded", function () {
    // oldal betöltésénél kosárba rakott termékek megjelenítése
    showCart();
});

// kosár megjelenítése
function showCart() {
    // localStorage-ból cart lekérése
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // a kosárba rakott termékek a productDatas id-jű element-ben lesznek megjelenítve
    var cartItemsElement = document.getElementById("productDatas");

    // ha van valami a cartItemsElement-ben annak törlése
    cartItemsElement.innerHTML = "";

    // végigmegyünk a kosárba rakott termékeken és megjelenítetjük őket
    cart.forEach(function (product, index) {
        var itemPrice = product.price * product.quantity;
        var div = document.createElement("div");
        div.innerHTML = `<div class="row">
                        <div class="col-3 border">    
                            <img class="productImage" src="${product.image}" alt="">
                        </div>
                        <div class="col-3 border">
                            <p class="productName">${product.name} ${(product.size).toUpperCase()}</p>
                        </div>
                        <div class="col-3 border quantityDiv flex-column">
                            <div class="row h-75">
                                <div class="col-4 text-end">
                                    <i class="bi bi-dash-circle-fill ms-4" onclick="decreaseQuantityByOne(${index});"></i>  
                                </div>
                                <div class="col-4">
                                    <input type="number" value="${product.quantity}" min="0" class="quantity" onkeypress="return validateInput(event)">
                                </div>
                                <div class="col-4 text-start">
                                    <i class="bi bi-plus-circle-fill me-4" onclick="increaseQuantityByOne(${index});"></i>
                                </div>
                            </div>
                            <div class="row" id="trashBorder" onclick="removeFromCart(${index})">
                                <i class="bi bi-trash-fill"></i>
                            </div>
                        </div>
                        <div class="col-3 border">
                            <p class="price">${itemPrice} Ft</p>
                        </div>
                        </div>`;

        cartItemsElement.appendChild(div);
    });
    //-------összeg összesítő függvények hívása----------
    calculateSubtotal();
    calculateVat();
    calculateTotal();
}

// termék törlése a kosárból
function removeFromCart(index) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // az adott indexről termék törlése
    cart.splice(index, 1);

    // a megváltoztatott cart visszaöltése a localStorage-ba
    localStorage.setItem("cart", JSON.stringify(cart));

    // showCart() újra lefuttatása, hogy azonnal eltünjenek a kiválasztott termékek, ne csak akkor ha
    // frissítjük az oldalt
    showCart();
}

// mennyiség csökkentése 1-el
function decreaseQuantityByOne(index) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // csak akkor fusson le, ha valid az index
    if (index >= 0 && index < cart.length) {
        // ne lehessen a gombbal 1-nél lejjebb menni
        if(cart[index].quantity == 1){
            cart[index].quantity = 1;
        }
        else{
            // mennyiség csökkentése 1-el
            cart[index].quantity -= 1;

            localStorage.setItem("cart", JSON.stringify(cart));

            // kosár frissítése
            showCart();
        }
    }
}

function increaseQuantityByOne(index){
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(index >= 0 && index < cart.length){
        cart[index].quantity += 1;

        localStorage.setItem("cart", JSON.stringify(cart));

        showCart();
    }
}

function validateInput(event) {
    // ne lehessen negatív számot beleírni
    return event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57);
}

//--------------------basket.html JOBBOLDALÁN LÉVŐ ÖSSZESITÉSHEZ A FUNKCIÓK---------------------------
// részösszeg kiszámítása
function calculateSubtotal() {
    var subtotalElement = document.getElementById("subtotal");
    var prices = document.getElementsByClassName("price");
    var subtotal = 0;

    for (var i = 0; i < prices.length; i++) {
        // adott index-ü prices-nak a textContent-jét számmá alakítjuk
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        subtotal += itemPrice;
    }

    subtotalElement.innerHTML = subtotal + " Ft";
}

// áfa kiszámítása
function calculateVat(){
    var vatElement = document.getElementById("vat");
    var prices = document.getElementsByClassName("price");
    var subtotal = 0;
    var totalVat = 0;

    for(var i = 0; i< prices.length; i++){
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        subtotal += itemPrice;
    }
    totalVat = subtotal * 0.27;

    vatElement.innerHTML = totalVat.toFixed(0) + " Ft";
}

// végösszeg kiszámítása
function calculateTotal(){
    var totalElement = document.getElementById("total");
    var prices = document.getElementsByClassName("price");
    var subtotal = 0;
    var totalVat = 0;
    var total = 0;

    for(var i = 0; i< prices.length; i++){
        var itemPrice = parseFloat(prices[i].textContent.replace(' Ft', ''));

        subtotal += itemPrice;
    }
    totalVat = subtotal * 0.27;

    total = subtotal + totalVat;

    totalElement.innerHTML = total.toFixed(0) + " Ft";
}