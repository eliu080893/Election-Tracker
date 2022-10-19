const express = require('express');
const router = express.Router();
const path = require('path');

const voteController = require(path.join(__dirname,'../controllers/voteController.js'));

router.get('/',
    voteController.getVotes,
    voteController.organizeVotes,
    (req, res) => res.status(200).json(res.locals.data)
)

router.post('/',
    voteController.postMap,
    (req, res) => res.status(200).json(`Successfully saved your custom map of name ${res.locals.name}`)
)

router.delete('/',
    voteController.deleteMap,
    (req, res) => res.status(200).json(`Successfully deleted your custom map of name ${res.locals.name}`)
)

module.exports = router;