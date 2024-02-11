import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { handleError } from "@/lib/utils";
import useStore from "@/zustand";
import { DEFAULT_HEADERS } from "@/lib/network";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const setConversations = useStore(useShallow((state) => state.setConversations));


	const getConversations = async (userId: string) => {
		setLoading(true);
		try {
			const res: any = await fetch(`/api/users/${userId}/conversations`, {
				method: "GET",
				headers: DEFAULT_HEADERS,
			});
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
