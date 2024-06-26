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
            $registrationDate = date('Y-m-d'); // Regisztrációs dátum hozzáadása
    
            $insertQuery = "INSERT INTO users (fullname, email, password, registration_date) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($insertQuery);
            $stmt->bind_param("ssss", $fullname, $email, $hashedPassword, $registrationDate);
    
            try {
                if ($stmt->execute()) {
                    // $this->sendWelcomeEmail($fullname, $email); 
                    return array('msg' => 'Sikeres regisztráció! Most már be tudsz jelentkezni.');
                } else {
                    return array('msg' => 'Hiba történt a regisztráció közben!');
                }
            } finally {
                $stmt->close();
            }
        }
    }
    
    public function updateUserContactInfo($userId, $phoneNumber, $address) {
        $sql = "UPDATE users SET phone_number = ?, zipcode = ?, city = ?, street_name = ?, street_type = ?, house_number = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
    
        if ($stmt === false) {
            return ['success' => false, 'msg' => 'Adatbázis hiba: nem lehet előkészíteni a lekérdezést.'];
        }
    
        $stmt->bind_param("ssssssi", $phoneNumber, $address['zipcode'], $address['city'], $address['street_name'], $address['street_type'], $address['house_number'], $userId);
    
        if ($stmt->execute()) {
            return ['success' => true, 'msg' => 'A felhasználói adatok sikeresen frissítve.'];
        } else {
            return ['success' => false, 'msg' => 'Nem sikerült frissíteni a felhasználói adatokat.'];
        }
    }
    public function getAllUsers() {
        $query = "SELECT id, fullname, email, role, registration_date FROM users";
        $result = $this->conn->query($query);
        
        $users = [];
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        return $users;
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
    public function getUserAddressByEmail($email) {
        $sql = "SELECT zipcode, city, street_name, street_type, house_number FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row;
    }
    
    public function getUserCount() {
        $sql = "SELECT COUNT(*) AS count FROM users WHERE role = 'user'";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['count'];
    }
    
    public function loginUser($email, $password) {
        $sql = "SELECT id, password, role, registration_date, phone_number, zipcode, city, street_name, street_type, house_number FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            return ['success' => false, 'msg' => 'Adatbázis előkészítési hiba.'];
        }
    
        $stmt->bind_param("s", $email);
        if (!$stmt->execute()) {
            return ['success' => false, 'msg' => 'Adatbázis végrehajtási hiba.'];
        }
    
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                return [
                    'success' => true, 
                    'msg' => 'Sikeres bejelentkezés.', 
                    'userId' => $row['id'], 
                    'role' => $row['role'],
                    'registrationDate' => $row['registration_date'],
                    'phoneNumber' => $row['phone_number'],
                    'address' => [
                        'zipcode' => $row['zipcode'],
                        'city' => $row['city'],
                        'street_name' => $row['street_name'],
                        'street_type' => $row['street_type'],
                        'house_number' => $row['house_number']
                    ]
                ];
            } else {
                return ['success' => false, 'msg' => 'Hibás email-cím vagy jelszó.'];
            }
        } else {
            return ['success' => false, 'msg' => 'A felhasználó nem található.'];
        }
    }
}