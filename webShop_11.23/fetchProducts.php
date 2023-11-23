<?php
    // Establish a connection to your database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "kutyatartokwebaruhaza";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch products from the database
    $sql = "SELECT * FROM products ORDER BY RAND()";
    $result = $conn->query($sql);

    // Store the products in a PHP array
    $products = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    // Close the database connection
    $conn->close();

    // Set the response header to indicate JSON content
    header('Content-Type: application/json');

    // Output the JSON string
    echo json_encode($products);
    exit(); // Add this line to prevent any further output
?>