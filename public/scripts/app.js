// Hamburger menu
const hamburger = document.querySelector('nav > button');
const mobileMenu = document.querySelector('nav ul:nth-of-type(1)');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Progressive Enhancement: winkelwagen toevoegen zonder pagina-reload
const cartForm = document.querySelector('form[action="/winkelwagen/toevoegen"]');

if (cartForm) {
  cartForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = cartForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Toevoegen...';

    try {
      const res = await fetch(cartForm.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(cartForm)),
        headers: { Accept: 'application/json' }
      });

      const data = await res.json();

      if (data.success) {
        btn.textContent = 'Toegevoegd ✓';

        // Badge bijwerken in de navigatie
        const cartLink = document.querySelector('.btn-winkelwagen');
        if (cartLink) {
          let badge = cartLink.querySelector('.badge');
          if (badge) {
            badge.textContent = data.aantal;
          } else {
            badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = data.aantal;
            cartLink.appendChild(badge);
          }
        }

        setTimeout(() => {
          btn.textContent = 'Voeg toe aan winkelwagen';
          btn.disabled = false;
        }, 2000);
      }
    } catch {
      btn.textContent = 'Voeg toe aan winkelwagen';
      btn.disabled = false;
    }
  });
}
