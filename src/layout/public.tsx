import React, {useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, HomePageHeader } from "../components";
import { ClientContext } from "../context/ClientContext";

export default function PublicLayout(): JSX.Element {
  const { pathname } = useLocation();
  const { user } = React.useContext(ClientContext);

  return (
    <>
      {user ? <HomePageHeader /> : <Header />}
      <div style={{ background: "#f8f8f8" }}>
        <Outlet />
      </div>
      {pathname !== "/login" && pathname !== "/forgotpassword" ? (
        <Footer />
      ) : null}
    </>
  );
}
