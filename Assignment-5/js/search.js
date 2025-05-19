const searchBox = document.getElementById('searchBox');
const items     = document.querySelectorAll('.book-item');

searchBox?.addEventListener('keyup', e => {
  const q = e.target.value.toLowerCase();
  items.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
});
