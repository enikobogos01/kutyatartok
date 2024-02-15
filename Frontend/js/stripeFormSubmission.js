document.addEventListener("DOMContentLoaded", function () {
    var stripe = Stripe('pk_test_51OjIVcFKfMSlBuhVNoM1Szow8nytCWPgV8diFnS9ESg1J2E4XzEaLLoIfoEr7MhtxJGpwp0dJdXM7oHlWUbFDaOY00gzVQ6hQ8'); // Cseréld le a saját publikus kulcsodra
    var elements = stripe.elements();

    var card = elements.create('card');
    card.mount('#card-element');

    var form = document.getElementById('payment-form');
    var paymentResult = document.getElementById('payment-result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Hiba kezelése
                paymentResult.textContent = result.error.message;
            } else {
                var tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'stripeToken';
                tokenInput.value = result.token.id;
                form.appendChild(tokenInput);

                // Elküldjük az űrlapot a szervernek
                form.submit();
            }
        });
    });
});