interface CustomInputProps {
  title?: string;
  type: string;
  nametag?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const CustomInput = ({
  title,
  type,
  placeholder,
  nametag,
  autoFocus,
  ...rest
}: CustomInputProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="mt-4" htmlFor={title}>
          {title}
        </label>
        <input
          type={type}
          name={nametag}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...rest}
          className="w-[300px] border border-[#23272B] text-[16px] rounded-md p-3"
        />
      </div>
    </>
  );
};

export default CustomInput;
