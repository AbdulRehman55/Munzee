import React from "react";
// import { useContext } from "react";
// import { Loader } from "../components";
// import { IUserContext, UserContext } from "../context/UserContext";

interface IPublicRoute {
  component: ReactNode;
}

function PublicRoute({
  component: Component,
  ...rest
}: IPublicRoute): ReactNode {
  //   const { data } = useContext(UserContext) as IUserContext;

  //   if (data.isLoading) {
  //     return <Loader />;
  //   }

  return <Component {...rest} />;
}

export default PublicRoute;
