import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import checkDriverLogin from "../hooks/checkDriverLogin";
import useAuth from "../hooks/useAuth";
import { useLocation } from 'react-router-dom';

const DriverLogin = () => {
    const query = new URLSearchParams(useLocation().search);
    const [isLoading, setIsLoading] = useState(true);
    const controller = new AbortController();
    const driverLogin = checkDriverLogin(controller);
    const { auth } = useAuth();
    useEffect(() => {
        let accessToken = query.get("accessToken");
        let refreshToken = query.get("refreshToken");
        let isMounted = true;

        const checkDriverLogin = async () => {
            try {
                if (accessToken && refreshToken) await driverLogin({ accessToken, refreshToken });
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // persist added here AFTER tutorial video
        // Avoids unwanted call to checkDriverLogin

        !auth ? checkDriverLogin() : setIsLoading(false);

        return () => {
            isMounted = false;
            refreshToken = null;
            accessToken = null;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth)}`);
    }, [isLoading]);

    return <>{isLoading ? <p></p> : <Outlet />}</>;
};

export default DriverLogin;
