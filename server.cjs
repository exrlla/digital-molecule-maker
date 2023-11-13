// server.js
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import { routing } from './constants.js'
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = require('socket.io')(server, {cors: {origin: "*"}});

// Allow requests from 'http://localhost:5173' (your Vite development server)
// app.use(cors({
//   origin: `http://localhost:${routing.clientPort}`, // Update with your actual Vite development server URL
// }));

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