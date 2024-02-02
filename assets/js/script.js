let navMenu = document.querySelector('.menu');
let popupClose = document.querySelector('.popup-close');
let menuContainer = document.querySelector('.menu-container');

function showMenuContainer() {
    menuContainer.style.display = 'flex';
    setTimeout(() => {
        menuContainer.querySelector('.menu-popup').classList.add('menu-open');
    }, 10); // Delay the class addition slightly for the transition to work smoothly
}

function hideMenuContainer() {
    menuContainer.querySelector('.menu-popup').classList.remove('menu-open');
    setTimeout(() => {
        menuContainer.style.display = 'none';
    }, 300); // Wait for the transition to complete before hiding the container
}

navMenu.addEventListener('click', showMenuContainer);
popupClose.addEventListener('click', hideMenuContainer);
