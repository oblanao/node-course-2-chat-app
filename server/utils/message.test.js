const expect = require('expect');

const {generateMessage} = require('./message');

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