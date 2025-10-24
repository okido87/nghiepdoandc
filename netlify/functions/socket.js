// Netlify serverless function để xử lý kết nối Socket.IO
const { Server } = require('socket.io');
const { createServer } = require('http');

exports.handler = async (event, context) => {
  // Kiểm tra nếu là kết nối WebSocket
  if (event.headers['upgrade'] !== 'websocket') {
    return {
      statusCode: 426,
      body: 'Upgrade Required'
    };
  }

  // Tạo HTTP server
  const server = createServer();
  
  // Khởi tạo Socket.IO server
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Xử lý kết nối Socket.IO
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Xử lý sự kiện từ client
    socket.on('message', (data) => {
      console.log('Message received:', data);
      // Gửi lại cho tất cả clients
      io.emit('message', data);
    });
    
    // Xử lý sự kiện ngắt kết nối
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Trả về response cho Netlify
  return {
    statusCode: 101, // Switching Protocols
    headers: {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade'
    }
  };
};