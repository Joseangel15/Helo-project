require('dotenv').config()
const bodyParser = require('body-parser');
const massive = require('massive');
const express = require('express');
// const controller = require('./Controllers');
const session = require('express-session');
const axios = require('axios');
const app = express();

app.use( express.static( `${__dirname}/build`))

const {

    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    SESSION_SECRET,
    ADD_PROTOCOL,
    SERVER_PORT,
    CONNECTION_STRING

} = process.env;

app.use(session ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive( CONNECTION_STRING ).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database Connected')
}).catch(err => console.log(err));

app.use(bodyParser.json())

app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.ADD_PROTOCOL}://${req.headers.host}/auth/callback`
    };

    let responseWithToken = await axios.post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, payload);

    let userData = await axios.get(`https://${process.env.REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access.token}`);

    const db = req.app.get('db');
    let {sub, name, picture, rank} = userData.data;
    let userExists = await db.find_user([sub]);
    if (userExists[0]) {
        req.session.user = userExists[0];
        res.redirect(`${process.env.FRONTEND_DOMAIN}/#/Home`)
    }else {
        db.createUser([sub, name, picture]).then( createUser => {
            req.session.user = createUser[0];
            res.redirect(`${process.env.FRONTEND_DOMAIN}/#/Home`)
        })
    }
});

app.get('/api/user/user-data', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    }else {
        res.status(401).send('Nice try sucka')
    }
})

app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#/`)
})


//Endpoints
















app.listen(SERVER_PORT, () => { console.log(`It's fun to stay in port ${SERVER_PORT}!`);});