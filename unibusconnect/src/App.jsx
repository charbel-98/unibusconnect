import "./App.css";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { Journeys } from "./pages/Journeys";
import JourneyDetails from "./pages/JourneyDetails";
import Notification from "./pages/Notification";
import Tickets from "./pages/Tickets";
import axios from "./api/axios";
import Profile from "./pages/Profile";
import DefaultLocation from "./pages/defaultLocation.jsx";
import { useState, useEffect } from "react";
import Support from "./pages/Support";
import { useSelector, useDispatch } from "react-redux";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import { LoginSuccess } from "./UI/LoginSuccess";
import { setAuth } from "./redux/auth/authSlice";
import io from "socket.io-client";
import LostItem from "./pages/LostItem";
import History from "./pages/History.jsx";
import TicketDetails from "./pages/TicketDetails";
function App() {
  const status = useSelector((state) => state.auth.status);
  const socket = io.connect("http://localhost:3000");
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("notification", (data) => {
      console.log(data);
    });
  }, [socket]);
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
        <Route path="/" element={<Root />}>
          <Route path="signup" element={<Auth isSignUp={true} />} />
          <Route path="login" element={<Auth isSingUp={false} />} />
          <Route exact path="/login/success" component={LoginSuccess} />
          <Route path="/login/error">
            Error loging in. Please try again later!
          </Route>
          {/*protected routes */}
          <Route element={status !== "loading" && <PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="journeys" element={<Journeys />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="journeys/:id" element={<JourneyDetails />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="tickets" element={<Tickets />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="tickets/:id" element={<TicketDetails />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="Profile" element={<Profile />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="default-location" element={<DefaultLocation />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="notifications" element={<Notification />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="support" element={<Support />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="reports/lost-item" element={<History />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="reports/lost-item/:id" element={<LostItem />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
