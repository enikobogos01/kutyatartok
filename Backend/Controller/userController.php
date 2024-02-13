<?php
// userController.php

require_once '../Model/userModel.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function registerUser($fullname, $email, $password, $confirmPassword) {
        // Validációk a UserController rétegben

        if (empty($fullname) || empty($email) || empty($password)) {
            return ['msg' => 'Minden mező kitöltése kötelező.'];
        }

        if (!$this->isValidEmail($email)) {
            return ['msg' => 'Hibás email cím formátum!'];
        }

        if ($password !== $confirmPassword) {
            // Ellenőrizzük a jelszó és a megerősített jelszó egyezőségét
            return ['msg' => 'A két jelszó nem egyezik meg!'];
        }

        if (!$this->isValidPassword($password)) {
            // Ellenőrizzük a jelszó formátumát
            return ['msg' => 'A jelszó legalább 8 karakter hosszú kell legyen, és nem tartalmazhat szóközt.'];
        }

        // Meghívjuk a felhasználó regisztrációját
        $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
        return $this->userModel->registerUser($fullname, $email, $password);
    }
    
    public function loginUser($email, $password) {
        try {
            $result = $this->userModel->loginUser($email, $password);
    
            if ($result['success']) {
                return json_encode(['success' => true, 'msg' => $result['msg'], 'userId' => $result['userId']]);
            } else {
                return json_encode(['success' => false, 'msg' => $result['msg']]);
            }
        } catch (Exception $e) {
            return json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
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

$userController = new UserController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["method"] == "registration") {
        if (isset($_POST["fullname"], $_POST["email"], $_POST["password"], $_POST["confirmPassword"])) {
            $fullname = trim($_POST["fullname"]);
            $email = trim($_POST["email"]);
            $password = trim($_POST["password"]);
            $confirmPassword = trim($_POST["confirmPassword"]);

            $result = $userController->registerUser($fullname, $email, $password, $confirmPassword);
            echo json_encode($result);
        } else {
            $missingFields = [];
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
            
            $result = ['msg' => 'A következő mezők nincsenek kitöltve vagy hiányzik az adat: ' . implode(", ", $missingFields)];
            echo json_encode($result);
        }
    } elseif ($_POST["method"] == "login") {
        if (isset($_POST["email"], $_POST["password"])) {
            $email = trim($_POST["email"]);
            $password = trim($_POST["password"]);

            // Ellenőrizd a bejelentkezési adatokat a UserModel segítségével
            $result = $userController->loginUser($email, $password);
            echo $result; // A loginUser metódus visszaadja a JSON választ

        }
    }
}