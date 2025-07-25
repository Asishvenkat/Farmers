const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { 
            type: String, 
            required: true, 
            enum: ['farmer', 'retailer'],
            default: 'retailer'
        },
        isAdmin: { type: Boolean, default: false },
        img: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);