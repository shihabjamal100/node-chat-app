class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var userToRemove = this.getUser(id);

        if (userToRemove)
        {
            this.users = this.users.filter((user) => user.id != userToRemove.id);
        }

        return userToRemove;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        var filteredUsers = this.users.filter((user) => user.room === room);
        var namesArray = filteredUsers.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};


/* class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    getUserDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
}

var me = new Person('Shihab', 27);
var description = me.getUserDescription();
console.log(description); */