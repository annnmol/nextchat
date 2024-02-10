import express from 'express';
import http from "http";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

//user defined imports
import { errorHandlingLogging, healthCheckLogging, incomingRequestLogging } from './lib/utils';
import { SOCKET_DEFAULT_OPTIONS } from './socket/contants';
import socketIOMiddleware from './middleware/socketMiddleware';
import apiMiddleware from './middleware/middleware';
import conversationRouter from "./routes/conversation";
import { initializeSocketIO } from './socket/socket';
import { redisPubClient, redisSubClient } from './lib/redis';


dotenv.config();

const PORT = Number(process.env.PORT ?? 3005);

/** EXPRESS app initialize */
const app = express();

/** http Server Handling */
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Health check endpoint
app.get("/health-check", healthCheckLogging);

//* intialize socket socket server *//
const io: Server = new Server(httpServer, SOCKET_DEFAULT_OPTIONS);

//* using set method to mount the `io` instance on the app to avoid usage of `global` variable
app.set("io", io);

// middlewares
app.use(apiMiddleware);

// Apply Socket.IO middleware
io.use((socket, next) => {
    socketIOMiddleware(socket, next);
});

/** Log the incoming request */
app.use(incomingRequestLogging);

//* Redis Adapter for Socket.IO *//
io.adapter(createAdapter(redisPubClient, redisSubClient));



// routes
app.use("/api/v1/conversation", conversationRouter);

/** Route Error handling */
app.use(errorHandlingLogging);

//app start
httpServer.listen(PORT, () => {
    console.info(`Server is running at PORT: ${PORT}`);
    // Start the server and initialize Socket.IO
    initializeSocketIO(io);
});

export default app;
