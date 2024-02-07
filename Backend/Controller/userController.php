<?php
require_once '../Model/userModel.php';
require_once '../Config/database.php';

class UserController {
    private $database;

    public function __construct($database) {
        $this->database = $database;
    }

    public function registerUser($fullname, $email, $password, $confirmPassword) {
        // Validációk a UserController rétegben

        if (empty($fullname) || empty($email) || empty($password)) {
            return array('msg' => 'Minden mező kitöltése kötelező.');
        }

        if (!$this->isValidEmail($email)) {
            return array('msg' => 'Hibás email cím formátum!');
        }

        if ($password !== $confirmPassword) {
            // Ellenőrizzük a jelszó és a megerősített jelszó egyezőségét
            return array('msg' => 'A két jelszó nem egyezik meg!');
        }

        if (!$this->isValidPassword($password)) {
            // Ellenőrizzük a jelszó formátumát
            return array('msg' => 'A jelszó legalább 8 karakter hosszú kell legyen, és nem tartalmazhat szóközt.');
        }

        // Meghívjuk a felhasználó regisztrációját
        $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
        $userModel = new UserModel($this->database->getConnection());
        return $userModel->registerUser($fullname, $email, $password);
    }

    // Egyedi email validáció
    private function isValidEmail($email) {
        $emailPattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
        return preg_match($emailPattern, $email);
    }

    // Egyedi jelszó validáció
    private function isValidPassword($password) {
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
    if (isset($_POST["fullname"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["confirmPassword"])) {
        $fullname = trim($_POST["fullname"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);
        $confirmPassword = trim($_POST["confirmPassword"]);

        $database = new Database(); // Új adatbázis példány létrehozása
        $userController = new UserController($database);
        $result = $userController->registerUser($fullname, $email, $password, $confirmPassword);
        echo json_encode($result);
    } else {
        $missingFields = array();
        if (empty($_POST["fullname"])) {
            $missingFields[] = 'Teljes név';
        }
        if (empty($_POST["email"])) {
            $missingFields[] = 'Email cím';
        }
        if (empty($_POST["password"])) {
            $missingFields[] = 'Jelszó';
        }
        if (empty($_POST["confirmPassword"])) {
            $missingFields[] = 'Jelszó megerősítése';
        }
        
        $result = array('msg' => 'A következő mezők nincsenek kitöltve vagy hiányzik az adat: ' . implode(", ", $missingFields));
        echo json_encode($result);
    }
}
?>
