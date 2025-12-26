import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  checkDeadline,
  deleteTask,
  toggleTask,
} from "../features/tasks/taskSlice";

import TaskModal from "../components/TaskModal";
import CustomBtn from "../components/CustomBtn";
import CustomDelBtn from "../components/CustomDelBtn";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const Tasks = () => {
  const allTasks = useAppSelector((state) => state.task.tasks);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  const userTasks = currentUser
    ? allTasks.filter((task) => task.userId === currentUser.id)
    : [];
  const [showModal, setShowModal] = useState(false);

  const statusColor = {
    ["Pending"]: "text-yellow-400",
    ["Completed"]: "text-green-400",
    ["Deadline Reached"]: "text-red-400",
  };

  useEffect(() => {
    dispatch(checkDeadline());

    const interval = setInterval(() => {
      dispatch(checkDeadline());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleDelete = (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    dispatch(deleteTask({ taskId }));
    toast.warning("Task Deleted");
  };

  return (
    <>
      <div className="container justify-self-center mt-20">
        <p className="text-4xl mx-2 my-8">Tasks</p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mx-2">
          <div>
            <div className="bg-[#1e1f25] p-3 rounded-md flex justify-between">
              <p className="bg-yellow-500 text-sm font-bold p-1 rounded-sm w-fit">
                New Tasks
              </p>
              <CustomBtn
                onClick={() => setShowModal(true)}
                label={<AddIcon />}
                size=""
                p="px-2 py-0"
              />
            </div>

            {userTasks.filter((t) => t.status === "Pending").length === 0 ? (
              <p className="mt-2">No New Tasks yet</p>
            ) : (
              <div className="my-2">
                {userTasks
                  .filter((task) => task.status === "Pending")
                  .map((t) => (
                    <ul key={t.id} className="bg-[#1e1f25] p-3 my-3 rounded-md">
                      <li className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          disabled={t.status === "Deadline Reached"}
                          onChange={() =>
                            dispatch(toggleTask({ taskId: t.id }))
                          }
                        />

                        <span
                          className={
                            t.completed ? "line-through opacity-60" : ""
                          }
                        >
                          {t.title}
                        </span>
                      </li>
                      <li className={statusColor[t.status]}>
                        Status : {t.status}
                      </li>
                      <li>Created At : {t.createdAt}</li>
                      <li>Deadline : {t.deadline}</li>
                      <li className="justify-self-end">
                        <CustomDelBtn
                          label={<DeleteOutlineRoundedIcon />}
                          p="p-1"
                          size="text-sm"
                          onClick={() => handleDelete(t.id)}
                        />
                      </li>
                    </ul>
                  ))}
              </div>
            )}
          </div>

          <div>
            <div className="bg-[#1e1f25] p-3 rounded-md">
              <p className="bg-green-600 text-sm font-bold p-1 rounded-sm w-fit">
                Completed Tasks
              </p>
            </div>

            <div className="my-2">
              {userTasks
                .filter((task) => task.status === "Completed")
                .map((t) => (
                  <ul key={t.id} className="bg-[#1e1f25] p-3 my-3 rounded-md">
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        disabled={t.status === "Deadline Reached"}
                        onChange={() => dispatch(toggleTask({ taskId: t.id }))}
                      />
                    </li>
                    <span
                      className={t.completed ? "line-through opacity-60" : ""}
                    >
                      {t.title}
                    </span>
                    <li className={statusColor[t.status]}>
                      Status : {t.status}
                    </li>
                    <li>Deadline : {t.deadline}</li>
                    <li className="justify-self-end">
                      <CustomDelBtn
                        label={<DeleteOutlineRoundedIcon />}
                        p="p-1"
                        size="text-sm"
                        onClick={() => handleDelete(t.id)}
                      />
                    </li>
                  </ul>
                ))}
            </div>
          </div>

          <div>
            <div className="bg-[#1e1f25] p-3 rounded-md">
              <p className="bg-red-500 text-sm font-bold p-1 rounded-sm w-fit">
                Failed Tasks
              </p>
            </div>

            <div className="my-2">
              {userTasks
                .filter((task) => task.status === "Deadline Reached")
                .map((t) => (
                  <ul key={t.id} className="bg-[#1e1f25] p-3 my-3 rounded-md">
                    <li>Title : {t.title}</li>
                    <li className={statusColor[t.status]}>
                      Status : {t.status}
                    </li>
                    <li>Created At : {t.createdAt}</li>
                    <li className="justify-self-end">
                      <CustomDelBtn
                        label={<DeleteOutlineRoundedIcon />}
                        p="p-1"
                        size="text-sm"
                        onClick={() => handleDelete(t.id)}
                      />
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Tasks;
