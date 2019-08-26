const usersUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const btn = document.querySelector('button');



//Fetches data and parses the json object
async function getEmployees(url) {
    const employeeResponse = await fetch(url);
    const employeeJSON = await employeeResponse.json();
    return Promise.all(employeeJSON.results);
}
  
// Dynamically Renders Employee cards using the json object retrieved from api request
function createEmployeeCard(data) {
    data.map(person =>{ 
        const cardDiv = document.createElement('div');
        const imgContainer = document.createElement('div');
        const infoContainer = document.createElement('div');
        gallery.appendChild(cardDiv);
        cardDiv.appendChild(imgContainer);
        cardDiv.appendChild(infoContainer);
        cardDiv.classList.add('card');
        imgContainer.classList.add("card-img-container");
        infoContainer.classList.add("card-info-container");

        imgContainer.innerHTML = `<img class="card-img" src=${person.picture.large} alt="profile picture">`;
        
        infoContainer.innerHTML = `
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last} </h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            
            `;
            console.log(data)
  })
  return data;
  
}
//Closes the selected modal
function closeModal() {
  $('#modal-close-btn').click(() => {
    $('.modal-container').slideUp(() => {
      $('.modal-container').remove();
    });
  });
}
//Formats the date for birthday
function dateFormatter(date) {
    const retrievedDate = new Date(date);
    const formatedDate = `${retrievedDate.getMonth() +1}/${retrievedDate.getDate()}/${retrievedDate.getFullYear()}`;
    return formatedDate;
  }
  
//Creates the modal when a specific employee is selected
function viewEmployee(data) {
  const employeeCards = document.querySelectorAll('.card');
  for(let i = 0; i < data.length; i++){
    employeeCards[i].addEventListener('click', () => {
        console.log("click")
      $('body').append(
        `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-text">${data[i].email}</p>
                    <p class="modal-text cap">${data[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${data[i].cell}</p>
                    <p class="modal-text cap">${data[i].location.street}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${dateFormatter(data[i].dob.date)}</p>
                </div>
            </div>
        `
      );
      closeModal();
      });
  }
  return data;
}
//Passes promises down on to helper functions
     getEmployees(usersUrl)
      .then(createEmployeeCard)
      .then(viewEmployee)
      .catch(err => {
      gallery.innerHTML = `${err}`
      console.log(err);
      })
      



