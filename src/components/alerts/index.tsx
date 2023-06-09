import React from "react";
import "./style.scss";

interface Props {
  children: ReactNode | string;
  type: "success" | "error" | "info" | "warning";
  align: "center" | "left" | "right";
}

const Alert = ({ children, type, align }: Props) => {
  return (
    <div className={`alert ${type} ${align}`}>
      {children}
    </div>
  );
};
export default Alert;
