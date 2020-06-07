require('../config/mongoose')
const LexicalWord = require('../models/lexicalWord')
const User = require('../models/user')
const JWT = require('jsonwebtoken')

module.exports = {
  add: async (req, res) => {
    JWT.verify(req.get('VAIToken'), process.env.JWTSECRET, async (err, decoded) => {
      if (err) return res.status(401).send()
      let user = await User.findById(decoded.sub)
      if (!user) return res.status(401).send()
    })
    let word = req.body.word.toLowerCase()
    try {
      let exists = await LexicalWord.findOne({ word })
      if (exists) {
        return res
          .status(409)
          .json({ error: `The word '${word}' was alredy added before` })
      }
      let newWord = new LexicalWord({ word })
      await newWord.save()
    } catch (ex) {
      return res.status(500).send()
    }
    res.status(200).send()
  }
}
