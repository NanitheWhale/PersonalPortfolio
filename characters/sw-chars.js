import {people} from '../data/people.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
    console.log('Thanks for clicking!',)
    populateDOM()
})

header.appendChild(allCharsButton)

function populateDOM() {
    // loop through all the characters and make figure elements and insert them into DOM
people.forEach((person) => { 
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')

    // Set the image's source property to a valid URL or path
let charNum = getLastNumber(person.url)

    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
     })
}

function getLastNumber(url) {
    // 'https://swapi.co/api/films/1/'
    const secondToLastLetter = url[url.length - 2]
    return secondToLastLetter // just the number that comes before the last forward slash
}