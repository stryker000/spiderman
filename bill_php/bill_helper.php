<?php
function calculate_bill($units) {
    $unit_cost_first = 3.50;
    $unit_cost_second = 4.00;
    $unit_cost_third = 5.20;
    $unit_cost_fourth = 6.50;
    if($units <= 50) {
        $bill = $units * $unit_cost_first;
    } else if($units <= 150) {
        $bill = (50 * $unit_cost_first) + (($units - 50) * $unit_cost_second);
    } else if($units <= 250) {
        $bill = (50 * $unit_cost_first) + (100 * $unit_cost_second) + (($units - 150) * $unit_cost_third);
    } else {
        $bill = (50 * $unit_cost_first) + (100 * $unit_cost_second) + (100 * $unit_cost_third) + (($units - 250) * $unit_cost_fourth);
    }
    return number_format((float)$bill, 2, '.', '');
}
?>
