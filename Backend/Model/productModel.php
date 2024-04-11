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
    public function addProduct($name, $price, $description, $quantity, $imagePath, $category) {
        $sql = "INSERT INTO products (name, price, description, quantity, image_path, category, upload_date) VALUES (?, ?, ?, ?, ?, ?, NOW())";
        
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Adatbázis hiba: nem lehet előkészíteni a lekérdezést.");
        }
         
        $stmt->bind_param("sdsiss", $name, $price, $description, $quantity, $imagePath, $category);

        $result = $stmt->execute();
        
        if ($result) {
            $stmt->close();
            return true;
        } else {
            $stmt->close();
            return false;
        }
    }   
    public function searchProductByName($name) {
        $sql = "SELECT * FROM products WHERE name = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }    
    
    public function updateProduct($id, $name, $price, $description, $quantity, $category) {
        $sql = "UPDATE products SET name = ?, price = ?, description = ?, quantity = ?, category = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sdsissi", $name, $price, $description, $quantity, $category, $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }
    
    public function deleteProduct($id) {
        $sql = "DELETE FROM products WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }          
}