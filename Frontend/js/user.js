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
    var email = localStorage.getItem('email'); // Email cím lekérése
    var userIcon = document.getElementById('userIcon'); // Az ikon elem lekérése

    if (isLoggedIn === 'true') {
        document.getElementById('content').style.display = 'none';
        document.getElementById('welcomeMessage').textContent = `Üdvözlünk, ${fullname}!`;
        document.getElementById('profileInfo').style.display = 'block';
        document.getElementById('profileFullname').textContent = fullname;
        document.getElementById('profileEmail').textContent = email;
        // Az ikon osztályának cseréje, ha az elem létezik
        if (userIcon) {
            userIcon.className = 'bi bi-person-circle';
        }
        document.getElementById('fullname').textContent = fullname;
        document.getElementById('email').textContent = email;
    } else {
        document.getElementById('content').style.display = 'block';
        document.getElementById('profileInfo').style.display = 'none';

        // Visszaállítjuk az eredeti ikont, ha szükséges
        if (userIcon) {
            userIcon.className = 'bi bi-person';
        }
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
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userStatus', 'loggedIn');
            localStorage.setItem('role', data.role);
            localStorage.setItem('fullname', data.fullname);
            localStorage.setItem('email', data.email);
            localStorage.setItem('registrationDate', data.registrationDate);

            // Itt adjuk hozzá a regisztrációs dátumot a DOM-hoz
            document.getElementById('registrationDate').textContent = data.registrationDate;

            if (data.role === 'user') {
                setupCountdown();
            }
            if (data.role === 'admin') {
                window.location.href = '../Admin/mainAdmin.html';
            } else {
                checkLoginState();
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
    window.location.reload();
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

document.addEventListener('DOMContentLoaded', function() {
    setupCountdown();
    var termsModal = document.getElementById('termsModal');
    termsModal.addEventListener('show.bs.modal', function (event) {
        // A .txt fájl elérési útvonala
        var filePath = '../txt/terms_and_conditions.txt';
        
        // Fetch API használata a fájl tartalmának betöltéséhez
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                // A modális ablak .modal-body elemének kiválasztása és tartalmának frissítése
                termsModal.querySelector('.modal-body').innerText = data;
            })
            .catch(error => console.error('Hiba történt a fájl betöltése közben:', error));
    });
});

// Visszaszámláló kezdeti beállítása
function setupCountdown() {
    // Ellenőrizzük, hogy a felhasználó szerepköre 'user'-e
    var role = localStorage.getItem('role'); // Tegyük fel, hogy a szerepkört így tároljuk
    if (role !== 'user') return; // Ha nem 'user', akkor nem csinálunk semmit
    // Visszaszámláló indítása
    startCountdown();
}

// Visszaszámláló funkció
function startCountdown(duration = 1800) {
    var countdownElement = document.getElementById('countdown');
    var targetTime = new Date().getTime() + duration * 1000;
    function updateCountdown() {
        var now = new Date().getTime();
        var distance = targetTime - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (distance < 0) {
            clearInterval(interval);
            logout();
        }
    }
    updateCountdown();
    var interval = setInterval(updateCountdown, 1000);

    // Az újraindításhoz eseményfigyelő hozzáadása
    document.addEventListener('click', function() {
        clearInterval(interval);
        startCountdown(duration); // Újraindítjuk a visszaszámlálót
    });
}
// Az oldal betöltődésekor meghívjuk a setupCountdown funkciót
document.addEventListener('DOMContentLoaded', setupCountdown);

////////////////////////////////////////////////////////////////////////////////////////
function editPhoneNumber() {
    document.getElementById('editPhoneForm').style.display = 'block';
}

function savePhoneNumber() {
    var phoneNumber = document.getElementById('phoneInput').value;
    // Itt lehet hozzáadni a logikát az adatbázis frissítéséhez
    document.getElementById('phoneNumber').innerText = phoneNumber;
    document.getElementById('editPhoneForm').style.display = 'none';
}

function editAddress() {
    document.getElementById('editAddressForm').style.display = 'block';
}

function saveAddress() {
    var zipcode = document.getElementById('zipcodeInput').value;
    var streetName = document.getElementById('streetNameInput').value;
    var streetType = document.getElementById('streetTypeInput').value;
    var houseNumber = document.getElementById('houseNumberInput').value;

    // Itt lehet hozzáadni a logikát az adatbázis frissítéséhez
    var fullAddress = `${zipcode}, ${streetName} ${streetType}, ${houseNumber}`;
    document.getElementById('address').innerText = fullAddress;
    document.getElementById('editAddressForm').style.display = 'none';
}

function editBirthdate() {
    document.getElementById('editBirthdateForm').style.display = 'block';
}

function saveBirthdate() {
    var birthdate = document.getElementById('birthdateInput').value;
    // Itt lehet hozzáadni a logikát az adatbázis frissítéséhez
    document.getElementById('birthdate').innerText = birthdate;
    document.getElementById('editBirthdateForm').style.display = 'none';
}