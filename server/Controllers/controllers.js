

module.exports = {


    getUserInfo: (req, res, next) => {
        let newId = req.session.user.auth_id;
        const db = req.app.get('db');
        const newUserId = newId.toString()
        // console.log(newUserId)
        
        db.get_User_Info([ newUserId ]).then(dbResult => {

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
        const {id} = req.params
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

        db.edit_UserInfo([ first_name, last_name, gender, hair_color, eye_color, hobby, birthday_day, birthday_month, birthday_year, id]).then( user => {
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
        const {id} = req.body
        
        console.log(req.body)

        db.get_All_Users([id]).then(user => {
            res.status(200).send(user);
        }).catch(err => console.log(err))
    }


}