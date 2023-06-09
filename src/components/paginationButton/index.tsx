import React from "react";
import "./style.scss";

interface Iprops {
  title: string;
  iconPosition: "left" | "right";
  disabled?: boolean;
  className: string;
  onClick?: () => void;
}
const PaginationButton = ({
  title,
  iconPosition,
  disabled,
  className,
  onClick,
}: Iprops): JSX.Element => {
  return (
    <div className="pagination-container" onClick={onClick}>
      <ul className="pager">
        <li className={`${iconPosition} ${disabled ? "disabled" : ""}`}>
          <a>
            {iconPosition === "left" && <i className={className}></i>}
            {title}
            {iconPosition === "right" && <i className={className}></i>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PaginationButton;
