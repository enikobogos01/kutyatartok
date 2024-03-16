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
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
    var fullname = sessionStorage.getItem('fullname');
    var email = sessionStorage.getItem('email');
    var registrationDate = sessionStorage.getItem('registrationDate');
    var phoneNumber = sessionStorage.getItem('phoneNumber');
    var birthDate = sessionStorage.getItem('birthDate');
    var address = JSON.parse(sessionStorage.getItem('address') || "{}");
    var addressText = address && address.zipcode ? `${address.zipcode} ${address.city}, ${address.street_name} ${address.street_type} ${address.house_number}` : 'Még nincs megadva lakcím!';

    var userIcon = document.getElementById('userIcon');

    if (isLoggedIn === 'true') {
        document.getElementById('content').style.display = 'none';
        document.getElementById('welcomeMessage').textContent = `Üdvözlünk, ${fullname}!`;
        document.getElementById('profileInfo').style.display = 'block';
        document.getElementById('profileFullname').textContent = fullname;
        document.getElementById('profileEmail').textContent = email;
        document.getElementById('registrationDate').textContent = registrationDate;
        document.getElementById('phoneNumber').textContent = (phoneNumber && phoneNumber !== 'null') ? phoneNumber : 'Még nincs megadva telefonszám!';
        document.getElementById('birthDate').textContent = (birthDate && birthDate !== 'null') ? birthDate : 'Még nincs megadva születési dátum!';
        var address = JSON.parse(sessionStorage.getItem('address'));
        var addressText = address ? address.zipcode + ' ' + address.city + ', ' + address.street_name + ' ' + address.street_type + ' ' + address.house_number : 'Még nincs megadva lakcím!';
        if (!address || (address.zipcode === null && address.street_name === null && address.street_type === null && address.house_number === null)) {
    addressText = 'Még nincs megadva lakcím!';
}
document.getElementById('address').textContent = addressText;


        // Az ikon osztályának cseréje, ha az elem létezik
        if (userIcon) {
            userIcon.className = 'bi bi-person-circle';
        }
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
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                handleRegistrationResponse(xhr.responseText);
            } else {
                console.error("Server response (error): " + xhr.status + " " + xhr.statusText);
            }
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
            var registrationDate = new Date().toISOString().slice(0, 10);
            sessionStorage.setItem('registrationDate', registrationDate);
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
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userStatus', 'loggedIn');
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('fullname', data.fullname);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('registrationDate', data.registrationDate);
            sessionStorage.setItem('phoneNumber', data.phoneNumber);
            sessionStorage.setItem('birthDate', data.birthDate);
            sessionStorage.setItem('address', JSON.stringify(data.address));

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
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userStatus');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('registrationDate');
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('birthDate');
    sessionStorage.removeItem('address');
    window.location.href = '../User/user.html';
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
    var role = sessionStorage.getItem('role'); // Módosítás: 'localStorage' helyett 'sessionStorage'
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

///////////////////////////////////////////////////////////////////////////////////////////////
function showEditForm(fieldId) {
    var existingForm = document.querySelector('.editForm');
    if (existingForm) {
        existingForm.remove();
    }

    var phoneNumberElement = document.getElementById(fieldId);
    var editIcon = phoneNumberElement.nextElementSibling;
    var saveIcon = editIcon.nextElementSibling;

    toggleIcons(editIcon, saveIcon);

    var phoneNumber = phoneNumberElement.textContent.trim();
    if (phoneNumber === "Még nincs megadva telefonszám!") {
        phoneNumber = "";
    }
    var form = document.createElement('form');
    form.className = 'editForm';
    form.innerHTML = `<input type="text" class="phoneNumberInput profileInput" id="newPhoneNumber" value="${phoneNumber}" autofocus required maxlength="11">`;
    form.onsubmit = function(e) { e.preventDefault(); savePhoneNumber(fieldId, saveIcon); };

    phoneNumberElement.style.display = 'none';
    phoneNumberElement.parentElement.insertBefore(form, saveIcon);

    saveIcon.style.display = 'inline-block';
    saveIcon.onclick = function() { savePhoneNumber(fieldId, saveIcon); };
}

