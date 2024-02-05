<?php

require_once '../Model/productModel.php';

class ProductController {
    private $productModel;

    public function __construct($database) {
        $this->productModel = new ProductModel($database);
    }

    public function getAllProducts() {
        try {
            $sortOption = isset($_GET['sort']) ? $_GET['sort'] : 'default';
            $categoryFilter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
            $minPrice = isset($_GET['minPrice']) ? $_GET['minPrice'] : null;
            $maxPrice = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : null;

            // Get products from the model
            $products = $this->productModel->getProducts($sortOption, $categoryFilter, $minPrice, $maxPrice);

            // Set the response header to indicate JSON content
            header('Content-Type: application/json');

            // Output the JSON string
            echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit(); // Add this line to prevent any further output
        } catch (Exception $e) {
            // Handle exceptions
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }

    public function getProductsForSwiper($sortBy, $limit) {
        try {
            // Get products from the model based on sortBy and limit
            $products = $this->productModel->getProducts($sortBy, 'all', null, null, $limit);

            // Sort products based on upload date for swiper1
            if ($sortBy === 'upload_date') {
                usort($products, function($a, $b) {
                    return strtotime($b['upload_date']) - strtotime($a['upload_date']);
                });
            }

            // Sort products based on quantity for swiper2
            elseif ($sortBy === 'quantity') {
                usort($products, function($a, $b) {
                    return $a['quantity'] - $b['quantity'];
                });
            }

            // Set the response header to indicate JSON content
            header('Content-Type: application/json');

            // Output the JSON string
            echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit(); // Add this line to prevent any further output
        } catch (Exception $e) {
            // Handle exceptions
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }
}

// Instantiate classes and execute the method
$database = new Database();
$productController = new ProductController($database);

// Determine which swiper to load
if (isset($_GET['swiper']) && $_GET['swiper'] == 'swiper1') {
    $productController->getProductsForSwiper('upload_date', 8); // Latest products
} elseif (isset($_GET['swiper']) && $_GET['swiper'] == 'swiper2') {
    $productController->getProductsForSwiper('quantity', 8); // Most popular products
} else {
    // Default behavior, get all products
    $productController->getAllProducts();
}
?>