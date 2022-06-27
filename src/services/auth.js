// Encapsulates all business logic
const bcrypt = require("bcrypt");

const { User } = require("../models");

class AuthService {
    static signup = async dto => {
        const { email, password } = dto;
        const exId = await User.findOne({ where: { email } });

        if (exId) {
            console.error("\nAuthService signup exId 에러 발생");
            throw { status: 409, message: "아이디 중복 오류" };
        }

        const hash = await bcrypt.hash(password, 10); // 2^12번 행싱 라운드(salt round - 2번째 인자) => Cost
        // eslint-disable-next-line no-unused-vars
        const result = await User.create({
            email,
            password: hash,
        });

        return { message: "회원가입 성공" };
    };
}

module.exports = { AuthService };
