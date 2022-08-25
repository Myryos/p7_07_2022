const mongoose = require('mongoose');

const PublicationSchema = mongoose.Schema({
    userId : {type: String, required : true},
    text: {type: String, required : true},
    urlImg: {type: String, required : true},
    likes:{type: Number, min: 0},
    dislikes:{type: Number, min:0},
    usersLiked:{type: Array},//<userId>
    usersDisliked:{type: Array}//<userId>
})


module.exports = mongoose.model('Publication', PublicationSchema)