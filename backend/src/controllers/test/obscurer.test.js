const obscurer = require('../obscurer')
// Creating the first group of tests
describe("Test Obfuscation", ()=>{
    // Now im creating the mocked response, 
    // im simulating a post from the front end sending sentNumber on the body
    it('Should contain the obfuscated string and be correctly formatted',()=>{
        const number = "1232123432123432";
        const req = {
            body:{
                sentNumber:number
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        // Now we are  "playing" the server call
        obscurer(req, res);
        
        // And finally, the tests, first, we are expecting the response to contain the formatted bullets on it
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining("•••• - •••• - •••• - "),
        }));
        const message = res.json.mock.calls[0][0].message;
        const success = res.json.mock.calls[0][0].success
        //console.log(success)
        // We are testing the length of the message to ensure it is returning the whole thing
        // Remember that we need to count the empty spaces so the response should contain
        //25 characters including dashes and empty spaces, not 16 digits only.
        expect(message).toHaveLength(25);
        // Now, we are making sure that the success response, is true, or, "not false..."
        expect(success).not.toBe(false)

    });

});