function savePhoneNumber(fieldId) {
    var inputElement = document.getElementById('newPhoneNumber');
    var newPhoneNumber = inputElement.value.trim();

    if (newPhoneNumber === "") {
        alert("A telefonszám nem lehet üres.");
        return;
    }

    if (!validatePhoneNumber(inputElement)) {
        alert("Helytelen telefonszám formátum.\nHelyes telefonszám formátum: 06 12 345 6789 / +36 12 345 6789");
        return;
    }

    var userId = sessionStorage.getItem('userId');

    if (!userId) {
        console.error('Felhasználó nincs bejelentkezve!');
        return;
    }

    sessionStorage.setItem('phoneNumber', newPhoneNumber);

    var phoneNumberElement = document.getElementById(fieldId);
    var editIcon = phoneNumberElement.nextElementSibling;

    toggleIcons(editIcon, editIcon.previousElementSibling);

    phoneNumberElement.textContent = newPhoneNumber;
    phoneNumberElement.style.display = 'inline';

    var form = document.querySelector('.editForm');
    form.remove();

    var saveIcon = editIcon.nextElementSibling;
    saveIcon.style.display = 'none';
}

function toggleIcons(iconToHide, iconToShow) {
    if (iconToHide.style.display !== 'none') {
        iconToHide.style.display = 'none';
    } else {
        iconToShow.style.display = 'none';
        iconToHide.style.display = 'inline-block';
    }
}

function validatePhoneNumber(inputElement) {
    let phoneNumber = inputElement.value.trim();
    let validPatternPlus36 = /^\+36[0-9]{8,9}$/;
    let validPattern06 = /^06[0-9]{8,9}$/;

    let validFormats = "Helyes telefonszám formátum:\n06 12 345 6789\n+36 12 345 6789";

    if (!phoneNumber.match(/^\d+$/)) {
        alert("Helytelen telefonszám formátum. Csak számjegyeket tartalmazhat.\n" + validFormats);
        return false;
    }

    if (!(validPatternPlus36.test(phoneNumber) || validPattern06.test(phoneNumber))) {
        alert("Helytelen telefonszám formátum!\n" + validFormats);
        return false;
    }

    return true;
}
function showEditBirthDateForm(fieldId) {
    var existingForm = document.querySelector('.editForm');
    if (existingForm) {
        existingForm.remove();
    }

    var birthDateElement = document.getElementById(fieldId);
    var editIcon = birthDateElement.nextElementSibling;
    var saveIcon = editIcon.nextElementSibling;

    toggleIcons(editIcon, saveIcon);

    var birthDate = birthDateElement.textContent.trim();
    var form = document.createElement('form');
    form.className = 'editForm';
    var inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.className = 'birthDateInput profileInput';
    inputDate.id = 'newBirthDate';
    inputDate.value = ""; // Üres string érték
    inputDate.autofocus = true;
    form.appendChild(inputDate);

    form.onsubmit = function(e) { e.preventDefault(); saveBirthDate(fieldId, saveIcon); };

    birthDateElement.style.display = 'none';
    birthDateElement.parentElement.insertBefore(form, saveIcon);

    saveIcon.style.display = 'inline-block';
    saveIcon.onclick = function() { saveBirthDate(fieldId, saveIcon); };
}


function saveBirthDate(fieldId) {
    var inputElement = document.getElementById('newBirthDate');
    var newBirthDate = inputElement.value.trim();

    if (!validateBirthDate(inputElement)) {
        alert("Helytelen születési dátum, vagy formátum. Helyes formátum: YYYY-MM-DD");
        return;
    }

    var userId = sessionStorage.getItem('userId');

    if (!userId) {
        console.error('Felhasználó nincs bejelentkezve!');
        return;
    }

    sessionStorage.setItem('birthDate', newBirthDate);

    var birthDateElement = document.getElementById(fieldId);
    var editIcon = birthDateElement.nextElementSibling;

    toggleIcons(editIcon, editIcon.previousElementSibling);

    birthDateElement.textContent = newBirthDate;
    birthDateElement.style.display = 'inline';

    var form = document.querySelector('.editForm');
    form.remove();

    var saveIcon = editIcon.nextElementSibling;
    saveIcon.style.display = 'none';
}

function toggleIcons(iconToHide, iconToShow) {
    if (iconToHide.style.display !== 'none') {
        iconToHide.style.display = 'none';
    } else {
        iconToShow.style.display = 'none';
        iconToHide.style.display = 'inline-block';
    }
}

