const userssUrl = 'http://api.open-notify.org/astros.json';
// const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const gallery = document.getElementById('gallery');
const btn = document.querySelector('button');

// function getJSON(url) {
//   return new Promise((resolve,reject)=>{
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.onload = () => {
//     if(xhr.status === 200) {
//       let data = JSON.parse(xhr.responseText);
//       resolve(data);
//     }else{
//       reject(Error(xhr.statusText))
//     }
//   };
//   xhr.onerror = () => reject(Error("A network error occured!"))
//   xhr.send();
//   });
// }

// function getProfiles(json) {
//   const profiles = json.people.map( person => {
//     return getJSON(wikiUrl + person.name, generateHTML);      
//   }); 
//   return profiles
// }

function generateHTML(data) {
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

    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  })
  
}

btn.addEventListener('click', (event) => {
  event.target.textContent ="Loading...";
  fetch(usersUrl)
    .then(getProfiles)
    .then(generateHTML)
    .catch(err => {
    peopleList.innerHTML = `${err}`
    console.log(err);
    })
    .finally(()=>event.target.remove())
  
});