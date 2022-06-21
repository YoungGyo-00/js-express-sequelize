// Encapsulates all business logic
const { User } = require("../models");

class TestService {
    static test = async (dto) => {
        try {
            console.log(dto);
            const result = await User.create({
                email: "test2",
                password: "test2"
            });
            return {"message" : "Answer: Good"};
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }
}

module.exports = TestService;