const mongoose = require('mongoose')

const secretSchema  = new mongoose.Schema({
    message: String
})

const Secrets = mongoose.model('secrets', secretSchema);
module.exports = Secrets;