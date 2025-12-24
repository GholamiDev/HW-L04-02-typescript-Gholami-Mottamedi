import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logOut } from "../features/auth/authSlice";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  const loginRef = useRef<HTMLLIElement>(null);
  const registerRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleLoginRedirect = (role: "user" | "admin") => {
    setShowLoginDropdown(false);
    navigate(`/login?role=${role}`);
  };

  const handleRegisterRedirect = (role: "user" | "admin") => {
    setShowRegisterDropdown(false);
    navigate(`/register?role=${role}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setShowLoginDropdown(false);
      }
      if (
        registerRef.current &&
        !registerRef.current.contains(event.target as Node)
      ) {
        setShowRegisterDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full bg-[#1E1F25] text-white fixed z-20 top-0">
        <div className="container flex justify-self-center justify-between w-full p-3">
          <ul className="flex gap-4 text-sm sm:text-[18px]">
            <NavLink to="/" className="hover:text-[#5051f9] transition .4">
              <li>Home</li>
            </NavLink>
            {currentUser?.role === "user" && (
              <>
                <NavLink
                  to="/tasks"
                  className="hover:text-[#5051f9] transition .4"
                >
                  <li>Tasks</li>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="hover:text-[#5051f9] transition .4"
                >
                  <li>Dashboard</li>
                </NavLink>
              </>
            )}
            {currentUser?.role === "admin" && (
              <NavLink
                to="/admin"
                className="hover:text-[#5051f9] transition .4"
              >
                <li>Admin Dashboard</li>
              </NavLink>
            )}
          </ul>

          <ul className="flex gap-4 text-sm sm:text-[18px] relative">
            {!currentUser ? (
              <>
                <li
                  ref={loginRef}
                  className="cursor-pointer hover:underline relative"
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                >
                  <LoginIcon
                    sx={{
                      fontSize: "20px",
                      marginRight: "2px",
                      marginTop: "-3px",
                    }}
                  />{" "}
                  Login
                  {showLoginDropdown && (
                    <ul className="absolute top-full -left-3.5 w-30 bg-[#2c2c2c] p-2 rounded shadow-md">
                      <li
                        className="cursor-pointer px-2 py-1 hover:bg-[#5051f9] transition .4 rounded-md text-sm"
                        onClick={() => handleLoginRedirect("user")}
                      >
                        Login as User
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 hover:bg-[#5051f9] transition .4 rounded-md text-sm"
                        onClick={() => handleLoginRedirect("admin")}
                      >
                        Login as Admin
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  ref={registerRef}
                  className="cursor-pointer hover:underline relative"
                  onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                >
                  <PersonAddAltIcon
                    sx={{
                      fontSize: "20px",
                      marginRight: "4px",
                      marginTop: "-3px",
                    }}
                  />
                  Register
                  {showRegisterDropdown && (
                    <ul className="absolute top-full right-0 w-30 bg-[#2c2c2c] p-2 rounded shadow-md text-sm">
                      <li
                        className="cursor-pointer px-2 py-1 hover:bg-[#5051f9] transition .4 rounded-md"
                        onClick={() => handleRegisterRedirect("user")}
                      >
                        Register as User
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 hover:bg-[#5051f9] transition .4 rounded-md"
                        onClick={() => handleRegisterRedirect("admin")}
                      >
                        Register as Admin
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="mt-[-3px]">
                  {currentUser?.role === "user" ? (
                    <PersonOutlineRoundedIcon sx={{ color: "#5051f4" }} />
                  ) : (
                    <AdminPanelSettingsRoundedIcon sx={{ color: "#5051f4" }} />
                  )}
                </li>
                <li>{currentUser?.username}</li>
                <li
                  className="cursor-pointer hover:text-red-500 transition .4"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Layout;
