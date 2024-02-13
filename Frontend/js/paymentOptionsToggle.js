document.addEventListener("DOMContentLoaded", () => {
    const cashOnDelivery = document.getElementById("cashOnDelivery");
    const creditCard = document.getElementById("creditCard");
    const cashOnDeliveryContent = document.getElementById("cashOnDeliveryContent");
    const creditCardContent = document.getElementById("creditCardContent");

    creditCard.addEventListener("change", function(){
        if(this.checked){
            cashOnDeliveryContent.classList.remove("show");
            creditCardContent.classList.add("show");
        }
    });

    cashOnDelivery.addEventListener("change", function() {
        if(this.checked){
            cashOnDeliveryContent.classList.add("show");
            creditCardContent.classList.remove("show");
        }
    });
});