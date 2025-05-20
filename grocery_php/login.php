<?php
include 'db.php';
$msg = "";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $res = $conn->query("SELECT * FROM Consumer WHERE username='$username'");
    if ($row = $res->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            $_SESSION['username'] = $username;
            header("Location: home.php");
            exit;
        } else {
            $msg = "Invalid password!";
        }
    } else {
        $msg = "User not found!";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login - Grocery Shop</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Login</h2>
    <?php if($msg) echo "<div class='alert alert-danger'>$msg</div>"; ?>
    <form method="post" class="col-md-4">
        <input class="form-control mb-2" name="username" placeholder="Username" required>
        <input class="form-control mb-2" type="password" name="password" placeholder="Password" required>
        <button class="btn btn-info" type="submit">Login</button>
    </form>
    <a href="register.php" class="btn btn-link mt-3">Register</a>
    <a href="home.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
