<?php
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
                $fullname = $this->userModel->getUserFullnameByEmail($email);
                $address = $this->userModel->getUserAddressByEmail($email); // Lakcím lekérése
                return json_encode([
                    'success' => true,
                    'msg' => 'Sikeres bejelentkezés.',
                    'fullname' => $fullname,
                    'userId' => $result['userId'],
                    'role' => $result['role'],
                    'email' => $email,
                    'registrationDate' => $result['registrationDate'],
                    'phoneNumber' => $result['phoneNumber'],
                    'address' => $address
                ]);
            } elseif ($result['msg'] == 'Hibás email-cím vagy jelszó.') {
                return json_encode(['success' => false, 'msg' => 'Helyes email-cím, de hibás jelszó.']);
            } elseif ($result['msg'] == 'A felhasználó nem található.') {
                return json_encode(['success' => false, 'msg' => 'Nem regisztráltak még ilyen email-címmel.']);
            }
        } catch (Exception $e) {
            return json_encode(['success' => false, 'msg' => 'Rendszerhiba: ' . $e->getMessage()]);
        }
    }    

    public function updateContactInfo($userId, $phoneNumber, $address) {
        return $this->userModel->updateUserContactInfo($userId, $phoneNumber, $address);
    }

    public function getUserFullnameByEmail($email) {
        return $this->userModel->getUserFullnameByEmail($email);
    }
    public function getUserCount() {
        $userCount = $this->userModel->getUserCount();
        header('Content-Type: application/json');
        echo json_encode(['userCount' => $userCount]);
    }
    
    private function isValidEmail($email) {
        $emailPattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
        return preg_match($emailPattern, $email);
    }
    // Jelszó validáció
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
    public function getAllUsers() {
        header('Content-Type: application/json');
        try {
            $users = $this->userModel->getAllUsers();
            echo json_encode(['success' => true, 'users' => $users]);
        } catch (Exception $e) {
            http_response_code(500); // Szerver oldali hiba
            echo json_encode(['success' => false, 'msg' => 'Hiba történt a felhasználók lekérésekor: ' . $e->getMessage()]);
        }
    }
}

$userController = new UserController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if ($contentType === "application/json") {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if ($data["action"] == "updateContactInfo") {
            $result = $userController->updateContactInfo($data["userId"], $data["phoneNumber"], $data["address"]);
            echo json_encode($result);
            exit;
        }
    } else {
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
        
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    echo json_encode(['success' => false, 'msg' => 'Érvénytelen email formátum.']);
                } else {
                    $result = $userController->loginUser($email, $password);
                    echo $result;
                }
            } else {
                echo json_encode(['success' => false, 'msg' => 'Hiányzó email vagy jelszó.']);
            }
        }  
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"])) {
    if ($_GET["action"] == "getUserCount") {
        $userController->getUserCount();
        exit;
    } elseif ($_GET["action"] == "getAllUsers") {
        $userController->getAllUsers();
        exit;
    }
}