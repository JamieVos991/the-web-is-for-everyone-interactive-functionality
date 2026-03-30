const hamburger = document.querySelector('nav > button');
const mobileMenu = document.querySelector('nav ul:nth-of-type(1)');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});