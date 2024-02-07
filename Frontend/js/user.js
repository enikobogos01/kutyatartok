window.onload = function () {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (document.getElementById("terms").checked) {
            // If policy is accepted, send data to server for validation and registration
            submitForm();
        } else {
            // If policy is not accepted, display an alert message
            alert("Kérjük, előbb fogadja el a felhasználási feltételeket!");
        }
    });

    function submitForm() {
        var xhr = new XMLHttpRequest();
        var url = "../../Backend/Controller/userController.php";
        var fullname = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        var params = "method=registration" +
            "&fullname=" + encodeURIComponent(fullname) +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password) +
            "&confirmPassword=" + encodeURIComponent(confirmPassword); // Include confirmPassword in parameters

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Successful registration
                    var response = xhr.responseText.replace(/(\r\n|\n|\r)/gm, "");
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
        try {
            var data = JSON.parse(responseText);
            var msg = data.msg;
            alert(msg);
    
            // Check if registration was successful and send email
            if (msg == 'Sikeres regisztráció! Most már be tudsz jelentkezni.') {
                // Send registration email
                // sendRegistrationEmail(data.email);
                // Redirect to login section
                window.location.href = '#loginForm';
                // Clear registration form
                clearFormAndShowMessage('registrationForm', '');
                // Switch to login section
                toggleForm();
            }
        } catch (e) {
            console.error("Error parsing JSON: " + e.message);
        }
    }

    // Input text capitalize on input
    document.addEventListener('DOMContentLoaded', function () {
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
    });
};

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

function clearFormAndShowMessage(formId, message) {
    document.getElementById(formId).reset(); // Clear form
    let iframe = document.getElementById('feedbackIframe');
    iframe.style.display = 'block'; // Make iframe visible
    iframe.contentWindow.document.body.innerHTML = message; // Update iframe content
}
