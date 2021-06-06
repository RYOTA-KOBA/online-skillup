io.on('connection', (socket) => {
    console.log('connected:', socket.id);
  
    // 切断時
    socket.on('disconnect', () => {
      console.log('disconnected:', socket.id);
    });
  
    // ユーザの参加
    socket.on('send', (message) => {
      console.log('send:', message);
      io.emit('send', message);
    });
  });