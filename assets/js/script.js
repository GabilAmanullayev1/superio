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


function startCounting(targetId, endValue, duration, maxValue) {
    let startValue = 0;
    let currentTimestamp = new Date().getTime();
    let increment = endValue / duration;

    function updateCounter() {
        let newTimestamp = new Date().getTime();
        let deltaTime = newTimestamp - currentTimestamp;
        currentTimestamp = newTimestamp;

        startValue += increment * deltaTime;

        // Cap the value at the maximum
        startValue = Math.min(startValue, maxValue);

        // Format the number and update the element
        if (startValue >= 1000000) {
            document.getElementById(targetId).innerText = (startValue / 1000000).toFixed(1) + "M";
        } else if (startValue >= 1000) {
            document.getElementById(targetId).innerText = (startValue / 1000).toFixed(1) + "k";
        } else {
            document.getElementById(targetId).innerText = Math.floor(startValue);
        }

        if (startValue < endValue) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function onScroll() {
    const targetSection = document.getElementById("sec8");
    if (isElementInViewport(targetSection)) {
        startCounting("usersCount", 4000000, 3000, 20000000);
        startCounting("jobPositions", 12000, 3000, 20000);
        startCounting("storiesShared", 20000000, 3000, 20000000);
        window.removeEventListener("scroll", onScroll); // Remove the scroll event listener after starting the counting
    }
}

// Attach the scroll event listener
window.addEventListener("scroll", onScroll);

let jobList = document.querySelector('.job-list');
let search = document.getElementById("banner-search");
let sort = document.getElementById("banner-select");
const bannerSelect = document.getElementById("banner-select2");

let copyArr = [];
let filteredArr = [];

function getDataJson2() {
    fetch(`http://localhost:3000/jobs`)
        .then(response => response.json())
        .then(data => {
            copyArr = data;
            jobList.innerHTML = "";
            filteredArr = filteredArr.length || search.value ? filteredArr : data;
            filteredArr.forEach(element => {
                jobList.innerHTML += `
                    <div class="card">
                        <div class="product-image"><img src="${element.jobImage}" alt=""></div>
                        <div class="product-text">
                            <h4>${element.city}</h4>
                            <p>${element.category}</p>
                            <h5>${element.job}</h5>
                            <h5>${element.salary}</h5>
                        </div>   
                        <div class="product-button">
                            <button><a href="details.html?id=${element.id}">Details</a></button>
                        </div> 
                    </div>
                `;
            });
        });
}

getDataJson2();

search.addEventListener("input", (e) => {
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((el) => {
        return el.job.toLowerCase().includes(e.target.value.toLowerCase());
    });
    getDataJson2();
});


sort.addEventListener('change', (e) => {
    if (e.target.value === "des") {
        filteredArr.sort((a, b) => parseFloat(b.salary.replace(/[^\d.]/g, '')) - parseFloat(a.salary.replace(/[^\d.]/g, '')));
    } else if (e.target.value === "asc") {
        filteredArr.sort((a, b) => parseFloat(a.salary.replace(/[^\d.]/g, '')) - parseFloat(b.salary.replace(/[^\d.]/g, '')));
    } else {
        filteredArr = copyArr;
    }
    getDataJson2();
});
bannerSelect.addEventListener("change", (e) => {
    const selectedCity = e.target.value.toLowerCase();

    if (selectedCity === "all") {
        filteredArr = copyArr;
    } else {
        filteredArr = copyArr.filter((el) => el.city.toLowerCase() === selectedCity);
    }

    getDataJson2();
});
