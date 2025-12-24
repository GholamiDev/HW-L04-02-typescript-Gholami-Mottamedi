import type { CustomFormProps } from "../types/types";

const CustomForm = ({ header, children, onSubmit }: CustomFormProps) => {
  return (
    <>
      <div className="container flex justify-self-center h-[90vh] items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="bg-[#1E1F25] flex flex-col items-center w-full mx-2 md:w-[664px] px-4 py-10 rounded-md"
        >
          <p className="text-3xl mb-12">{header}</p>
          {children}
        </form>
      </div>
    </>
  );
};

export default CustomForm;
