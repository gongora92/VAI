const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }
})

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw new error(error)
  }
}

userSchema.methods.generateAuthToken = function () {
  let token = JWT.sign(
    {
      iss: 'VAI',
      sub: this.id,
      iat: new Date().getTime(),
      exp: new Date().getTime() + 3600000
    },
    process.env.JWTSECRET
  ).toString()
  return token
}

const User = mongoose.model('user', userSchema)

module.exports = User
