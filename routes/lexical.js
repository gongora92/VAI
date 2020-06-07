const express = require('express')
const router = express.Router()
const lexicalController = require('../controllers/lexical')
const { validateBody, schemas } = require('../helpers/validator')

router.get('/', validateBody(schemas.complexitySchema), lexicalController.complexity)

module.exports = router
