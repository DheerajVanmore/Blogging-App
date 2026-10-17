const JWT = require("jsonwebtoken");
const secret = "DAV123";

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return JWT.sign(payload, secret);
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { generateToken, validateToken };
