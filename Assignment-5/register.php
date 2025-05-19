<?php
$pageTitle = "Register";
include 'includes/header.php';
require 'includes/db.php';

// Handle POST
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name  = trim($_POST['name']  ?? '');
  $email = trim($_POST['email'] ?? '');
  $pass  = $_POST['password']   ?? '';

  // Server-side validation (in addition to JS)
  if (!$name)           $errors[] = "Name is required.";
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email required.";
  if (strlen($pass) < 6) $errors[] = "Password ≥ 6 chars.";

  // If no errors, insert
  if (!$errors) {
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
    try {
      $stmt->execute([$name,$email,$hash]);
      header("Location: login.php?registered=1");
      exit;
    } catch (PDOException $e) {
      $errors[] = "Email already registered.";
    }
  }
}
?>

<h3>Create Account</h3>
<?php foreach ($errors as $e): ?>
  <div class="alert alert-danger"><?= $e ?></div>
<?php endforeach; ?>

<form method="post" class="needs-validation" novalidate>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input name="name" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input name="email" type="email" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Password</label>
    <input name="password" type="password" class="form-control" minlength="6" required>
  </div>
  <button class="btn btn-success">Register</button>
</form>

<script src="/js/validation.js"></script>
<?php include 'includes/footer.php'; ?>
