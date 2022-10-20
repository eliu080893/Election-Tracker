const express = require('express');
const router = express.Router();
const path = require('path');

const customController = require(path.join(__dirname,'../controllers/customController.js'));

router.get('/',
    customController.getCustomMap,
    (req, res) => res.status(200).json(res.locals.result)
)


module.exports = router;