import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import Root from "./pages/Root";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth.js";
import io from "socket.io-client";
import createNotification from "./utils/createNotification.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const user = useAuth();

  // useEffect(() => {
  //   const socket = io.connect("http://localhost:3000");
  //   if (user.auth) {
  //     console.error("user", user);
  //     socket.on("connect", () => {
  //       console.log("Socket Connected");
  //       socket.emit("user", user);
  //     });
  //     socket.on("disconnect", () => {
  //       console.log("Socket Disconnected");
  //     });
  //     socket.on("notification", createNotification);
  //   }
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        {/*protected routes */}
        <Route /* element={<PersistLogin />} */>
          <Route /* element={<RequireAuth />} */>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
        {/*  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
