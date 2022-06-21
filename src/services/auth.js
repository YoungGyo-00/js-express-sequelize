const bcrypt = require('bcrypt');

const { User } = require("../models");

class AuthService {
    static signup = async (dto) => {
        try { 
            const { email, password } = dto;
            const exId = await User.findOne({
                where : { email }
            });
            
            if (exId) {
                console.error('아이디 중복 오류');
                throw new Error('이미 회원인 상태입니다');
            };

            const hash = await bcrypt.hash(password, 10); // 2^12번 행싱 라운드(salt round - 2번째 인자) => Cost

            const result = await User.create({
                email: email,
                password: hash
            });
            
            return { "message" : "회원가입 성공" };
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports.AuthService = AuthService;