<?php
include 'db.php';
$books = $conn->query("SELECT * FROM Books");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Catalogue - Book Store</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Book Catalogue</h2>
    <div class="row">
        <?php while($book = $books->fetch_assoc()): ?>
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <?php if($book['cover']): ?>
                    <img src="<?php echo $book['cover']; ?>" class="card-img-top" style="height:200px;object-fit:cover;">
                <?php endif; ?>
                <div class="card-body">
                    <h5 class="card-title"><?php echo $book['title']; ?></h5>
                    <h6 class="card-subtitle mb-2 text-muted"><?php echo $book['author']; ?></h6>
                    <p class="card-text"><?php echo $book['description']; ?></p>
                    <p class="card-text"><b>Price:</b> ₹<?php echo $book['price']; ?></p>
                </div>
            </div>
        </div>
        <?php endwhile; ?>
    </div>
    <a href="home.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
