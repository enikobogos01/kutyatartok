window.onload = function () {
    // Regisztráció űrlap elküldése
    var registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function(event) {
            event.preventDefault();
            submitRegistrationForm();
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
};

// Regisztrációs űrlap elküldése
function submitRegistrationForm() {
    var xhr = new XMLHttpRequest();
    var url = "../../Backend/Controller/userController.php";
    var params = buildRegistrationParams();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                handleRegistrationResponse(xhr.responseText);
            } else {
                console.error("Server response (error): " + xhr.status);
                handleRegistrationResponse(xhr.responseText);
            }
        }
    };

    xhr.send(params);
}

// Bejelentkezési űrlap elküldése
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

// Regisztrációs paraméterek összeállítása
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

// Bejelentkezési paraméterek összeállítása
function buildLoginParams() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    return "method=login&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
}

// Regisztrációs válasz kezelése
function handleRegistrationResponse(responseText) {
    try {
        var data = JSON.parse(responseText);
        var msg = data.msg;
        alert(msg);

        if (msg == 'Sikeres regisztráció! Most már be tudsz jelentkezni.') {
            window.location.href = '#loginForm';
            clearFormAndShowMessage('registrationForm', '');
            toggleForm();
        }
    } catch (e) {
        console.error("Error parsing JSON: " + e.message);
    }
}

// Bejelentkezési válasz kezelése és tartalom frissítése
function handleLoginResponse(responseText) {
    console.log("Received response:", responseText);

    try {
        var data = JSON.parse(responseText);
        if (data.success) {
            // Sikeres bejelentkezés esetén tartalom törlése és üzenet megjelenítése
            var contentDiv = document.getElementById('content');
            var welcomeMessage = data.fullname ? `Sikeres bejelentkezés, ${data.fullname}!` : "Sikeres bejelentkezés!";
            contentDiv.innerHTML = `<h1>${welcomeMessage}</h1>`;
        } else {
            // Sikertelen bejelentkezés esetén hibaüzenet megjelenítése
            console.log("Login failed: " + data.msg); // Add console log here
            alert(data.msg);
        }
    } catch (e) {
        console.error("Error parsing JSON: ", e.message);
    }
}


// Űrlap mezők törlése és üzenet megjelenítése
function clearFormAndShowMessage(formId, message) {
    document.getElementById(formId).reset();
    let iframe = document.getElementById('feedbackIframe');
    iframe.style.display = 'block';
    iframe.contentWindow.document.body.innerHTML = message;
}

// Űrlapok váltása
function toggleForm() {
    var registrationForm = document.getElementById('registrationForm');
    var loginForm = document.getElementById('loginForm');

    if (loginForm.style.display === 'none' || loginForm.style.display === '') {
        loginForm.style.display = 'block';
        registrationForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registrationForm.style.display = 'block';
    }
}

// A togglePasswordVisibility függvény definiálása
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
