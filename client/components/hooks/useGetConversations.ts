import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { handleError } from "@/lib/utils";
import useStore from "@/zustand";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const setConversations = useStore(useShallow((state) => state.setConversations));


	const getConversations = async (userId: string) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users/${userId}/conversations`);
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setConversations(data);
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};


	return { loading, getConversations };
};
export default useGetConversations;
