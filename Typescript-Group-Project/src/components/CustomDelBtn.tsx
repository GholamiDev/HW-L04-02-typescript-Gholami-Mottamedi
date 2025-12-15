import type { ReactNode } from "react";

interface CustomDelBtnProps {
  label: string | ReactNode;
  type?: "submit" | "button";
  p: string;
  size: string;
  width?: string;
  mt?: string;
  onClick?: () => void;
}

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
