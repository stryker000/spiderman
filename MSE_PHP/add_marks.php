<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Marks</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-5">
    <h2>Add Marks</h2>
    <form method="post">
        <select class="form-control mb-2" name="student_id" required>
            <option value="">Select Student</option>
            <?php
            $res = $conn->query("SELECT id, name, roll_no FROM Students");
            while ($row = $res->fetch_assoc()) {
                echo "<option value='{$row['id']}'>{$row['name']} ({$row['roll_no']})</option>";
            }
            ?>
        </select>
        <?php
        $subjects = ["Maths", "Physics", "Chemistry", "English"];
        foreach ($subjects as $sub) {
            echo "<div class='mb-2'><b>$sub</b>
                <input class='form-control mb-1' name='mse_$sub' type='number' min='0' max='30' placeholder='MSE Marks (30)' required>
                <input class='form-control mb-1' name='ese_$sub' type='number' min='0' max='70' placeholder='ESE Marks (70)' required>
            </div>";
        }
        ?>
        <button class="btn btn-success" name="submit">Add Marks</button>
    </form>
    <?php
    if (isset($_POST['submit'])) {
        $student_id = $_POST['student_id'];
        foreach ($subjects as $sub) {
            $mse = $_POST["mse_$sub"];
            $ese = $_POST["ese_$sub"];
            // Insert MSE
            $conn->query("INSERT INTO MSE (student_id, subject, marks) VALUES ($student_id, '$sub', $mse)");
            // Insert ESE
            $conn->query("INSERT INTO ESE (student_id, subject, marks) VALUES ($student_id, '$sub', $ese)");
        }
        echo "<div class='alert alert-success mt-2'>Marks added!</div>";
    }
    ?>
    <a href="index.php" class="btn btn-link mt-3">Back to Home</a>
</body>
</html>
