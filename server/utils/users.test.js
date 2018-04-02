const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '154',
            name: 'box',
            room: 'the office fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        
    });
    
    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser('1');
        expect(removedUser).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var removedUser = users.removeUser('5');
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var user = users.getUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });
    it('should not find user', () => {
        var user = users.getUser('qtr');
        expect(user).toNotExist();
    });
})