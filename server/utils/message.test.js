const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', () => {
    it('should generate the correct message object', () => {
        // store res in var
        messageObject = generateMessage('box', '28 ani')
        expect(messageObject).toInclude({
            from: 'box',
            text: '28 ani'
        });
        // assert createdAt is number
        expect(messageObject.createdAt).toBeA('number');
    })
})

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        var lat=lon=5;
        locationObject = generateLocationMessage('box', lat, lon);
        expect(locationObject).toInclude({
            from: 'box',
            url: `https://www.google.com/maps?q=${lat},${lon}`,
        });
        expect(messageObject.createdAt).toBeA('number');
    })
})