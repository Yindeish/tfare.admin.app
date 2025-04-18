import { ComponentProps } from "react";

export const CupertinoBtn = ({
  on,
  sliderProps: {className: sliderClassName, onClick, ...sliderOtherProps},
  indicatorProps: {className: indicatorClassName, ...indicatorOtherProps},
}: {
  on: boolean;
    sliderProps: ComponentProps<'div'>,
    indicatorProps: ComponentProps<'div'>
}) => (
  <div
  {...sliderOtherProps}
    onClick={onClick}
    className={`${
      on ? "bg-27AE65" : "bg-747474"
    } w-[30px] h-[15px] rounded-full flex items-center overflow-visible ${sliderClassName}`}
  >
    <div
    {...indicatorOtherProps}
      className={`bg-white w-[20px] h-[20px] ${
        on ? "translate-x-[15px]" : "translate-x-[-5px]"
      } rounded-full ${indicatorClassName}`}
    ></div>
  </div>
);
export default CupertinoBtn;
