<?php
/******************************************************
 *  Simple Electricity-Bill Calculator
 *  Author : <your-name>
 *  Date   : <yyyy-mm-dd>
 ******************************************************/

$units = $bill = $msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $units = floatval($_POST['units']);

    // ---------- PHP back-end calculation -------------
    function calc_bill($u) {
        if ($u <= 50)            return $u * 3.50;
        if ($u <= 150)           return 50 * 3.50 + ($u - 50) * 4.00;
        if ($u <= 250)           return 50 * 3.50 + 100 * 4.00 + ($u - 150) * 5.20;
        /* >250 */               return 50 * 3.50 + 100 * 4.00 + 100 * 5.20 + ($u - 250) * 6.50;
    }

    if ($units > 0) {
        $bill = number_format(calc_bill($units), 2);
        $msg  = "Total payable amount for <strong>$units kWh</strong> = <strong>₹ $bill</strong>";
    } else {
        $msg  = "<span class='text-danger'>Please enter a positive number.</span>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Electricity Bill Calculator</title>

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
    <!-- ============= HEADER ============== -->
    <header class="navbar navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">⚡ Electricity Bill Calc</span>
        </div>
    </header>

    <!-- ============= MAIN ================ -->
    <main class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">

                <!-- Card -->
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Enter consumed units (kWh)</h5>

                        <form id="billForm" method="POST" novalidate>
                            <div class="mb-3">
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  class="form-control"
                                  id="units"
                                  name="units"
                                  placeholder="e.g. 123.5"
                                  value="<?= htmlspecialchars($units) ?>"
                                  required
                                />
                                <div class="invalid-feedback">
                                    Please enter units greater than zero.
                                </div>
                            </div>

                            <div class="d-grid gap-2 d-md-flex">
                                <button type="submit" class="btn btn-primary">Calculate</button>
                                <button type="reset"  class="btn btn-outline-secondary" id="btnReset">Reset</button>
                            </div>
                        </form>

                        <?php if ($msg): ?>
                            <div id="result" class="alert alert-info mt-4">
                                <?= $msg ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div><!-- /card -->

                <!-- Tariff table -->
                <div class="table-responsive mt-4">
                    <table class="table table-bordered small text-center">
                        <thead class="table-light">
                            <tr><th colspan="2">Tariff Rates</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>0 – 50 units</td><td>₹ 3.50 / unit</td></tr>
                            <tr><td>51 – 150 units</td><td>₹ 4.00 / unit</td></tr>
                            <tr><td>151 – 250 units</td><td>₹ 5.20 / unit</td></tr>
                            <tr><td>251 units +</td><td>₹ 6.50 / unit</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <!-- Bootstrap & jQuery JS -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    ></script>
    <script src="js/app.js"></script>
</body>
</html>
