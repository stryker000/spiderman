<?php
$pageTitle = "Login";
include 'includes/header.php';
require 'includes/db.php';
session_start();

$msg = "";
if (isset($_GET['registered'])) $msg = "Registration successful — please log in.";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = trim($_POST['email']);
  $pass  = $_POST['password'];

  $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
  $stmt->execute([$email]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user && password_verify($pass, $user['password'])) {
      $_SESSION['user'] = $user['name'];
      header("Location: catalogue.php");
      exit;
  } else {
      $msg = "Invalid credentials.";
  }
}
?>

<h3>Login</h3>
<?php if($msg): ?>
  <div class="alert alert-info"><?= $msg ?></div>
<?php endif; ?>

<form method="post" class="needs-validation" novalidate>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input name="email" type="email" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Password</label>
    <input name="password" type="password" class="form-control" required>
  </div>
  <button class="btn btn-primary">Login</button>
</form>

<?php include 'includes/footer.php'; ?>
