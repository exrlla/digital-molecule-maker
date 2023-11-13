const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.use(cors());

io.on('connection', (socket) => {
  socket.on('imagesSelected', (selectedImages) => {
    console.log("imagesSelected, emitting....")
    io.emit('updateImages', selectedImages);
  });
});

server.listen(parseInt('4000', 10), () => {
  console.log(`WebSocket server is running on http://localhost:${'4000'}`);
});