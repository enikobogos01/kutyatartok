<?php

class User{
    // Entity class - az adattábla minden oszlopa megjelenik egy tulajdonságként az osztályban itt.
    private $fullname;
    private $email;
    private $password;
    
    
    //konstruktor
    public function __construct($fullname, $email, $password) {
        $this->fullname = $fullname;
        $this->email = $email;
        $this->password = $password;
    }
    
    public function registration(){
        // Set up the resultbase connection
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "kutyatartokwebaruhaza";

        // Create a resultbase connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // Check the connection
        if (!$conn) {
            die("resultbase connection error: " . mysqli_connect_error());
        }
        
        // Hash the password
        $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

        // Prepare and execute the SQL query
        $sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("sss", $this->fullname, $$this->email, $hashedPassword);

            if ($stmt->execute()) {
                // Successful registration
                $result = array(
                    'msg' => 'Sikeres regisztráció!'
                );
            } else {
                // Error occurred during execution
                $result = array(
                    'msg' => 'Hiba történt a regisztráció közben!'
                );
            }

            $stmt->close();
        } else {
            // Error in preparing the SQL query
            $result = array(
                'msg' => 'Hiba történt a regisztráció közben!'
            );
        }
        return $result;
    }   
}