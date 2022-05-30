const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

module.exports = {
    hash: async (rawPassword) => {
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = scryptSync(rawPassword, salt, 64).toString('hex');
        const result = `${salt}:${hashedPassword}`
        return result
    },
    verifyHash: async (password,hashedPassword) => {
        const [salt, key] = hashedPassword.split(':');
        const hashedBuffer = scryptSync(password, salt, 64);
  
        const keyBuffer = Buffer.from(key, 'hex');
        const match = timingSafeEqual(hashedBuffer, keyBuffer);
        return match
    }
}