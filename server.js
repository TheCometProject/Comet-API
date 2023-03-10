// imports
const express = require("express")
const { createServer } = require("https")
const { Server } = require("socket.io")
const { v4: uuidV4 } = require('uuid')
const { ExpressPeerServer } = require("peer")
const { readFileSync } = require("fs")

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

const sslOptions = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem")
}

// initialize http and socket.io servers:
const app = express()
const httpServer = createServer(sslOptions, app)
const io = new Server(httpServer)
const port = process.env.PORT || 3000

// initialize the peer server and use it as middleware:
const peerApp = express()
const peerServer = createServer(sslOptions, peerApp)
const peerPort = process.env.PEER_PORT || 3001
peerApp.use('/', ExpressPeerServer(peerServer, { 
  debug: true,
  path: '/',
  ssl: sslOptions
}))

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
peerServer.listen(peerPort)