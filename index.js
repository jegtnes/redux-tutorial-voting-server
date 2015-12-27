import makeStore from './src/store';
import startServer from './src/socketServer';

export const store = makeStore();
startServer();
