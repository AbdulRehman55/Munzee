import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, HomePageLoggedIn } from "../components";

export default function PublicLayout(): JSX.Element {
  return (
    <>
      <Header />
      <HomePageLoggedIn />
      <div style={{ background: "#f8f8f8" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
