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

let arr = [];
let page=1;
let sec4Container = document.querySelector('.sec4-container');
let activeCategory = "all"; // default category

function showJobs(category) {
    sec4Container.innerHTML = "";

    arr.forEach(element => {
        const elementCategory = element.category.toLowerCase();

        if (category === "all" || elementCategory.includes(category.toLowerCase())) {
            sec4Container.innerHTML += `
                <div class="sec4-box">
                    <img src="${element.jobImage}" alt="Image">
                </div>
                <div class="rec-box-p">${element.job}</div>
                <div class="rec-box-p">${element.name}</div>
                <div class="rec-box-p">${element.password}</div>
                <div class="rec-box-p">${element.gmail}</div>
                <div class="rec-box-p">${element.id}</div>
            `;
        }
    });
}

function handlePaginationClick(event) {
    event.preventDefault(); // Prevent the default behavior of the clickable element

    const clickedCategory = event.currentTarget.getAttribute("data-category");

    document.querySelector('.sec4-pagination .active').classList.remove('active');
    event.currentTarget.classList.add('active');

    showJobs(clickedCategory);

    activeCategory = clickedCategory;
}

document.querySelectorAll('.sec4-pagination div').forEach(paginationItem => {
    paginationItem.addEventListener('click', handlePaginationClick);
});

function getDataJson() {
    fetch(`http://localhost:3000/jobs?_page=${page}&_limit=12`)
        .then(response => response.json())
        .then(data => {
            arr = data;
            showJobs(activeCategory);
        });
}

getDataJson();
