import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { IMessage, useSocket } from "@/context/socket-context";
import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
import useStore from "@/zustand";

const notificationSound = "/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocket();
	const setMessages = useStore(useShallow((state) => state.setMessages));

	const onNewMessage = useCallback((data: string) => {
		const message = JSON.parse(data);
		const newMessage: IMessage = message?.data;
		newMessage.shouldShake = true;
		const sound = new Audio(notificationSound);
		sound.volume = 0.4;
		sound.play();
		setMessages(newMessage);
	}, [setMessages]);

	useEffect(() => {
		// if (!socket) return;

		socket?.on(SOCKET_CONNECTION_TYPES.AGENT_CHAT, onNewMessage);

		return () => {
			socket?.off(SOCKET_CONNECTION_TYPES.AGENT_CHAT, onNewMessage);
			// return undefined; // Explicitly return undefined
		};
	}, [socket, onNewMessage]);

};

export default useListenMessages;
