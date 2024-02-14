document.addEventListener("DOMContentLoaded", function() {
    updateNavbarIcon();
});

function updateNavbarIcon() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var userIcon = document.querySelector('.navbar-nav .nav-link i');

    if (isLoggedIn === 'true') {
        if(userIcon) {
            userIcon.className = 'bi bi-person-circle';
        }
    } else {
        if(userIcon) {
            userIcon.className = 'bi bi-person';
        }
    }
}
