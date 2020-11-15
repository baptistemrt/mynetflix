const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Authentication middleware to verify user auth
 */

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_JWT);
    const uid = decodedToken.uid;
    if ((req.params.uid || req.body.uid) !== uid)
      throw "Invalid uid";
    else
      next();
  } catch {
    res.status(401).send({
      error: "Invalid Request"
    });
  }
};