const _ = require('lodash')

exports.getenv = (key, defaultValue) => {
  return _.get(process, ['env', key], defaultValue)
}

exports.errorToPlainObject = err => {
  const j = {
    message: _.get(err, ['message'], '?'),
    name: _.get(err, ['name'], '?'),
    stack: _.get(err, ['stack'], '?')
  }
  if (_.hasIn(err, 'args')) j.args = err.args
  if (_.hasIn(err, 'originalError.config.data')) j.postData = JSON.parse(err.originalError.config.data)
  if (_.hasIn(err, 'originalError.response.data')) j.httpResponse = err.originalError.response.data
  if (_.hasIn(err, 'response.data')) j.httpResponse = err.response.data
  if (_.hasIn(err, 'response.headers')) j.httpHeaders = err.response.headers
  if (_.hasIn(err, 'response.status')) j.httpStatusCode = err.response.status
  if (_.hasIn(err, 'status')) j.status = err.status
  if (_.hasIn(err, 'statusCode')) j.httpStatusCode = err.statusCode
  if (_.hasIn(err, 'statusMessage')) j.httpStatusMessage = err.statusMessage
  return j
}
