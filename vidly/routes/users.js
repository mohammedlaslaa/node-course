const { User, validateUser } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require('lodash');

mongoose.set("useFindAndModify", false);

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    try {
        await user.save();
        _.pick(user, ['name', 'email']);
        res.send(_.pick(user, ['_id', 'name', 'email']))
    } catch (err) {
    console.log(err.message)
}
})

module.exports = router;
