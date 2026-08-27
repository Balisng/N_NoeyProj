<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit();
}

$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

$sql = "SELECT id, username, password FROM users WHERE username = '$username' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($password === $row['password']) {
        echo json_encode([
            "status" => "success",
            "message" => "เข้าสู่ระบบสำเร็จ",
            "user" => [
                "id" => $row['id'],
                "username" => $row['username']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "รหัสผ่านไม่ถูกต้อง"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ไม่พบชื่อผู้ใช้งานนี้"]);
}

$conn->close();
?>