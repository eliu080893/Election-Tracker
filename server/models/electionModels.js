const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://eliu080893:soloprojectpassword@cluster0.mqbhyrs.mongodb.net/?retryWrites=true&w=majority';

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
    name: {type: String, required: true, unique: true},
    state: {type: {}, required: true}
});

const Vote = mongoose.model('vote', voteSchema)

module.exports = Vote 