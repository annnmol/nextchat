
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { handleError } from "@/lib/utils";
import useStore from "@/zustand";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const setAllMessages = useStore(useShallow((state) => state.setAllMessages));

	const getMessages = async (id: string) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/${id}`);
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setAllMessages(data);
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};

	return { getMessages, loading };
};
export default useGetMessages;
