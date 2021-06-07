/*
const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})


app.use(cors())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('server is RUNNING')
})

io.on('connection', socket => {
  socket.emit('me', socket.id)
  socket.on('disconnect', () => {
    socket.broadcast.emit('call-ended')
  })
  socket.on('call-user', ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('call-user', {signal: signalData, from, name})
  })
  socket.on('answer-call', (data) => {
    io.to(data.to).emit('call-accepted', data.signal)
  })
})

app.listen(PORT, () => console.log(`server is running at ${PORT}`))


const express = require("express");
const cors = require("cors");
const app = express()
const path = require('path')
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;
*/
const express = require("express");
const cors = require("cors");
const app = express()
const path = require('path')
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;


const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// app.get('/', (req, res) => {
// 	res.send('Running');
// });

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  });

  socket.on("call-user", ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit("call-user", {signal: signalData, from, name});
  });

  socket.on("answer-call", (data) => {
    io.to(data.to).emit("call-accepted", data.signal)
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
