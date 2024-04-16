document.addEventListener("DOMContentLoaded", function () {
    var stripe = Stripe('pk_test_51P66vKP89oPwwW01PNavTxlHsvXNvbmHWGwF4Ri6YaF2yF0nyx4T4BBlmhcZUYIH52Tu4rxdZJ3COkHzFSqfKuO800cx7XWfTH');
    var elements = stripe.elements();

    // Create and mount the card number element
    var cardNumber = elements.create('cardNumber');
    cardNumber.mount('#card-number');

    // Create and mount the card expiry element
    var cardExpiry = elements.create('cardExpiry');
    cardExpiry.mount('#card-expiry');

    // Create and mount the card CVC element
    var cardCvc = elements.create('cardCvc');
    cardCvc.mount('#card-cvc');

    var form = document.getElementById('payment-form');
    var paymentResult = document.getElementById('payment-result');
    var confirmAndPayButton = document.getElementById("submitFormBtn");

    confirmAndPayButton.addEventListener('click', function (event) {
        event.preventDefault();

        stripe.createToken(cardNumber, cardExpiry, cardCvc).then(function (result) {
            if (result.error) {
                // Handle errors
                console.error('Stripe token creation error:', result.error.message);
                paymentResult.textContent = result.error.message;
            } else {
                var tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'stripeToken';
                tokenInput.value = result.token.id;
                form.appendChild(tokenInput);

                // Submit the form to the server
                form.submit();
            }
        });
    });
});
