import type { CustomDelBtnProps } from "../types/types";

const CustomDelBtn = ({
  label,
  type,
  width,
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
        className={`bg-red-500 ${p} ${size} ${width} rounded-md ${mt} text-center cursor-pointer hover:shadow-red-500 shadow-sm transition-shadow .4`}
      >
        {label}
      </button>
    </>
  );
};

export default CustomDelBtn;
