import { io } from 'socket.io-client';

const SOCKET_URL = "https://food-app1-1-hs0k.onrender.com"

export const socket = io(SOCKET_URL);