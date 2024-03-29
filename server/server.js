const express = require('express');
const app = express();
const path = require('path');

// app.use('/build', express.static(path.join(__dirname,'../dist')));

// Import the required router files
const apiRouter = require(path.join(__dirname,'./routes/api.js'));
const customRouter = require(path.join(__dirname,'./routes/custom.js'));

// Allows for proper parsing of incoming JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// While running in production, this serves the compiled Webpack file
app.use(express.static(path.join(__dirname, '../dist/')));

// While in development, this should just serve the index.html entry point file
app.get('/', (req,res) => {
    return res.status(200).sendFile(path.join(__dirname,'../src/index.html'))
})

app.use('/api', apiRouter);

app.use('/custom', customRouter);

app.use( (req,res) => res.status(400).send('Unable to load page, as that pathfile does not exist.'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});



app.listen(3000, () => {
    console.log('Server listening on Port 3000')
})