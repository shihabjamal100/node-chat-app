const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it ('should generate the correct message object', () => {
        var from = 'Shihab';
        var text = 'New Message';
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it ('should generate the correct location message', () => {
        var from = 'Shihab';
        var lattitude = '-33.9995833';
        var longitude = '150.8638391';
        var locationMessage = generateLocationMessage(from, lattitude, longitude);

        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${lattitude},${longitude}`);
        expect(locationMessage.createdAt).toBeA('number');
    });
});