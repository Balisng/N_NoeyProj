<?php
require_once 'db.php';

// เปลี่ยนเป็น ORDER BY id ASC เพื่อให้เรียงลำดับคงที่เสมอ
$sql = "SELECT * FROM products ORDER BY id ASC";
$result = $conn->query($sql);

$products = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode([
    "status" => "success",
    "data" => $products
]);

$conn->close();
?>