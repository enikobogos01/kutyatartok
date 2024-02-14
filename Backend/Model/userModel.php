<?php
require_once '../Config/database.php';

class UserModel {
    private $conn; 

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function registerUser($fullname, $email, $password) {
        // Adatbázis ellenőrzés
        $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($checkEmailQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $checkResult = $stmt->get_result();
    
        if ($checkResult->num_rows > 0) {
            return array('msg' => 'Ez a felhasználó már létezik!');
        } else {
            // Helyes hashelés
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
            $insertQuery = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($insertQuery);
            $stmt->bind_param("sss", $fullname, $email, $hashedPassword);
    
            try {
                if ($stmt->execute()) {
                    return array('msg' => 'Sikeres regisztráció! Most már be tudsz jelentkezni.');
                } else {
                    return array('msg' => 'Hiba történt a regisztráció közben!');
                }
            } finally {
                $stmt->close();
            }
        }
    }
    public function getUserFullnameByEmail($email) {
        $sql = "SELECT fullname FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['fullname'];
    }
    
    public function loginUser($email, $password) {
        $sql = "SELECT id, password FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            // SQL előkészítési hiba kezelése
            return ['success' => false, 'msg' => 'Adatbázis előkészítési hiba.'];
        }
    
        $stmt->bind_param("s", $email);
        if (!$stmt->execute()) {
            // SQL végrehajtási hiba kezelése
            return ['success' => false, 'msg' => 'Adatbázis végrehajtási hiba.'];
        }
    
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userId = $row['id'];
            $hashedPassword = $row['password'];
    
            // Ellenőrizd a jelszót
            if (password_verify($password, $hashedPassword)) {
                // Sikeres bejelentkezés
                return ['success' => true, 'msg' => 'Sikeres bejelentkezés.', 'userId' => $userId];
            } else {
                // Sikertelen bejelentkezés, hibás jelszó
                return ['success' => false, 'msg' => 'Hibás email-cím vagy jelszó.'];
            }
        } else {
            // A felhasználó nem található
            return ['success' => false, 'msg' => 'A felhasználó nem található.'];
        }
    }
       
}
?>