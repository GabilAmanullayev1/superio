let detailsLeft = document.querySelector('.details-left')
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
        </div>
        </div>
        
    `
    })