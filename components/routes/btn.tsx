import { ComponentProps } from "react";


const Btn = ({props: {className, onClick, children}}: {props: ComponentProps<'button'>}) => {
    return (
        <button onClick={onClick} className={`w-full h-[50px] rounded-[10px] flex items-center justify-center bg-[#5D5FEF] text-white ${className}`}>
            {children}
        </button>
    );
}
 
export default Btn;