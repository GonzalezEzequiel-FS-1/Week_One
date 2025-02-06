const { encrypt, decrypt } = require('../utils/cryptoUtil')

const obscurer = (req, res) => {
    const number = req.body.sentNumber;

    if (!number) {
        console.log("Number not received");
        return res.status(400).json({
            success: false,
            message: "No Number received"
        });
    }

    if (number.length > 16 || number.length < 9) {
        return res.status(400).json({
            success: false,
            message: "Number should be between 9 and 16 digits"
        });
    }

    try {
        // Thought about encrypting it and returning the value obscured and encrypted, but feels overkill...
        const encryptedNumber = encrypt(number);
        // Also I could use a regex to obfuscate and format the string
        let replacedNumber = number.replace(/^\d{12}/, '•'.repeat(12));

        // So far the simplest approach seems to be a straight up slice.
        let splicedApproach = `•••• - •••• - •••• - ${number.slice(12)}`

        // Return obfuscated data as string
        return res.status(200).json({
            success: true,
            message: `${splicedApproach}`
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};




module.exports = obscurer;
