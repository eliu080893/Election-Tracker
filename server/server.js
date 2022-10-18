const express = require('express');
const app = express();
const path = require('path');

app.use('/build', express.static(path.join(__dirname,'../dist')));

app.get('/', (req,res) => {
    return res.status(200).sendFile(path.join(__dirname,'../src/index.html'))
})


app.listen(3000)