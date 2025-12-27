import CustomDelBtn from "../components/CustomDelBtn";
import { deleteUser } from "../features/auth/authSlice";
import { deleteAll } from "../features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import bgImage from "../assets/minimal-orange.jpg";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  hasBeenNotified,
  isDeadlineNear,
  markAsNotified,
} from "../utils/helpers";
import CustomInput from "../components/CustomInput";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.currentUser);
  const userTasks = useAppSelector((state) =>
    state.task.tasks.filter((t) => t.userId === userData?.id)
  );

  const [showPass, setShowPass] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Completed" | "Deadline Reached"
  >("All");

  const statusColor = {
    ["Pending"]: "bg-yellow-500",
    ["Completed"]: "bg-green-700",
    ["Deadline Reached"]: "bg-red-700",
  };

  const handleDelete = () => {
    if (!userData) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${userData.username}"?`
    );

    if (!confirmed) return;

    dispatch(deleteUser(userData.id));
  };

  useEffect(() => {
    if (!userData) return;

    const tasks = userTasks.filter(
      (task) =>
        task.userId === userData.id && task.hasReminder && !task.completed
    );

    tasks.forEach((task) => {
      const deadlineTime = new Date(task.deadline).getTime();
      const now = Date.now();

      if (userData && deadlineTime < now) {
        if (!hasBeenNotified(task.id)) {
          toast.error(`Deadline Passed : ${task.title}`);
          markAsNotified(task.id);
        }
        return;
      }

      const interval = setInterval(() => {
        if (userData && isDeadlineNear(task.deadline)) {
          toast.warning(`Deadline is less than 24hrs : ${task.title}`);
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    });
  }, [userTasks, userData]);

  const filteredTask = userTasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const machesStatus = filter === "All" || task.status === filter;

    return matchesTitle && machesStatus;
  });

  const handleDeleteAll = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    if (!confirm) return;
    dispatch(deleteAll());
  };

  return (
    <>
      <div className="container justify-self-center relative mt-20 ">
        <img
          className="w-[98%] justify-self-center h-35 rounded-sm mx-2"
          src={bgImage}
          alt="bg"
        />
        <p className="text-4xl text-black absolute bottom-2 left-20">
          User Dashboard
        </p>
      </div>
      <div className="container justify-self-center ">
        <div className="w-[460px] flex flex-col rounded-md shadow-[0_0_15px_rgba(0,0,0)] p-6 mt-10 mx-2  justify-self-start gap-2 ">
          <div className="text-2xl text-gray-600">My Details </div>
          <div className="text-2xl py-2">
            Username : {userData?.username}
            <br />
            <div className="flex justify-between">
              {!showPass ? (
                <>
                  <p>Password : {userData?.password}</p>
                  <VisibilityOffIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowPass(true)}
                  />
                </>
              ) : (
                <>
                  <p>Password : ***********</p>
                  <VisibilityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowPass(false)}
                  />
                </>
              )}
            </div>
            Role : {userData?.role}
          </div>
          <div className="flex justify-end gap-2">
            <CustomDelBtn
              label={<DeleteOutlineRoundedIcon />}
              p=""
              size="text-[18px]"
              width="w-[50px] h-8"
              onClick={handleDelete}
            />
            <CustomDelBtn
              label="Delete All Task"
              size="text-[14px] font-bold"
              height="h-8"
              p="px-2"
              onClick={handleDeleteAll}
            />
          </div>
        </div>
      </div>
      <div className=" container justify-self-center">
        <div>
          <div className="flex gap-3 mb-6 mx-2">
            <CustomInput
              type="text"
              placeholder=" Search Tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="bg-[#23272B] px-1 mt-4 h-12 border border-[#23272B] rounded-md "
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as
                    | "All"
                    | "Pending"
                    | "Completed"
                    | "Deadline Reached"
                )
              }
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Deadline Reached">Failed</option>
            </select>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4 my-4 mx-2">
            {filteredTask.length === 0 ? (
              <div className="flex justify-between">
                <p className="text-2xl text-amber-800">No Tasks created yet.</p>
              </div>
            ) : (
              filteredTask.map((t) => (
                <>
                  <li
                    key={t.id}
                    className="py-6 px-4 mb-4 rounded-md shadow-[0_0_15px_rgba(0,0,0)]"
                  >
                    <p className="flex">
                      Title :{" "}
                      <p className="text-[#5051f4] mb-1 ml-1 w-fit">
                        {t.title}
                      </p>
                    </p>
                    <p className="flex ">
                      Status :{" "}
                      <p
                        className={`${
                          statusColor[t.status]
                        } ml-2 px-1 rounded-sm font-bold`}
                      >
                        {t.status}
                      </p>
                    </p>
                    <p>Created at : {new Date(t.createdAt).toLocaleString()}</p>
                    <p>Deadline : {new Date(t.deadline).toLocaleString()}</p>
                  </li>
                </>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
