const _ = require('lodash')
const { getenv } = require('../libs/helper')
const Base64 = require('crypto-js/enc-base64')
const HmacSHA256 = require('crypto-js/hmac-sha256')
const lineatHandler = require('../lineat/handler')
const log = require('../libs/log')(__filename)
const Router = require('koa-router')

const router = new Router()

router.post('/', async (ctx, next) => {
  log('request = %O', ctx.header)
  const signature1 = _.get(ctx, ['header', 'x-line-signature'], '')
  ctx.assert(signature1, 400, 'signature is missing')

  const body = ctx.request.rawBody
  ctx.assert(body, 400, 'body is missing')

  const secret = getenv('LINEAT_CHANNEL_SECRET', 'secret')
  const signature2 = Base64.stringify(HmacSHA256(body, secret))
  ctx.assert(signature1 === signature2, 401, 'signature validation failed')

  await next()
})

router.post('/', async ctx => {
  const events = _.get(ctx, 'request.body.events', [])
  if (!_.isArray(events) || _.isEmpty(events)) ctx.throw(400, 'no events')
  const promises = _.map(events, async event => {
    await lineatHandler({ ctx, event })
  })
  await Promise.all(promises)
  ctx.status = 200
})

module.exports = router
