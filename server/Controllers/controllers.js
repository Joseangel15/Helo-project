

module.exports = {


    getUserInfo: (req, res, next) => {
        let newId = req.session.user.auth_id;
        const db = req.app.get('db');
        const newUserId = newId.toString()
        // console.log(newUserId)

        db.get_User_Info([newUserId]).then(dbResult => {

            res.status(200).send(dbResult);

        }).catch(err => console.log(err))
    },

    getUserPic: (req, res, next) => {
        // console.log(req.session.user.auth_id)
        const id = req.session.user.auth_id;
        const db = req.app.get('db');

        db.get_User_Pic([id]).then(dbResult => {
            res.status(200).send(dbResult);
        }).catch(err => console.log(err))
    },

    updateUserInfo: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.params

        const {

            first_name,
            last_name,
            gender,
            hair_color,
            eye_color,
            hobby,
            birthday_day,
            birthday_month,
            birthday_year

        } = req.body

        db.edit_UserInfo([first_name, last_name, gender, hair_color, eye_color, hobby, birthday_day, birthday_month, birthday_year, id]).then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send({
                errorMessage: 'userNotFound'
            })
            console.log(err)
        })

    },

    getAllUsers: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.body

        db.get_All_Users([req.session.user.id, id]).then(user => {
            res.status(200).send(user);
        }).catch(err => console.log(err))
    },


    get_Users: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.body

        db.get_All_Searched([id]).then(user => {
            db.get_All_Users([req.session.user.id, id]).then(notFriends => {

                for (var i = 0; i < user.length; i++) {
                    for (var j = 0; j < notFriends.length; j++) {
                        user[i].friendship = true;
                        if (user[i].id == notFriends[j].id) {
                            user[i].friendship = false;
                            break;
                        }
                    }
                }
                res.status(200).send(user);
            })

        }).catch(err => console.log(err))
    },

    addFriend: (req, res, next) => {
        const db = req.app.get('db');
        const {
            first_name,
            last_name,
            id
        } = req.body;

        db.add_Friend([req.session.user.id, first_name, last_name, id]).then(dbResult => {
            console.log(req.session)
            res.status(200).send(dbResult);
        }).catch(err => console.log(err))

    },

    findFriend: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.find_Friend([id]).then(dbResult => {
            res.status(200).send(dbResult);
        }).catch(err => console.log(err));

    },

    deleteFriend: (req, res, next) => {
        const db = req.app.get('db');
        const {

            first_name,
            last_name

        } = req.body

        db.remove_friend([first_name, last_name]).then(dbResult => {
            res.status(200).send(dbResult);
        }).catch(err => console.log(err));
    }



}