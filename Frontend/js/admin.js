document.addEventListener("DOMContentLoaded", function() {
    fetch('../../Backend/Controller/userController.php?action=getUserCount')
    .then(handleResponse)
    .then(data => {
        var userCountElement = document.getElementById('userCount');
        if (userCountElement) {
            userCountElement.textContent = data.userCount;
        }
    })
    .catch(error => console.error('Hiba történt a felhasználók számának lekérésekor', error));

    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    var usersDiv = document.getElementById('users');
    if (usersDiv) {
        usersDiv.addEventListener('click', function() {
            var role = sessionStorage.getItem('role');
            window.location.href = role === 'admin' ? '../Admin/admin.html' : '../User/user.html';
        });
    }
    var isUsersPage = document.getElementById('usersPageIndicator') !== null;
    if (isUsersPage) {
        fetchUsers();
    }
    fetch('../../Backend/Controller/productController.php?action=getProductCount')
    .then(handleResponse)
    .then(data => {
        var productCountElement = document.getElementById('productCount');
        if (productCountElement) {
            productCountElement.textContent = data.productCount;
        }
    })
    .catch(error => console.error('Hiba történt a termékek számának lekérésekor', error));
});

function logout() {
    sessionStorage.clear();
    window.location.href = '../User/user.html';
}

function fetchUsers() {
    fetch('../../Backend/Controller/userController.php?action=getAllUsers')
    .then(handleResponse)
    .then(data => {
        // Ellenőrzés, hogy a data már a tömb, vagy egy objektum ami tartalmazza a tömböt
        const users = Array.isArray(data) ? data : data.users;
        const tableBody = document.getElementById('usersTableBody');
        if (Array.isArray(users)) {
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td  style="text-align: center;">${user.registration_date}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('A válaszadat nem tömb.');
        }
    })
    .catch(error => console.error('Hiba történt a felhasználók lekérésekor:', error));
}


function handleResponse(response) {
    if (!response.ok) {
        throw Error('A szerver hibaüzenete: ' + response.statusText);
    }
    return response.json();
}
