<?php

require_once '../Config/database.php';

class ProductModel {
    private $conn;

    public function __construct($database) {
        $this->conn = $database->getConnection();
    }
    public function getProducts($sortOption, $categoryFilter, $minPrice, $maxPrice, $limit = null) {
        $sql = "SELECT * FROM products";
        $whereConditions = [];
        $params = [];
        $types = '';
        if ($categoryFilter != 'all') {
            $whereConditions[] = "category = ?";
            $params[] = $categoryFilter;
            $types .= 's';
        }
        if ($minPrice !== null && $maxPrice !== null) {
            $whereConditions[] = "price BETWEEN ? AND ?";
            $params[] = (float)$minPrice;
            $params[] = (float)$maxPrice;
            $types .= 'dd';
        }
        if (!empty($whereConditions)) {
            $sql .= " WHERE " . implode(" AND ", $whereConditions);
        }
        switch ($sortOption) {
            case 'price-asc': $sql .= " ORDER BY price ASC"; break;
            case 'price-desc': $sql .= " ORDER BY price DESC"; break;
            case 'name-asc': $sql .= " ORDER BY name ASC"; break;
            case 'name-desc': $sql .= " ORDER BY name DESC"; break;
            default: $sql .= " ORDER BY RAND()";
        }
        if ($limit !== null) {
            $sql .= " LIMIT ?";
            $params[] = (int)$limit;
            $types .= 'i';
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
    public function getProductCount() {
        $sql = "SELECT COUNT(*) as count FROM products";
        $result = $this->conn->query($sql);
        $row = $result->fetch_assoc();
        return $row['count'];
    }
}