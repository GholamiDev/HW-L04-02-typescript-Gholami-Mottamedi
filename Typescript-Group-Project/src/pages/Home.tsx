import TaskCard from "../components/TaskCard";
import TaskDets from "../components/TaskDets";

const Home = () => {
  return (
    <>
      <div className="container grid grid-col-1 md:grid-cols-3 gap-4 justify-self-center mt-10">
        <TaskCard header="Completed Tasks" timeline="From Last Week" />
        <TaskCard header="New Task" timeline="From Last Week" />
        <TaskCard header="Tasks in Progress " timeline="From Last Week" />
      </div>
      <div className="container grid grid-col-1 justify-self-center mt-10">
        <div className="bg-[#1E1F25] h-[350px] rounded-lg md:mx-0 mx-3 p-8">
          <p className="text-[20px] font-bold">Tasks Line Chart</p>
        </div>
      </div>
      <div className="container grid grid-col-1 justify-self-center mt-8">
        <p className="container text-[20px] font-bold mx-3">Tasks</p>
      </div>
      <TaskDets taskname="Name of the Project" />
      <TaskDets taskname="Name of the Project" />
      <TaskDets taskname="Name of the Project" />
    </>
  );
};

export default Home;
