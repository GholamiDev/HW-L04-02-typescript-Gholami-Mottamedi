import type { TaskCardProps } from "../types/types";
import CountUp from "react-countup";

const TaskCard = ({ header, timeline, value, color }: TaskCardProps) => {
  return (
    <div className="bg-[#1E1F25] py-4 px-4 mx-3 md:mx-0 rounded-lg h-[200px]">
      <p className={`text-center mb-3 mx-8 ${color}`}>{header}</p>
      <hr className="text-[#5051F959]" />
      <p className="text-[12px] text-[#898999] mt-5">
        {timeline} :{" "}
        <p className="text-white text-5xl justify-self-center mt-7">
          <CountUp start={0} end={value} duration={2} />
        </p>
      </p>
    </div>
  );
};

export default TaskCard;
