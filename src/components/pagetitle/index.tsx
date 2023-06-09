import React from "react";
import "./style.scss";

interface Props {
  title: any;
  details?: string;
  children?: any;
}

const PageTitle = ({ title, details, children }: Props) => {
  return (
    <div className="page-title">
      <p>{title}
        {details && <span>{details}</span> }
        {children}
      </p>
    </div>
  );
};

export default PageTitle;
