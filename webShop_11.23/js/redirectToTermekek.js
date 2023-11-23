// redirectToTermekek.js

// Módosított redirectToNyakorvek függvény
function redirectToNyakorvek() {
    // Kategória érték beállítása
    const category = "nyakorv";

    // Átirányítás a termek.html oldalra
    window.location.href = `termekek.html?category=${category}`;
}

// Módosított redirectToHamok függvény
function redirectToHamok() {
    const category = "ham";
    window.location.href = `termekek.html?category=${category}`;
}

// Módosított redirectToPorazok függvény
function redirectToPorazok() {
    const category = "porazok";
    window.location.href = `termekek.html?category=${category}`;
}

// Módosított redirectToJatekok függvény
function redirectToJatekok() {
    const category = "jatekok";
    window.location.href = `termekek.html?category=${category}`;
}
