const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true // Corrected from `require` to `required`
    },
    email: {
        type: String,
        required: true, // Corrected from `require` to `required`
        unique: true // Corrected spelling of `uniuqe` to `unique`
    },
    password: {
        type: String,
        required: true // Corrected from `require` to `required`
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
