const _ = require('lodash')
const client = require('../../libs/lineat')

const textHandler = {}

textHandler['info'] = async ({ ctx, event }) => {
  await client.replyMessage(event.replyToken, require('../message/info')({ ctx, event }))
}

module.exports = async ({ ctx, event }) => {
  const text = _.get(event, 'message.text')

  const handler = textHandler[text]
  if (_.isFunction(handler)) await handler({ ctx, event })
  else await client.replyMessage(event.replyToken, require('../message/text')(text))
}
