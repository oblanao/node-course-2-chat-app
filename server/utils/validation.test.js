const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString validation', () => {
    it('should reject non-string values', () => {
        const testVar = 1234;
        expect(isRealString(testVar)).toBe(false);
    });
    it('should reject strings with only spaces', () => {
        const testVar = '    ';
        expect(isRealString(testVar)).toBe(false);
    });
    it('should allow strings with non-space chars', () => {
        const testVar = '    lotr';
        expect(isRealString(testVar)).toBe(true);
    });
})