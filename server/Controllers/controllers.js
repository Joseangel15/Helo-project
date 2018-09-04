

module.exports = {


    getUserInfo: (req, res, next) => {
        let newId = req.session.user.auth_id;
        const db = req.app.get('db');
        const newUserId = newId.toString()
        console.log(newUserId)
        
        db.get_User_Info([ newUserId ]).then(dbResult => {

            res.status(200).send(dbResult);
            
        }).catch(err => console.log(err))
    },

    getUserPic: (req, res, next) => {
        console.log(req.session.user.auth_id)
        const id = req.session.user.auth_id;
        const db = req.app.get('db');

        db.get_User_Pic([id]).then(dbResult => {
            res.status(200).send(dbResult);
        }).catch(err => console.log(err))
    }


}