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

function App() {
  const user = useAuth();
  let elementType = {
    confirmation: `<div class="notification_icon bg-success">
    ✔
  </div>`,
    error: `<div class="notification_icon bg-warning">
    !
  </div>`,
    cancellation: `<div class="notification_icon bg-danger">
  ✖
</div>`,
    reminder: `<div class="notification_icon bg-info">
  ⏰
</div>`,
    discount: `<div class="notification_icon bg-primary">
  50%
</div>`,
  };
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
      socket.on("notification", (data) => {
        console.error("notification", data);
        const notification = document.getElementById("notifications");
        let div = document.createElement("div");
        div.innerHTML = `<div class="notification_message ${data.type}">
           ${elementType[data.type]}
          <div class="notification_content">
            <h2 class="notification_title">${data.type}</h2>
            <p class="notification_description two-lines">${data.message}</p>
          </div>
        </div>`;

        notification.appendChild(div);
        // Notification sound
        let audio = new Audio('../public/notification.wav');
        audio.onerror = function () {
          console.error('Error playing audio:', audio.error);
        };
        audio.play();

        setTimeout(() => {
          div.classList.add("hide");
          setTimeout(() => {
            div.remove();
          }, 900);
        }, 5000);
      });
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
