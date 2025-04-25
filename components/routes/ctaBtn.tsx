import { ComponentProps } from "react"


export function CTABtn({
    containerProps: {className: containerClassName, onClick, children: containerChild, ...containerOtherProps},
    textProps: {className: textClassName, children: textChild, ...textOtherProps},
}: { 
    containerProps: ComponentProps<'div'>,
    textProps: ComponentProps<'div'>,
 }) {


    return (
        <div {...containerOtherProps} onClick={onClick} className={`w-fit h-[45px] rounded-full flex items-center justify-center gap-[10px] border-[0.7px] border-d7d7d7 p-[1em] cursor-pointer ${containerClassName}`}>
            {containerChild}

            <div {...textOtherProps} className={`w-fit text-[12px] font-medium text-black text-nowrap ${textClassName}`}>{textChild}</div>
        </div>
    )
}