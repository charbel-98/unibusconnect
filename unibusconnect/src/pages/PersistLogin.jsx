import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { BounceLoader } from "react-spinners";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const controller = new AbortController();
  const refresh = useRefreshToken(controller);
  const { auth } = useAuth();
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <BounceLoader
          color={"#d9534f"}
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
