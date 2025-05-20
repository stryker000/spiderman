<?php
include 'db.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $contact = $_POST['contact'];
    $conn->query("INSERT INTO Consumer (name, address, contact) VALUES ('$name', '$address', '$contact')");
    echo "<div class='alert alert-success'>Consumer added!</div>";
}
?>
<form method="post">
    <input name="name" class="form-control mb-2" placeholder="Name" required>
    <input name="address" class="form-control mb-2" placeholder="Address">
    <input name="contact" class="form-control mb-2" placeholder="Contact">
    <button class="btn btn-success">Add Consumer</button>
</form>
