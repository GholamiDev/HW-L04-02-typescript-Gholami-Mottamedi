import CustomBtn from "./CustomBtn";

interface TaskDetsProps {
  taskname: string;
}

const TaskDets = ({ taskname }: TaskDetsProps) => {
  return (
    <div className="container grid grid-col-1 justify-self-center my-5 mx-3 md:mx-0">
      <div className="flex rounded-s-lg mx-3 md:mx-0">
        <div className="bg-[#212229] w-[30%] py-3 px-4 rounded-s-lg">
          <p className="text-sm">Start from</p>
          <span className="text-[12px]">9:00 a.m</span>
        </div>
        <div className="bg-[#1E1F25] w-full flex items-center justify-around py-3 px-4 rounded-e-lg">
          <p>{taskname}</p>
          <CustomBtn
            label="View"
            type="button"
            p="px-6 py-1"
            size="text-[18px]"
          ></CustomBtn>
        </div>
      </div>
    </div>
  );
};

export default TaskDets;
