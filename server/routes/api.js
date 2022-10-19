const express = require('express');
const router = express.Router();
const path = require('path');

const voteController = require(path.join(__dirname,'../controllers/voteController.js'));

router.get('/',
    voteController.getVotes,
    voteController.organizeVotes,
    (req, res) => res.status(200).json(res.locals.data)
)

module.exports = router;