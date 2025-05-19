<?php
/* ------------------------------------------------------------------
 *  Global header – pulls Bootstrap, opens <body>, renders nav-bar.
 *  The nav adapts depending on whether the visitor is logged in.
 * ------------------------------------------------------------------ */

// Start (or resume) the PHP session once, safely.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/*  $pageTitle can be set from individual pages:
 *      $pageTitle = "Catalogue";
 *      include 'includes/header.php';
 *   If not set, we fall back to a generic title.
 */
if (!isset($pageTitle)) {
    $pageTitle = "Online Book Store";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?= htmlspecialchars($pageTitle) ?></title>

    <!-- Bootstrap 5 CSS (CDN) -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet">

    <!-- Custom tweaks -->
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

<!-- =======  Navigation bar  ======= -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <!-- Brand -->
    <a class="navbar-brand" href="index.php">BookStore</a>

    <!-- Burger icon for mobile -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#mainNav"
            aria-controls="mainNav" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Links -->
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ms-auto">

        <!-- Visible to everyone -->
        <li class="nav-item">
          <a class="nav-link" href="catalogue.php">Catalogue</a>
        </li>

        <?php if (empty($_SESSION['user'])): ?>
            <!-- Guest links -->
            <li class="nav-item">
              <a class="nav-link" href="login.php">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="register.php">Register</a>
            </li>

        <?php else: ?>
            <!-- Authenticated user links -->
            <li class="nav-item">
              <span class="navbar-text me-3 text-warning">
                Hi, <?= htmlspecialchars($_SESSION['user']) ?>
              </span>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="logout.php">Logout</a>
            </li>
        <?php endif; ?>

      </ul>
    </div>
  </div>
</nav>

<!-- Page content container starts -->
<div class="container mt-4">
