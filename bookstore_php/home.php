<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Online Book Store</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h1>Welcome to the Online Book Store</h1>
    <nav class="mb-3">
        <a href="home.php" class="btn btn-primary">Home</a>
        <a href="catalogue.php" class="btn btn-success">Catalogue</a>
        <?php if(isset($_SESSION['username'])): ?>
            <span class="mx-2">Hello, <?php echo $_SESSION['username']; ?></span>
            <a href="logout.php" class="btn btn-danger">Logout</a>
        <?php else: ?>
            <a href="login.php" class="btn btn-info">Login</a>
            <a href="register.php" class="btn btn-warning">Register</a>
        <?php endif; ?>
    </nav>
    <p>Browse and buy your favourite books online!</p>
</body>
</html>
