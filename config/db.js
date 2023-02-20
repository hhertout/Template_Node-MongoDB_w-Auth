const mongoose = require('mongoose')

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connected to mongoDB...'))
        .catch(err => console.log(`Connexion to mongoDB failed ! (err = ${err})`))
}