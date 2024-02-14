<?php
require_once 'StripePayment.php';

$stripeSecretKey = 'sk_test_51OjIVcFKfMSlBuhVDwuv3NV4V1DnpxqNG0KsBPM3CDAsWLV5DxBNG0aZ6Ak1cYZLAk1gDbefvF3Jg1F24H9ATQlr004zmkSylH'; // Cseréld le a saját titkos kulcsodra
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