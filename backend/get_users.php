<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include 'db.php';

// Ambil data dari tabel users
$query = "SELECT name, age FROM users"; // Pastikan kolom 'name' dan 'age' ada di tabel 'users'
$result = $conn->query($query);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Kirimkan respons sebagai JSON
echo json_encode($users);
?>
