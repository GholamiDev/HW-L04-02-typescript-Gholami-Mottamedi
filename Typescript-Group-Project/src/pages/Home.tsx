import TaskLineChart from "../components/LineCharts";
import TaskCard from "../components/TaskCard";
import TaskDets from "../components/TaskDets";

const Home = () => {
  return (
    <>
      <div className="container grid grid-col-1 md:grid-cols-3 gap-3 justify-self-center mt-20 mx-3">
        <TaskCard
          header="Completed Tasks"
          value={1128}
          color="text-green-500"
          timeline="From Last Month"
        />
        <TaskCard
          header="New Task"
          timeline="From Last Week"
          value={78}
          color="text-yellow-500"
        />
        <TaskCard
          header="Tasks in Progress "
          timeline="From Last Week"
          value={236}
          color="text-blue-500"
        />
      </div>
      <div className="container grid grid-col-1 justify-self-center mt-10">
        <div className="bg-[#1E1F25] rounded-lg mx-3 p-8">
          <p className="text-[20px] font-bold">Tasks Line Chart</p>
          <TaskLineChart />
        </div>
      </div>
      <div className="container grid grid-col-1 justify-self-center mt-8">
        <p className="container text-[20px] font-bold mx-3">Tasks</p>
      </div>
      <TaskDets />
    </>
  );
};

export default Home;
