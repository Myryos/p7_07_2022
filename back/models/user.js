const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required : true, min : 8},
    refreshToken : {type: String},
    role: {type: Number}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);