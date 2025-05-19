// Enable Bootstrap validation styling
(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', evt => {
        if (!form.checkValidity()) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();
  