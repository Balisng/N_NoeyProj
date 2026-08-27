<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['message']) || empty(trim($data['name'])) || empty(trim($data['message']))) {
    echo json_encode(["status" => "error", "message" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit();
}

$name = $conn->real_escape_string(trim($data['name']));
$message = $conn->real_escape_string(trim($data['message']));

$sql = "INSERT INTO messages (name, message) VALUES ('$name', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "status" => "success",
        "message" => "บันทึกข้อความลงฐานข้อมูลสำเร็จ"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Error: " . $conn->error
    ]);
}

$conn->close();
?>