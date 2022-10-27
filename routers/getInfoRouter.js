const router = require('express').Router()
const getInfoService = require('../services/getInfo.service')

router.get('/', getInfoService.getInfo)

module.exports = router
