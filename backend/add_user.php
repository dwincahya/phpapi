<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name']) && isset($data['age'])) {
    $name = $data['name'];
    $age = $data['age'];

    // Menyimpan data ke database
    $query = "INSERT INTO users (name, age) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $name, $age);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error']);
}

$conn->close();
?>
