const lineat = require('@line/bot-sdk')
const { getenv } = require('./helper')

const config = {
  channelAccessToken: getenv('LINEAT_CHANNEL_ACCESS_TOKEN'),
  channelSecret: getenv('LINEAT_CHANNEL_SECRET')
}

const client = new lineat.Client(config)

module.exports = client
