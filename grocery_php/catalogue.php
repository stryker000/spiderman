<?php
include 'db.php';
// Add sample items if table is empty
$check = $conn->query("SELECT COUNT(*) as cnt FROM Items")->fetch_assoc()['cnt'];
if ($check == 0) {
    $conn->query("INSERT INTO Items (item_name, price, description, image) VALUES
        ('Apples', 120, 'Fresh apples per kg', 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce'),
        ('Milk', 50, '1 litre packet', 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c'),
        ('Bread', 40, 'Whole wheat bread', 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c'),
        ('Rice', 80, 'Basmati rice per kg', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'),
        ('Eggs', 70, 'Dozen eggs', 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c')
    ");
}
$items = $conn->query("SELECT * FROM Items");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Catalogue - Grocery Shop</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Grocery Catalogue</h2>
    <div class="row">
        <?php while($item = $items->fetch_assoc()): ?>
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <?php if($item['image']): ?>
                    <img src="<?php echo $item['image']; ?>" class="card-img-top" style="height:200px;object-fit:cover;">
                <?php endif; ?>
                <div class="card-body">
                    <h5 class="card-title"><?php echo $item['item_name']; ?></h5>
                    <p class="card-text"><?php echo $item['description']; ?></p>
                    <p class="card-text"><b>Price:</b> ₹<?php echo $item['price']; ?></p>
                </div>
            </div>
        </div>
        <?php endwhile; ?>
    </div>
    <a href="home.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
