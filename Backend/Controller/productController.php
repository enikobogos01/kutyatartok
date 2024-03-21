<?php

require_once '../Model/productModel.php';
require_once '../Config/database.php';

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

            $products = $this->productModel->getProducts($sortOption, $categoryFilter, $minPrice, $maxPrice);

            header('Content-Type: application/json');

            echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }
    public function getProductCount() {
        try {
            $count = $this->productModel->getProductCount();
            header('Content-Type: application/json');
            echo json_encode(['productCount' => $count]);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }

    public function getProductsForSwiper($sortBy, $limit) {
        try {
            $products = $this->productModel->getProducts($sortBy, 'all', null, null, $limit);

            if ($sortBy === 'upload_date') {
                usort($products, function($a, $b) {
                    return strtotime($b['upload_date']) - strtotime($a['upload_date']);
                });
            }

            elseif ($sortBy === 'quantity') {
                usort($products, function($a, $b) {
                    return $a['quantity'] - $b['quantity'];
                });
            }

            header('Content-Type: application/json');

            echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }
    public function uploadProduct() {
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $price = $_POST['price'];
            $description = $_POST['description'];
            $quantity = $_POST['quantity'];
            $category = $_POST['category'];
            
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $imagePath = '../../imgs/productPhotos/' . $_FILES['image']['name'];
                move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
            } else {
                $imagePath = '';
            }

            $result = $this->productModel->addProduct($name, $price, $description, $quantity, $imagePath, $category);

            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Termék sikeresen feltöltve!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'A termék feltöltése sikertelen.']);
            }
        } else {
            throw new Exception("Csak POST metódus engedélyezett a termék feltöltéséhez.");
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
    }     
}
$database = new Database();
$productController = new ProductController($database);

if (isset($_GET['action']) && $_GET['action'] == 'getProductCount') {
    $productController->getProductCount();
} elseif (isset($_GET['action']) && $_GET['action'] == 'uploadProduct') {
    $productController->uploadProduct();
} elseif (isset($_GET['swiper']) && $_GET['swiper'] == 'swiper1') {
    $productController->getProductsForSwiper('upload_date', 8); 
} elseif (isset($_GET['swiper']) && $_GET['swiper'] == 'swiper2') {
    $productController->getProductsForSwiper('quantity', 8); 
} else {
    $productController->getAllProducts();
}