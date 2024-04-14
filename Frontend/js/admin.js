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


    var productUploadForm = document.getElementById("productUploadForm");
    if (productUploadForm) {
        productUploadForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            var formData = new FormData(this);
            
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
    
            fetch('../../Backend/Controller/productController.php?action=uploadProduct', {
                method: 'POST',
                body: formData,
            })
            .then(handleResponse)
            .then(data => {
                if (data.success) {
                    alert("Termék sikeresen feltöltve!");
                } else {
                    alert("Hiba történt: " + data.message);
                }
            })
            .catch(error => {
                console.error('Hiba történt a termék feltöltésekor:', error);
                alert("Hiba történt a termék feltöltésekor.");
            });
        });
    }

    var searchButton = document.getElementById("searchButton");
    var productSearchInput = document.getElementById("productSearchInput");

    if (searchButton) {
        searchButton.addEventListener("click", function() {
            var productName = productSearchInput.value.trim();
            if (productName) {
                fetch('../../Backend/Controller/productController.php?action=searchProductByName&name=' + encodeURIComponent(productName))
                .then(handleResponse)
                .then(data => {
                    if (data && data.success) {
                        document.getElementById("name").value = data.product.name;
                        document.getElementById("price").value = data.product.price;
                        document.getElementById("quantity").value = data.product.quantity;
                        document.getElementById("description").value = data.product.description;
                        document.getElementById("category").value = data.product.category;
                    } else {
                        alert("A termék nem található.");
                    }
                })
                .catch(error => {
                    console.error('Hiba történt a termék keresésekor:', error);
                });
            } else {
                alert("Kérlek, adj meg egy terméknevet a kereséshez.");
            }
        });
    }

    if (document.getElementById("saveChangesIndicator")) {
        var saveChangesButton = document.getElementById("saveChangesButton");
        saveChangesButton.addEventListener("click", function() {
            var formData = new FormData(document.getElementById("productUpdateForm"));
            fetch('../../Backend/Controller/productController.php?action=updateProduct', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw Error('A szerver hibaüzenete: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert("A termék sikeresen frissítve.");
                } else {
                    alert("A frissítés sikertelen: " + data.message);
                }
            })
            .catch(error => {
                console.error('Hiba történt a frissítés során:', error);
                alert("Hiba történt a frissítés során.");
            });
        });
    }

    var deleteProductButton = document.getElementById("deleteProductButton");
    deleteProductButton.addEventListener("click", function() {
        var productId = document.getElementById("productId").value;
        if (confirm("Biztosan törölni szeretné ezt a terméket?")) {
            fetch('../../Backend/Controller/productController.php?action=deleteProduct&id=' + productId, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("A termék sikeresen törölve.");
                    // Ide jöhetnek további műveletek a sikeres törlés után
                } else {
                    alert("A törlés sikertelen: " + data.message);
                }
            })
            .catch(error => console.error('Hiba történt a törlés során:', error));
        }
    });
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

if (document.getElementById("productUploadIndicator")) {
    document.getElementById("image").addEventListener("change", function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("imagePreview").setAttribute("src", e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });
}
