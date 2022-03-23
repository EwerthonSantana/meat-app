"use strict";
exports.__esModule = true;
exports.users = exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "ewerthon@gmail.com": new User('ewerthon@gmail.com', 'Ewerthon', 'ewerthon123'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda123')
};
