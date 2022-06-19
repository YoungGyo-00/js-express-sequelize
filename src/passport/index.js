const local = require('./localStrategy');
const dotenv = require('dotenv');
dotenv.config();

const { User } = require('../models');
const { USERNAMEFIELD, PASSWORDFIELD } = process.env;

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