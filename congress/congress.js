import {senators} from '../data/senators.js'

console.log(senators)

function simplifiedSenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? `${senator.middle_name}` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            imgURL: `https://www.govtrack.us/static/legislater-photos/${senator.govtrack_id}-100px.jpeg`,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct
        }
    })
}

function populateSenatorDiv(simpleSenators) {
    // simpleSenators.forEach..
    // create figure and image and figcaption elements
    //set the image src to the senator's imgURL
    // append them to the DOM
}