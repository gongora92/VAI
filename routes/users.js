const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const { validateBody, schemas } = require('../helpers/validator')

router.post('/', validateBody(schemas.getToken), userController.getToken)

module.exports = router
