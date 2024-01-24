window.onload = function () {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Send data to server for validation and registration
        submitForm();
    });

    function submitForm() {
        var xhr = new XMLHttpRequest();
        var url = "../../Backend/Controller/userController.php";
        var fullname = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        var params = "method=registration" +
            "&fullname=" + encodeURIComponent(fullname) +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password);

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
            if (msg == 'Sikeres regisztráció!') {
                // Send registration email
                // sendRegistrationEmail(data.email);
            }
        } catch (e) {
            console.error("Error parsing JSON: " + e.message);
        }
    }
};
