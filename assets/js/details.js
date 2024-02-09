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
let detailsLeft = document.querySelector('.details-left')
let detailsDesc = document.querySelector('.description')
let overview = document.querySelector('.overview')
let id = new URLSearchParams(window.location.search).get('id')
fetch(`http://localhost:3000/jobs/${id}`)
    .then(Response => Response.json())
    .then(data => {
        detailsLeft.innerHTML += `
        <div class="card">
        <div class="job-image"><img src="${data.jobImage}" alt=""></div>
        <div class="details-box-text">
        <div class="details-text-h2">${data.job}</div>
        <div class="details-description">
        <p>by <a href="#">${data.name}</a> in ${data.category}</a></p>
        </div>
        <div class="details-job-type">
        <p>${data['job-type']}</p>
        <p> ${data.category}</p>
        <p>${data.salary}</p>
        <p>${data.city}</p>
        </div>
        </div>
    `
        detailsDesc.innerHTML += `
        <p>${data.description}</p>
`
        overview.innerHTML += `
        <ul class="overview-card">
        <li><i class="fa-solid fa-location-dot"></i>Location: ${data.city}</li>
        <li><i class="fa-solid fa-money-bill"></i>Offered Salary: ${data.salary}</li>
        <li><i class="fa-solid fa-user-tie"></i>Experience: ${data.experience}</li>
        <li><i class="fa-solid fa-person-half-dress"></i>Gender: ${data.gender}</li>
        <li></li>
        </ul>
       
`
    })