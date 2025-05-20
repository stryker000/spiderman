<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>View Results</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Student Results</h2>
    <form method="get" class="mb-3">
        <input class="form-control mb-2" name="roll_no" placeholder="Enter Roll No" required>
        <button class="btn btn-primary">View Result</button>
    </form>
    <?php
    if (isset($_GET['roll_no'])) {
        $roll_no = $_GET['roll_no'];
        $stu = $conn->query("SELECT * FROM Students WHERE roll_no='$roll_no'")->fetch_assoc();
        if ($stu) {
            echo "<h4>{$stu['name']} ({$stu['roll_no']}) - Semester {$stu['semester']}</h4>";
            echo "<table class='table table-bordered'><tr><th>Subject</th><th>MSE</th><th>ESE</th><th>Total</th></tr>";
            $subjects = ["Maths", "Physics", "Chemistry", "English"];
            $total = 0;
            foreach ($subjects as $sub) {
                $mse = $conn->query("SELECT marks FROM MSE WHERE student_id={$stu['id']} AND subject='$sub'")->fetch_assoc()['marks'] ?? 0;
                $ese = $conn->query("SELECT marks FROM ESE WHERE student_id={$stu['id']} AND subject='$sub'")->fetch_assoc()['marks'] ?? 0;
                $sub_total = $mse * 0.3 + $ese * 0.7;
                $total += $sub_total;
                echo "<tr><td>$sub</td><td>$mse</td><td>$ese</td><td>".round($sub_total,2)."</td></tr>";
            }
            $percent = $total / (count($subjects) * 100) * 100;
            echo "<tr><th colspan='3'>Total</th><th>".round($total,2)."</th></tr>";
            echo "<tr><th colspan='3'>Percentage</th><th>".round($percent,2)."%</th></tr>";
            echo "</table>";
        } else {
            echo "<div class='alert alert-danger'>Student not found.</div>";
        }
    }
    ?>
    <a href="index.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
