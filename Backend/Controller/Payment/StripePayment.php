<?php
require_once 'vendor/autoload.php'; // Composer autoload

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

            $charge = \Stripe\Charge::create([
                'amount' => 100, // 1 USD (centben)
                'currency' => 'usd',
                'description' => 'Fizetés teszt céllal',
                'customer' => $customer->id,
            ]);

            return 'Fizetés sikeresen teljesítve!';
        } catch (\Stripe\Exception\CardException $e) {
            return 'Fizetés sikertelen: ' . $e->getError()->message;
        }
    }
}
?>





