"use strict";
import { Server, Socket } from "socket.io";
import { SOCKET_CONNECTION_TYPES } from "../lib/enum";
import { redisPubClient, redisSubClient } from "../lib/redis";


// Function to initialize Socket.IO
const initializeSocketIO = (io: Server) => {
  console.log("initializeSocketIO fn");

  return io.on(SOCKET_CONNECTION_TYPES.CONNECT, (socket: Socket) => {
    try {
      startSocketListeners(socket, io);
    } catch (error) {
      handleSocketError(socket, io, error);
    }
  });
};

const startSocketListeners = (socket: Socket, io: Server) => {
  // logging.info("socket variables data", socket.data);


  //*** ON EVENT : Bot HISTORY REQUEST  ***//
  socket.on(
    SOCKET_CONNECTION_TYPES.AGENT_CHAT,
    async (data: any) => {

      console.log(`🚀 ~ file: socket.ts:43 ~ data:`, data);

    }
  );



  //*** reconnect socket ***//
  socket.on(SOCKET_CONNECTION_TYPES.RECONNECT, (data: any) => {
    console.warn(`${socket.data.connection_type} reconnected:`, socket?.id, "reason:", data);
  });

  //*** disconnect socket ***//
  socket.on(SOCKET_CONNECTION_TYPES.DISCONNECT, (data: any) => {
    console.warn(`${socket.data.connection_type} disconnected:`, socket?.id, "reason:", data);
  });

  // *** DEBUG ALL SOCKET EVENTS  ***//
  socket.onAnyOutgoing((event, ...args) => {
    console.warn(`[${socket?.data?.connection_type}]: outgoing event: [${event}] --->`, args?.[0]);
  });
  socket.onAny((event, ...args) => {
    console.warn(`[${socket?.data?.connection_type}]:incoming event: [${event}] --->`, args?.[0]);
  });
};

//*** Function to handle connection error ***//
const handleSocketError = (socket: Socket, io: Server, error: any) => {
  console.error("Error in socket initialization", error);

  // Handle connect error
  io.to(socket.id).emit(
    SOCKET_CONNECTION_TYPES.CONNECT_ERROR,
    error || "Something went wrong while connecting to the socket."
  );
};


export { initializeSocketIO };
