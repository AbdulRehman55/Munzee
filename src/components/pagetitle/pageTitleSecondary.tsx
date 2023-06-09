import React from "react";
import "./style.scss";

interface Props {
  title: string;
  subtitle?: string;
  flexDirection?: "col" | "row";
}

const PageTitleSecondary = ({ title, subtitle, flexDirection }: Props) => {
  return (
    <div className={`page-title-secondary ${flexDirection && flexDirection}`}>
      <p>{title}</p>
      <h5>{subtitle}</h5>
    </div>
  );
};

export default PageTitleSecondary;
