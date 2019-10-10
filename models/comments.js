var mongoose = require('mongoose');
var Schema = mongoose.Schema;

commentSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timestamps: true
});

module.exports = mongoose.model('Comments', commmentSchema);