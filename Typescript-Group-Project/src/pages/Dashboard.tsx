import CustomDelBtn from "../components/CustomDelBtn";
import { deleteUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import bgImage from "../assets/minimal-orange.jpg";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  hasBeenNotified,
  isDeadlineNear,
  markAsNotified,
} from "../utils/helpers";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.currentUser);
  const userTasks = useAppSelector((state) =>
    state.task.tasks.filter((t) => t.userId === userData?.id)
  );

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

      if (deadlineTime < now) {
        if (!hasBeenNotified(task.id)) {
          toast.error(`Deadline Passed : ${task.title}`);
          markAsNotified(task.id);
        } else if (isDeadlineNear(task.deadline)) {
          toast.warning(`Deadline is near : ${task.title}`);
        }
      }
    });
  }, [userTasks, userData]);

  return (
    <>
      <div className="container justify-self-center relative mt-20 ">
        <img
          className="w-[98%] justify-self-center h-55 rounded-sm mx-2"
          src={bgImage}
          alt="bg"
        />
        <p className="text-4xl text-black absolute bottom-2 left-20">
          User Dashboard
        </p>
      </div>
      <div className="container justify-self-center ">
        <div className=" flex flex-col rounded-md border border-[#fc6e08] p-6 mt-10 mx-2  justify-self-start gap-2 ">
          <div className="text-2xl text-gray-600">My Details </div>
          <div className="text-2xl py-2">
            Username : {userData?.username}
            <br />
            Password : {userData?.password}
            <br />
            Role : {userData?.role}
          </div>
          <div className="flex justify-end">
            <CustomDelBtn
              label={<DeleteOutlineRoundedIcon />}
              p="py-2"
              size="text-[18px]"
              width="w-[50px]"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
      <div className=" container justify-self-center">
        <div>
          <ul className="border border-amber-700 p-5 rounded-md my-4 mx-2">
            {userTasks.length === 0 ? (
              <div className="flex justify-between">
                <p className="text-2xl text-amber-800">No Tasks created yet.</p>
              </div>
            ) : (
              userTasks.map((t) => (
                <>
                  <li
                    key={t.id}
                    className="mb-4 border-b border-amber-600 pb-2"
                  >
                    <p className="flex">
                      Title :{" "}
                      <p className="bg-[#5051f4] rounded-sm px-1 mb-1 ml-1 w-fit">
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
