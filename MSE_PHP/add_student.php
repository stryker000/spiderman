<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Student</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Add Student</h2>
    <form method="post">
        <input class="form-control mb-2" name="name" placeholder="Name" required>
        <input class="form-control mb-2" name="roll_no" placeholder="Roll No" required>
        <input class="form-control mb-2" name="semester" type="number" placeholder="Semester" required>
        <button class="btn btn-primary" name="submit">Add Student</button>
    </form>
    <?php
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $roll_no = $_POST['roll_no'];
        $semester = $_POST['semester'];
        $conn->query("INSERT INTO Students (name, roll_no, semester) VALUES ('$name', '$roll_no', $semester)");
        echo "<div class='alert alert-success mt-2'>Student added!</div>";
    }
    ?>
    <a href="index.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
