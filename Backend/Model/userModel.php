<?php
require_once '../Config/database.php';

class UserModel {
    private $conn; 

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function registerUser($fullname, $email, $password) {
        // Validációk a UserModel rétegben

        // Adatbázis ellenőrzés
        $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($checkEmailQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $checkResult = $stmt->get_result();

        if ($checkResult->num_rows > 0) {
            return array('msg' => 'Ez a felhasználó már létezik!');
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $insertQuery = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($insertQuery);
            $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

            try {
                if ($stmt->execute()) {
                    return array('msg' => 'Sikeres regisztráció!');
                } else {
                    return array('msg' => 'Hiba történt a regisztráció közben!');
                }
            } finally {
                $stmt->close();
            }
        }
    }
}
?>