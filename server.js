// imports
const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const { v4: uuidV4 } = require('uuid')

console.log(`PORT=${process.env.PORT}`)
console.log(`RENDER_EXTERNAL_URL=${process.env.RENDER_EXTERNAL_URL}`)
console.log(`RENDER_EXTERNAL_HOSTNAME=${process.env.RENDER_EXTERNAL_HOSTNAME}`)

// initialize http and socket.io servers:
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

httpServer.listen(port)
// peerServer.listen(peerPort)