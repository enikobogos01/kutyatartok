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
//   var loginSubmitButton = document.getElementById("loginSubmitButton");
//   loginSubmitButton.addEventListener("click", function (event) {
//       event.preventDefault();

//       // Send data to server for login validation
//       submitLoginForm();
//   });

//   function submitLoginForm() {
//       var xhr = new XMLHttpRequest();
//       var url = "../../Backend/Controller/userController.php";
//       var loginEmail = document.getElementById("loginEmail").value;
//       var loginPassword = document.getElementById("loginPassword").value;

//       var params = "method=login" +
//           "&loginEmail=" + encodeURIComponent(loginEmail) +
//           "&loginPassword=" + encodeURIComponent(loginPassword);

//       xhr.open("POST", url, true);
//       xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//       xhr.onreadystatechange = function () {
//           if (xhr.readyState == 4) {
//               if (xhr.status == 200) {
//                   // Successful login
//                   var response = xhr.responseText.replace(/(\r\n|\n|\r)/gm, "");
//                   console.log("Server response: " + response);
//                   handleLoginResponse(response);
//               } else {
//                   // Unsuccessful login
//                   console.error("Server response (error): " + xhr.status);
//                   handleLoginResponse(xhr.responseText);
//               }
//           }
//       };

//       xhr.send(params);
//   }

  function handleLoginResponse(responseText) {
      try {
          var data = JSON.parse(responseText);
          var msg = data.msg;
          alert(msg);

          if (msg == 'Sikeres bejelentkezés!') {
              // Sikeres bejelentkezés esetén átirányítás és egyéb teendők
              window.location.href = 'profile.php';
          }
      } catch (e) {
          console.error("Error parsing JSON: " + e.message);
      }
  }
};
document.addEventListener('DOMContentLoaded', function () {
  // Keressük meg az input elemet
  var inputElement = document.getElementById('fullname');

  // Ellenőrizzük, hogy az input elem létezik-e
  if (inputElement) {
      // Hozzáadunk egy eseménykezelőt, ami a felhasználó által beírt szöveget rögtön naggyá alakítja
      inputElement.addEventListener('input', function () {
          var words = inputElement.value.split(' ');
          words = words.map(function(word) {
              return word.charAt(0).toUpperCase() + word.slice(1);
          });
          inputElement.value = words.join(' ');
      });
  }
});

function toggleForm() {
  var registrationForm = document.getElementById('registrationForm');
  var loginForm = document.getElementById('loginForm');

  if (registrationForm.style.display === 'block') {
    registrationForm.style.display = 'none';
    loginForm.style.display = 'block';
  } else {
    registrationForm.style.display = 'block';
    loginForm.style.display = 'none';
  }
}
function togglePasswordVisibility(fieldId) {
    var field = document.getElementById(fieldId);
    var toggle = document.getElementById(fieldId + "-toggle");
    if (field.type === "password") {
        field.type = "text";
        toggle.classList.add("visible");
    } else {
        field.type = "password";
        toggle.classList.remove("visible");
    }
}