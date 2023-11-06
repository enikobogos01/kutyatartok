function capitalizeNameInput(input) {
    var words = input.value.split(" ");
    var capitalizedWords = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i].trim();
        if (word.length > 0) {
            // Az első karaktert nagybetűvé alakítjuk, a többit pedig kisbetűvé
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            capitalizedWords.push(word);
        } else {
            // Ha a szó üres (csak szóközök), akkor is adjunk hozzá egy üres szót
            capitalizedWords.push("");
        }
    }

    input.value = capitalizedWords.join(" ");
}



window.onload = function () {
    var submitClicked = false; // Globális változó a gomb kattintásának ellenőrzésére

    // Eseménykezelő a regisztrációs űrlap elküldése gombra
    var submitButton = document.getElementById("submitButton"); // A gombhoz adj hozzá egy id-t
    submitButton.addEventListener("click", function (event) {
        if (submitClicked) {
            // Ha a gomb már rákattintottak, ne küldje el az űrlapot újra
            event.preventDefault();
            return;
        }

        // Ellenőrzés: A jelszónak legalább 8 karakter hosszúnak kell lennie
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        if (password.length < 8) {
            alert("A jelszó legalább 8 karakter hosszúnak kell lennie!");
            event.preventDefault(); // Az űrlap elküldésének megakadályozása
            return;
        }

        // Ellenőrzés: Az e-mail cím formátumának ellenőrzése
        var email = document.getElementById("email").value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            alert("Érvénytelen e-mail cím formátum!");
            event.preventDefault(); // Az űrlap elküldésének megakadályozása
            return;
        }
        

        // Egyszerű validáció példa: ellenőrizzük, hogy a jelszavak egyeznek-e
        if (password !== confirmPassword) {
            alert("A jelszavak nem egyeznek meg!");
            event.preventDefault(); // Az űrlap elküldésének megakadályozása
            return;
        }

        // Itt további validációkat hozzáadhatsz az űrlap mezőihez

        // Ha minden validáció sikeres, elküldjük az adatokat a szervernek
        // Példa: AJAX kérés küldése a PHP szkriptnek
        var xhr = new XMLHttpRequest();
        var url = "../regisztracio.php"; // A szerver oldali PHP fájl elérési útja
        var params = "fullname=" + encodeURIComponent(document.getElementById("fullname").value) + 
                     "&email=" + encodeURIComponent(email) + 
                     "&password=" + encodeURIComponent(password);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Sikeres válasz érkezett a szerverről
                    var response = xhr.responseText;
                    console.log("Szerver válasza: " + response); // Írd ki a választ a konzolon
                    if (response == "success") {
                        // Sikeres regisztráció üzenet megjelenítése
                        var successMessage = document.getElementById("successMessage");
                        successMessage.innerHTML = "Sikeresen regisztráltál! Most már könnyedén bejelentkezhetsz a profilodba, és élvezheted az összes rendelkezésre álló szolgáltatást. Köszönjük, hogy csatlakoztál hozzánk!";
                        successMessage.style.display = "block";

                        // Tiltsd le a regisztrációs mezőket
                        document.getElementById("fullname").disabled = true;
                        document.getElementById("email").disabled = true;
                        document.getElementById("password").disabled = true;
                        document.getElementById("confirmPassword").disabled = true;

                        // Rejtsd el a regisztrációs űrlapot
                        var regisztracioForm = document.getElementById("regisztracioForm");
                        regisztracioForm.style.display = "none";

                        // Ugorj a bejelentkezési részhez (opcionális)
                        window.location.href = "#bejelentkezes";
                    } else {
                        // Hibaüzenet kezelése
                        alert("Hiba történt a regisztráció során: " + response);
                    }
                } else {
                    // Hibakód kezelése
                    alert("Hiba történt a szerverrel való kommunikáció során. Kérjük, próbáld újra később.");
                }
            }
        };

        xhr.send(params);
    });

    // További kód és eseménykezelők, stb.
}
