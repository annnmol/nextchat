
import { SocketProvider } from "@/context/socket-context";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default Providers;
