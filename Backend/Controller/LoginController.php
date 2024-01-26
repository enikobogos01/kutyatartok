<?php 
class LoginController {
    private $conn; 

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function loginUser($email, $password) {
        // Adatbázis ellenőrzés
        $checkUserQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($checkUserQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $userData = $stmt->get_result()->fetch_assoc();

        if (!$userData) {
            return array('msg' => 'A felhasználó nem létezik!');
        }

        if (password_verify($password, $userData['password'])) {
            return array('msg' => 'Sikeres bejelentkezés!', 'fullname' => $userData['fullname']);
        } else {
            return array('msg' => 'Hibás jelszó!');
        }
    }
}

?>