const local = require('./localStrategy');
const dotenv = require('dotenv');
dotenv.config();

const { USERNAMEFIELD, PASSWORDFIELD } = process.env;
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((email, done) => {
        User.findOne({
            where : { USERNAMEFIELD : email }
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport, USERNAMEFIELD, PASSWORDFIELD);
}