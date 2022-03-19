import { films } from '../data/films.js'


function getLastNumber(url) {
// 'https://swapi.co/api/films/1/'
const secondToLastLetter = url[url.length - 2]
return secondToLastLetter // just the number that comes before the last forward slash
}

// Third, use a variable to store a 'reference' to the main element with an id attribute of 'filmList'
let filmList = document.querySelector('#filmList')

for (let i = 0; i < films.length; i++) {
    console.log(films[i].url);

// First, create an img element
let figure = document.createElement('figure')
let figImage = document.createElement('img')
let figCaption = document.createElement('figcaption')

// Second, set the image's source property to a valid URL or path
let filmNum = getLastNumber(films[i].url)

figImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`

figCaption.textContent = films[i].title

// Fourth, append the newly created img element as a child of the main element to make it appear in the DOM
figure.appendChild(figImage)
figure.appendChild(figCaption)

filmList.appendChild(figure)
}