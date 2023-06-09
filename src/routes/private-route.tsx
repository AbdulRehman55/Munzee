import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { Loader } from "../components";
import { IUserContext, UserContext } from "../context/UserContext";

interface IPrivateRoute {
  component: ReactNode;
}

function PrivateRoute({
  component: Component,
  ...rest
}: IPrivateRoute): ReactNode {
  const { data } = useContext(UserContext) as IUserContext;

  if (data.user) {
    return <Component {...rest} />;
  }
  //   if (data.isLoading) {
  //     return <Loader />;
  //   }

  return <Navigate to="/login" replace />;
}

export default PrivateRoute;
