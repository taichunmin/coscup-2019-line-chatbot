const _ = require('lodash')

module.exports = text => {
  text = _.truncate(_.toString(text), {
    length: 2000
  })
  return {
    type: 'text',
    text
  }
}
