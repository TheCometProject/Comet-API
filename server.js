// imports
const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const { v4: uuidV4 } = require('uuid')

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}

// initialize http and socket.io servers:
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const port = process.env.PORT || 10000

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