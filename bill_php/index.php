<?php
include 'db.php';
include 'bill_helper.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Electricity Bill Calculator</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body class="container mt-5">
    <h2>Electricity Bill Calculator</h2>
    <form method="post" id="billForm">
        <div class="mb-3">
            <label>Consumer</label>
            <select class="form-control" name="consumer_id" required>
                <option value="">Select Consumer</option>
                <?php
                $res = $conn->query("SELECT id, name FROM Consumer");
                while ($row = $res->fetch_assoc()) {
                    echo "<option value='{$row['id']}'>{$row['name']}</option>";
                }
                ?>
            </select>
        </div>
        <div class="mb-3">
            <label>Units Consumed</label>
            <input type="number" name="units" class="form-control" min="1" required>
        </div>
        <button class="btn btn-primary" name="submit">Calculate & Save Bill</button>
    </form>
    <div id="result" class="mt-3"></div>

    <script>
    $("#billForm").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            url: "api_billing.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                consumer_id: $("select[name=consumer_id]").val(),
                units: $("input[name=units]").val()
            }),
            success: function(res){
                $("#result").html(
                    `<div class='alert alert-success'>
                        Bill Amount for ${res.units} units: <b>₹${res.bill_amount}</b> <br>
                        Billing Date: ${res.billing_date}
                    </div>`
                );
            },
            error: function(){
                $("#result").html("<div class='alert alert-danger'>Error calculating bill.</div>");
            }
        });
    });
    </script>
</body>
</html>
