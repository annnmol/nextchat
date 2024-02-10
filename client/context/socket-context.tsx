"use client";

import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
import useStore from "@/zustand";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const notificationSound = "/sounds/notification.mp3";

const SOCKET_BASE_URL = process.env.SERVER_URL ?? "http://localhost:3005";

interface SocketProviderProps {
  children?: React.ReactNode;
}

export interface IData {
  [key: string]: any;
}

export interface IMessage {
  id: string;
  session_id: string;
  type: string;
  value: string;
  mediaUrl: string;
  senderId: string;
  seen: boolean;
  shouldShake?: boolean;
}

interface ISocketContext {
  emitSocketEvent: (eventName: string, data: IData) => any;
  onlineUsers: any[];
  socket: Socket | undefined;
}

const SocketContext = React.createContext<ISocketContext>({
  emitSocketEvent: () => {},
  onlineUsers: [],
  socket: undefined,
});

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error(`socket state is undefined`);
  }

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { setMessages } = useStore();

  // const [messages, setMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const emitSocketEvent: ISocketContext["emitSocketEvent"] = useCallback(
    (eventName: string, data: IData) => {
      if (!socket) return console.error("Socket not initialized");

      socket?.emit(eventName, data);
    },
    [socket]
  );

  // const onMessageRec = useCallback(
  //   (data: string) => {
  //     const message = JSON.parse(data);
  //     setMessages(message?.data);
  //   },
  //   [setMessages]
  // );

  const onNewMessage = useCallback((data: string) => {

		console.log(`🚀 ~ file: useListenMessages.ts:15 ~ onNewMessage ~ data:`, data);

		const message = JSON.parse(data);

		console.log(`🚀 ~ file: useListenMessages.ts:16 ~ onNewMessage ~ message:`, message);

		const newMessage: IMessage = message?.data;
		newMessage.shouldShake = true;
		const sound = new Audio(notificationSound);
		sound.volume = 0.4;
		sound.play();
		setMessages(newMessage);
	}, [setMessages]);

  const onOnlineUser = useCallback((data: any) => {
    setOnlineUsers(data);
  }, []);

  useEffect(() => {
    const _socket: Socket = io(SOCKET_BASE_URL, {
      query: {
        userId: "123",
      },
    });

    setSocket(_socket);

    // _socket.on(SOCKET_CONNECTION_TYPES.AGENT_CHAT, onNewMessage);
    // socket.on() is used to listen to the events. can be used both on client and server side
    _socket.on("getOnlineUsers", onOnlineUser);

    //** SOCKET DEBUGGING **//
    _socket.onAnyOutgoing((event, ...args) => {
      console.warn(`:outgoing event: [${event}] --->`, args?.[0]);
    });
    _socket.onAny((event, ...args) => {
      console.warn(`:incoming event: [${event}] --->`, args?.[0]);
    });

    return () => {
      // _socket.off(SOCKET_CONNECTION_TYPES.AGENT_CHAT, onNewMessage);
      _socket.off("getOnlineUsers", onOnlineUser);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ emitSocketEvent, socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
