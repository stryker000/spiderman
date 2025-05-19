<?php
$pageTitle = "Catalogue";
include 'includes/header.php';
require 'includes/db.php';

// Retrieve all books
$stmt = $pdo->query("SELECT * FROM books");
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h3 class="mb-3">All Books</h3>

<!-- Search bar -->
<div class="input-group mb-4">
  <span class="input-group-text">Search</span>
  <input id="searchBox" class="form-control"
         placeholder="Title or Author">
</div>

<div id="bookList" class="row">
<?php foreach($books as $b): ?>
  <div class="col-md-4 book-item mb-4">
    <div class="card h-100">
      <img src="images/<?= htmlspecialchars($b['cover_img']) ?>"
           class="card-img-top" alt="Cover">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title"><?= htmlspecialchars($b['title']) ?></h5>
        <p class="card-text text-muted"><?= htmlspecialchars($b['author']) ?></p>
        <p class="card-text fw-bold mt-auto">$<?= number_format($b['price'],2) ?></p>
        <button class="btn btn-outline-success w-100">Add to Cart</button>
      </div>
    </div>
  </div>
<?php endforeach; ?>
</div>

<script src="/js/search.js"></script>
<?php include 'includes/footer.php'; ?>
