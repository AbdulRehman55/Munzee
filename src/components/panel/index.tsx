import React from "react";
import "./style.scss";

export interface Iprops {
  text: string;
  theme: "light" | "dark";
}

const Panel = ({ text, theme }: Iprops) => {
  return (
    <div className="panel-container">
      <div className={`panel-heading ${theme}`}>{text}</div>
    </div>
  );
};
export default Panel;
