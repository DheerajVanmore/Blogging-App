const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}

module.exports = {
  checkForAuthCookie,
};
