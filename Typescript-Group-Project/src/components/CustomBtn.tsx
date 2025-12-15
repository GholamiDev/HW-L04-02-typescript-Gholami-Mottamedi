import type { ReactNode } from "react";

interface CustomBtnProps {
  label: string | ReactNode;
  type?: "submit" | "button";
  p: string;
  size: string;
  width?: string;
  mt?: string;
  onClick?: () => void;
}

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
        className={`bg-[#5051f4] ${p} ${size} ${width} rounded-md ${mt} text-center cursor-pointer hover:shadow-[#5051f4] shadow-sm transition-shadow .4`}
      >
        {label}
      </button>
    </>
  );
};

export default CustomBtn;
