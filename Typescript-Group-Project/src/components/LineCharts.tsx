import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// const mockLabels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

// const mockCompleted = mockLabels.map(() => Math.floor(Math.random() * 10));
// const mockPending = mockLabels.map(() => Math.floor(Math.random() * 10));
// const mockNew = mockLabels.map(() => Math.floor(Math.random() * 5));

const data = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Completed Tasks",
      data: [5, 10, 8, 12],
      borderColor: "rgba(34,197,94,0.8)",
      backgroundColor: "rgba(34,197,94,0.4)",
      tension: 0.4,
    },
    {
      label: "Pending Tasks",
      data: [3, 7, 4, 6],
      borderColor: "rgba(251,191,36,0.8)",
      backgroundColor: "rgba(251,191,36,0.4)",
      tension: 0.4,
    },
    {
      label: "New Tasks",
      data: [3, 5, 6, 2],
      borderColor: "rgb(43, 114, 185)",
      backgroundColor: "rgb(43, 114, 185)",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Task Overview - Last 30 Days",
    },
  },
};

const TaskLineChart = () => {
  return (
    <div className="container flex justify-center justify-self-center bg-[#1e1f25] rounded-md md:w-full w-[350px] h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default TaskLineChart;