function validateBirthDate(inputElement) {
    let birthDate = inputElement.value.trim();
    let validFormat = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD formátum ellenőrzése

    if (!validFormat.test(birthDate)) {
        return false;
    }

    // Ellenőrizzük, hogy a dátum nem lehet jövőbeli és nem lehet több mint 120 évvel ezelőtti
    let currentDate = new Date();
    let inputDate = new Date(birthDate);
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 125);

    if (inputDate >= currentDate || inputDate < minDate) {
        return false;
    }

    return true;
}
function showEditAddressForm(fieldId) {
    var existingForm = document.querySelector('.editForm');
    if (existingForm) {
        existingForm.remove();
    }

    var addressElement = document.getElementById(fieldId);
    var editIcon = addressElement.nextElementSibling;
    var saveIcon = editIcon.nextElementSibling;

    toggleIcons(editIcon, saveIcon);

    // Ellenőrizzük, hogy az elem tartalma a "Még nincs megadva lakcím!" szöveg-e
    var currentAddress = addressElement.textContent.trim() === "Még nincs megadva lakcím!" ? "" : addressElement.textContent;

    // Csak a város után vessző formázás
    var addressParts = currentAddress.split(", ");
    var address = addressParts.length > 1 ? addressParts.join(", ") : addressParts[0];

    var form = document.createElement('form');
    form.className = 'editForm';
    form.innerHTML = `
        <input type="text" class="zipcodeInput profileInput" id="newZipcode" placeholder="Irányítószám" value="${addressParts[0] || ''}" maxlength="4" required autofocus>
        <input type="text" class="cityInput profileInput" id="newCity" placeholder="Város" value="${addressParts[1] || ''}" required>
        <input type="text" class="streetNameInput profileInput" id="newStreetName" placeholder="Utcanév" value="${addressParts[2] || ''}" required>
        <input type="text" class="streetTypeInput profileInput" id="newStreetType" placeholder="Utca típusa" value="${addressParts[3] || ''}">
        <input type="text" class="houseNumberInput profileInput" id="newHouseNumber" placeholder="Házszám" value="${addressParts[4] || ''}" pattern="[0-9]+" required>
        <button type="submit" style="display: none;"></button>
    `;
    form.onsubmit = function(e) { e.preventDefault(); saveAddress(fieldId, saveIcon); };

    addressElement.parentElement.insertBefore(form, saveIcon);
    addressElement.style.display = 'none'; // Elrejtjük a szöveges részt szerkesztés közben

    saveIcon.style.display = 'inline-block';
    saveIcon.onclick = function() { saveAddress(fieldId, saveIcon); };
}

function saveAddress(fieldId, saveIcon) {
    var newZipcode = document.getElementById('newZipcode').value.trim();
    var newCity = document.getElementById('newCity').value.trim();
    var newStreetName = document.getElementById('newStreetName').value.trim();
    var newStreetType = document.getElementById('newStreetType').value.trim();
    var newHouseNumber = document.getElementById('newHouseNumber').value.trim();

    // Ellenőrizzük, hogy minden mező ki van-e töltve
    if (newCity === "" || newStreetName === "" || newHouseNumber === "") {
        alert("Kérjük, töltse ki az összes mezőt.");
        return;
    }

    // Validáció: ZIP-kód csak szám lehet
    if (!/^\d+$/.test(newZipcode)) {
        alert("Az irányítószám csak számokat tartalmazhat.");
        return;
    }

    // Objektum létrehozása az új cím tárolására
    var fullAddress = {
        zipcode: newZipcode,
        city: newCity,
        street_name: newStreetName,
        street_type: newStreetType,
        house_number: newHouseNumber
    };

    // Az objektum JSON formátumra konvertálása és tárolása a sessionStorage-ben
    sessionStorage.setItem('address', JSON.stringify(fullAddress));

    var addressElement = document.getElementById(fieldId);
    var addressText = `${newZipcode} ${newCity}, ${newStreetName} ${newStreetType} ${newHouseNumber}`.trim();

    addressElement.textContent = addressText !== "" ? addressText : "Még nincs megadva lakcím!";
    addressElement.style.display = 'inline';

    var form = document.querySelector('.editForm');
    if (form) form.remove();

    var editIcon = saveIcon.previousElementSibling;
    toggleIcons(saveIcon, editIcon);

    saveIcon.style.display = 'none';
    editIcon.style.display = 'inline-block';
}


function toggleIcons(iconToHide, iconToShow) {
    if (iconToHide.style.display !== 'none') {
        iconToHide.style.display = 'none';
    } else {
        iconToShow.style.display = 'none';
        iconToHide.style.display = 'inline-block';
    }
}