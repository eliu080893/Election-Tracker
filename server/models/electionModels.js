const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO;

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'elections'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;
   
const voteSchema = new Schema({
    name: {type: String, required: true, unique: false},
    state: {type: {}, required: true}
});

const Vote = mongoose.model('vote', voteSchema)

module.exports = Vote 