require('dotenv').config()

const app = require('./libs/app')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const log = require('./libs/log')(__filename)
const { getenv } = require('./libs/helper')

const APP_PORT = getenv('PORT', 3000)

// middleware
app.use(require('./middleware/logger'))
app.use(require('./middleware/x-response-time'))
app.use(require('./middleware/error-handler'))
app.use(bodyParser())

// router
app.use(router.routes())
app.use(router.allowedMethods())

// on error event
app.on('error', async (err, ctx) => {
  log(err)
})

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`)
})
