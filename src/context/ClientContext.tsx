import React from "react";
import Backend, { UserInfo } from "../munzee-backend";
import Client from "../munzee-client";
import { IUserContext, UserContext } from "./UserContext";
import { Munzee } from "../munzee-backend/types";

type ClientContextType = {
  client: Client | null;
  user: UserInfo | null;
  backend: Backend | null;
  publicProfile: UserInfo | null;
  setPublicProfile: any;
  munzeeDetailApi: Munzee | null;
  setMunzeeDetailApi: any;
  munzeeRefresh: Number | null;
  setMunzeeRefresh: any;
};

export const ClientContext = React.createContext<ClientContextType>({
  client: null,
  user: null,
  backend: null,
  publicProfile: null,
  setPublicProfile: null,
  munzeeDetailApi: null,
  setMunzeeDetailApi: null,
  munzeeRefresh: null,
  setMunzeeRefresh: null,
});
export const ClientProvider = ClientContext.Provider;
export const ClientConsumer = ClientContext.Consumer;

export function ClientContainer({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactNode {
  const [backend, setBackend] = React.useState<Backend | null>(null);
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [client, setClient] = React.useState<Client | null>(null);
  const [publicProfile, setPublicProfile] = React.useState<UserInfo | null>(null);
  const [munzeeDetailApi, setMunzeeDetailApi] = React.useState<Munzee | null>(null);
  const [munzeeRefresh, setMunzeeRefresh] = React.useState<Number>(0);  

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      const backend = new Backend((user) => {
        const client = new Client(backend);
        setClient(client);
        setUser(user);
      });
      setBackend(backend);
    }
    loadResourcesAndDataAsync();
  }, []);

  return (
    <ClientProvider
      value={{
        backend,
        client,
        user,
        publicProfile,
        setPublicProfile,
        munzeeDetailApi,
        setMunzeeDetailApi,
        munzeeRefresh,
        setMunzeeRefresh,
      }}
    >
      {children}
    </ClientProvider>
  );
}

export default ClientContainer;
