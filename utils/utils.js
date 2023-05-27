const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = "test";

async function createHashedPassword(password) {
  const hash = crypto.createHash("sha512").update(password).digest("hex");
  return hash.toString();
}

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = { createHashedPassword, generateToken };
