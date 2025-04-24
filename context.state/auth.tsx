"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import LocalState from "@/constants/images/local_storage";
import ApiService from "@/api/api.services";
import { useToast } from "@/hooks/use-toast";

// !Interfaces
// !Input State
interface IAuthContextInputState {
  email: string;
  pin: string;
}
// !Input State

// !Local State
interface IAuthContextLocalState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
// !Local State

// !Fetch State
export interface IAuthContextFetchState {
  isSigningIn: boolean;
  isSigningOut: boolean;
}
// !Fetch State

interface IAuthContextState {
  inputs: IAuthContextInputState;
  local: IAuthContextLocalState;
  fetch: IAuthContextFetchState;
}

// !Individuals
type TUser = "driver" | "rider" | "admin";

interface IDriverNotificationMessage {
  title: string;
  content: string;
  read: boolean;
  driverId: string;
}

interface IDriverNotification {
  rideOrTripStatus: boolean;
  generalUpdates: boolean;
  promotionalOffers: boolean;
  tipsAndTutorials: boolean;
  transactionUpdates: boolean;
}

interface IRating {
  driverId: string;
  count: number;
  comment: string;
  riderId: string;
}

interface IPersonalDocuments {
  roadWorthinessCertImage: string;
  vehicleInsuranceCertImage: string;
  vehicleOwnershipCertImage: string;
  driverLicenseImage: string;
}

interface IVehicleImage {
  frontViewImage: string;
  backViewImage: string;
  sideViewImage: string;
  interiorImage: string;
}

interface IVehicle extends Document {
  id: string;
  vehicleType: string;
  vehicleYear: number;
  vehicleModel: string;
  vehicleColor: string;
  plateNumber: string;
  vehicleImages: IVehicleImage;
  seats: number;
}

interface IDriver {
  personalDocuments: IPersonalDocuments;
  vehicle: IVehicle;
  // ratingsIds: string[]
  isOnline: Boolean;
  notification: IDriverNotification;
  // notificationMessagesIds: string[],
}

interface IAccountSecurity {
  pin: string;
  securityQuestion: string;
  securityAnswer: string;
  deactivationReason: string;
  deactivated: boolean;
  deleted: boolean;
  bvn: Number;
  otp: string;
  otpExpires: Date;
  biometricLogin: boolean;
}

interface IRiderNotification {
  rideStatus: boolean;
  generalUpdates: boolean;
  promotionalOffers: boolean;
  tipsAndTutorials: boolean;
  transactionUpdates: boolean;
}

interface IRider {
  notification: IRiderNotification;
}

interface IUser {
  email: string;
  address: string;
  profileName: string;
  fullName: string;
  phoneNumber: Number;
  picture: string;
  avatar: string;
  accountSecurity: IAccountSecurity;
  role: TUser;
  riderProfile?: IRider;
  driverProfile?: IDriver;
}
// !Individuals

