require('dotenv').config()
const bodyParser = require('body-parser');
const massive = require('massive');
const express = require('express');
const controller = require('./Controllers/controllers');
const session = require('express-session');
const mid = require('./middleware');
const axios = require('axios');
const app = express();

app.use( express.static( `${__dirname}/build`))

const {

    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    SESSION_SECRET,
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
app.use(mid.bypassAuthInDevelop)


app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };
    
    let responseWithToken = await axios.post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, payload);
    
    let userData = await axios.get(`https://${process.env.REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`);
    
    const db = req.app.get('db');
    let {sub, name, picture, given_name, family_name, gender} = userData.data;
    let userExists = await db.find_User([sub]);

    let user_robot = (`https://robohash.org/${Math.floor(Math.random() * 999)}`);

    if (userExists[0]) {
        req.session.user = userExists[0];
        res.redirect(`http://localhost:3000/#/dashboard`)
    }else {
        db.create_User([sub, name, picture, given_name, family_name, gender]).then( create_User => {
            req.session.user = create_User[0];
            db.create_User_Info([sub, given_name, family_name, gender, user_robot]).then( res => {
                
            });
        })
        res.redirect(`http://localhost:3000/#/dashboard`)
        
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
    res.redirect(`http://localhost:3000/#/`)
})


//Endpoints
let c = controller

app.get('/api/user', c.getUserInfo)

app.get('/api/userPic', c.getUserPic)

//Edit User Info

app.put('/api/updateUser/:id', c.updateUserInfo)

//Get all recommendations

app.post('/api/allUsers', c.getAllUsers)

//Get all user results to filter

app.post('/api/allRecommended', c.getFiltered)

//Get users for the Search View

app.post(`/api/allSearchedUsers`, c.get_Users)

//Get filtered users based on first and last name

app.post('/api/getByFirstName', c.getByFirstName)

app.post('/api/getByLastName', c.getByLastName)

//Add friend to the helofriends table

app.post('/api/addFriend', c.addFriend)

//Look for friends in the heloFriends table

app.get('/api/allFriends/:id', c.findFriend)

//Remove Friend

app.post('/api/deleteFriend', c.deleteFriend)


app.listen(SERVER_PORT, () => { console.log(`It's fun to stay in port ${SERVER_PORT}!`);});