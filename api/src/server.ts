import { server } from './http';
import './websocket/admin';

server.listen(3333, () =>
  console.log('Server started, listening on port 3333')
);
