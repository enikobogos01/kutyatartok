document.addEventListener("DOMContentLoaded", function () {
    showCart();
    // Kosár üresség ellenőrzése és fizetés gombhoz hozzárendelés
    validateCart();
});

// Kosár validáció
function validateCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var checkoutButton = document.getElementById("buyButton");

    if (cart.length === 0) {
        // Ha a Kosár üres letiltjuk a fizetés gombot
        checkoutButton.removeAttribute("href");
        checkoutButton.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Kérem tegyen legalább egy terméket a kosárba a fizetéshez!");
        });
    } else {
        // Ha a kosár nem üres engedélyezzük a fizetés gombbal való továbblépést
        checkoutButton.setAttribute("href", "checkOut.html");
    }
}