<?php
include 'db.php';
$msg = "";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $check = $conn->query("SELECT * FROM users WHERE username='$username'");
    if ($check && $check->num_rows > 0) {
        $msg = "Username already exists!";
    } else {
        $conn->query("CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )");
        $conn->query("INSERT INTO users (username, password) VALUES ('$username', '$password')");
        $msg = "Registration successful! <a href='login.php'>Login here</a>.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Register - Book Store</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Register</h2>
    <?php if($msg) echo "<div class='alert alert-info'>$msg</div>"; ?>
    <form method="post" class="col-md-4">
        <input class="form-control mb-2" name="username" placeholder="Username" required>
        <input class="form-control mb-2" type="password" name="password" placeholder="Password" required>
        <button class="btn btn-warning" type="submit">Register</button>
    </form>
    <a href="home.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
