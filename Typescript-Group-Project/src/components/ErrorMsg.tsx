interface ErrorMsgProps {
  children: React.ReactNode;
}

const ErrorMsg = ({ children }: ErrorMsgProps) => {
  return (
    <div className=" w-[300px]">
      <p className="text-red-500 text-sm">{children}</p>
    </div>
  );
};

export default ErrorMsg;
