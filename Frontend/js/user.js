window.onload = function () {
    checkLoginState();

    // Regisztráció űrlap elküldése
    var registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function(event) {
            event.preventDefault();
            submitRegistrationForm();
        });
    }

    // Űrlap mezők formázása
    var inputElement = document.getElementById('fullname');
    if (inputElement) {
        inputElement.addEventListener('input', function () {
            var words = inputElement.value.split(' ');
            words = words.map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            });
            inputElement.value = words.join(' ');
        });
    }

    // Bejelentkezés űrlap elküldése
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            submitLoginForm();
        });
    }
};

function checkLoginState() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var fullname = localStorage.getItem('fullname');
    if (isLoggedIn === 'true') {
        document.getElementById('content').style.display = 'none';
        document.getElementById('welcomeMessage').textContent = `Üdvözlünk, ${fullname}!`;
        document.getElementById('profileInfo').style.display = 'block';
    } else {
        document.getElementById('content').style.display = 'block';
        document.getElementById('profileInfo').style.display = 'none';
    }
}

function submitRegistrationForm() {
    var xhr = new XMLHttpRequest();
    var url = "../../Backend/Controller/userController.php";
    var params = buildRegistrationParams();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            handleRegistrationResponse(xhr.responseText);
        } else {
            console.error("Server response (error): " + xhr.status);
        }
    };

    xhr.send(params);
}

function buildRegistrationParams() {
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    return "method=registration" +
        "&fullname=" + encodeURIComponent(fullname) +
        "&email=" + encodeURIComponent(email) +
        "&password=" + encodeURIComponent(password) +
        "&confirmPassword=" + encodeURIComponent(confirmPassword);
}

function handleRegistrationResponse(responseText) {
    try {
        var data = JSON.parse(responseText);
        if (data.msg === 'Sikeres regisztráció! Most már be tudsz jelentkezni.') {
            alert(data.msg);
            toggleForm();
        } else {
            alert(data.msg);
        }
    } catch (e) {
        console.error("Error parsing JSON: " + e.message);
    }
}

function submitLoginForm() {
    var xhr = new XMLHttpRequest();
    var url = "../../Backend/Controller/userController.php";
    var params = buildLoginParams();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            handleLoginResponse(xhr.responseText);
        }
    };

    xhr.send(params);
}

function buildLoginParams() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    return "method=login&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
}

function handleLoginResponse(responseText) {
    try {
        var data = JSON.parse(responseText);
        if (data.success) {
            console.log("Felhasználó szerepköre: " + data.role); // Itt írjuk ki a szerepkört
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userStatus', 'loggedIn');
            localStorage.setItem('fullname', data.fullname);
            // Szerepkör ellenőrzése és átirányítás
            if (data.role === 'admin') {
                window.location.href = '../Admin/mainAdmin.html'; // Admin szerepkör esetén
            } else {
                checkLoginState(); // Nem admin felhasználók számára
            }
        } else {
            alert(data.msg);
        }
    } catch (e) {
        console.error("Error parsing JSON: ", e.message);
    }
}





function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userStatus');
    localStorage.removeItem('fullname');
    checkLoginState();
    // További logika...
}


function toggleForm() {
    var registrationForm = document.getElementById('registrationForm');
    var loginForm = document.getElementById('loginForm');
    registrationForm.style.display = registrationForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
}

function togglePasswordVisibility(fieldId, toggleId) {
    var field = document.getElementById(fieldId);
    var toggle = document.getElementById(toggleId);
    if (field.type === "password") {
        field.type = "text";
        toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        field.type = "password";
        toggle.innerHTML = '<i class="bi bi-eye"></i>';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    fetch('../../Backend/Controller/userController.php?action=getUserCount') // Módosítsd az URL-t a valós elérési útra
        .then(response => response.json())
        .then(data => {
            document.getElementById('userCount').textContent = data.userCount;
        })
        .catch(error => console.error('Hiba történt:', error));
});
function fetchUserCount() {
    fetch('UserController.php?action=getUserCount')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userCount').textContent = data.userCount;
        })
        .catch(error => console.error('Hiba történt:', error));
}