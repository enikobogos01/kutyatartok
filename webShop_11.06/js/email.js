// function sendEmail() {
//     var recipientEmail = "kutyatartokwebaruhaza@gmail.com";
//     var subject = "E-mail tárgya";
//     var body = "E-mail tartalma";

//     // Az alábbi URL átdobja a felhasználót a Gmail-be és beállítja a címzettet, tárgyat és tartalmat
//     var emailUrl = "mailto:" + recipientEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

//     // Az alábbi sor nyitja meg az alapértelmezett e-mail klienst
//     window.location.href = emailUrl;
// }
function sendEmail() {
    var form = document.getElementById("emailForm");
    var recipientEmail = form.elements["recipientEmail"].value;
    var subject = form.elements["subject"].value;
    var body = form.elements["body"].value;
  
    var emailUrl = "mailto:" + recipientEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  
    // Az alábbi sor nyitja meg az alapértelmezett e-mail klienst
    window.location.href = emailUrl;
}
  