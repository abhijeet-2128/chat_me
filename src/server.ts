import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const io = new Server(server);

// Store connected sockets
const connectedUsers: Socket[] = [];

io.on('connection', (socket: Socket) => {
  console.log('User connected');

  // Add the socket to the list of connected users
  connectedUsers.push(socket);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove the socket from the list of connected users
    const index = connectedUsers.indexOf(socket);
    if (index !== -1) {
      connectedUsers.splice(index, 1);
    }
  });

  // Handle chat messages
  socket.on('chat message', (msg: string) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected users
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
