import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import CustomBtn from "./CustomBtn";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const TaskDets = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  const tasks = useAppSelector((state) => state.task.tasks);
  const navigate = useNavigate();

  const pendingTasks = tasks
    .filter((t) => t.status === "Pending")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const handleView = () => {
    if (user) navigate("/tasks");
    else navigate("/login");
  };

  return (
    <div className="container grid grid-col-1 justify-self-center my-5 mx-3 md:mx-0">
      {pendingTasks.length === 0 ? (
        <p className="text-sm text-gray-500">No Tasks yet</p>
      ) : (
        pendingTasks.map((task) => (
          <div key={task.id} className="flex rounded-s-lg mx-3 md:mx-0 my-1">
            <div className="bg-[#212229] flex justify-between w-[30%] py-3 px-4 rounded-s-lg">
              <div>
                <p className="text-sm">Start from :</p>
                <span className="text-[12px]">
                  {new Date(task.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <PlayCircleIcon
                sx={{
                  fontSize: "40px",
                  color: "#5051f4",
                }}
              />
            </div>
            <div className="bg-[#1E1F25] w-full flex items-center justify-between py-3 px-4 rounded-e-lg">
              <p>{task.title}</p>
              <CustomBtn
                label="View"
                type="button"
                p="px-6 py-1"
                size="text-[18px]"
                onClick={handleView}
              ></CustomBtn>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskDets;

{
  /* <div className="container grid grid-col-1 justify-self-center my-5 mx-3 md:mx-0">
      <div className="flex rounded-s-lg mx-3 md:mx-0">
        <div className="bg-[#212229] w-[30%] py-3 px-4 rounded-s-lg">
          <p className="text-sm">Start from</p>
          <span className="text-[12px]">9:00 a.m</span>
        </div>
        <div className="bg-[#1E1F25] w-full flex items-center justify-between py-3 px-4 rounded-e-lg">
          <p>{taskname}</p>
          <CustomBtn
            label="View"
            type="button"
            p="px-6 py-1"
            size="text-[18px]"
          ></CustomBtn>
        </div>
      </div>
    </div> */
}
