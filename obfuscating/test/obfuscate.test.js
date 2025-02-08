const obfuscator = require('../obsfuscate')

describe('Credit Card Checker', () => {
    test("Must contain 9 to 16 characters", () => {
        const input = ["1111111111111"]
        expect(input[0].length).toBeGreaterThanOrEqual(12)
        expect(input[0].length).toBeLessThanOrEqual(16)
    })
    test('Must be obfuscated', () => {
        const input = ["1234561312341516"]
        expect(obfuscator(input)).toContain("○○○○○○○○○○○○")
    })
    test('Obfuscates correctly a 12 digit number', () => {
        const input = ["123452341516"]
        expect(obfuscator(input)).toBe("○○○○○○○○1516")
    })

})
describe('Testing errors', () => {
    test("Only accepts numeric values", () => {
        expect(() => obfuscator(["abcdef123456"])).toThrow("Input must contain only numeric values");
    })
    test("Numbers with more than 16 characters are rejected", () => {
        expect(() => obfuscator(["12131415161718191"])).toThrow("Invalid Credit Card");
    })
    test("Numbers with less than 12 are rejected", () => {
        expect(() => obfuscator(["12131415161"])).toThrow("Invalid Credit Card");
    })
    test("Numbers with  12 should proceed with no errors", () => {
        expect(() => obfuscator(["121314151617"])).not.toThrow("Invalid Credit Card");
    })
})

describe('Unnecessarily complex test', () => {
    const creditCardNumber = ["123456789012"]
    const maskedPartLength = creditCardNumber[0].slice(4);
    const mockMask = "○".repeat(maskedPartLength);
    const lastFour = "1234";
    test('Result should be divided between mask and last four', () => {
        expect(() => obfuscator(creditCardNumber).toContain(mockMask))
        expect(() => obfuscator(creditCardNumber).toContain(lastFour))
    })
})