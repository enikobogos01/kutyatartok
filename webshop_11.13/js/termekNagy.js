function openModal(imgElement) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("modal-image");
  modal.style.display = "block";
  modalImg.src = imgElement.src;
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    const termekKep = document.getElementById('termek-kep');
    const termekCim = document.getElementById('termek-cim');
    const termekLeiras = document.getElementById('termek-leiras');
    const termekArak = document.getElementById('termek-arak');
    const kosarGomb = document.getElementById('kosarbaButton');

    if (selectedProduct) {
        termekKep.src = selectedProduct.kep;
        termekKep.alt = selectedProduct.nev;
        termekCim.textContent = selectedProduct.nev;
        termekLeiras.textContent = selectedProduct.leiras;
        termekArak.textContent = `Ár: ${selectedProduct.ar} Ft`;

        kosarGomb.addEventListener('click', function () {
            // Itt add hozzá a terméket a kosárhoz, például egy függvénnyel.
            // Ebben a függvényben hozzáadhatod a terméket a kosár tárolójához, és frissítheted a megjelenítést.
        });

        termekKep.addEventListener('click', function () {
            openModal(this);
        });
    } else {
        // Ha nincs kiválasztott termék, visszairányítjuk a felhasználót valahova.
        window.location.href = 'termekek.html';
    }
});
