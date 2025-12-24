import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginDropdown = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    const currentUser = { username: "DemoUser", role, isLoggedin: true };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    navigate("/");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        Login
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
          <ul>
            <li
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                role === "user" ? "font-bold" : ""
              }`}
              onClick={() => setRole("user")}
            >
              User
            </li>
            <li
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                role === "admin" ? "font-bold" : ""
              }`}
              onClick={() => setRole("admin")}
            >
              Admin
            </li>
          </ul>
          <button
            className="w-full bg-blue-600 text-white py-2 mt-1 rounded hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login as {role}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
