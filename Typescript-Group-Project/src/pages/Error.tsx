import { useLocation, useNavigate } from "react-router-dom";
import CustomBtn from "../components/CustomBtn";

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const code = location.state?.code || 404;

  const errorMessages: Record<number, string> = {
    404: "Page not found",
  };

  return (
    <div className="container flex justify-self-center justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[180px] font-bold">{code}</h1>
        <p className="text-lg">
          {errorMessages[code] || "Something went wrong"}
        </p>

        <CustomBtn
          label="Back to Home"
          width="w-[140px]"
          size="text-sm"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Error;
