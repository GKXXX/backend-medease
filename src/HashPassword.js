const {randomBytes,pbkdf2Sync} = require('crypto')

const HashPassword = (password,salt = randomBytes(1000).toString('hex')) => {
  const hashedPassword = pbkdf2Sync(password,salt,10000,16,'sha256')
  return [hashedPassword.toString("hex"),salt]
}

module.exports = HashPassword