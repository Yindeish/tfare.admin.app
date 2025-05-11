import { ChangeEvent, ComponentProps } from "react";

function InputField({
  label,
  containerClassName = "",
  // inputClassName = '',
  labelClassName = "",
  inputProps: {
    className: inputClassName,
    onChange,
    onBlur,
    name,
    value,
    ...otherInputProps
  },
}: {
  containerClassName?: string;
  labelClassName?: string;
  // inputClassName?: string,
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  // onBlur?: () => void,
  // value: string,
  // name: string,
  label: string;
  inputProps: ComponentProps<"input">;
}) {
  return (
    <div className={`flex flex-col gap-[12px] ${containerClassName}`}>
      <span
        className={`font-normal text-[14px] leading-[17px] text-747474 ${labelClassName}`}
      >
        {label}
      </span>

      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type="text"
        className={`bg-f9f7f8 border-[1px] border-d7d7d7 rounded-[10px] px-[24px] 
                    w-full h-[35px] outline-none activeoutline-none focus:outline-none active:border-747474
                    focus:border-747474 ${inputClassName}`}
        {...otherInputProps}
      />
    </div>
  );
}

export default InputField;
