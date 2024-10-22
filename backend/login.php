<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Mengizinkan permintaan dari frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

// Pastikan data tidak null sebelum mengaksesnya
if (isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    if ($username === 'admin' && $password === 'admin') {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
