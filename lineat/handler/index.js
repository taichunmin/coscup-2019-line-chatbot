const _ = require('lodash')
const log = require('../../libs/log')(__filename)
const client = require('../../libs/lineat')
const { errorToPlainObject } = require('../../libs/helper')

const isTestEvent = event => _.get(event, 'source.userId') === 'Udeadbeefdeadbeefdeadbeefdeadbeef'

module.exports = async ({ ctx, event }) => {
  if (isTestEvent(event)) return

  try {
    log('event = %j', event)
    switch (event.type) {
      case 'message':
        switch (event.message.type) {
          case 'text':
            await require('./messageText')({ ctx, event })
            break
        }
        break
    }
  } catch (err) {
    log('%j', errorToPlainObject(err))
    await client.replyMessage(event.replyToken, require('../message/text')(err.message))
  }
}
