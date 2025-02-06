// Import dotenv and configure it
const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.IV, "hex");

// Encrypt function
const encrypt = (text) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');  // Encoding as utf8 and outputting as hex
    encrypted += cipher.final('hex');
    return encrypted;
};

// Decrypt function
const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');  // Encrypted text in hex, decrypted to utf8
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encrypt,
    decrypt
};
