const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
        {
            id: 1,
            name: 'Shihab',
            room: 'Room1'
        },
    
        {
            id: 2,
            name: 'Omy',
            room: 'Room2'
        },
    
        {
            id: 3,
            name: 'Fahim',
            room: 'Room1'
        }];
    });
    
    it ('it should add new user', () => {
        var myUsers = new Users();

        var user = {
            id: '123',
            name: 'Shihab',
            room: 'Room1'
        };

        var responseUser = myUsers.addUser(user.id, user.name, user.room);

        expect(myUsers.users).toEqual([user]);
    });

    it ('should remove a user', () => {
        var userId = 1;
        var removedUser = users.removeUser(userId);
        expect(removedUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it ('should not remove a user', () => {
        var userId = 99;
        var removedUser = users.removeUser(userId);
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it ('should find user', () => {
        var matchingUser = users.getUser(1);
        expect(matchingUser).toEqual(users.users[0]);
    });

    it ('should not find user', () => {
        var matchingUser = users.getUser(99);
        expect(matchingUser).toNotExist();
    });

    it ('should return names for Room1', () => {
        var userList = users.getUserList('Room1');

        expect(userList).toEqual(['Shihab', 'Fahim']);
    });

    it ('should return names for Room2', () => {
        var userList = users.getUserList('Room2');

        expect(userList).toEqual(['Omy']);
    });
});