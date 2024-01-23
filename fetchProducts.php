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

    $sortOption = isset($_GET['sort']) ? $_GET['sort'] : 'default';
    $categoryFilter = isset($_GET['filter']) ? $_GET['filter'] : 'all';

    // SQL query with placeholders for sort and category filter
    $sql = "SELECT * FROM products";

    // Add category filter
    if ($categoryFilter != 'all') {
        $sql .= " WHERE category = ?";
    }

    // Add price range filter
    if (isset($_GET['minPrice']) && isset($_GET['maxPrice'])) {
        if ($categoryFilter == 'all') {
            $sql .= " WHERE";
        } else {
            $sql .= " AND";
        }
        $sql .= " price BETWEEN ? AND ?";
    }

    // Add sorting
    switch ($sortOption) {
        case 'price-asc':
            $sql .= " ORDER BY price ASC";
            break;
        case 'price-desc':
            $sql .= " ORDER BY price DESC";
            break;
        case 'name-asc':
            $sql .= " ORDER BY name ASC";
            break;
        case 'name-desc':
            $sql .= " ORDER BY name DESC";
            break;
        default:
            // Default sorting or no sorting
            $sql .= " ORDER BY RAND()"; // Hozzáadva: Random sorrend
    }

    // Prepared statement for increased security
    $stmt = $conn->prepare($sql);

    // Bind the parameters if category or price filter is applied
    if ($categoryFilter != 'all') {
        $stmt->bind_param("s", $categoryFilter);
    }

    if (isset($_GET['minPrice']) && isset($_GET['maxPrice'])) {
        $stmt->bind_param("dd", $_GET['minPrice'], $_GET['maxPrice']);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    // Store the products in a PHP array
    $products = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    // Close the database connection
    $stmt->close();
    $conn->close();

    // Set the response header to indicate JSON content
    header('Content-Type: application/json');

    // Output the JSON string
    echo json_encode($products);
    exit(); // Add this line to prevent any further output
?>