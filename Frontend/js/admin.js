document.addEventListener("DOMContentLoaded", function() {
    // Felhasználók számának lekérése
    fetch('../../Backend/Controller/userController.php?action=getUserCount')
    .then(response => response.json())
    .then(data => {
        document.getElementById('userCount').textContent = data.userCount;
        console.log('Felhasználók száma (akiknek a role-ja user): ' + data.userCount);
    })
    .catch(error => console.error('Hiba történt a felhasználók számának lekérésekor', error));

    // Kijelentkezési logika
    // Feltételezem, hogy van egy gomb vagy egy másik elem, ami a kijelentkezés funkciót indítja el
    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logout();
        });
    }

    // Kijelöljük az elemet az ID alapján, majd hozzáadunk egy kattintás eseménykezelőt
    var usersDiv = document.getElementById('users');
    if (usersDiv) {
        usersDiv.onclick = function() {
            // Átirányítjuk a felhasználót a felhasználók oldalára
            window.location.href = 'users.html';
        };
    }
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userStatus');
    localStorage.removeItem('fullname');
    // Átirányítás a bejelentkezési oldalra vagy a főoldalra
    window.location.href = '../User/user.html'; // Módosítsd az URL-t a szükséges oldalra
}
