
import { useState } from "react";

import { handleError } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-context";
import { IData } from "@/context/socket-context";
import { API_ENDPOINTS, DEFAULT_HEADERS } from "@/lib/network";

const useAuthService = () => {
    const [loading, setLoading] = useState(false);
    const { handleAuthChange } = useAuthContext();

    const loginFn = async (req: IData) => {
        setLoading(true);
        try {
            const res: any = await fetch(API_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(req),
            });

            const data = await res.json();

            if (data.error) {
                handleError(data.error);
            }

            // set cookies
            handleAuthChange(data);

        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };


    const signupFn = async (req: IData) => {

        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.SIGNUP, {
                method: "POST",
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(req),
            });

            const data = await res.json();

            if (data.error) {
                handleError(data.error);
            }
            // set cookies
            handleAuthChange(data);

        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };


    const logoutFn = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.LOGOUT, {
                method: "POST",
                headers: DEFAULT_HEADERS,
            });

            const data = await res.json();

            if (data.error) {
                handleError(data.error);
            }
            // set cookies
            handleAuthChange(data);

        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, loginFn, signupFn, logoutFn };
};
export default useAuthService;