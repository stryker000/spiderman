$(document).ready(function() {
    // Highlight active pill in console
    $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function(e) {
      console.log('Activated tab:', $(e.target).text());
    });
  });
  