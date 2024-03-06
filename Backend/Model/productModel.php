<?php

require_once '../Config/database.php';

class ProductModel {
    private $conn;

    public function __construct($database) {
        $this->conn = $database->getConnection();
    }

    public function getProducts($sortOption, $categoryFilter, $minPrice, $maxPrice) {
        $sql = "SELECT * FROM products";
        $whereConditions = [];
        $params = [];
        $types = '';

        // Add category filter
        if ($categoryFilter != 'all') {
            $whereConditions[] = "category = ?";
            $params[] = $categoryFilter;
            $types .= 's'; // String típus, mivel a kategória szöveges érték
        }

        // Add price range filter
        if ($minPrice !== null && $maxPrice !== null) {
            $whereConditions[] = "price BETWEEN ? AND ?";
            $params[] = (float)$minPrice; // Konvertálás float-ra, ha szükséges
            $params[] = (float)$maxPrice; // Konvertálás float-ra, ha szükséges
            $types .= 'dd'; // Double típus, mivel az árak numerikus értékek
        }

        if (!empty($whereConditions)) {
            $sql .= " WHERE " . implode(" AND ", $whereConditions);
        }

        // Add sorting
        switch ($sortOption) {
            case 'price-asc': $sql .= " ORDER BY price ASC"; break;
            case 'price-desc': $sql .= " ORDER BY price DESC"; break;
            case 'name-asc': $sql .= " ORDER BY name ASC"; break;
            case 'name-desc': $sql .= " ORDER BY name DESC"; break;
            default: $sql .= " ORDER BY RAND()";
        }
        
        $stmt = $this->conn->prepare($sql);

        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }

        $stmt->close();
    
        return $products;
    }
}
?>
