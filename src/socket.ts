// // src/socket.ts
// import { io, Socket } from "socket.io-client";

// export const socket: Socket = io(
//   import.meta.env.VITE_SOCKET_URL,
//   {
//     withCredentials: true,
//   }
// );


// src/socket.ts
// TEMPORARY dummy socket (notifications disabled)

export const socket = {
  on: () => {},
  off: () => {},
  emit: () => {},
  disconnect: () => {},
};
