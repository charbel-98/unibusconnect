import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    // <Navigate to="/login" state={{ from: location }} replace />
    <div>
      <h1> You are not authorized to view this page </h1>
    </div>
  );
};

export default RequireAuth;
