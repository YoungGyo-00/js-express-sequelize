const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

module.exports = (usernameField, passwordField) => {
    passport.use(new LocalStrategy({ // 첫번째 인자는 객체
        usernameField : usernameField,
        passwordField : passwordField
    }, async (email, password, done) => { // 두번째 인자는 함수
        try {
            const exUser = await User.findOne({ // 로그인할 유저가 DB에 있는지 확인
                where : { usernameField : email } 
            });
           
            if (!exUser) {// 가입된 회원인지 확인
                return done(null, false, { message : '가입되지 않은 회원입니다' });
            }
           
            const result = await bcrypt.compare(password, exUser.passwordField);
            if (!result) { // 비밀번호가 맞는지 확인
                return done(null, false, { message : '비밀번호가 일치하지 않습니다' });
            }
            return done(null, exUser); // 로그인 성공
        } catch (err) {
            console.error(err.message);
            done(err);
        }
    }));
}