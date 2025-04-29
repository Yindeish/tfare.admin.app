import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentProps, ReactNode } from "react";


const MenuTile = ({
  list,
  triggerProps,
}: {
  triggerProps: ComponentProps<'div'>;
  list: ComponentProps<'div'>[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerProps?.children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {list.map((item, index) => (
          <div className="w-full h-fit flex flex-col" key={index}>
            <DropdownMenuItem onClick={item?.onClick} key={index}>{item?.children}</DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuTile;
