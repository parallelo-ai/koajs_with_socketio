const Koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')

const IO = require('koa-socket-2')

const thePort = process.env.PORT || 3000 
const app = new Koa()
const io = new IO()

// Add logger middleware
app.use(logger())

io.attach(app)

io.on('chat message', (ctx, data) => {
  console.log('client sent data to message endpoint', data)
  ctx.socket.emit('chat message', data)
})

io.on('connection', (ctx, data) => {
  console.log('client connected')
  ctx.socket.emit('chat message', 'Welcome to this humble example')
  //console.log(ctx.data)
})

app.use(serve('./ui'))

console.log('Server listening at port ' + thePort)
app.listen(thePort)
