import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const AdminPrivateLayout = () => {
  const user = useAppSelector((state) => state.auth.currentUser);

  if (!user) {
    return <Navigate to="/login?role=admin" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateLayout;
