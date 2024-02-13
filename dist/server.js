"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Store connected sockets
const connectedUsers = [];
io.on('connection', (socket) => {
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
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // Broadcast the message to all connected users
        io.emit('chat message', msg);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
