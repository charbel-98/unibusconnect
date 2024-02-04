import "./App.css";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import { createPortal } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { Journeys } from "./pages/Journeys";
import JourneyDetails from "./pages/JourneyDetails";
import Notification from "./pages/Notification";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import DefaultLocation from "./pages/defaultLocation.jsx";
import { useEffect } from "react";
import Support from "./pages/Support";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import { LoginSuccess } from "./UI/LoginSuccess";
import LostItem from "./pages/LostItem";
import History from "./pages/History.jsx";
import TicketDetails from "./pages/TicketDetails";
import useAuth from "./hooks/useAuth.js";
import io from "socket.io-client";
import createNotification from "./utils/createNotification.js";

function App() {
  const user = useAuth();

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    if (user.auth) {
      console.error("user", user);
      socket.on("connect", () => {
        console.log("Socket Connected");
        socket.emit("user", user);
      });
      socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });
      socket.on("notification", createNotification);
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);
  //google auth fetching user
  // useEffect(() => {
  //   const fetchAuthUser = async () => {
  //     const response = await axios
  //       .get("/api/v1/auth/login/success", {
  //         withCredentials: true,
  //       })
  //       .catch((err) => {
  //         console.log("Not properly authenticated");
  //         dispatch(
  //           setAuth({ accessToken: null, status: "failed", user: null })
  //         );
  //       });

  //     if (response?.data) {
  //       console.log("User: ", response.data);
  //       dispatch(
  //         setAuth({
  //           user: response.data.user,
  //           accessToken: response.data.accessToken,
  //           status: "success",
  //         })
  //       );
  //     }
  //   };
  //fetchAuthUser();
  //});

  return (
    <BrowserRouter>
      <Routes>
        {/*?public routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="signup" element={<Auth isSignUp={true} />} />
        <Route path="login" element={<Auth isSingUp={false} />} />
        <Route exact path="/login/success" component={LoginSuccess} />
        <Route path="/login/error">
          Error loging in. Please try again later!
        </Route>
        {/*protected routes */}
        <Route element={status !== "loading" && <PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="journeys" element={<Journeys />} />
              <Route path="journeys/:id" element={<JourneyDetails />} />

              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/:id" element={<TicketDetails />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="default-location" element={<DefaultLocation />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="support" element={<Support />} />
              <Route path="reports/lost-item" element={<History />} />
              <Route path="reports/lost-item/:id" element={<LostItem />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
