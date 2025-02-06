const crypto = require('crypto')
console.log(`AES Key: ${crypto.randomBytes(32).toString('hex')}`);
console.log(`IV: ${crypto.randomBytes(16).toString('hex')}`);
