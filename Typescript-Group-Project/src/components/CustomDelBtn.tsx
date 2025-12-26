import type { CustomDelBtnProps } from "../types/types";

const CustomDelBtn = ({
  label,
  type,
  width,
  height,
  p,
  size,
  mt,
  onClick,
}: CustomDelBtnProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`bg-red-500 ${p} ${size} ${width} ${height} rounded-md ${mt} text-center cursor-pointer hover:shadow-[0_0_15px_rgba(0,0,0)] transition-shadow duration-400`}
      >
        {label}
      </button>
    </>
  );
};

export default CustomDelBtn;
