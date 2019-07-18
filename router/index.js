const Router = require('koa-router')

const router = new Router()
const lineat = require('./lineat')

router.use('/lineat', lineat.routes(), lineat.allowedMethods())

module.exports = router
