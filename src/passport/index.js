// 인증 전략을 등록, 데이터 저장 + 불러오는 기능
const local = require('./localStrategy'); // 로컬 서버로 로그인
const dotenv = require('dotenv');
dotenv.config();

const { User } = require('../models');
const { USERNAMEFIELD, PASSWORDFIELD } = process.env;

module.exports = (passport) => {
    // req.login(user, ...) 가 실행되면, serializeUser가 실행
    // 로그인 과정에서만 실행
    passport.serializeUser((user, done) => {
        done(null, user.id); // 로그인 성공 시, done(null, user) 함수의 두 번째 인자 user를 전달받아 세션에 저장
    });

    // 서버 요청이 올 때마다 항상 실행하여 로그인 유저 정보를 불러와 이용
    passport.deserializeUser((id, done) => {
        // req.session에 저장된 사용자 아이디를 바탕으로 DB 조회 후 req.user에 저장
        User.findOne({
            where : { USERNAMEFIELD : id }
        })
            .then(user => done(null, user)) // id 로 사용자 조회 후 전체 정보를 req.user에 저장
            .catch(err => done(err));
    });

    local(passport, USERNAMEFIELD, PASSWORDFIELD);
}