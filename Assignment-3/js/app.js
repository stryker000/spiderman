/* ───────────────────────────────────────────────
   jQuery helpers – live validation & reset UX
   ─────────────────────────────────────────────── */

   $(function () {
    const unitsInput = $('#units');
    const billForm   = $('#billForm');
  
    // Real-time validation feedback
    unitsInput.on('input', function () {
      this.classList.toggle('is-invalid', this.value <= 0);
    });
  
    // Prevent submitting invalid data client-side
    billForm.on('submit', function (e) {
      if (unitsInput.val() <= 0) {
        unitsInput.addClass('is-invalid');
        e.preventDefault();
      }
    });
  
    // Clear validation when pressing Reset
    $('#btnReset').on('click', () => {
      unitsInput.removeClass('is-invalid');
    });
  });
  