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
let jobList = document.querySelector('.job-list');
let search = document.getElementById("banner-search");
let sort = document.getElementById("banner-select");
let copyArr = [];
let filteredArr = [];

function getDataJson() {
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
                        </div>   
                        <div class="product-button">
                            <button><a href="details.html?id=${element.id}">Details</a></button>
                        </div> 
                    </div>
                `;
            });
        });
}

getDataJson();

search.addEventListener("input", (e) => {
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((el) => {
        return el.job.toLowerCase().includes(e.target.value.toLowerCase());
    });
    getDataJson();
});


sort.addEventListener('change', (e) => {
    filteredArr = copyArr.slice(); // Create a copy of the original array

    // Apply search filter
    if (search.value.trim() !== "") {
        filteredArr = filteredArr.filter((el) => {
            return el.job.toLowerCase().includes(search.value.toLowerCase().trim());
        });
    }

    // Apply city filter
    if (e.target.value !== "City,state") {
        const selectedCity = e.target.value.toLowerCase();

        // Sort by selected city
        filteredArr = filteredArr.filter((el) => el.city.toLowerCase() === selectedCity);
    }

    // Update the job list with the filtered and sorted data
    getDataJson();
});