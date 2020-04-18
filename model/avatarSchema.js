const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
    user_id: {
        type: Number,
    },

    name: {
        type: String
    }
}, {
    collection: "Avatar",
    usePushEach: true
});

const Avatar = mongoose.model('Avatar', AvatarSchema);

module.exports = Avatar;