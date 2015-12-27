import Server from 'socket.io';

export default function StartServer() {
  const io = new Server().attach(8090);
}
