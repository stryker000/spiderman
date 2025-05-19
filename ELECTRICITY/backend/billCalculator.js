// billCalculator.js
function calculateBill(units) {
    let amount = 0;
    if (units <= 50) {
        amount = units * 3.5;
    } else if (units <= 150) {
        amount = (50 * 3.5) + ((units - 50) * 4.0);
    } else if (units <= 250) {
        amount = (50 * 3.5) + (100 * 4.0) + ((units - 150) * 5.2);
    } else {
        amount = (50 * 3.5) + (100 * 4.0) + (100 * 5.2) + ((units - 250) * 6.5);
    }
    return amount;
}
module.exports = calculateBill;
