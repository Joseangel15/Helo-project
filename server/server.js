require('dotenv').config()
const bodyParser = require('body-parser');
const massive = require('massive');
const express = require('express');
// const controller = require('./Controllers');
const session = require('session');
const app = express();


const {

    SERVER_PORT,
    CONNECTION_STRING

} = process.env

app.use(bodyParser.json())

app.use( express.static( `${__dirname}/build`))


massive( CONNECTION_STRING ).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database Connected')
}).catch(err => console.log(err));


app.listen(SERVER_PORT, () => { console.log(`It's fun to stay in port ${SERVER_PORT}!`);});