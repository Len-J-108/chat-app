//to generate Secret for JWT (used in .env)

import crypto from 'crypto';
const x = crypto.randomBytes(64).toString('hex');
// Log it & copy it into environment variable under TOKEN_SECRET
console.log(x)