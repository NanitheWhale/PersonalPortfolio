import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'


// make a link connecting the congress index.html and the representatives index.html and figure out how to make each profile clickable.


const allCongressMembers = [...senators, ...representatives]// modern way to combine arrays.. like a genius

const header = document.querySelector('header')
const main = document.querySelector('main')

const senatorDiv = document.querySelector('.senatorsDiv')
const repsDiv = document.querySelector('representativesDiv')
const seniorityHeading = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltyList')

const allSenatorsButton = document.createElement('button')
allSenatorsButton.textContent = 'All Senators'
allSenatorsButton.addEventListener('click', function () {
    populateDOM(people)
})

const allRepsButton = document.createElement('button')
allRepsButton.textContent = 'All Representatives'
allRepsButton.addEventListener('click', function () {
    populateDOM(people)
})

header.appendChild(allSenatorsButton)
header.appendChild(allRepsButton)

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

function simplifiedRepresentatives() {
    return representatives.map(representative => {
        const middleName = representative.middle_name ? ` ${representative.middle_name} ` : ` `
        return {
            id: representative.id,
            name: `${representative.first_name}${middleName}${representative.last_name}`,
            party: representative.party,
            gender: representative.gender,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${representative.govtrack_id}-200px.jpeg`,
            seniority: +representative.seniority,
            missedVotesPct: representative.missed_votes_pct,
            loyaltyPct: representative.votes_with_party_pct,

        }
    })
}
const simpleRepresentatives = simplifiedRepresentatives()

function populateRepDiv(representativesArray) {
    representativesArray.forEach((representative) => {
        const repFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figCaption')

        figImg.src = representative.imgURL
        figCaption.textContent = representative.name

        repFigure.appendChild(figImg)
        repFigure.appendChild(figCaption)
        repsDiv.appendChild(repFigure)
    })
}


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
populateRepDiv(simpleRepresentatives) 

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
