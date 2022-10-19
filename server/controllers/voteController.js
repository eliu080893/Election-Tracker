// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const voteController = {}

let dataURL = "https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/national-map-page/national/president.json"


// Reach out to API to get the votes as an object. 
voteController.getVotes = (req, res, next) => {

    fetch(dataURL)
        .then((data) => data.json())
        .then( (data) => {
            res.locals.rawData = data
            // console.log(data)
            return next();
        })
        .catch( (err) => {
            return next( {
                log: 'Error in voteController.getVotes, could not GET votes from API.',
                message: {err: err}
            })
        })
};

// Organize the raw data into what is needed for the display. Save the necessary info into an object to res.locals.
voteController.organizeVotes = (req, res, next) => {

    
    let rawData = res.locals.rawData;
    let stateData = rawData.data.races;
    
    // Loop through each object (there are 51, one for each state_)
    let stateObject = {}
    stateData.forEach( (element) => {
        const {
            votes,
            state_id,
            state_name,
            electoral_votes,
            candidates
        } = element;

        // Declare additional variables to pass as info for each state
        let state_winner;
        let state_winner_party;

        // Each state has an array of up to 8 candidates (each candidate is an object)
        let candidateObj = {};
        candidates.forEach( (person) => {
            candidateObj[person.name_display] = {
                winner: person.winner,
                party_id: person.party_id,
                votes: person.votes,
                electoral_votes: person.electoral_votes
            }
            if (person.winner) {
                state_winner = person.name_display;
                state_winner_party = person.party_id;
            }
        })


        // Take all the relevant data, and store this as the response pockage
        let relevantData = {
            votes,
            state_name,
            electoral_votes,
            winner: state_winner,
            winner_party: state_winner_party,
            candidates: candidateObj
        };

        stateObject[state_id] = relevantData;
    })
    
    res.locals.data = stateObject;
    console.log(Object.keys(stateObject));

    //delete the raw data so it is not sent over in the response back to the client.
    delete res.locals.rawData;

    return next();
};

module.exports = voteController;
