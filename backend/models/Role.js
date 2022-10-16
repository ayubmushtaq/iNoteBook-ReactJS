const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    roleDescription: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('role', RoleSchema);