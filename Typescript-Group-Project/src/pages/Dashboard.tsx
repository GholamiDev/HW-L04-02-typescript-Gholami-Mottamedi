import CustomDelBtn from "../components/CustomDelBtn";
import { deleteUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import bgImage from "../assets/minimal-orange.jpg";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.currentUser);

  const handleDelete = () => {
    if (!userData) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${userData.username}"?`
    );

    if (!confirmed) return;

    dispatch(deleteUser(userData.id));
  };

  return (
    <>
      <div className="container justify-self-center relative mt-5">
        <img className="w-full h-55 rounded-sm " src={bgImage} alt="bg" />
        <p className="text-4xl text-black absolute bottom-2 left-20">
          User Dashboard
        </p>
      </div>
      <div className="container justify-self-center">
        <div className=" flex flex-col rounded-md border border-[#fc6e08] p-6 mt-10 w-full justify-self-start gap-2 ">
          <div className="text-2xl text-gray-600">My Details </div>
          <div className="text-2xl py-2">
            Username : {userData?.username}
            <br />
            Password : {userData?.password}
            <br />
            Role : {userData?.role}
          </div>
          <div className="flex justify-end">
            <CustomDelBtn
              label={<DeleteOutlineRoundedIcon />}
              p="py-2"
              size="text-[18px]"
              width="w-[50px]"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
