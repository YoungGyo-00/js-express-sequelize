// Encapsulates all business logic
const User = require("../models/user");

class TestService {
    static test = async (dto) => {
        try {
            console.log(dto);
            const result = await User.create({
                email: "test1",
                password: "test1"
            });
            return {"message" : "Answer: Good"};
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }
}

module.exports = TestService;