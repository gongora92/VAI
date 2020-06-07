const mongoose = require('mongoose')

const lexicalWordSchema = new mongoose.Schema({
  word: { type: String }
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

const LexicalWord = mongoose.model('LexicalWord', lexicalWordSchema)

module.exports = LexicalWord