import { io } from '../http';
io.on('connection', socket => {
  console.log('socket_id =>', new Date().getTime(), socket.id);

  socket.on('weight_e_waste', () => {
    console.log('socket_id =>', new Date().getTime(), socket.id);

    for (let index = 0; index < 20; index++) {
      io.to(socket.id).emit('result', index);
    }
  });
});
