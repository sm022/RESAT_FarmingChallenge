const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const sideNav = document.querySelector('.side-nav');
const closeIcon = document.querySelector('.close-icon');
const navLinksList = document.querySelectorAll('.side-nav ul li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    sideNav.classList.toggle('active');
});

closeIcon.addEventListener('click', () => {
    navLinks.classList.remove('open');
    sideNav.classList.remove('active');
});

navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        sideNav.classList.remove('active');
    });
});
