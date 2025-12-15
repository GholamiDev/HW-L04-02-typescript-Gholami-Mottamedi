import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CustomDelBtn from "../components/CustomDelBtn";

import bgImage from "../assets/minimal-blue.jpg";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.auth.users);

  const handleDelete = (user: { id: string; username: string }) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.username}"?`
    );

    if (!confirmed) return;

    dispatch(deleteUser(user.id));
    toast.success(`User ${user.username} is deleted`);
  };

  return (
    <>
      <div className="container justify-self-center relative mt-5">
        <img className="w-full h-55 rounded-sm " src={bgImage} alt="bg" />
        <p className="text-4xl text-black absolute bottom-2 left-20">
          Admin Dashboard
        </p>
      </div>
      <div className="container justify-self-center mt-10 ">
        <p className="text-2xl mb-3 mx-2">Users List</p>
        <ul className="mx-2 p-5 justify-center rounded-md border border-[#5051f4]">
          {users.map((user) => (
            <>
              <div className="bg-[#1e1f25] rounded-md p-3 flex w-full justify-between items-center mb-3">
                <div className="mx-3 text-gray-400 ">
                  <li className="flex ">
                    Username :{" "}
                    <p className="text-white ml-1">{user.username}</p>
                  </li>
                  <li className="flex">
                    Role : <p className="text-white ml-1">{user.role}</p>
                  </li>
                  {/* <li>User ID : <p>{user.id}</p></li> */}
                </div>
                <div className="">
                  <CustomDelBtn
                    label={<DeleteOutlineRoundedIcon />}
                    p="py-2"
                    size="text-[18px]"
                    width="w-[50px]"
                    onClick={() => handleDelete(user)}
                  />
                </div>
              </div>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
