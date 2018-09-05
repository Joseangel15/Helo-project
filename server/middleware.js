const imposter = {
    id: 6,
    auth_id: 'google-oauth2|118024452374268449576',
    user_name: 'Jose Angel Ortiz',
    user_pic: 'https://lh3.googleusercontent.com/-7-7miN-5qfM/AAAAAAAAAAI/AAAAAAAAAlE/J2yFOdFDrpU/photo.jpg',
    given_name: 'Jose Angel',
    family_name: 'Ortiz',
    gender: 'male'
}

module.exports = {
    bypassAuthInDevelop: (req, res, next) => {
        if(!req.session.user && process.env.NODE_ENV === 'development') {
            req.session.user = imposter
        }
        next()
    }
}