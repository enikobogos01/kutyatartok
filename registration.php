<?php
// Set up the database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kutyatartokwebaruhaza";

// Create a database connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check the connection
if (!$conn) {
    die("Database connection error: " . mysqli_connect_error());
}

// Process and save the data from the registration form into the database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check if there is already a registered user with the given email address
    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $checkEmailQuery);

    if (mysqli_num_rows($result) > 0) {
        // If there is already a user registered with this email address
        $data = array(
            'msg' => 'Ez a felhasználó már létezik!'
        );
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and execute the SQL query
        $sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

            if ($stmt->execute()) {
                // Successful registration
                $data = array(
                    'msg' => 'Sikeres regisztráció!'
                );
            } else {
                // Error occurred during execution
                $data = array(
                    'msg' => 'Hiba történt a regisztráció közben!'
                );
            }

            $stmt->close();
        } else {
            // Error in preparing the SQL query
            $data = array(
                'msg' => 'Hiba történt a regisztráció közben!'
            );
        }
    }
    echo json_encode($data);
} else {
    // Incorrect registration data
    $data = array(
        'msg' => 'Incorrect registration form filling.'
    );
    echo json_encode($data);
}

// Close the database connection
$conn->close();
?>