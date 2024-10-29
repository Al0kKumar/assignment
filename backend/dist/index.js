"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// GET comments
app.get('/api/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield prisma.comment.findMany({
        orderBy: { createdAt: 'desc' }, // Order comments by creation date
    });
    res.json(comments);
}));
// POST a comment
app.post('/api/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, text } = req.body;
    const comment = yield prisma.comment.create({
        data: {
            username,
            text,
        },
    });
    // Broadcast new comment to all connected clients
    io.emit('newComment', comment);
    res.status(201).json(comment);
}));
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
