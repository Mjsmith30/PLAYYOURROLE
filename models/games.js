var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var gameSchema = new Schema({
    title: String,
    description: String,
    image: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]



}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);