interface IAuthContext {
  state: IAuthContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof IAuthContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof IAuthContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof IAuthContextFetchState;
      value: any;
    }) => void;
    signin: () => Promise<void>;
    signout: () => void;
    checkAuthStatus: () => Promise<boolean>;
  };
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();

  const [state, setState] = useState<IAuthContextState>({
    fetch: {
      isSigningIn: false,
      isSigningOut: false,
    },
    inputs: {
      email: "",
      pin: "",
    },
    local: {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
    },
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      await checkAuthStatus();
    };

    checkSession();
  }, []);

  const setFetchState = ({
    key,
    value,
  }: {
    key: keyof IAuthContextFetchState;
    value: any;
  }) => {
    setState((prevState) => ({
      ...prevState,
      fetch: {
        ...prevState.fetch,
        [key]: value,
      },
    }));
  };

  const setInputState = ({
    key,
    value,
  }: {
    key: keyof IAuthContextInputState;
    value: any;
  }) => {
    setState((prevState) => ({
      ...prevState,
      inputs: {
        ...prevState.inputs,
        [key]: value,
      },
    }));
  };

  const setLocalState = ({
    key,
    value,
  }: {
    key: keyof IAuthContextLocalState;
    value: any;
  }) => {
    setState((prevState) => ({
      ...prevState,
      local: {
        ...prevState.local,
        [key]: value,
      },
    }));
  };

  const setSessionDetails = (details: {
    user: IUser | null;
    isAuthenticated: boolean;
    expires: Date;
  }) => {
    // Store in localStorage
    localStorage.setItem(
      LocalState.state.SESSION_DETAILS,
      JSON.stringify(details)
    );
    // Store in localStorage
  };

  const signin = async (): Promise<void> => {
    try {
      // Validate inputs
      if (state.inputs.email == "" || state.inputs.pin == "") {
        setLocalState({
          key: "error",
          value: "Email and pin are required",
        });
        setFetchState({ key: "isSigningIn", value: false });
        return;
      }
      // Validate inputs

      // Set loading state
      setFetchState({ key: "isSigningIn", value: true });
      setLocalState({ key: "error", value: null });

      await ApiService.post({
        url: "/auth/signin",
        data: {
          email: state.inputs.email,
          pin: state.inputs.pin,
          role: "admin",
        },
      }).then((data) => {
        console.log("Sign in data:", data);
        const { user, token, msg, code } = data;

        toast({
          title: "Login",
          description: msg,
        });
        setFetchState({ key: "isSigningIn", value: false });
        setLocalState({ key: "user", value: user });
        setLocalState({ key: "isAuthenticated", value: true });

        if (code == 200 || code == 201) {
          setSessionDetails({
            user: user,
            isAuthenticated: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
          localStorage.setItem(LocalState.state.USER, JSON.stringify(user));
          localStorage.setItem(LocalState.state.TOKEN, token);

          router.replace("/home");
        }
      });
    } catch (error: any) {
      toast({
        title: "Login",
        description: error?.message,
      });
      console.error("Sign in error:", error);
      setLocalState({ key: "error", value: "An unexpected error occurred" });
    } finally {
      setFetchState({ key: "isSigningIn", value: false });
    }
  };

  const signout = (): void => {
    const storedSession = localStorage.getItem(
      LocalState.state.SESSION_DETAILS
    );
    const session = JSON.parse(storedSession as string);

    try {
      setFetchState({ key: "isSigningOut", value: true });

      // Clear state
      setLocalState({ key: "user", value: null });
      setLocalState({ key: "isAuthenticated", value: false });

      setSessionDetails({
        user: null,
        isAuthenticated: false,
        expires: session?.expires,
      });
      localStorage.removeItem(LocalState.state.USER);
      localStorage.removeItem(LocalState.state.TOKEN);

      // Redirect to login
      router.push("/auth");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setFetchState({ key: "isSigningOut", value: false });
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      setLocalState({ key: "isLoading", value: true });

      const storedSession = localStorage.getItem(
        LocalState.state.SESSION_DETAILS
      );
      const token = localStorage.getItem(LocalState.state.TOKEN);

      if (!token) {
        setLocalState({ key: "isAuthenticated", value: false });
        setLocalState({ key: "user", value: null });
        setLocalState({ key: "isLoading", value: false });
        return false;
      }

      const session = JSON.parse(storedSession as string);

      // Check if session has expired
      if (new Date(session.expires) < new Date()) {
        setSessionDetails({
          user: null,
          isAuthenticated: false,
          expires: session?.expires,
        });
        setLocalState({ key: "isAuthenticated", value: false });
        setLocalState({ key: "user", value: null });
        setLocalState({ key: "isLoading", value: false });
        return false;
      }

      // Valid session
      setLocalState({ key: "user", value: session.user });
      setLocalState({ key: "isAuthenticated", value: true });
      setLocalState({ key: "isLoading", value: false });
      return true;
    } catch (error) {
      console.error("Check auth status error:", error);
      setLocalState({ key: "isAuthenticated", value: false });
      setLocalState({ key: "user", value: null });
      setLocalState({ key: "isLoading", value: false });
      return false;
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (state.local.isAuthenticated) {
      if (path != "/auth") {
        router.replace(path);
        return;
      } else {
        router.replace("/home");
        return;
      }
    } else {
      router.replace("/auth");
      return;
    }
  }, [state.local.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        state,
        handlers: {
          setFetchState,
          setInputState,
          setLocalState,
          signin,
          signout,
          checkAuthStatus,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider!"
    );
  }

  return context;
};
