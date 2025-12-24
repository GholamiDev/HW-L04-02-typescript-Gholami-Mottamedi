import { useForm } from "react-hook-form";
import CustomBtn from "./CustomBtn";
import CustomDelBtn from "./CustomDelBtn";
import CustomForm from "./CustomForm";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTask } from "../features/tasks/taskSlice";
import Error from "./ErrorMsg";

type TaskModalProps = {
  onClose: () => void;
};

const TaskModal = ({ onClose }: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const onSubmit = (data: any) => {
    if (!currentUser) return;

    dispatch(
      addTask({
        title: data.title,
        deadline: data.deadline,
        hasReminder: true,
        userId: currentUser.id,
      })
    );

    toast.success("Task created succesfully");
    reset();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 "
        onClick={onClose}
      >
        <div
          className=" p-0 rounded-md w-[400px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="">
            <CustomForm onSubmit={handleSubmit(onSubmit)} header="Add Task">
              <CustomInput
                type="text"
                autoFocus={true}
                placeholder=" Task Title"
                nametag="Title"
                title="Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <Error>{errors.title.message}</Error>}

              <CustomInput
                type="date"
                nametag="Deadline"
                title="Deadline"
                {...register("deadline", { required: "Pick a Deadline" })}
              />
              {errors.deadline && <Error>{errors.deadline.message}</Error>}

              <div className="flex justify-between mt-4 gap-2">
                <CustomDelBtn
                  label="Cancel"
                  size="text-md"
                  p="px-5 py-1"
                  onClick={onClose}
                />

                <CustomBtn label="Add" size="text-md" p="px-5 py-1" />
              </div>
            </CustomForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
