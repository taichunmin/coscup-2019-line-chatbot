const debug = require('debug')
const path = require('path')

const APP_DIRNAME = path.resolve(__dirname, '../')

module.exports = filename => {
  const namespace = path.relative(APP_DIRNAME, filename).replace(/\.[a-zA-Z0-9]+$/, '').replace(/\\/g, '/')
  return debug(`app:${namespace}`)
}
