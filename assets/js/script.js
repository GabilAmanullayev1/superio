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
let sec4Container = document.querySelector('.sec4-container');
let activeCategory = "all"; // default category
let itemsPerPage = 12;
let currentPage = 1;

function showJobs(category, page) {
    sec4Container.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredData = arr.filter(element => {
        const elementCategory = element.category.toLowerCase();
        return category === "all" || elementCategory.includes(category.toLowerCase());
    });

    const displayedData = filteredData.slice(startIndex, endIndex);

    displayedData.forEach(element => {
        sec4Container.innerHTML += `
            <div class="sec4-box">
                <div class="sec4-image"><img src="${element.jobImage}" alt="Image"></div>
                <div class="sec4-favorites"><i class="fa-regular fa-heart"></i></div>
                <div class="sec4-box-text">
                    <div class="sec4-text-a"><a href="#">${element.job}</a></div>
                    <div class="sec4-text-p">
                        <div class="sec4-text-p1"><i class="fa-solid fa-briefcase"></i>
                        ${element.category}</div>
                        <div class="sec4-text-p2"><i class="fa-solid fa-location-dot"></i>
                        ${element.city}</div>
                        <div class="sec4-text-p3"><i class="fa-solid fa-money-bill"></i>
                        ${element.salary}</div>
                    </div>
                    <div class="sec4-job-type"><a href="#">Full Time</a></div>
                </div>
            </div>
        `;
    });
}

function handlePaginationClick(event) {
    event.preventDefault();

    const clickedCategory = event.currentTarget.getAttribute("data-category");

    document.querySelector('.sec4-pagination .active').classList.remove('active');
    event.currentTarget.classList.add('active');

    showJobs(clickedCategory, 1); // Reset to the first page when category changes
    currentPage = 1;

    activeCategory = clickedCategory;
}

document.querySelectorAll('.sec4-pagination div').forEach(paginationItem => {
    paginationItem.addEventListener('click', handlePaginationClick);
});

function getDataJson() {
    fetch(`http://localhost:3000/jobs`)
        .then(response => response.json())
        .then(data => {
            arr = data;
            showJobs(activeCategory, currentPage);
        });
}
getDataJson();
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    let mySwiper = new Swiper('.sec5', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000, // 10 seconds delay between slides
            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
        },
    });
});
