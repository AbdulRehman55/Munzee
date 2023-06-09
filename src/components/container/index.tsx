import * as React from "react";
import { CssBaseline, Container as MuiContainer } from "@mui/material";

export default function Container({ children }: IParent): JSX.Element {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiContainer maxWidth="lg">{children}</MuiContainer>
    </React.Fragment>
  );
}
