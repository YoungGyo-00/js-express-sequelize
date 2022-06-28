class UserDto {
    email;
    password;

    constructor(user) {
        this.email = user.email;
        this.password = user.password;
    }
}

module.exports.UserDto = UserDto;
