<?php
require_once '../Model/userModel.php';
require_once '../Config/database.php';

class UserController {
    private $database;

    public function __construct($database) {
        $this->database = $database;
    }

    public function registerUser($fullname, $email, $password) {
        // Validációk a UserController rétegben

        if (empty($fullname) || empty($email) || empty($password)) {
            return array('msg' => 'Minden mező kitöltése kötelező.');
        }

        if (!$this->isValidEmail($email)) {
            return array('msg' => 'Hibás email cím formátum!');
        }

        if (!$this->isValidPassword($password)) {
            return array('msg' => 'Hibás jelszó formátum!');
        }

        $userModel = new UserModel($this->database->getConnection());
        return $userModel->registerUser($fullname, $email, $password);
    }

    // Egyedi email validáció
    private function isValidEmail($email) {
        // Egyedi validációs logika
        // Például:
        $emailPattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
        return preg_match($emailPattern, $email);
    }

    // Egyedi jelszó validáció
    private function isValidPassword($password) {
        // Egyedi validációs logika
        // Például:
        if (strlen($password) < 8) {
            return false;
        }

        if (strpos($password, ' ') !== false) {
            // A jelszó tartalmaz szóközt
            return false;
        }

        return true;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["method"] == "registration") {
    if (isset($_POST["fullname"]) && isset($_POST["email"]) && isset($_POST["password"])) {
        $fullname = trim($_POST["fullname"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);

        $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        if (empty($fullname) || empty($email) || empty($password)) {
            $result = array('msg' => 'Minden mező kitöltése kötelező.');
        } else {
            $database = new Database(); // Új adatbázis példány létrehozása
            $userController = new UserController($database);
            $result = $userController->registerUser($fullname, $email, $password);
        }

        echo json_encode($result);
    } else {
        $result = array('msg' => 'Incorrect registration form filling.');
        echo json_encode($result);
    }
}
?>