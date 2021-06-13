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
let USERS = []
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  const {name} = socket.handshake.query
  USERS.push({id: socket.id, name})
  socket.emit('users-list', {
    users: USERS.map(user => {
      return user.name
    })
  })
  socket.broadcast.emit('users-list', {
    users: USERS.map(user => {
      return user.name
    })
  })
  socket.on("disconnect", () => {
    USERS = USERS.filter(user => user.id !== socket.id)
    socket.broadcast.emit('users-list', {
      users: USERS.map(user => {
        return user.name
      })
    })
    socket.broadcast.emit("callEnded")
  });

  socket.on("call-user", ({userToCall, signalData, from, name}) => {
    const userId = USERS.find(user => user.name === userToCall)
    io.to(userId.id).emit("call-user", {signal: signalData, from, name});
  });
  socket.on("call-ended", (username) => {
    const userId = USERS.find(user => user.name === username)
    io.to(userId.id).emit("call-ended");
  });

  socket.on("answer-call", (data) => {
    io.to(data.to).emit("call-accepted", data.signal)
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
