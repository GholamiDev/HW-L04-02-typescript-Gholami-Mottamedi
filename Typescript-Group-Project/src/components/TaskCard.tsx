interface TaskCardProps {
  header: string;
  timeline: string;
  data?: number;
}

const TaskCard = ({ header, timeline }: TaskCardProps) => {
  return (
    <div className="bg-[#1E1F25] py-4 px-4 mx-3 md:mx-0 rounded-lg h-[200px]">
      <p className="text-center mb-3 mx-8">{header}</p>
      <hr className="text-[#5051F959]" />
      <p className="text-[12px] text-[#898999] mt-5">{timeline} : </p>
    </div>
  );
};

export default TaskCard;
