import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateLayout = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  console.log("CURRENT USER =>", user);

  if (!user) return <Navigate to="/login?role=user" replace />;
  else if (user.role === "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateLayout;
