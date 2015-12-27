import Server from 'socket.io';

export default function StartServer(store) {
  const io = new Server().attach(8090);

  // whenever the store state changes, emit this change to open web sockets:
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    // On receiving an initial socket connection, send the app state to it
    // for larger applications or anywhere there are security risks involved
    // this will obvs not be ideal. but for this tutorial, this will do
    socket.emit('state', store.getState().toJS());

    // whenever an action happens on the client, forward it to the Redux store
    socket.on('action', store.dispatch.bind(store));
  });
}
