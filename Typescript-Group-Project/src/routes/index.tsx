import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import PrivateLayout from "../components/PrivateLayout";
import Tasks from "../pages/Tasks";
import Dashboard from "../pages/Dashboard";
import AdminPrivateLayout from "../components/AdminPrivateLayout";
import AdminDashboard from "../pages/AdminDashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },

      {
        element: <AdminPrivateLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);
