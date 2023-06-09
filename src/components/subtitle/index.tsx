import React from "react";
import "./style.scss";

interface Props {
  title: string;
  details?: string;
  children?: any;
}

const SubTitle = ({ title, details, children }: Props) => {
  return (
    <div className="sub-title">
      <p>{title}
        {details && <span>{details}</span> }
        {children}
      </p>
    </div>
  );
};

export default SubTitle;
