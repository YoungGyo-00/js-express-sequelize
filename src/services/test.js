// Encapsulates all business logic
const User = require("../models/user");

class TestService {
    // 인스턴스 만드는 공간

    constructor() {
        // Data Access layer 인스턴스 만드는 공간
        
    }

    test = async (dto) => {
        try {
            console.log(dto);
            const result = await User.create({
                email: "test",
                password: "test"
            });
            return {"message" : "Answer: Good"};
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }
}

module.exports = new TestService();