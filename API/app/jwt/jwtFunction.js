// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
let privateKEY = fs.readFileSync('./app/config/private.key', 'utf8');
let publicKEY = fs.readFileSync('./app/config/public.key', 'utf8');

module.exports = {
  sign: (payload) => {
    // Token signing options
    let signOptions = {
      issuer: "COP4710 Project",
      expiresIn: "24h",
      algorithm: "RS256"
    };

    return jwt.sign(payload, privateKEY, signOptions);
  },

  verify: (token) => {
    let verifyOptions = {
      issuer: "COP4710 Project",
      expiresIn: "1h",
      algorithm: ["RS256"]
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    }
    catch (err) {
      return false;
    }
  },

  decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
  }
}
