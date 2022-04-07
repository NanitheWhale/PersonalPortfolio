import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const allCongressMembers = [...senators, ...representatives]// modern way to combine arrays.. like a genius

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
    populateDOM(people)
})

header.appendChild(allCharsButton)

const senatorDiv = document.querySelector('.senatorsDiv')
const seniorityHeading = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltyList')

function simplifiedSenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct
        }
    })
}

const simpleSenators = simplifiedSenators()

function populateSenatorDiv(senatorArray) {
    senatorArray.forEach(senator => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figCaption')
    

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
})
}



populateSenatorDiv(simpleSenators)

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? acc : senator  
})

seniorityHeading.textContent = `The most senior member of the senate is ${mostSeniorMember.name} and the biggest vacationers are ${biggestVacationerList}`

simplifiedSenators().forEach(senator => {
    if(senator.loyaltyPct === 100) {
        let listItem = document.createElement('li')
        listItem.textContent = senator.name
        loyaltyList.appendChild(listItem)
    }
})

// Todo some sort of UI for sorting by party affiliation by party and gender with a count 
// TODO much better styling of grid of senators and their names. 
// Maybe include more data with each congress member such as links to their twitter or facebook
// incorporate a way to select the members of the house of representatives

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

console.log(biggestMissedVotesPct.missedVotesPct)

const biggestVacationerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join(' and ')

console.log(biggestVacationerList)
