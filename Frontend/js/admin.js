document.addEventListener("DOMContentLoaded", function() {
    fetch('../../Backend/Controller/userController.php?action=getUserCount')
    .then(response => response.json())
    .then(data => {
        document.getElementById('userCount').textContent = data.userCount;
    })
    .catch(error => console.error('Hiba történt a felhasználók számának lekérésekor', error));

    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logout();
        });
    }

    var usersDiv = document.getElementById('users');
    if (usersDiv) {
        usersDiv.onclick = function() {
            var role = sessionStorage.getItem('role');
            if (role === 'admin') {
                window.location.href = '../Admin/admin.html';
            } else {
                window.location.href = '../User/user.html';
            }
        };
    }
});

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userStatus');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('role');
    window.location.href = '../User/user.html'; // Irányítás a felhasználói oldalra
}

