import { removeChildren } from '../utils/index.js'

const getAPIData = async (url) => {
    try {
        const result = await fetch(url)
        return await result.json()
    } catch (error) {
        console.error(error)
    }
}

const loadedPokemon = []

async function loadPokemon(offset = 0, limit = 500) {
    const pokeData = await getAPIData(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
    for (const nameAndUrl of pokeData.results) {
        const pokemon = await getAPIData(nameAndUrl.url)
        const simplifiedPokemon = {
            id: pokemon.id,
            height: pokemon.height,
            weight: pokemon.weight,
            name: pokemon.name,
            types: pokemon.types,
            abilities: pokemon.abilities,
            moves: pokemon.moves.slice(0, ),
            hp: pokemon.stats[0].base_stat
        }
        loadedPokemon.push(simplifiedPokemon)
        populatePokeCard(simplifiedPokemon)
    }
}


class Pokemon {
    constructor(name, height, weight, abilities, types, moves) {
        ;(this.id = 9001),
            (this.name = name),
            (this.height = height),
            (this.weight = weight),
            (this.abilities = abilities),
            (this.types = types),
            (this.moves = moves)
    }
}

const header = document.querySelector('header')
const loadButton = document.createElement('button')
loadButton.textContent = 'Load Pokemon'
header.appendChild(loadButton)
loadButton.addEventListener('click', async () => {
    if (loadedPokemon.length === 0) {
    removeChildren(pokeGrid)
    await loadPokemon(0, 500)
    }
})

const newButton = document.createElement('button')
newButton.textContent = 'New Pokemon'

header.appendChild(newButton)
newButton.addEventListener('click', () => {
    const pokeName = prompt('What is the name of your new Pokemon?', 'Thoremon')
    const pokeHeight = prompt("What is the Pokemon's height?", 20)
    const pokeWeight = prompt("What is the Pokemon's weight", 1000)
    const pokeAbilities = prompt(
        "What are your Pokemon's abilities? (use a comman-separated list)"
        )
    const pokeTypes = prompt(
        "What are your Pokemon's types? (up to 2 types separated by a comma)"
        )
    const pokeMoves = prompt(
        "what are your pokemon's moves? (up to 2 moves separated by a comma)"
    )
        

    const newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        makeAbilitiesArray(pokeAbilities),
        makeTypesArray(pokeTypes),
        makeMovesArray(pokeMoves)
    )
    console.log(newPokemon)
    populatePokeCard(newPokemon)
})


function makeAbilitiesArray(commaString) {
    return commaString.split(',').map((abilityName) => {
        return {
            ability: { name: abilityName }
        }
    })
}

function makeTypesArray(commaString) {
    return commaString.split(',').map((typeName) => {
        return {
            type: { name: typeName }
        }
    })
}

function makeMovesArray(commaString) {
    return commaString.split(',').map((movesName) => {
        return {
            move: { name: movesName }
        }
    })
}

const pokeGrid = document.querySelector('.pokeGrid')

function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () =>
        pokeCard.classList.toggle('is-flipped'),
    )

    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'
    const pokeType1 = pokemon.types[0].type.name
    // console.log(pokeType1)
    // console.log(getPokeTypeColor(pokeType1))
    pokeFront.style.setProperty('background', getPokeTypeColor(pokeType1))
    const pokeImg = document.createElement('img')
    if (pokemon.id > 9000) {
        // load local image
        pokeImg.src = '../images/pokeball.png'
    } else {
        pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }
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
    const abilityList = document.createElement('ul')
    pokemon.abilities.forEach((abilityItem) => {
        const listItem = document.createElement('li')
        listItem.textContent = abilityItem.ability.name
        abilityList.appendChild(listItem)
        
    })
    pokeBack.appendChild(abilityList)

    const labelTypes = document.createElement('h4')
    labelTypes.textContent = 'Types'
    pokeBack.appendChild(labelTypes)
    const typesList = document.createElement('ul')
    pokemon.types.forEach((typesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = typesItem.type.name
    typesList.appendChild(listItem)
    })
    pokeBack.appendChild(typesList)

    const labelMoves = document.createElement('h4')
    labelMoves.textContent = 'Moves'
    pokeBack.appendChild(labelMoves)
    const movesList = document.createElement('ul')
    pokemon.moves.forEach((movesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = movesItem.move.name
    movesList.appendChild(listItem)
    })
    pokeBack.appendChild(movesList)
    return pokeBack
}


function getPokeTypeColor(pokeType) {
    let color
    //if(pokeType === "grass") color = '#00ff00'
    switch (pokeType) {
        case 'grass':
            color = '#309130'
            break
        case 'fire':
            color = '#FF6130'
            break
        case 'water':
            color = '#00E5FF'
            break
        case 'bug':
            color = '#00FF8D'
            break
        case 'normal':
            color = '#F5F5DC'
            break
        case 'dark':
            color = '#4b4469'
            break
        case 'steel':
            color = '#608fa6'
            break
        case 'flying':
            color = '#5183FF'
            break
        case 'poison':
            color = '#8941ff'
            break
        case 'electric':
            color = '#FFFF00'
            break
        case 'dragon':
            color = '#0000FF'
            break
        case 'ghost':
            color = '#b19bbd'
            break
        case 'ice':
            color = '#c3ffff'
            break
        case 'psychic':
            color = '#ff638f'
            break
        case 'fairy': 
            color = '#ffcbff'
            break
        case 'fighting':
            color = '#FF0000'
            break
        case 'rock':
            color = '#B3B3B3'
            break
        case 'ground':
            color = '#a86839'
            break

    }
    return color
}



function getPokemonByType(type) {
    return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}

// now figure out how to display this count in the UI
const typeSelector = document.querySelector('#type-select')
typeSelector.addEventListener('change', (event) => {
removeChildren(pokeGrid)
const usersTypeChoice = event.target.value.toLowerCase()
if(event.target.value === 'Show all Pokemon') {
    loadedPokemon.forEach((singleLoadedPokemon) => 
    populatePokeCard(singleLoadedPokemon),
    )
} else {
const pokemonByType = getPokemonByType(usersTypeChoice)
pokemonByType.forEach((eachSinglePokemon) => populatePokeCard(eachSinglePokemon))
}
}) 
