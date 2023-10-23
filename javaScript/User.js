class User {

    constructor(name, password) {
        this._name = name;
        this._password = password;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    isValid(user) {
        if (user.name === this._name && user.password == this._password) {
            return true;
        }       
        return false;
    }
}