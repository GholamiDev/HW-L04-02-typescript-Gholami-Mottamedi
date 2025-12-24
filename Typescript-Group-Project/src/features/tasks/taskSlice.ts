import { createSlice, nanoid } from "@reduxjs/toolkit";

interface Task {
  title: string;
  id: string;
  completed: boolean;
  userId: string;
  deadline: string;
  hasReminder: boolean;
  createdAt: string;
  status: "Completed" | "Pending" | "Deadline Reached";
}

type TaskState = {
  tasks: Task[];
};

const taskJSON: string = localStorage.getItem("tasks") || "[]";
const tasksFromStorage: Task[] = JSON.parse(taskJSON) || [];

const initialState: TaskState = { tasks: tasksFromStorage };

interface AddTaskPayload {
  title: string;
  userId: string;
  deadline: string;
  hasReminder: boolean;
}

interface DeleteTaskPayload {
  taskId: string;
}

interface ToggleTaskPayload {
  taskId: string;
}

const taskSlice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    addTask(state, action: { payload: AddTaskPayload }) {
      const { title, userId, deadline, hasReminder } = action.payload;

      const newTask = {
        id: nanoid(),
        userId,
        title,
        deadline,
        hasReminder,
        completed: false,
        status: "Pending",
        createdAt: new Date().toLocaleDateString(),
      };

      state.tasks.push(newTask);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, action: { payload: DeleteTaskPayload }) {
      const { taskId } = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== taskId);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      localStorage.removeItem(`notified_deadline_${taskId}`);
    },
    toggleTask(state, action: { payload: ToggleTaskPayload }) {
      const { taskId } = action.payload;
      const currentTask = state.tasks.find((task) => task.id === taskId);

      if (!currentTask) return;

      if (!currentTask.completed) {
        currentTask.completed = true;
        currentTask.status = "Completed";
      } else {
        currentTask.completed = false;

        const isDeadlinePassed =
          new Date(currentTask.deadline).getTime() < Date.now();

        currentTask.status = isDeadlinePassed ? "Deadline Reached" : "Pending";
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export default taskSlice;
export const { addTask, deleteTask, toggleTask } = taskSlice.actions;
