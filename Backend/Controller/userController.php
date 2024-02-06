<?php
require_once '../Config/database.php';
require_once '../Model/userModel.php';

class UserController {
    private $database;
    private $userModel;

    public function __construct($database) {
        $this->database = $database;
        $this->userModel = new UserModel($this->database->getConnection());
    }

    public function registerUser($fullname, $email, $password, $confirmPassword) {
        // Validációk
        if (empty($fullname) || empty($email) || empty($password) || empty($confirmPassword)) {
            return array('msg' => 'Minden mező kitöltése kötelező.');
        }

        if (!$this->isValidEmail($email)) {
            return array('msg' => 'Hibás email cím formátum!');
        }

        if (!$this->isValidPassword($password)) {
            return array('msg' => 'A jelszó nem felel meg a követelményeknek.');
        }

        if ($password !== $confirmPassword) {
            return array('msg' => 'A jelszavak nem egyeznek.');
        }

        // Modell hívása a felhasználó regisztrációjához
        return $this->userModel->registerUser($fullname, $email, $password, $confirmPassword);
    }

    public function loginUser($loginEmail, $loginPassword) {
        if (empty($loginEmail) || empty($loginPassword)) {
            return array('msg' => 'Minden mező kitöltése kötelező.');
        }

        if (!$this->isValidEmail($loginEmail)) {
            return array('msg' => 'Hibás email cím formátum!');
        }

        // Modell hívása a felhasználó bejelentkezéséhez
        return $this->userModel->loginUser($loginEmail, $loginPassword);
    }

    private function isValidEmail($email) {
        $emailPattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
        return preg_match($emailPattern, $email);
    }

    private function isValidPassword($password) {
        return strlen($password) >= 8 && strpos($password, ' ') === false;
    }
}

// Regisztráció és bejelentkezés funkciók
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["method"] == "registration") {
        if (isset($_POST["fullname"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["confirmPassword"])) {
            $fullname = trim($_POST["fullname"]);
            $email = trim($_POST["email"]);
            $password = trim($_POST["password"]);
            $confirmPassword = trim($_POST["confirmPassword"]);

            $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
            $email = filter_var($email, FILTER_VALIDATE_EMAIL);

            $database = new Database(); // Új adatbázis példány létrehozása
            $userController = new UserController($database);
            $result = $userController->registerUser($fullname, $email, $password, $confirmPassword);

            echo json_encode($result);
        } else {
            $result = array('msg' => 'Incorrect registration form filling.');
            echo json_encode($result);
        }
    } elseif ($_POST["method"] == "login") {
        if (isset($_POST["loginEmail"]) && isset($_POST["loginPassword"])) {
            $loginEmail = trim($_POST["loginEmail"]);
            $loginPassword = trim($_POST["loginPassword"]);

            $loginEmail = filter_var($loginEmail, FILTER_VALIDATE_EMAIL);

            $database = new Database(); // Új adatbázis példány létrehozása
            $userController = new UserController($database);
            $loginResult = $userController->loginUser($loginEmail, $loginPassword);

            echo json_encode($loginResult);
        } else {
            $result = array('msg' => 'Incorrect login form filling.');
            echo json_encode($result);
        }
    }
}