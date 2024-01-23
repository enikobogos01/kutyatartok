<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    //SMTP settings
    $mail->SMTPDebug  = 2;  // Debug mód
    $mail->Debugoutput = 'html';
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'kutyatartokwebaruhaza@gmail.com';
    $mail->Password   = 'Jelszo2000'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    //E-mail settings
    $mail->setFrom('kutyatartokwebaruhaza@gmail.com', 'Webshop');
    $mail->addAddress($_POST["email"]);
    $mail->Subject = 'Sikeres regisztráció';
    $mail->Body    = 'Köszönjük a regisztrációt! Sikeresen regisztráltál a webáruházunkba.';

    $mail->send();
    echo json_encode(array('msg' => 'E-mail sikeresen elkuldve.'));
} catch (Exception $e) {
    echo json_encode(array('msg' => 'Hiba tortent az e-mail kuldese soran: ' . $mail->ErrorInfo));
}
?>