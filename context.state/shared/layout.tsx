"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// !Types
type TView = "grid" | "row";
// !Types

// !Interfaces
interface ILayoutContextState {
  view: TView;
}

interface ILayoutContext {
  state: ILayoutContextState;
  updateState: ({
    key,
    value,
  }: {
    key: keyof ILayoutContextState;
    value: any;
  }) => void;
}
// !Interfaces

const LayoutContext = createContext<ILayoutContext | undefined>(undefined);

const LayoutContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<ILayoutContextState>({
    view: "grid",
  });

  const updateState = ({
    key,
    value,
  }: {
    key: keyof ILayoutContextState;
    value: any;
  }) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <LayoutContext.Provider
      value={{
        state,
        updateState,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (context) return context;
  else
    throw new Error(
      "useLayoutContext must be wrapped in LayoutContextProvider!"
    );
};
