window.onload = function () {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Validate registration

        // If registration is correct, send data
        if (validateForm()) {
            submitForm();
        }
    });

    function submitForm() {
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;

        var xhr = new XMLHttpRequest();
        var url = "registration.php";
        var params = "fullname=" + encodeURIComponent(document.getElementById("fullname").value) +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Successful registration
                    var response = xhr.responseText;
                    console.log("Server response: " + response);
                    handleResponse(response);
                } else {
                    // Unsuccessful registration
                    console.error("Server response (error): " + xhr.status);
                    handleResponse(xhr.responseText);
                }
            }
        };

        xhr.send(params);
    }

    function handleResponse(responseText) {
        console.log("eddig működik elv");
        var data = JSON.parse(responseText);
        var msg = data.msg;
        alert(msg);
    
        // Check if registration was successful and send email
        if (msg == 'Sikeres regisztráció!') {
            // Set fields background color to green
            setFieldsSuccess();
            // Send registration email
            sendRegistrationEmail(data.email);
        }
    }
    
    
    function setFieldsSuccess() {
        console.log("Eddig műkszik");
        // Set fields background color to green
        document.getElementById("fullname").style.backgroundColor = "lightgreen";
        document.getElementById("email").style.backgroundColor = "lightgreen";
        document.getElementById("password").style.backgroundColor = "lightgreen";
        document.getElementById("confirmPassword").style.backgroundColor = "lightgreen";
    }

    function validateForm() {
        // Validation code for registration data...
        if (validateEmail() && validatePassword()) {
            return true;
        }

        // Return true if registration is correct, otherwise return false
        return false;
    }

    // Email validation
    function validateEmail() {
        var email = document.getElementById("email").value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

        if (!emailPattern.test(email)) {
            alert("Hibás email cím formátum!");
            return false;
        }

        return true;
    }

    function validatePassword() {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            alert("A jelszónak legalább 8 karakter hósszúnak kell lennie!");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Nem egyezik a két jelszó!");
            return false;
        }

        if (password.includes(" ")) {
            alert("A jelszó nem tartalmazhat szóközt!");
            return false;
        }

        return true;
    }

    // Capitalize the initials of the name
    function capitalizeNameInput(input) {
        var words = input.value.split(" ");
        var capitalizedWords = [];

        for (var i = 0; i < words.length; i++) {
            var word = words[i].trim();
            if (word.length > 0) {
                // Capitalize the first character and convert the rest to lowercase
                word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                capitalizedWords.push(word);
            } else {
                // If the word is empty (only spaces), add an empty word
                capitalizedWords.push("");
            }
        }

        input.value = capitalizedWords.join(" ");
    }
    // Call the capitalizeNameInput() function when focus is removed from the fullname element
    var fullnameInput = document.getElementById("fullname");
    fullnameInput.addEventListener("blur", function () {
        capitalizeNameInput(this);
    });

    function sendRegistrationEmail(email) {
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;

        var xhr = new XMLHttpRequest();
        var url = "registration.php";  // General path
        var params = "fullname=" + encodeURIComponent(document.getElementById("fullname").value) +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Email sent successfully
                    var response = xhr.responseText;
                    console.log("Server response (email): " + response);
                } else {
                    // Error during email sending
                    console.error("Server response (error - email sending): " + xhr.status);
                }
            }
        };

        xhr.send(params);
    }
};