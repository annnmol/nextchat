import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { handleError } from "@/lib/utils";
import useStore from "@/zustand";
import { DEFAULT_HEADERS } from "@/lib/network";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const setMessages = useStore(useShallow((state) => state.setMessages));

	const sendMessage = async (message: any,id:string) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${id}`, {
				method: "POST",
				headers: DEFAULT_HEADERS,
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages(data);
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
