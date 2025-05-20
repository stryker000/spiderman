<?php
header('Content-Type: application/json');
include 'db.php';
include 'bill_helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $consumer_id = $data['consumer_id'] ?? null;
    $units = $data['units'] ?? null;

    if (!$consumer_id || !$units) {
        echo json_encode(['error' => 'Missing consumer_id or units']);
        exit;
    }

    $bill_amount = calculate_bill($units);
    $billing_date = date('Y-m-d');

    $stmt = $conn->prepare("INSERT INTO Billing (consumer_id, units, bill_amount, billing_date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iids", $consumer_id, $units, $bill_amount, $billing_date);
    $stmt->execute();

    echo json_encode([
        'consumer_id' => $consumer_id,
        'units' => $units,
        'bill_amount' => $bill_amount,
        'billing_date' => $billing_date
    ]);
}
?>
