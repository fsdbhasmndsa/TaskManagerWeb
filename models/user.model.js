const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Email: String,
    Password: String,
    Fullname: String,
    Token: String,
    Deleted: {
        type: Boolean,
        default: false
    }

},
{
    timestamps:true
}



);

const User = mongoose.model("User",UserSchema, "Users")


module.exports = User