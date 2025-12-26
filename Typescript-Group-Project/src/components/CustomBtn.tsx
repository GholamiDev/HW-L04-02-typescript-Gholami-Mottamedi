import type { CustomBtnProps } from "../types/types";

const CustomBtn = ({
  label,
  type,
  width,
  p,
  size,
  mt,
  onClick,
}: CustomBtnProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`bg-[#5051f4] ${p} ${size} ${width} rounded-md ${mt} text-center cursor-pointer hover:shadow-[0_0_15px_rgba(0,0,0)] transition-shadow duration-400`}
      >
        {label}
      </button>
    </>
  );
};

export default CustomBtn;
