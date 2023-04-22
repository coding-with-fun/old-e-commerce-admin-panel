import { createContext } from 'react';
import io, { type Socket } from 'socket.io-client';
import env from '../env';

export const socket: Socket = io(env.app.backend_url, {
    transports: ['websocket'],
});

export const SocketContext = createContext(socket);
