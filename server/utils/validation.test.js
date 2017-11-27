const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it ('should reject non-string value', () => {
        var number = 1234;
        expect(isRealString(number)).toBe(false);
    });

    it ('should reject strings with only space', () => {
        var str = '    ';
        expect(isRealString(str)).toBe(false);
    });

    it ('should allow strings with only non-space characters', () => {
        var str = '   LOTR  ';
        expect(isRealString(str)).toBe(true);
    });
});