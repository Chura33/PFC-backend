const express = require('express')
const router = express.Router()

router.route('/verify').get(verifyToken)

module.exports = router