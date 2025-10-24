// netlify/functions/socketio.js
const { Server } = require('socket.io');

exports.handler = async (event, context) => {
  // Chỉ xử lý các yêu cầu WebSocket
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  // Khởi tạo Socket.IO server
  const io = new Server({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Xử lý kết nối Socket.IO
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('message', (data) => {
      console.log('Message received:', data);
      io.emit('message', data);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return {
    statusCode: 200,
    body: 'Socket.IO server is running'
  };
};