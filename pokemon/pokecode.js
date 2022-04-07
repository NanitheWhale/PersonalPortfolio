const getAPIData = async (url) => {
    try {
        const result = await fetch(url)
        return await result.json()
    } catch (error) {
        console.error(error)
    }
}

async function loadPokemon() {
    const pokeData = await getAPIData(`https://pokeapi.co/api/v2/pokemon/snorlax`) 
populatePokeGrid(pokeData)
}


const pokeGrid = document.querySelector('.pokeGrid')

function populatePokeGrid(pokemonArray) {
    // loop through all the pokemon and create individual pokecards
    populatePokeCard(pokemonArray[0])
}

function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))

    pokeCard.appendChild(populateCardFront(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
const pokeFront = document.createElement('figure')
pokeFront.className = 'cardFace'
const pokeImg = document.createElement('img')
pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png`
const pokeCaption = document.createElement('figcaption')
pokeCaption.textContent = 'snorlax'

pokeFront.appendChild(pokeImg)
pokeFront.appendChild(pokeCaption)
return pokeFront 
}

function populateCardBack(pokemon) {

}

loadPokemon()
