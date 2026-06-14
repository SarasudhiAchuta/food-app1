import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL;

export const socket = io(SOCKET_URL);