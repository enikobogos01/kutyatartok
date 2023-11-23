<?php
    // Adatbázis kapcsolat beállítása
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "kutyatartokwebaruhaza";

    // Adatbázis kapcsolat létrehozása
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Ellenőrizzük a kapcsolatot
    if (!$conn) {
        die("Adatbázis kapcsolódási hiba: " . mysqli_connect_error());
    }

    // A regisztrációs űrlap adatainak feldolgozása és adatbázisba mentése
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $fullname = $_POST["fullname"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        // Ellenőrizzük, hogy az adott email címmel már van-e regisztrált felhasználó
        $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $checkEmailQuery);

        if (mysqli_num_rows($result) > 0) {
            // Ha már van ilyen email címmel regisztrált felhasználó
            echo "Ez a felhasználó már létezik.";
        } else {
            // Jelszó hashelése
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // SQL lekérdezés előkészítése és végrehajtása
            $sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

                if ($stmt->execute()) {
                    // Sikeres regisztráció
                    print "success:Sikeres regisztráció!";
                } else {
                    // Hiba történt a végrehajtás során
                    print "error:Hiba történt a regisztráció során.";
                }

                $stmt->close();
            } else {
                // Hiba az SQL előkészítése során
                print "error:Hiba történt a regisztráció során.";
            }
        }
    }

    // Adatbázis kapcsolat bezárása
    $conn->close();
?>
