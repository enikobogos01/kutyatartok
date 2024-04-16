<?php
require_once 'StripePayment.php';

$stripeSecretKey = 'sk_test_51P66vKP89oPwwW01odzvd3WddSOrLikMKWWym9ioDATiAmQjRav8Bgob58FulCPcIyLmfsxMLVshnXgL8u10vLPP00Wg3Y6wqH'; // Cseréld le a saját titkos kulcsodra
$stripePayment = new StripePayment($stripeSecretKey);

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $token = $_POST['stripeToken'];
        $name = $_POST['customerName']; // Név input mező
        $email = $_POST['customerEmail']; // Email input mező
        $message = $stripePayment->processPayment($token, $name, $email);
    } catch (Exception $e) {
        $message = 'Hiba történt a fizetés során: ' . $e->getMessage();
    }
}
?>