let jobList = document.querySelector('.job-list');
let search = document.getElementById("joblist-search");
let sort = document.getElementById("joblist-select");
const bannerSelect = document.getElementById("banner-select2");

let originalArr = [];  // Store the original data
let copyArr = [];
let filteredArr = [];

function getDataJson2() {
    fetch(`http://localhost:3000/jobs`)
        .then(response => response.json())
        .then(data => {
            originalArr = data;  // Save the original data
            copyArr = data;
            applyFilterAndSort(); // Apply filtering and sorting after fetching data
            renderJobList();
        });
}

function applySort() {
    let sortOrder = sort.value || "def";
    if (sortOrder === "des") {
        filteredArr.sort((a, b) => parseFloat(b.salary.replace(/[^\d.]/g, '')) - parseFloat(a.salary.replace(/[^\d.]/g, '')));
    } else if (sortOrder === "asc") {
        filteredArr.sort((a, b) => parseFloat(a.salary.replace(/[^\d.]/g, '')) - parseFloat(b.salary.replace(/[^\d.]/g, '')));
    } else if (sortOrder === "def") {
        filteredArr.sort((a, b) => a.job.localeCompare(b.job));
    }
}

function applyFilterAndSort() {
    filteredArr = copyArr;

    // Apply search filter after trimming
    if (search.value) {
        const trimmedSearchValue = search.value.trim();
        filteredArr = filteredArr.filter(el => el.job.toLowerCase().includes(trimmedSearchValue.toLowerCase()));
    }

    // Apply sorting
    applySort();
}

function renderJobList() {
    jobList.innerHTML = "";
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
}

getDataJson2();

search.addEventListener("input", () => {
    applyFilterAndSort();
    renderJobList();
});

sort.addEventListener('change', () => {
    applySort();
    renderJobList();
});

let joblistSearchTerm = localStorage.getItem('joblistSearchTerm');
let selectedCity = localStorage.getItem('selectedCity');

if (joblistSearchTerm) {
    search.value = joblistSearchTerm;
}

localStorage.removeItem('joblistSearchTerm');
localStorage.removeItem('selectedCity');


getDataJson2();

window.addEventListener('beforeunload', function () {

    search.value = '';
});
// Add the following code to your existing JavaScript

// Add an event listener for the alpha-select dropdown
const alphaSelect = document.getElementById("alpha-select");
alphaSelect.addEventListener('change', () => {
    applyAlphaSort();
    renderJobList();
});

function applyAlphaSort() {
    const alphaSortOrder = alphaSelect.value;

    if (alphaSortOrder === "az") {
        filteredArr.sort((a, b) => a.job.localeCompare(b.job));
    } else if (alphaSortOrder === "za") {
        filteredArr.sort((a, b) => b.job.localeCompare(a.job));
    } else if (alphaSortOrder === "def") {
        filteredArr.sort((a, b) => a.id - b.id);
    }

    renderJobList();
}


function applySort() {
    let sortOrder = sort.value || "def";

    if (sortOrder === "des") {
        filteredArr.sort((a, b) => parseFloat(b.salary.replace(/[^\d.]/g, '')) - parseFloat(a.salary.replace(/[^\d.]/g, '')));
    } else if (sortOrder === "asc") {
        filteredArr.sort((a, b) => parseFloat(a.salary.replace(/[^\d.]/g, '')) - parseFloat(b.salary.replace(/[^\d.]/g, '')));
    } else if (sortOrder === "def") {
        filteredArr.sort((a, b) => a.id - b.id);
    }
}
function renderJobList() {
    jobList.innerHTML = "";
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
}

const joblistSelect = document.getElementById("joblist-select");
joblistSelect.addEventListener('change', () => {
    applySort();
    renderJobList();
});

const joblistSearch = document.getElementById("joblist-search");
joblistSearch.addEventListener("input", () => {
    applyFilterAndSort();
    renderJobList();
});

