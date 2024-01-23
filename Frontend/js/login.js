// Execute code when the window is loaded
window.onload = function () {
    // Find and handle form submission
    var submitButton = document.querySelector(".button input[type='submit']");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        submitLoginForm();
    });

    // Submit login form using AJAX
    function submitLoginForm() {
        var password = document.getElementById("loginPassword").value;
        var email = document.getElementById("loginEmail").value;

        var xhr = new XMLHttpRequest();
        var url = "/login.php";
        var params = "loginEmail=" + encodeURIComponent(email) +
            "&loginPassword=" + encodeURIComponent(password);

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    handleLoginResponse(response);
                } else {
                    console.error("Server response (error): " + xhr.status);
                }
            }
        };

        xhr.send(params);
    }

    // Handle login response and update UI
    function handleLoginResponse(response) {
        var msg = response.msg;
        var loginMessageDiv = document.getElementById("login-message");

        loginMessageDiv.textContent = msg;
        loginMessageDiv.className = response.success ? 'pop-down-success' : 'pop-down-error';

        setTimeout(function () {
            loginMessageDiv.textContent = '';
            loginMessageDiv.className = '';
        }, 3000);

        // Additional operations after successful login (if needed)
        if (response.success) {
            // Additional operations here
        }
    }
};