require('../config/mongoose')
const User = require('../models/user')

module.exports = {
  getToken: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) return res.status(401).send()
      const validPassword = await user.isValidPassword(req.body.password)
      if (!validPassword) return res.status(401).send()
      const token = await user.generateAuthToken()
      res.status(200).header('VAIToken', token).send()
    } catch (ex) {
      return res.status(500).send()
    }
  }
}
