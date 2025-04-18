import { Check } from "lucide-react";
import { ComponentProps } from "react";


const Checkbox = ({
    props: {onClick, className, ...otherProps},
    condition
}: {
    props: ComponentProps<'span'>,
    condition: boolean
}) => {

    return (
        <span
        {...otherProps}
                onClick={onClick}
                className={`w-[20px] h-[20px] border-[1.5px] rounded-[2px] transition-all ease-linear ${
                  condition
                    ? "bg-[#27AE65] border-[#27AE65]"
                    : "bg-white border-[#747474] cursor-pointer"
                } ${className}`}
              >
                {condition && (
                  <Check className="text-white w-[16px]" />
                )}
              </span>
    );
}
 
export default Checkbox;