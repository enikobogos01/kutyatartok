<?php
require_once '../Model/user.php';
require_once '../Config/databse.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["method"] == "registration") {
    // Ellenőrizd, hogy minden szükséges paraméter ki van-e töltve
    if (isset($_POST["fullname"]) && isset($_POST["email"]) && isset($_POST["password"])) {
        
        $fullname = trim($_POST["fullname"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);

        // Beérkező adatok ellenőrzése (SQL injection elleni védelem)
        $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        if (empty($fullname) || empty($email) || empty($password)) {
            // Hiányzó adatok esetén hibaüzenet
            $result = array(
                'msg' => 'Minden mező kitöltése kötelező.'
            );
        } else {
            // User példány létrehozása a HTTP kérésből érkező paraméterekkel
            $user = new User($fullname, $email, $password);

            // Logikai validáció

            // Modell függvény meghívása
            $result = $user->registration();
        }

        // A $result-ben benne van az, amit a controller visszaad
        echo json_encode($result);
    } else {
        // Hiányzó paraméter esetén hibaüzenet
        $result = array(
            'msg' => 'Incorrect registration form filling.'
        );
        echo json_encode($result);
    }
}
?>
