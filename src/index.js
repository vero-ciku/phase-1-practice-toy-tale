let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

getAllToys()
createToy()


const toyCollection = document.querySelector("#toy-collection");

function getAllToys(){
fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(toyData => toyData.forEach(toy => renderToy(toy)))
}

function renderToy(toy) {
const card = document.createElement("div")
card.className = "card"
card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
`
toyCollection.appendChild(card)
card.querySelector(".like-btn").addEventListener("click", () => {
  toy.likes += 1;
  card.querySelector("p").innerText = toy.likes
  updateLikes(toy)
})
}

function createToy(){
document.querySelector(".add-toy-form").addEventListener("submit", (event) => {
  event.preventDefault()

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      name: event.target[0].value,
      image: event.target[1].value,
      likes : 0
    })
  })
  .then(resp => resp.json())
  .then(renderToy)
})
}

function updateLikes(toy) {
fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json",
    Accept : "application/json"
  },
  body: JSON.stringify(toy)
})
.then(resp => resp.json())
.then(toy => console.log(toy))
} 