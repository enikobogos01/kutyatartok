// window.onload = function () {
//     var submitClicked = false;

//     var submitButton = document.getElementById("submitButton");
//     submitButton.addEventListener("click", function (event) {
//         if (submitClicked) {
//             event.preventDefault();
//             return;
//         }

//         var password = document.getElementById("password").value;
//         var confirmPassword = document.getElementById("confirmPassword").value;
//         if (password.length < 8) {
//             displayErrorMessage("A jelszó legalább 8 karakter hosszúnak kell lennie!");
//             event.preventDefault();
//             return;
//         }

//         var email = document.getElementById("email").value;
//         var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         if (!emailPattern.test(email)) {
//             displayErrorMessage("Érvénytelen e-mail cím formátum!");
//             event.preventDefault();
//             return;
//         }

//         if (password !== confirmPassword) {
//             displayErrorMessage("A jelszavak nem egyeznek meg!");
//             event.preventDefault();
//             return;
//         }

//         var xhr = new XMLHttpRequest();
//         var url = "../regisztracio.php";
//         var params = "fullname=" + encodeURIComponent(document.getElementById("fullname").value) + 
//                      "&email=" + encodeURIComponent(email) + 
//                      "&password=" + encodeURIComponent(password);

//         xhr.open("POST", url, true);
//         xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4) {
//                 if (xhr.status == 200) {
//                     var response = xhr.responseText;
//                     console.log("Szerver válasza: " + response);
        
//                     if (response.includes("Sikeres regisztráció")) {
//                         var successMessage = document.getElementById("successMessage");
//                         successMessage.innerHTML = response;
//                         successMessage.style.display = "block";
        
//                         // ... további kód a sikeres regisztráció esetén
//                     } else {
//                         displayErrorMessage("Hiba történt a regisztráció során: " + response);
//                     }
//                 } else {
//                     displayErrorMessage("Hiba történt a szerverrel való kommunikáció során. Kérjük, próbáld újra később.");
//                 }
//             }
//         };

//         xhr.send(params);
//     });

//     function displayErrorMessage(message) {
//         var errorMessage = document.getElementById("errorMessage");
//         errorMessage.innerHTML = message;
//         errorMessage.style.display = "block";
//     }
// }

window.onload = function () {
    var submitClicked = false;

    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        if (submitClicked) {
            event.preventDefault();
            return;
        }

        var password = document.getElementById("password").value;
        
        var email = document.getElementById("email").value;

        var xhr = new XMLHttpRequest();
        var url = "../regisztracio.php";
        var params = "fullname=" + encodeURIComponent(document.getElementById("fullname").value) + 
                     "&email=" + encodeURIComponent(email) + 
                     "&password=" + encodeURIComponent(password);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Sikeres válasz
                    var response = xhr.responseText;
                    console.log("Szerver válasza: " + response);
            
                    if (response.includes("Sikeres regisztráció")) {
                        var successMessage = document.getElementById("successMessage");
                        successMessage.innerHTML = response;
                        successMessage.style.display = "block";
            
                        // ... további kód a sikeres regisztráció esetén
                    } else {
                        displayErrorMessage(response);
                    }
                } else {
                    // Szerver oldali hiba
                    console.error("Szerver válasza (hiba): " + xhr.status);
                    displayErrorMessage("Hiba történt a szerverrel való kommunikáció során. Kérjük, próbáld újra később.");
                }
            }
            
        };

        xhr.send(params);
    });

    function displayErrorMessage(message) {
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.innerHTML = message;
        errorMessage.style.display = "block";
    }
}
