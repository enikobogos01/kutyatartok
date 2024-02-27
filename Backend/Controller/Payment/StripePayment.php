<?php
require_once 'vendor/autoload.php'; // Composer autoload
require_once '../Payment/processTotalForStripePayment.php';

class StripePayment {
    private $stripeSecretKey;

    public function __construct($stripeSecretKey) {
        $this->stripeSecretKey = $stripeSecretKey;
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
    }

    public function processPayment($token, $customerName, $customerEmail) {
        try {
            $customer = \Stripe\Customer::create([
                'name' => $customerName,
                'email' => $customerEmail,
                'source' => $token,
            ]);
    
            $amount = $_SESSION['cart_total'];
    
            $charge = \Stripe\Charge::create([
                'amount' => $amount,
                'currency' => 'huf',
                'description' => 'Fizetés teszt céllal',
                'customer' => $customer->id,
            ]);
    
            // Clear the stored total after processing payment
            unset($_SESSION['cart_total']);
    
            return 'Fizetés sikeresen teljesítve!';
        } catch (\Stripe\Exception\CardException $e) {
            return 'Fizetés sikertelen: ' . $e->getError()->message;
        }
    }
}
?>