<?php

require_once("../Config/database.php");

$data = json_decode(file_get_contents("php://input"));

$database = new Database();
$conn = $database->getConnection();

try {
    $stmt = $conn->prepare("INSERT INTO orders (status, total, user_id, payment_status, payment_method) VALUES (?, ?, ?, ?, ?)");

    $stmt->bind_param('sssss', $data->status, $data->total, $data->userId, $data->paymentStatus, $data->paymentMethod);

    $stmt->execute();

    echo json_encode(array("success" => true, "message" => "Data inserted successfully"));

} catch(PDOException $e) {
    echo json_encode(array("success" => false, "message" => $e->getMessage()));
}

?>