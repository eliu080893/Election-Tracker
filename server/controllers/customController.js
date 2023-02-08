// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const customController = {};

const Vote = require('../models/electionModels.js');

customController.getCustomMap = async (req, res, next) => {

    let incoming = req.query.name

    try {
        let result = await Vote.findOne( {name: incoming})
        res.locals.result = result;
        return next();
    }
    catch(err) {
        return next({
            log:'Error in customController.getCustomMap. Cannot load your map info from mongo DB database',
            message: {err: err}
        })
    }
}

module.exports = customController;
