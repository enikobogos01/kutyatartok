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
                // min összeg amit stripe elfogad HUF-ban: 175 HUF
                // az 'amount' összegét elosztja 100-al ezért a min. összeg amit ide lehet írni a 17500.
                'amount' => 17500,
                'currency' => 'huf',
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