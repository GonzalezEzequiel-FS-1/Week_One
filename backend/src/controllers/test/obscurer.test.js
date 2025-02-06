const obscurer = require('../obscurer');

// Creating the first group of tests
describe("Test Obfuscation", () => {
    // Test case for valid input
    it('Should contain the obfuscated string and be correctly formatted', () => {
        const number = "1232123432123432";
        const req = {
            body: {
                sentNumber: number
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining("•••• - •••• - •••• - "),
        }));

        const message = res.json.mock.calls[0][0].message;
        const responseSuccess = res.json.mock.calls[0][0].success;

        expect(message).toHaveLength(25);
        expect(responseSuccess).not.toBe(false);
        expect(req.body.sentNumber).toBe(number);
    });

    // Test case for missing number in request body
    it('Should return error when no number is provided', () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "No Number received"
        });
    });

    // Test case for number with less than 9 digits
    it('Should return error when number length is less than 9 digits', () => {
        const req = {
            body: {
                sentNumber: "12345"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Number should be between 12 and 16 digits"
        });
    });

    // Test case for number with more than 16 digits
    it('Should return error when number length is greater than 16 digits', () => {
        const req = {
            body: {
                sentNumber: "12345678901234567890"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Number should be between 12 and 16 digits"
        });
    });

    // Test case for number with exactly 12 digits
    it('Should return obfuscated string for 12-digit number', () => {
        const req = {
            body: {
                sentNumber: "123456789012"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining("•••• - •••• - •••• - "),
        }));
    });

    // Test case for number with exactly 16 digits
    it('Should return obfuscated string for 16-digit number', () => {
        const req = {
            body: {
                sentNumber: "1234567890123456"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining("•••• - •••• - •••• - "),
        }));
    });

    // Test case for undefined number in request body
    it('Should return error when sentNumber is undefined', () => {
        const req = {
            body: {
                sentNumber: undefined
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "No Number received"
        });
    });


    // Test case for exactly 9 digits (invalid length)
    it('Should return error when number has less than 9 digits', () => {
        const req = {
            body: {
                sentNumber: "1234567"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        obscurer(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Number should be between 12 and 16 digits"
        });
    });
});
