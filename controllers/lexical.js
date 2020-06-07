require('../config/mongoose')
const LexicalWord = require('../models/lexicalWord')

module.exports = {
  complexity: async (req, res) => {
    let response = { data: {} }
    try {
      const list = (await LexicalWord.find({})).map(el => el.word)
      let lexicalWords = 0
      if (req.query.mode === 'verbose') {
        response.data.sentence_Id = []
        req.body.text.split('.').forEach(sentence => {
          lexicalWords = 0
          let words = sentence.split(' ')
          words.forEach(word => {
            if (list.includes(word.toLowerCase())) lexicalWords++
          })
          response.data.sentence_Id.push(lexicalWords / words.length)
        })
      }
      lexicalWords = 0
      const text = req.body.text.split(' ')
      text.forEach(word => {
        if (list.includes(word.toLowerCase())) lexicalWords++
      })
      response.data.overall_Id = lexicalWords / text.length
    } catch (ex) {
      return res.status(500).send()
    }
    res.status(200).json(response)
  },
}
