// Encapsulates all business logic
const { User } = require("../models");

class TestService {
    static test = async (dto) => {
        try { 
            const result = await User.create({
                email: "test4",
                password: "test4"
            });
            return {"message" : "Answer: Good"};
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports.TestService = TestService;