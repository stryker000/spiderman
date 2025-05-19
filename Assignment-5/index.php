<?php $pageTitle = "Welcome"; include 'includes/header.php'; ?>

<div class="jumbotron text-center">
  <h1 class="display-6">Welcome to the Campus Book Store!</h1>
  <p class="lead">Find your next read at student-friendly prices.</p>
</div>

<h3 class="mt-5 mb-3">Featured Books</h3>
<?php
require 'includes/db.php';
$featured = $pdo->query("SELECT * FROM books ORDER BY RAND() LIMIT 3");
echo '<div class="row">';
foreach ($featured as $book): ?>
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img src="images/<?= htmlspecialchars($book['cover_img']) ?>"
           class="card-img-top" alt="Cover">
      <div class="card-body">
        <h5 class="card-title"><?= htmlspecialchars($book['title']) ?></h5>
        <p class="card-text text-muted"><?= htmlspecialchars($book['author']) ?></p>
        <p class="card-text fw-bold">$<?= number_format($book['price'],2) ?></p>
        <a href="catalogue.php" class="btn btn-primary">See More</a>
      </div>
    </div>
  </div>
<?php endforeach;
echo '</div>';
?>

<?php include 'includes/footer.php'; ?>
