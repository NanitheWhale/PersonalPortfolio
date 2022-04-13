const getAPIData = async (url) => {
    try {
        const result = await fetch(url)
        return await result.json()
    } catch (error) {
        console.error(error)
    }
}

async function loadPokemon(offset = 0, limit = 25) {
    const pokeData = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`) 
    for ( const nameAndUrl of pokeData.results ) {
       const pokemon = await getAPIData(nameAndUrl.url)
       populatePokeCard(pokemon)
    }
}

const pokeGrid = document.querySelector('.pokeGrid')

function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))

    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
const pokeFront = document.createElement('figure')
pokeFront.className = 'cardFace front'
const pokeImg = document.createElement('img')
pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
const pokeCaption = document.createElement('figcaption')
pokeCaption.textContent = pokemon.name

pokeFront.appendChild(pokeImg)
pokeFront.appendChild(pokeCaption)
return pokeFront 
}

function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    const label = document.createElement('h4')
    label.textContent = 'Abilities'
    pokeBack.appendChild(label)
    return pokeBack
}

loadPokemon(100, 700)
