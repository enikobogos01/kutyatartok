document.addEventListener("DOMContentLoaded", () => {
    const packageLocker = document.getElementById("packageLocker");
    const homeDelivery = document.getElementById("homeDelivery");
    const packageLockerContent = document.getElementById("packageLockerContent");
    const homeDeliveryContent = document.getElementById("homeDeliveryContent");

    homeDelivery.addEventListener("change", function(){
        if(this.checked){
            packageLockerContent.classList.remove("show");
            homeDeliveryContent.classList.add("show");
        }
    });

    packageLocker.addEventListener("change", function() {
        if(this.checked){
            packageLockerContent.classList.add("show");
            homeDeliveryContent.classList.remove("show");
        }
    });
});