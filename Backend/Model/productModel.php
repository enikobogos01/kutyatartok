<?php

require_once '../Config/database.php';

class ProductModel {
    private $conn;

    public function __construct($database) {
        $this->conn = $database->getConnection();
    }

    public function getProducts($sortOption, $categoryFilter, $minPrice, $maxPrice) {
        // SQL query with placeholders for sort and category filter
        $sql = "SELECT * FROM products";

        $where = "";

        // Add category filter
        if ($categoryFilter != 'all') {
            $where .= " WHERE category = ?";
        }

        // Add price range filter
        if ($minPrice !== null && $maxPrice !== null) {
            $where .= ($where == "") ? " WHERE" : " AND";
            $where .= " price BETWEEN ? AND ?";
        }

        $sql .= $where;

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
                $sql .= " ORDER BY RAND()";
        }
        
        // Prepared statement for increased security
        $stmt = $this->conn->prepare($sql);

        // Bind the parameters if category or price filter is applied
        if ($categoryFilter != 'all') {
            if (is_array($categoryFilter)) {
                $paramType = str_repeat('s', count($categoryFilter));
                $stmt->bind_param($paramType, ...$categoryFilter);
            } else {
                $stmt->bind_param('s', $categoryFilter);
            }
        }

        if ($minPrice !== null && $maxPrice !== null) {
            // Biztonsági ellenőrzés a numerikus értékek használata előtt
            if (is_numeric($minPrice) && is_numeric($maxPrice)) {
                $stmt->bind_param("dd", $minPrice, $maxPrice);
            } else {
                // Ha a megadott árak nem numerikus értékek, akkor kezelheted ezt a hibát
                // pl.: kiléphetsz a függvényből, logolhatsz, vagy hibát dobhatsz
                // példa: throw new InvalidArgumentException('Invalid price values');
            }
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
    
        $stmt->close();
    
        return $products;
    }
}
?>