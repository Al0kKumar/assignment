import express from 'express';
import http from 'http'
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); 

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
  });

// GET comments
app.get('/api/comments', async (req, res) => {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' }, // Order comments by creation date
  });
  res.json(comments);
});

// POST a comment
app.post('/api/comments', async (req, res) => {
  const { username, text } = req.body;

  const comment = await prisma.comment.create({
    data: {
      username,
      text,
    },
  });

  // Broadcast new comment to all connected clients
  io.emit('newComment', comment);

  res.status(201).json(comment);
});



const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
