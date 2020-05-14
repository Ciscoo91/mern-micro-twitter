const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myUser = new Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 20
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: (v) => {
                /[a-zA-Z0-9._%-][a-zA-Z-_%]+@[a-zA-Z0-9._%-]+[a-zA-Z]+\.[a-zA-Z]{2,4}/.test(v)
            },
            message: "This is not a valid email"
        }
    },
    avatar_url: {
        type: String,
        default: ""
    },
    follow: [String]
}, {
    collection: "Member",
    usePushEach: true
});

const Member = mongoose.model("Member", myUser);

module.exports = Member;
