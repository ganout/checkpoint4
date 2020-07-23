/*MENU BURGER*/
const burger = document.querySelector('.burger');
const menu = document.querySelector('.summary');

burger.addEventListener('click', () => {
    burger.classList.toggle('deployed');
    menu.classList.toggle('open');
});

menu.addEventListener('click', () => {
    burger.classList.toggle('deployed');
    menu.classList.toggle('open');
});