const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string()
            .min(6)
            .max(50)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .max(255)
            .required(),
        password: Joi.string()
            .min(8)
            .max(255)
            .required(),
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
