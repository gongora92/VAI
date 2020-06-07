const express = require('express')
const router = express.Router()
const wordController = require('../controllers/words')
const { validateBody, schemas } = require('../helpers/validator')

router.post('/', validateBody(schemas.wordSchema), wordController.add)

module.exports = router
