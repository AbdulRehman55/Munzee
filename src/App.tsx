import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import UserContainer from "./context/UserContext";
import ClientContainer from "./context/ClientContext";
import "./App.scss";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ClientContainer>
        <UserContainer>
          <Routes />
        </UserContainer>
      </ClientContainer>
    </BrowserRouter>
  );
}
