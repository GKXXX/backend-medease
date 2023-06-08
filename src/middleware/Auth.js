const jwt = require("jsonwebtoken");
const HashPassword = require('../HashPassword')

const verifyToken = (req,res,next) => {
  const splittedString = req.headers.authorization.split(' ')
  const token = splittedString[1]

  if (!token) {
    res.status(403).send("Token non fourni")
  }

  const decodedToken = jwt.verify(token,process.env.TOKEN_KEY)
  req.user = decodedToken
  return next();
}

module.exports = verifyToken