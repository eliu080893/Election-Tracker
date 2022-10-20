// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const voteController = {}

const Vote = require('../models/electionModels.js');

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
    // console.log(Object.keys(stateObject));

    //delete the raw data so it is not sent over in the response back to the client.
    delete res.locals.rawData;

    return next();
};

// The post custom map function should post a custom map with a file name, and state object. Both are required.
voteController.postMap = async (req, res, next) => {

    let incomingData = req.body;
    console.log(req.body.name);

    try {
        let dbResponse = await Vote.create(incomingData)
        res.locals.postResponse = dbResponse;
        res.locals.name = req.body.name;
        return next()
    }
    catch(err) {
        return next({
            log:'Error in voteController.postVotes. Cannot create your map into mongo DB database',
            message: {err: err}
        })
    }
}

// The delete custom map function should check to see if the inputted map name exists. If it does, delete it. If it doesn't respond with an error.
voteController.deleteMap = async (req, res, next) => {

    let incomingData = req.body.name;
    console.log('Deleting map name: ', incomingData)

    try {
        let exist = await Vote.find({name: incomingData});
        if (exist.length === 0) {
            return next({
                log: 'Error: the file you are trying to delete does not exist',
                message: 'Please input an existing file name.'
            })
        }

        let response = await Vote.findOneAndDelete({name: incomingData});
        res.locals.deleteResponse = response;
        res.locals.name = incomingData;
        return next()
    }
    catch(err) {
        return next({
            log:'Error in voteController.postVotes. Cannot create your map into mongo DB database',
            message: {err: err}
        })
    }

}

module.exports = voteController;
